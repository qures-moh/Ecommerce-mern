export default function Card() {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden border border-gray-300">
      <img src="https://i.pinimg.com/200x/56/13/90/5613907f2eef08bce7589040f04774b9.jpg" className="w-full h-48 object-cover" />
 
      
       <h2 className="text-lg font-semibold line-clamp-2">
           shorts
        </h2>
          <p className="text-blue-600 font-bold">Price :4000</p>
           <button className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
          Add to Cart
        </button>
      </div>

  );
}
