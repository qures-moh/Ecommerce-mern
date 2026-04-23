import { useEffect, useState } from "react";
import API from "./api";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
const CheckOut = () => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAdrress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [cart, setCart] = useState(null);
  const navigate=useNavigate();
    const user=useSelector((state)=>state.auth.user);
  const fetchCart = async () => {
    const res = await API.get("/cart/getCart");
    setCart(res.data.data);
  };
  const validateForm = () => {
  if (!fullName.trim()) {
    toast.error("Full name is required");
    return false;
  }

  if (!/^[A-Za-z ]{3,}$/.test(fullName)) {
    toast.error("Enter valid name (min 3 letters)");
    return false;
  }

  if (!/^[6-9]\d{9}$/.test(phone)) {
    toast.error("Enter valid 10-digit phone number");
    return false;
  }

  if (!address.trim() || address.length < 5) {
    toast.error("Address must be at least 5 characters");
    return false;
  }

  if (!city.trim()) {
    toast.error("City is required");
    return false;
  }

  if (!/^\d{6}$/.test(postalCode)) {
    toast.error("Enter valid 6-digit postal code");
    return false;
  }

  if (!country.trim()) {
    toast.error("Country is required");
    return false;
  }

  return true;
};
 const handleOnlinePayment = async () => {
    // Define address at the top of the function
    const shippingAddress = {
      fullName,
      phone,
      address,
      city,
      postalCode,
      country,
    };

    try {
      // 1. Create the Razorpay Order on the backend
      const { data } = await API.post("/payment/create-order", {
        amount: total,
      });
      const order = data.order;

      const options = {
        key:  import.meta.env.VITE_RAZORPAY_KEY, 
        amount: order.amount,
        currency: "INR",
        name: "My Store",
        description: "Order Payment",
        order_id: order.id,
         prefill: {
    name: fullName,
    email: user?.email || "test@example.com",
     contact: phone
  },
        handler: async function (response) {
          try {
            // STEP A: Verify the signature
            const verifyRes = await API.post("/payment/verify-payment", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyRes.data.success) {
              // STEP B: Create actual order in DB
              await API.post("/order/createOrder", {
                shippingAddress,
                paymentMethod: "ONLINE",
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
              });

              toast.success("Order placed successfully!");
              navigate("/myOrder");
            } else {
              toast.error("Payment verification failed.");
            }
          } catch (error) {
            console.error("Verification error:", error);
            toast.error("Payment successful, but we couldn't verify it. Please contact support.");
          }
        },
        theme: { color: "#2563EB" }, // Matches your amber button
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.log("Payment initialization error:", err.message);
      toast.error("Could not start payment. Check your internet.");
    }
  };

  useEffect(() => {
      if (user === undefined || user === null) return;
    if(!user){
      navigate("/login")}
      else{
    fetchCart();
}}, []);
  const total = cart?.items?.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderData = {
      shippingAddress: {
        fullName,
        phone,
        address,
        city,
        postalCode,
        country,
      },
      paymentMethod,
    };
    try {
      const res = await API.post("/order/createOrder", orderData);
      console.log(res.data);
      toast.success("Order placed successfully");
     navigate("/myOrder")
    } catch (err) {
      console.error(err);
      toast.error("Error placing order");
    }
  };
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
           onSubmit={(e) => {
            e.preventDefault();
            if (!validateForm()) return;
    if (paymentMethod === "COD") {
      handleSubmit(e);   
    } else {
       // stop normal submit
      handleOnlinePayment();
    }
  }}
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
          <button
            className="bg-amber-500 text-white p-2 rounded-md hover:bg-amber-600 transition"
          type="submit"
            
          >
           Place Order
          </button>
        </form>
      </div>
    </div>
  );
};
export default CheckOut;
