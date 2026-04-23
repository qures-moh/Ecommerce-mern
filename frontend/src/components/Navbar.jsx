import { Menu, ShoppingCart, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import API from "./api";
import { useDispatch } from "react-redux";
import { AddUser } from "../config/authSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();

  const userProfile = async () => {
    try {
      const res = await API.get("/user/profile");
      setUser(res.data.data);
      dispatch(AddUser(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    userProfile();
  }, []);
  const handleLogout = async () => {
    try {
      await API.post("/user/logout"); // call backend logout

      setUser(null);
      dispatch(AddUser(null));
      toast.success("Logout successfully");
      navigate("/");
    } catch (error) {
      toast.error("Logout Failed");
    }
  };

  const navigate = useNavigate();
  return (
    <nav className=" sticky top-0 bg-white shadow-md px-4 py-3 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl front-bold text-blue-600">ShopSphere</h1>
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>
          <Link to="/shop" className="hover:text-blue-600">
            Shop
          </Link>
          <Link to="/cart">
            {" "}
            <ShoppingCart className="cursor-pointer" />
          </Link>
          {user ? (
            <div
              className="cursor-pointer relative"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <User />

              {isDropdownOpen && (
                <div className="absolute right-0 top-8 bg-white shadow-md rounded p-3 flex flex-col gap-2 w-40">
                  <button
                    className="text-left hover:text-blue-600"
                    onClick={() => navigate("myorder")}
                  >
                    My orders
                  </button>

                  {user?.role === "admin" && (
                    <>
                      <button
                        className="text-left hover:text-blue-600"
                        onClick={() => {
                          navigate("/admin");
                          setIsDropdownOpen(false);
                        }}
                      >
                        Admin Dashboard
                      </button>
                      <button
                        className="text-left hover:text-blue-600"
                        onClick={() => navigate("addProduct")}
                      >
                        Add Product
                      </button>
                      <button
                        className="text-left hover:text-blue-600"
                        onClick={() => navigate("update")}
                      >
                       Update Status
                      </button>
                    </>
                  )}

                  <button
                    className="text-left hover:text-red-500"
                    onClick={handleLogout}
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
          <Link to="/"> Home</Link>

          <Link to="/shop">Shop</Link>

          <div className="flex items-center gap-2">
            <ShoppingCart />
            <Link to="/cart">Cart</Link>
          </div>

          {user ? (
            <div className="flex flex-col gap-2">
              <Link
                to="/myorder"
                onClick={() => setIsOpen(false)}
                className="hover:text-blue-600"
              >
                My Orders
              </Link>
              {user.role === "admin" && (
                <>
                  <Link
                    to="/addProduct"
                    onClick={() => setIsOpen(false)}
                    className="hover:text-blue-600"
                  >
                    Add Product
                  </Link>
                  <Link
                    to="/update"
                    onClick={() => setIsOpen(false)}
                    className="hover:text-blue-600"
                  >
                    Update Status
                  </Link>
                  <button
                    className="bg-blue-600 text-white px-4 py-1 rounded transition hover:bg-blue-500 "
                    onCLick={() => navigate("/admin")}
                  >
                    Admin Dashboard
                  </button>
                </>
              )}
              <button
                className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-500"
                onClick={handleLogout}
              >
                Logout
              </button>
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
      )}
    </nav>
  );
};
export default NavBar;
