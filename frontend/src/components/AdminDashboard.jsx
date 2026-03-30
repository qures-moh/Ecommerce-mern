import { Package, ShoppingCart, Users } from "lucide-react";
export default function AdMinDashboard() {
  return (
    <div className=" min-h-screen bg-gray-100 p-6  ">
        
      <h1 className="text-3xl font-bold  text-gray-800 mb-6">Admin Panel</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition cursor-pointer">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-700">Products</h2>
            <Package className="text-blue-500" size={28} />
          </div>
          <p className="text-3xl font-bold mt-4 text-gray-900">120</p>
          <p className="text-sm text-gray-500 mt-1">Total Products</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition cursor-pointer">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-700">Orders</h2>
            <ShoppingCart className="text-green-500" size={28} />
          </div>
          <p className="text-3xl font-bold mt-4 text-gray-900">45</p>
          <p className="text-sm text-gray-500 mt-1">Total Orders</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition cursor-pointer">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-700">Users</h2>
            <Users className="text-purple-500" size={28} />
          </div>
          <p className="text-3xl font-bold mt-4 text-gray-900">300</p>
          <p className="text-sm text-gray-500 mt-1">Registered Users</p>
        </div>
      </div>
      
    </div>
  );
}
