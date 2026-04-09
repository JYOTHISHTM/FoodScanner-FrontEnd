

import { useState } from "react";
import axios from "axios";
import { useAdminAuth } from "../context/AdminAuthContext";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:4000/api/admin/login", {
        email,
        password,
      });

      console.log("ff", res);
      console.log("token", res.data.token);
      console.log("data", res.data);


      login(res.data.token, res.data.admin);
      toast.success("Admin Login Successful!");
      navigate("/admin/users");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Invalid credentials");
      console.log("error in admin login", err);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <Toaster position="top-center" />
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-3xl font-bold text-center mb-8">Admin Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Admin Email"
            className="w-full p-3 border rounded-lg mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg mb-6"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg font-semibold disabled:opacity-70"
          >
            {loading ? "Logging in..." : "Login as Admin"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;