import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { FaBriefcase, FaUserGraduate, FaUsers } from 'react-icons/fa';

const USERS_PER_PAGE = 12;

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
      await axios.put(`http://localhost:5000/api/admin/${editUserId}`, editFormData, {
        headers: { Authorization: `Bearer ${token}` },
      });
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

  const indexOfLastUser = currentPage * USERS_PER_PAGE;
  const indexOfFirstUser = indexOfLastUser - USERS_PER_PAGE;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / USERS_PER_PAGE);

  return (
    <div className="flex min-h-screen font-sans bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <aside className="w-64 bg-cyan-600 text-white p-6 sticky top-0 min-h-screen shadow-xl">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col space-y-5 text-lg">
          <Link to="/admin" className="flex items-center gap-3 hover:bg-cyan-800 px-4 py-2 rounded font-semibold">Dashboard</Link>
          <Link to="/admin/manage-jobs" className="flex items-center gap-3 hover:bg-cyan-800 px-4 py-2 rounded transition-all"><FaBriefcase /> Manage Jobs</Link>
          <Link to="/admin/user" className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded font-semibold"><FaUserGraduate /> Manage Users</Link>
          <Link to="/admin/payment" className="flex items-center gap-3 hover:bg-cyan-800 px-4 py-2 rounded transition-all"><FaUsers /> Payments</Link>
        </nav>
      </aside>

      <main className="flex-1">
        <header className="bg-white shadow px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Time Pro Logo" className="h-12" />
            <h3 className="text-2xl font-bold text-cyan-600">Time Pro</h3>
          </div>
          <Link to="/login" className="bg-cyan-800 text-white px-5 py-2 rounded-full hover:bg-cyan-500 transition">Login</Link>
        </header>

        <section className="p-8">
          <h2 className="text-3xl font-bold mb-6 text-cyan-800">Manage Users</h2>
          <div className="overflow-x-auto shadow rounded-lg border border-gray-200 bg-white">
            <table className="min-w-full">
              <thead className="bg-cyan-800 text-white">
                <tr>
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-left">Role</th>
                  <th className="py-3 px-6 text-left">Joined</th>
                  <th className="py-3 px-6 text-left">Actions</th>
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
                      <tr key={user._id} className="bg-yellow-50 border-b">
                        <td className="py-3 px-6">
                          <input name="name" value={editFormData.name} onChange={handleEditChange} className="border p-1 rounded w-full" />
                        </td>
                        <td className="py-3 px-6">
                          <input name="email" value={editFormData.email} onChange={handleEditChange} className="border p-1 rounded w-full" />
                        </td>
                        <td className="py-3 px-6">
                          <select name="role" value={editFormData.role} onChange={handleEditChange} className="border p-1 rounded w-full">
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                            <option value="provider">Provider</option>
                          </select>
                        </td>
                        <td className="py-3 px-6">{new Date(user.createdAt).toLocaleDateString()}</td>
                        <td className="py-3 px-6 space-x-2">
                          <button onClick={handleEditSubmit} disabled={loading} className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">Save</button>
                          <button onClick={handleCancel} disabled={loading} className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500">Cancel</button>
                        </td>
                      </tr>
                    ) : (
                      <tr key={user._id} className="hover:bg-gray-100 border-b">
                        <td className="py-3 px-6">{user.name}</td>
                        <td className="py-3 px-6">{user.email}</td>
                        <td className="py-3 px-6">{user.role}</td>
                        <td className="py-3 px-6">{new Date(user.createdAt).toLocaleDateString()}</td>
                        <td className="py-3 px-6 space-x-2">
                          <button onClick={() => handleEditClick(user)} className="bg-[#E4ED73] text-black px-3 py-1 rounded hover:bg-yellow-500">Edit</button>
                          <button onClick={() => handleDelete(user._id)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">Delete</button>
                        </td>
                      </tr>
                    )
                  )
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-6 space-x-2">
              <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50">Prev</button>
              {[...Array(totalPages)].map((_, i) => (
                <button key={i} onClick={() => setCurrentPage(i + 1)} className={`px-4 py-2 rounded ${currentPage === i + 1 ? 'bg-cyan-800 text-white' : 'bg-gray-200'}`}>{i + 1}</button>
              ))}
              <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50">Next</button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default ManageUsers;
