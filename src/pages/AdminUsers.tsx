

import { useState, useEffect } from "react";
import { fetchUsersService, toggleBlockService } from "../services/adminService";
import toast from "react-hot-toast";

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

  const toggleBlock = async (userId: string) => {
    try {
      const data = await toggleBlockService(userId);
      toast.success(data.message);
      fetchUsers();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Action failed");
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
              <th className="p-4 text-left">Joined</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t">
                <td className="p-4">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">{new Date(user.createdAt).toLocaleDateString()}</td>
                <td className="p-4 text-center">
                  <span className={`px-3 py-1 rounded-full text-sm ${user.isBlocked ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                    {user.isBlocked ? "Blocked" : "Active"}
                  </span>
                </td>
                <td className="p-4 text-center">
                  <button
                    onClick={() => toggleBlock(user._id)}
                    className={`px-5 py-2 rounded-lg text-sm font-medium ${user.isBlocked ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"} text-white`}
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