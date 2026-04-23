import AdminDashboard from "./components/AdminDashboard"
import Card from "./components/Card"
import Cart from "./components/Cart"
import CheckOut from "./components/CheckOut"
import Home from "./components/Home"
import Layout from "./components/Layout"
import Login from "./components/Login"
import MyOrders from "./components/MyOrder"
import NavBar from "./components/Navbar"
import ProductDetails from "./components/ProductDetails"
import Products from "./components/Products"
import { BrowserRouter ,Routes,Route} from "react-router-dom";
import RecentOrder from "./components/RecentOrder"
import AddProduct from "./components/AddProduct"
import EditProduct from "./components/EditProduct"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import {AddUser}  from "./config/authSlice"
import API from "./components/api"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
const dispatch = useDispatch();
 const loadRedux=async()=>{
  try {
      const res = await API.get("/user/profile"); // cookie auto sent
      dispatch(AddUser(res.data.data));
    } catch (err) {
      console.log("Not logged in");
    }
  }
   useEffect(() => {
    loadRedux(); 
  }, [])
 
  return (
    <>
   <BrowserRouter>
   <Routes>
    <Route path="/login"  element={<Login/>}/>
    <Route path="/"element={<Layout/>}>
     <Route index element={<Home />} />
      
   <Route path="product/:id" element={<ProductDetails />} />
   <Route path="admin" element={<AdminDashboard/>}/>
   <Route path="cart" element={<Cart/>}/>
   <Route path="checkout" element={<CheckOut/>}/>
   <Route path="myOrder" element={<MyOrders/>}/>
   <Route path="update" element={<RecentOrder/>}/>
   <Route path="shop" element={<Products/>}/>
   <Route path="addProduct" element={<AddProduct/>}/>
   <Route path="editProduct/:id" element={<EditProduct/>}/>

   </Route>
   </Routes>
   </BrowserRouter>
   
       <ToastContainer position="top-right" autoClose={2000} />

  </>
  )
}

export default App
