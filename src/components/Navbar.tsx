import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const location = useLocation();

  const linkClass = (path: string) =>
    `px-4 py-2 rounded-lg transition ${
      location.pathname === path
        ? "bg-green-700 text-white"
        : "text-green-900 hover:bg-green-200"
    }`;

  return (
    <nav className="bg-green-100 shadow-md px-6 py-3 flex justify-between items-center">
      
      {/* Logo */}
      <h1 className="text-xl font-bold text-green-800">
        FoodScanner
      </h1>

      {/* Links */}
      {isLoggedIn && (
        <div className="flex gap-3 items-center">
          <Link to="/" className={linkClass("/")}>Home</Link>
          <Link to="/dashboard" className={linkClass("/dashboard")}>Dashboard</Link>
          <Link to="/profile" className={linkClass("/profile")}>Profile</Link>
          <Link to="/history" className={linkClass("/history")}>History</Link>
          <Link to="/favorites" className={linkClass("/favorites")}>Favorites</Link>
        </div>
      )}

      {/* Right Side */}
      <div>
        {isLoggedIn ? (
          <button
            onClick={logout}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
          >
            Login
          </Link>
        )}
      </div>

    </nav>
  );
};

export default Navbar;