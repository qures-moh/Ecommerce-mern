import { Menu, ShoppingCart, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import API from "./api";
import { useDispatch } from "react-redux";
import { setUser } from "../config/authSlice"; 

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const userProfile = async () => {
    try {
      const res = await API.get("/user/profile");
      setUser(res.data.data);
      dispatch(setUser(res.data.data))
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    userProfile();
  }, []);

  const navigate = useNavigate();
  return (
    <nav className=" sticky top-0 bg-white shadow-md px-4 py-3">
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
          {user ? (
            <div className="cursor-pointer relative"  onClick={() => setIsDropdownOpen(!isDropdownOpen) }  >
              <User />
              

          {isDropdownOpen && (
            <div className="absolute right-0 top-8 bg-white shadow-md rounded p-3 flex flex-col gap-2 w-40">
              <button
                className="text-left hover:text-blue-600"
                onClick={() => navigate("/profile")}
              >
                Profile
              </button>

              {user?.role === "admin" && (
                <button
                  className="text-left hover:text-blue-600"
                  onClick={() => {navigate("/admin"); setIsDropdownOpen(false)}}
                >
                  Admin Dashboard
                </button>
              )}

              <button
                className="text-left hover:text-red-500"
                onClick={() => console.log("logout")}
              >
                Logout
              </button>
            </div>
          )}
            </div>
          ) : (
            <button
              className="bg-blue-600 text-white px-4 py-1 rounded"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden mt-3 flex flex-col gap-4 px-4">
          <a href="#" className="hover:text-blue-600">
            Home
          </a>
          <a href="#" className="hover:text-blue-600">
            Shop
          </a>

          <div className="flex items-center gap-2">
            <ShoppingCart />
            <span>Cart</span>
          </div>

          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      )}
    </nav>
  );
};
export default NavBar;
