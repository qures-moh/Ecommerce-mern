import { Link } from "react-router-dom";

export default function Footer() {
  return (
        <footer className="text-gray-700 text-center py-4 border-t border-gray-300 shadow-sm">
      <div className="max-w-5xl mx-auto text-center space-y-2">
        
        <p className="font-semibold">ShopSphere</p>

        <div className="flex justify-center gap-4 text-sm">
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/orders">My Orders</Link>
        </div>

        <p className="text-xs text-gray-500">
          © 2026 ShopSphere All rights reserved.
        </p>
      </div>
    </footer>
  );
}