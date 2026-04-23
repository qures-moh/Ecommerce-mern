import { Package, ShoppingCart, Users } from "lucide-react";
import API from "./api";
import { useEffect } from "react";
import { useState } from "react";

export default function AdMinDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalUsers: 0,
    totalProducts: 0,
    totalRevenue: 0,
    statusStats: [],
  });
  useEffect(() => {
    fetchDetails();
  }, []);
  const fetchDetails = async () => {
    const res = await API.get("/order/admin/dashboard");
    const data = res.data.data;
    setStats(data);
  };
  return (
    <div className=" min-h-screen bg-gray-100 p-6  ">
      <h1 className="text-3xl font-bold  text-gray-800 mb-6">Admin Panel</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition cursor-pointer">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-700">Products</h2>
            <Package className="text-blue-500" size={28} />
          </div>
          <p className="text-3xl font-bold mt-4 text-gray-900">
            {stats.totalProducts}
          </p>
          <p className="text-sm text-gray-500 mt-1">Total Products</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition cursor-pointer">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-700">Orders</h2>
            <ShoppingCart className="text-green-500" size={28} />
          </div>
          <p className="text-3xl font-bold mt-4 text-gray-900">
            {stats.totalOrders}
          </p>
          <p className="text-sm text-gray-500 mt-1">Total Orders</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition cursor-pointer">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-700">Users</h2>
            <Users className="text-purple-500" size={28} />
          </div>
          <p className="text-3xl font-bold mt-4 text-gray-900">
            {stats.totalUsers}
          </p>
          <p className="text-sm text-gray-500 mt-1">Registered Users</p>
        </div>
      </div>
       <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-700">Revenue</h2>
            <span className="text-yellow-500 text-2xl">₹</span>
          </div>
          <p className="text-3xl font-bold mt-4">
            ₹{stats.totalRevenue}
          </p>
          <p className="text-sm text-gray-500 mt-1">Total Revenue</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow mt-8">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Order Status</h2>
        <div>
        {stats.statusStats.map((item, index) => (
          <div key={index} className="flex justify-between items-center mb-2">
            <span className="capitalize ">{item._id}</span>
            <span
              className={
                item._id === "pending"
                  ? "text-yellow-500"
                  : item._id === "delivered"
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {item.count}
            </span>
          </div>
        ))}
        </div>
      </div>
        

      </div>
  
  );
}
