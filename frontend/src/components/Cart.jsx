import { useEffect, useState } from "react";
import API from "./api";

export default function Cart() {
  const [cart, setCart] = useState(null);

  const fetchCart = async () => {
    try {
      const res = await API.get("/cart/getCart");
      setCart(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const increaseQty = async (productId) => {
    try {
      await API.post(`/cart/increaseqty/${productId}`);
      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const decreaseQty = async (productId) => {
    try {
      await API.post(`/cart/decreaseqty/${productId}`);
      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };
  const removeItem = async (productId) => {
    try {
      await API.post(`/cart/remove/${productId}`);
      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const total = cart?.items?.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-8">🛒 Shopping Cart</h1>

      {!cart || cart.items.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">Your cart is empty</p>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-5">
            {cart.items.map((item) => (
              <div
  key={item._id}
  className="flex gap-6 border rounded-2xl p-5 shadow-sm hover:shadow-md transition bg-white items-center"
>
  {/* Image */}
  <img
    src={item.product.image || "https://via.placeholder.com/120"}
    alt={item.product.name}
    className="w-28 h-28 object-cover rounded-xl"
  />

  {/* Info */}
  <div className="flex-1 flex flex-col justify-between h-full">

    {/* Top Section */}
    <div>
      <h2 className="text-xl font-semibold">
        {item.product.name}
      </h2>

      <p className="text-gray-600 mt-1">
        ₹{item.product.price}
      </p>

      <p className="text-sm text-gray-400">
        Stock: {item.product.stock}
      </p>
    </div>

    {/* Bottom Section */}
    <div className="flex items-center justify-between mt-4">

      {/* Quantity */}
      <div className="flex items-center border rounded-lg overflow-hidden">
        <button
          onClick={() => decreaseQty(item.product._id)}
          className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
        >
          -
        </button>

        <span className="px-4 font-medium">
          {item.quantity}
        </span>

        <button
          onClick={() => increaseQty(item.product._id)}
          className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
        >
          +
        </button>
      </div>

      {/* Remove */}
      <button
        onClick={() => removeItem(item.product._id)}
        className="text-red-500 hover:text-red-700 text-sm"
      >
        Remove
      </button>

    </div>
  </div>
</div>
             
            ))}
          </div>

          {/* RIGHT SIDE */}
          <div className="border rounded-2xl p-6 shadow-sm h-fit bg-white sticky top-8">
            <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>

            <div className="flex justify-between text-gray-600 mb-3">
              <span>Total Items</span>
              <span>{cart.items.length}</span>
            </div>

            <div className="flex justify-between text-gray-800 text-lg font-semibold mb-6">
              <span>Total Price</span>
              <span>₹{total}</span>
            </div>

            <button className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
