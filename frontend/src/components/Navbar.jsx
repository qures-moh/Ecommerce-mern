import { Menu, ShoppingCart, X } from "lucide-react";
import { useState } from "react";

const NavBar = () => {
    const [isOpen,setIsOpen]=useState(false);
  return (
    <nav className="bg-white shadow-md px-4 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl front-bold text-blue-600">MyShop</h1>
        <div className="hidden md:flex items-center gap-6">
          <a href="#" className="hover:text-blue-600">
            Home
          </a>
          <a href="#" className="hover:text-blue-600">
            Shop
          </a>
          <ShoppingCart className="cursor-pointer" />
          <button className="bg-blue-600 text-white px-4 py-1 rounded">
            Login
          </button>
        </div>
        <div className="md:hidden">
            <button onClick={()=>setIsOpen(!isOpen)}>
                {isOpen ? <X/> : <Menu/>}
            </button>

        </div>
        </div>
        {isOpen &&(
            <div className="md:hidden mt-3 flex flex-col gap-4 px-4">
                 <a href="#" className="hover:text-blue-600">Home</a>
          <a href="#" className="hover:text-blue-600">Shop</a>
           
          <div className="flex items-center gap-2">
            <ShoppingCart />
            <span>Cart</span>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Login
          </button>
      
             
            </div>
        )}
      
    </nav>
  );
};
export default NavBar;
