import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaUserPlus, FaTrash, FaSearch, FaUserShield, FaUser } from "react-icons/fa";
import { LoadingSpinner, LoadingState } from "../Common/LoadingSpinner";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  const token = localStorage.getItem("userToken") || localStorage.getItem("token");
  const currentUser = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/admin/getAlluser`,
        config
      );
      setUsers(res.data?.data || []);
    } catch (err) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = async (e) => {
    e.preventDefault();

    if (!newUser.name || !newUser.email || !newUser.password) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setSubmitting(true);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/admin/AddnewUser`,
        newUser,
        config
      );

      toast.success(res.data?.message || "User created successfully!");
      setNewUser({
        name: "",
        email: "",
        password: "",
        role: "customer",
      });
      fetchUsers();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create user");
    } finally {
      setSubmitting(false);
    }
  };

  const handleChangeRole = async (userId, newRole) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/admin/updateUserData/${userId}`,
        { role: newRole },
        config
      );

      toast.success(`Role updated to ${newRole}`);
      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
      );
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update role");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (currentUser && currentUser._id === userId) {
      toast.error("You cannot delete your own logged-in admin account!");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/admin/deleteUserDate/${userId}`,
        config
      );

      toast.success("User deleted successfully");
      setUsers((prev) => prev.filter((u) => u._id !== userId));
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete user");
    }
  };

  const filteredUsers = users.filter((u) => {
    const term = searchTerm.toLowerCase();
    return (
      u.name?.toLowerCase().includes(term) ||
      u.email?.toLowerCase().includes(term) ||
      u.role?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">User Management</h1>
        <p className="text-gray-500 text-sm mt-1">Manage user accounts, assign admin privileges, and register new staff</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add User Card */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FaUserPlus className="text-orange-600" /> Add New User
          </h2>

          <form onSubmit={handleCreateUser} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. John Doe"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                Password *
              </label>
              <input
                type="password"
                required
                minLength={6}
                placeholder="Minimum 6 characters"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                Account Role
              </label>
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none cursor-pointer"
              >
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2.5 rounded-lg text-sm shadow-md transition disabled:opacity-50 mt-2 flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <LoadingSpinner size="sm" color="white" /> Creating...
                </>
              ) : (
                "Create User"
              )}
            </button>
          </form>
        </div>

        {/* User Table Card */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-72">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={13} />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 border border-gray-200 rounded-lg text-xs focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>
            <div className="text-xs text-gray-500 font-medium">
              Total Users: {users.length}
            </div>
          </div>

          {loading ? (
            <div className="py-8">
              <LoadingState text="Loading user accounts..." subtext="Retrieving registered members and permissions" />
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="py-16 text-center text-gray-400">No users found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/70 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500">
                    <th className="p-4">User</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Joined</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {filteredUsers.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ${item.role === 'admin' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-700'}`}>
                            {item.role === 'admin' ? <FaUserShield size={14} /> : <FaUser size={12} />}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{item.name}</div>
                            <div className="text-xs text-gray-400">{item.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <select
                          value={item.role || "customer"}
                          onChange={(e) => handleChangeRole(item._id, e.target.value)}
                          className={`text-xs font-semibold px-2.5 py-1 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer ${
                            item.role === "admin"
                              ? "bg-purple-50 text-purple-700 border-purple-200"
                              : "bg-gray-100 text-gray-700 border-gray-200"
                          }`}
                        >
                          <option value="customer">Customer</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td className="p-4 text-xs text-gray-500">
                        {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "Active"}
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleDeleteUser(item._id)}
                          className="bg-red-50 text-red-600 hover:bg-red-600 hover:text-white p-2 rounded-lg transition"
                          title="Delete User"
                        >
                          <FaTrash size={12} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;