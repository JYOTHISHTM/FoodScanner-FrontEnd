import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <nav style={{ padding: "10px", background: "#e27c7c", color: "#fff" }}>
      <Link to="/" style={{ marginRight: "10px" }}>Home</Link>
      <Link to="/dashboard" style={{ marginRight: "10px" }}>Dashboard</Link>
      <Link to="/history" style={{ marginRight: "10px" }}>History</Link>
      <Link to="/profile" style={{ marginRight: "10px" }}>Profile</Link>

      {isLoggedIn ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <a href="/login">Login</a>
      )}
    </nav>
  );
};

export default Navbar;