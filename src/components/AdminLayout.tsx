

import { Outlet, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";
import { LogOut, Users } from "lucide-react";

const AdminLayout = () => {
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-gray-900 text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="text-2xl font-bold">FoodScanner Admin</div>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-sm">Welcome, <strong>{admin?.name}</strong></span>
            
        
            <button
              onClick={() => navigate("/admin/users")}
              className="flex items-center gap-2 hover:text-green-400"
            >
              <Users size={20} /> Users
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 hover:text-red-400"
            >
              <LogOut size={20} /> Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;