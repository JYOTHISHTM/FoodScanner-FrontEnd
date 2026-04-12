

import { useState, useEffect } from "react";
import { fetchUsersService, toggleBlockService } from "../services/adminService";
import toast from "react-hot-toast";
import Swal from "sweetalert2";


interface User {
  _id: string;
  name: string;
  email: string;
  isBlocked: boolean;
  createdAt: string;
}

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);


  const fetchUsers = async () => {
    try {
      const data = await fetchUsersService();
      setUsers(data);
    } catch (err) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const toggleBlock = async (userId: string, isBlocked: boolean) => {
    const result = await Swal.fire({
      title: isBlocked ? "Unblock User?" : "Block User?",
      text: isBlocked
        ? "User will regain access."
        : "User will not be able to access the app.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: isBlocked ? "#16a34a" : "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: isBlocked ? "Yes, Unblock" : "Yes, Block",
    });

    if (!result.isConfirmed) return;

    try {
      const data = await toggleBlockService(userId);
      await Swal.fire({
        icon: "success",
        title: data.message,
        timer: 1500,
        showConfirmButton: false,
      });
      fetchUsers();
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: err.response?.data?.message || "Action failed",
      });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">User Management</h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t">
                <td className="p-4">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4 text-center">
                  <span className={`px-3 py-1 rounded-full text-sm ${user.isBlocked ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                    {user.isBlocked ? "Blocked" : "Active"}
                  </span>
                </td>
                <td className="p-4 text-center">
                  <button
                    onClick={() => toggleBlock(user._id, user.isBlocked)}
                    className={`px-5 py-2 rounded-lg text-sm font-medium ${user.isBlocked
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-red-600 hover:bg-red-700"
                      } text-white`}
                  >
                    {user.isBlocked ? "Unblock" : "Block"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;  