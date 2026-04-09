
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const location = useLocation();

  const linkClass = (path: string) =>
    `px-4 py-2 rounded-xl text-sm font-medium transition ${location.pathname === path
      ? "bg-black text-white"
      : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center shadow-sm">

      {/* Logo */}
      <h1 className="text-xl font-semibold">
        <span className="text-black">FOOD</span>
        <span className="text-gray-400">SCANNER</span>
      </h1>
      {/* Links */}
      {isLoggedIn && (
        <div className="flex gap-2 items-center">
          <Link to="/" className={linkClass("/")}>Home</Link>
          {/* <Link to="/dashboard" className={linkClass("/dashboard")}>Dashboard</Link> */}
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
            className="bg-black hover:bg-gray-900 text-white px-4 py-2 rounded-xl text-sm transition"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-black hover:bg-gray-900 text-white px-4 py-2 rounded-xl text-sm transition"
          >
            Login
          </Link>
        )}
      </div>

    </nav>
  );
};

export default Navbar;