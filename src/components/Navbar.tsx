import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ padding: "10px", background: "#222", color: "#fff" }}>
      <Link to="/" style={{ marginRight: "10px" }}>Home</Link>
      <Link to="/dashboard" style={{ marginRight: "10px" }}>Dashboard</Link>
      <Link to="/history" style={{ marginRight: "10px" }}>History</Link>
      <Link to="/profile" style={{ marginRight: "10px" }}>Profile</Link>
      <Link to="/login">Login</Link>
    </nav>
  );
};

export default Navbar;