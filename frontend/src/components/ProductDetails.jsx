import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "./api";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function ProductDetails() {
  const {id}=useParams();
  const navigate=useNavigate();
    const user = useSelector((state) => state.auth.user);
    const [product, setProduct] = useState("");
    useEffect(()=>{
      fetchProduct()
    },[])
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/product/${id}`);
        setProduct(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
     const addToCart=async()=>{
    try{
   const res= await API.post("/cart/add",{productId:product._id,quantity:1});
   toast.success(res.data.message); 
    }catch(err){
      if(!user){
  toast.error("Please login");
   navigate("/login")
      }else{
 toast.error("Can not add to cart");
      }
    }
  }
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-10 p-6">
      <div className="flex justify-center">
<img src={product.image} alt={product.name} className="w-full h-[400px] md:h-[600px]  object-cover rounded-xl"/>
      </div>
      <div className="flex flex-col gap-4">
         <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-yellow-500">
          ★★★★☆ (120 reviews)
        </p>
        <div className="flex items-center gap-3">
               <p className="text-blue-600 text-2xl font-bold">   ₹{product.price}</p>
           <span> {product.description}</span>


        </div>
         
         <div className="flex flex-col gap-2 text-gray-700 text-sm">
  
  <p>
    <span className="font-semibold text-gray-900">Category:</span>{" "}
    <span className="bg-gray-100 px-2 py-1 rounded-md capitalize">
      {product.category}
    </span>
  </p>

  <p>
    <span className="font-semibold text-gray-900">Stock:</span>{" "}
    <span
      className={`px-2 py-1 rounded-md font-medium ${
        product.stock > 0
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      {product.stock > 0 ? `${product.stock} Available` : "Out of Stock"}
    </span>
  </p>

</div>

            <button className="bg-blue-600 text-white py-3 rounded-lg" onClick={addToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
