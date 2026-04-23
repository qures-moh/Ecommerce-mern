import { Link } from "react-router-dom";
import API from "./api";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
export default function Card({product,setRefresh}) {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const addToCart=async()=>{
    if(!user){
      navigate("/login")
    }
    try{
   const res= await API.post("/cart/add",{productId:product._id,quantity:1});
   toast.success("Added to cart 🛒");
    }catch(err){
      toast.error("Failed to add ");
    }
  }
  const deleteProduct=async()=>{
    try{
      const res=await API.delete(`/product/${product._id}`);
       setRefresh(prev => !prev);
       toast.success("Product deleted ");

    }catch(error){
         toast.error("Delete failed ");
    }
  }
 

  return (

     <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition duration-300 overflow-hidden border border-gray-100 group">
        
       <div className="h-48 overflow-hidden">
          <Link to={`/product/${product._id}`}>
        <img
          src={product.image}
          alt={product.name}
          
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"/>
          </Link>
 </div>
      <div className="p-4 flex flex-col justify-between h-[200px]">
       <h2 className="text-base font-semibold text-gray-800 line-clamp-2">
           {product.name}
        </h2>
        
        <p className="text-gray-500 text-sm mt-1 line-clamp-2">
        {product.description}
      </p>
            <div className="mt-3 flex items-center justify-between">
                <p className="text-lg font-bold text-blue-600">

        ₹{product.price}
      </p>
  
          
       {user?.role!=="admin"&&<button className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition" onClick={()=>addToCart()}>
          Add to Cart
        </button>}
      {user?.role === "admin" && (
    <div className="flex gap-2">
     <button
        onClick={() => navigate(`/editProduct/${product._id}`)}
        className="bg-yellow-500 text-white px-3 py-1 rounded"
      >
        Edit
      </button>

      <button
       onClick={deleteProduct}
        className="bg-red-500 text-white px-3 py-1 rounded"
      >
        Delete
      </button>
    </div>
  )}
      </div>
      </div>
      
      </div>
     
      

  );
}