import { useEffect, useState } from "react";
import API from "./api";
import { toast } from "react-toastify";
export default function RecentOrder() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/order/admin/all");
      setOrders(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      const res = await API.put(
        `/order/updateStatus/${orderId}`,
        { status }
      );
      toast.success(res.data.message);
      fetchOrders(); // refresh
    } catch (error) {
      console.log(error.message)
      toast.error(error.response?.data?.message);
    }
  };

  // 🔥 allowed transitions
  const statusFlow = {
    pending: ["confirmed", "cancelled"],
    confirmed: ["shipped", "cancelled"],
    shipped: ["delivered"],
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow mt-8">
      <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="flex justify-between items-center border-b py-3"
          >
            {/* LEFT SIDE */}
            <div>
              <p className="font-semibold">
                Order #{order._id.slice(-6)}
              </p>
              <p className="text-sm text-gray-500">
                ₹{order.totalAmount}
              </p>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-3">
              {/* STATUS BADGE */}
              <span
                className={`px-2 py-1 rounded text-sm ${
                  order.status === "pending"
                    ? "bg-yellow-200"
                    : order.status === "confirmed"
                    ? "bg-blue-200"
                    : order.status === "shipped"
                    ? "bg-purple-200"
                    : order.status === "delivered"
                    ? "bg-green-200"
                    : "bg-red-200"
                }`}
              >
                {order.status}
              </span>

              {/* DROPDOWN */}
              {statusFlow[order.status] && (
                <select
                value=""

                  onChange={(e) =>
                    updateStatus(order._id, e.target.value)
                  }
                  className="border rounded px-2 py-1 text-sm"
                  
                >
                  <option value="" disabled>
                    Update
                  </option>
                  {statusFlow[order.status].map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}