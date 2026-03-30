import AdMinDashboard from "./components/AdminDashboard"
import Card from "./components/Card"
import Home from "./components/Home"
import Layout from "./components/Layout"
import Login from "./components/Login"
import NavBar from "./components/Navbar"
import ProductDetails from "./components/ProductDetails"
import Products from "./components/Products"
import { BrowserRouter ,Routes,Route} from "react-router-dom";


function App() {

  return (
   <BrowserRouter>
   <Routes>
    <Route path="/login"  element={<Login/>}/>
    <Route path="/"element={<Layout/>}>
     <Route index element={<Home />} />
      
   <Route path="product/:id" element={<ProductDetails />} />
   <Route path="/admin" element={<AdMinDashboard/>}/>
   </Route>
   </Routes>
   </BrowserRouter>
  
  )
}

export default App
