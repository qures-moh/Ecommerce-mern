import API from "./api";

export default function Card({product}) {
  const addToCart=async()=>{
    try{
    await API.post("/cart/add",{productId:product._id,quantity:1})
    }catch(err){
      console.log(err)
    }
  }
  return (
     <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition duration-300 overflow-hidden border border-gray-100 group">
       <div className="h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"/>
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
  
          
        <button className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition" onClick={()=>addToCart()}>
          Add to Cart
        </button>
      </div>
      </div></div>

  );
}
