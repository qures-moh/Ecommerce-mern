import { useEffect, useState } from "react";
import API from "./api";
import { useSelector } from "react-redux";
export default function MyOrders() {
  const [orders, setOrders] = useState([]);
   const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    if(user){
    fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/order/getMyOrder");
      setOrders(res.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 p-6">
   
      <h1 className="text-3xl font-bold mb-6 text-center">My Orders</h1>

      { orders &&orders.length === 0 ? (
        <p className="text-center text-gray-600">No orders found</p>
      ) : (
        <div className="max-w-4xl mx-auto">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl p-5 mb-6 shadow-md hover:shadow-lg transition duration-300"
            >
              {/* HEADER */}
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-lg">
                    Order #{order._id.slice(-6)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {/* STATUS BADGE */}
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    order.status === "delivered"
                      ? "bg-green-100 text-green-600"
                      : order.status === "pending"
                      ? "bg-yellow-100 text-yellow-600"
                      : order.status === "confirmed"
                      ? "bg-blue-100 text-blue-600"
                      : order.status === "shipped"
                      ? "bg-purple-100 text-purple-600"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <hr className="my-3" />

              {/* TOTAL + ADDRESS */}
              <div className="flex justify-between flex-wrap gap-2">
                <p className="font-medium">
                  Total: <span className="text-black">₹{order.totalAmount}</span>
                </p>

                <p className="text-sm text-gray-600">
                  {order.shippingAddress.city},{" "}
                  {order.shippingAddress.country}
                </p>
              </div>

              {/* PRODUCTS */}
              <div className="mt-4">
                <p className="font-semibold mb-2">Products</p>

                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div
                      key={item._id}
                      className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
                    >
                      <span className="font-medium">
                        {item.product
                          ? item.product.name
                          : "Product not available"}
                      </span>

                      <span className="text-sm">
                        {item.quantity} × ₹{item.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* PAYMENT */}
              <div className="mt-4 flex justify-between text-sm">
                <p>
                  Payment:{" "}
                  <span className="font-medium">
                    {order.paymentMethod}
                  </span>
                </p>

                <p
                  className={`font-medium ${
                    order.paymentStatus === "paid"
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {order.paymentStatus}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}