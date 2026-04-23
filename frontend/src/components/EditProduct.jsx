import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "./api";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
export default function EditProduct() {
  const { id } = useParams();
  const navigate=useNavigate();
  const user=useSelector((state)=>state.auth.user);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
 
  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/product/${id}`);
        const p = res.data.data;

        setName(p.name);
        setPrice(p.price);
        setImage(p.image);
        setCategory(p.category);
        setStock(p.stock);
        setDescription(p.description);

      } catch (err) {
        console.log(err);
      }
    };
    if(user && user.role==="admin"){

    fetchProduct();
    }else{
      navigate("/login")
    }
  }, [id]);

  // Update product
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/product/${id}`, {
        name,
        price: Number(price),
        image,
        category,
        stock: Number(stock),
        description,
      });

       toast.success("Product Updated");
      navigate(`/product/${id}`)

    } catch (err) {
      console.log(err);
      toast.error("Update failed ");
    }
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
    
    <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
      
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
         Edit Product
      </h2>

      <form onSubmit={handleUpdate} className="flex flex-col gap-4">

        {/* Name */}
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name"
          className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        {/* Price */}
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          type="number"
          className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        {/* Image */}
        <input
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Image URL"
          className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        {/* Category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-white"
        >
          <option value="">Select Category</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="books">Books</option>
          <option value="home">Home</option>
        </select>

        {/* Stock */}
        <input
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          placeholder="Stock"
          type="number"
          className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        {/* Description */}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          rows="4"
          className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
        />

        {/* Button */}
        <button
          className="bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition duration-300 shadow-md"
        >
          Update Product
        </button>
      </form>
    </div>
  </div>
);
    
}