import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const USERS_PER_PAGE = 15;

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: '', email: '', role: '' });
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/admin', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (error) {
      console.error('Failed to load users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEditClick = (user) => {
    setEditUserId(user._id);
    setEditFormData({
      name: user.name,
      email: user.email,
      role: user.role,
    });
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setEditUserId(null);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:5000/api/admin/${editUserId}`,
        editFormData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditUserId(null);
      fetchUsers();
    } catch (error) {
      alert('Failed to update user');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/admin/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (error) {
      alert('Failed to delete user');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Pagination logic
  const indexOfLastUser = currentPage * USERS_PER_PAGE;
  const indexOfFirstUser = indexOfLastUser - USERS_PER_PAGE;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / USERS_PER_PAGE);

  return (
    <div className="flex min-h-screen font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#094DB1] text-white p-6 space-y-6">
        <div className="text-white text-lg font-semibold">
          <Link to="/admin">Admin Dashboard</Link>
        </div>
        <nav className="space-y-4">
          <Link to="/admin/manage-jobs" className="block border-b pb-1">Manage Jobs</Link>
          <Link to="/admin/user" className="block border-b pb-1">Manage Users</Link>
          <Link to="/admin/payment" className="block border-b pb-1">Payment</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50">
        {/* Header */}
        <header className="flex justify-between items-center bg-white shadow px-8 py-4">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Time Pro Logo" className="h-13" />
            <h3 className="text-2xl font-bold text-[#1F1F1F]">Time Pro</h3>
          </div>
          <Link
            to="/login"
            className="bg-[#E4ED73] text-black px-5 py-2 rounded-full hover:bg-blue-700 transition"
          >
            Login
          </Link>
        </header>

        {/* Content */}
        <section className="p-8">
          <h2 className="text-3xl font-bold mb-6">Manage Users</h2>

          <div className="overflow-x-auto shadow rounded-lg border border-gray-200">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-[#094DB1] text-white text-left">
                  <th className="py-3 px-6">Name</th>
                  <th className="py-3 px-6">Email</th>
                  <th className="py-3 px-6">Role</th>
                  <th className="py-3 px-6">Joined</th>
                  <th className="py-3 px-6">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-6 text-gray-600">No users found.</td>
                  </tr>
                ) : (
                  currentUsers.map((user) =>
                    editUserId === user._id ? (
                      <tr key={user._id} className="border-b bg-yellow-50">
                        <td className="py-3 px-6">
                          <input
                            type="text"
                            name="name"
                            value={editFormData.name}
                            onChange={handleEditChange}
                            className="border p-1 rounded w-full"
                          />
                        </td>
                        <td className="py-3 px-6">
                          <input
                            type="email"
                            name="email"
                            value={editFormData.email}
                            onChange={handleEditChange}
                            className="border p-1 rounded w-full"
                          />
                        </td>
                        <td className="py-3 px-6">
                          <select
                            name="role"
                            value={editFormData.role}
                            onChange={handleEditChange}
                            className="border p-1 rounded w-full"
                          >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                            <option value="partner">Partner</option>
                          </select>
                        </td>
                        <td className="py-3 px-6">{new Date(user.createdAt).toLocaleDateString()}</td>
                        <td className="py-3 px-6 space-x-2">
                          <button
                            onClick={handleEditSubmit}
                            disabled={loading}
                            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancel}
                            disabled={loading}
                            className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                          >
                            Cancel
                          </button>
                        </td>
                      </tr>
                    ) : (
                      <tr key={user._id} className="border-b hover:bg-gray-100">
                        <td className="py-3 px-6">{user.name}</td>
                        <td className="py-3 px-6">{user.email}</td>
                        <td className="py-3 px-6">{user.role}</td>
                        <td className="py-3 px-6">{new Date(user.createdAt).toLocaleDateString()}</td>
                        <td className="py-3 px-6 space-x-2">
                          <button
                            onClick={() => handleEditClick(user)}
                            className="bg-[#E4ED73] text-black px-3 py-1 rounded hover:bg-yellow-500"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(user._id)}
                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    )
                  )
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6 space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
              >
                Prev
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 rounded ${
                    currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default ManageUsers;
