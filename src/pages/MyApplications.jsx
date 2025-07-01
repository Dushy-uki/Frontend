import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { FaHome, FaBriefcase, FaClipboardList, FaUserEdit, FaFileAlt, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { motion } from 'framer-motion';

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/applications/my`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setApplications(res.data);
      } catch (error) {
        console.error("Failed to fetch applications:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const statusStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'interview scheduled': return 'bg-green-100 text-green-700';
      case 'in review': return 'bg-yellow-100 text-yellow-700';
      case 'applied': return 'bg-blue-100 text-blue-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      case 'accepted': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="flex min-h-screen font-sans bg-gradient-to-br from-gray-100 via-white to-gray-200">
      <aside className="w-64 bg-[#094DB1] text-white p-6 sticky top-0 min-h-screen">
        <nav className="flex flex-col space-y-4 mt-10 text-md">
          <Link to="/dashboard" className="flex items-center gap-2 hover:bg-white/10 rounded px-3 py-2 transition">
            <FaHome /> Dashboard
          </Link>
          <Link to="/jobs" className="flex items-center gap-2 hover:bg-white/10 rounded px-3 py-2 transition">
            <FaBriefcase /> Job Listing
          </Link>
          <Link to="/applications" className="flex items-center gap-2 hover:bg-white/10 rounded px-3 py-2 transition bg-white/20">
            <FaClipboardList /> My Applications
          </Link>
          <Link to="/resume" className="flex items-center gap-2 hover:bg-white/10 rounded px-3 py-2 transition">
            <FaFileAlt /> My Resume
          </Link>
          <Link to="/edit-profile" className="flex items-center gap-2 hover:bg-white/10 rounded px-3 py-2 transition">
            <FaUserEdit /> Edit Profile
          </Link>
        </nav>
      </aside>

      <main className="flex-1">
        <header className="bg-white shadow px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Time Pro Logo" className="h-12" />
            <h3 className="text-2xl font-bold text-[#1F1F1F]">Time Pro</h3>
          </div>
          <Link
            to="/login"
            className="bg-[#E4ED73] text-black px-5 py-2 rounded-full hover:bg-blue-700 transition"
          >
            Login
          </Link>
        </header>

        <section className="p-8">
          <motion.h2
            className="text-4xl font-bold mb-6 text-[#094DB1]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            My Applications
          </motion.h2>

          {loading ? (
            <p className="text-gray-500">Loading applications...</p>
          ) : applications.length === 0 ? (
            <p className="text-gray-600">You haven’t applied for any jobs yet.</p>
          ) : (
            <motion.div
              className="overflow-auto rounded-xl bg-white shadow-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <table className="min-w-full text-left text-sm">
                <thead className="text-gray-700 bg-gray-100">
                  <tr>
                    <th className="px-6 py-3">Company & Position</th>
                    <th className="px-6 py-3">Location</th>
                    <th className="px-6 py-3">Applied Date</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Salary</th>
                    <th className="px-6 py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app, idx) => (
                    <tr key={idx} className="border-t hover:bg-blue-50">
                      <td className="px-6 py-4 font-semibold">
                        {app.job?.title}<br />
                        <span className="text-gray-500 text-sm">{app.job?.company}</span>
                      </td>
                      <td className="px-6 py-4">{app.job?.location}</td>
                      <td className="px-6 py-4">{app.createdAt?.slice(0, 10)}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full font-medium text-xs ${statusStyle(app.status)}`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">${app.job?.salary?.toLocaleString()}</td>
                      <td className="px-6 py-4 text-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-800"><FaEye /></button>
                        <button className="text-green-600 hover:text-green-800"><FaEdit /></button>
                        <button className="text-red-600 hover:text-red-800"><FaTrash /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}
        </section>
      </main>
    </div>
  );
};

export default MyApplications;