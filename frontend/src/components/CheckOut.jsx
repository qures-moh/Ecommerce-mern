import { useEffect, useState } from "react";
import API from "./api";
const CheckOut = () => {
  const [fullName, setFullName] = useState("Mohsin");
  const [phone, setPhone] = useState("9179596564");
  const [address, setAdrress] = useState("123 street");
  const [city, setCity] = useState("Mumbai");
  const [postalCode, setPostalCode] = useState("456001");
  const [country, setCountry] = useState("India");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [cart, setCart] = useState(null);
   const fetchCart = async () => {
    const res = await API.get("/cart/getCart"
    );
    setCart(res.data.data);
  };
  useEffect(()=>{
    fetchCart();
  },[]);
  const total = cart?.items?.reduce(
  (acc, item) => acc + item.product.price * item.quantity,
  0
);

  const handleSubmit =async(e)=>{
    e.preventDefault();
const orderData={
  shippingAddress:{
    fullName,
    phone,
    address,
    city,
    postalCode,
    country
  },
  paymentMethod
};
try{
 const res = await API.post("/order/createOrder",orderData);
  console.log(res.data);
   alert("Order placed successfully");
     setFullName("");
      setPhone("");
      setAddress("");
      setCity("");
      setPostalCode("");
      setCountry("");
      setPaymentMethod("");
}catch(err){
  console.error(err);
    alert("Error placing order");
}
  }
  return (
    
    <div className="min-h-screen flex justify-center  bg-gray-100 p-4">
          <div className="w-full max-w-4xl grid md:grid-cols-2 gap-6 items-start">
      <div className="bg-white p-4 rounded-xl shadow ">
        <h3 className="font-semibold mb-3">Order Summary</h3>

        {cart?.items?.map((item) => (
          <div key={item._id} className="flex justify-between text-sm mb-1">
            <span>{item.product.name}</span>
            <span>
              ₹{item.product.price} × {item.quantity}
            </span>
          </div>
        ))}

        <div className="flex justify-between font-bold mt-3">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
      </div>
      <form
      onSubmit={handleSubmit}
     className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg flex flex-col gap-4"
    >
        <h2 className="text-xl font-bold text-center">Checkout</h2>
      <input
        type="text"
        placeholder="Enter your fullname"
        className="border p-2 rounded-md"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Enter Phone number"
        className="border p-2 rounded-md"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Enter Adress"
        className="border p-2 rounded-md"
        value={address}
        onChange={(e) => setAdrress(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Enter Postal code"
        value={postalCode}
        className="border p-2 rounded-md"
        onChange={(e) => setPostalCode(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Enter City"
       className="border p-2 rounded-md"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Enter your country"
        value={country}
        className="border p-2 rounded-md"
        onChange={(e) => setCountry(e.target.value)}
        required
      />
      <select
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
        className="border p-2 rounded-md"
      required
      >
        <option value="COD">Cash on Delivery</option>
        <option value="ONLINE">Online payment</option>
      </select>
      <button  className="bg-amber-500 text-white p-2 rounded-md hover:bg-amber-600 transition">Submit</button>
    </form>
    </div>
    </div>
  );
};
export default CheckOut;
