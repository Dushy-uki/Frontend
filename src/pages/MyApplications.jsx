import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import {
  FaHome,
  FaBriefcase,
  FaClipboardList,
  FaUserEdit,
  FaFileAlt,
  FaEye,
  FaEdit,
  FaTrash
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/applications/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setApplications(data);
    } catch (error) {
      console.error('Failed to fetch applications:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this application?')) return;

    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/applications/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || 'Application deleted successfully');
        setApplications(applications.filter(app => app._id !== id));
      } else {
        toast.error(data.error || 'Failed to delete application');
      }
    } catch (err) {
      console.error('Error deleting application:', err);
      toast.error('An error occurred while deleting');
    }
  };

  const statusStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'interview scheduled': return 'bg-green-100 text-green-700';
      case 'in review': return 'bg-yellow-100 text-yellow-700';
      case 'applied': return 'bg-blue-100 text-blue-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      case 'accepted': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="flex min-h-screen font-sans bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Sidebar */}
      <aside className="w-64 bg-cyan-600 text-white p-6 sticky top-0 min-h-screen shadow-xl">
        <motion.h2
          className="text-2xl font-bold mb-6"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          Time Pro
        </motion.h2>
        <nav className="flex flex-col space-y-5 text-lg">
          <Link to="/dashboard" className="flex items-center gap-3 hover:bg-cyan-800 px-4 py-2 rounded transition-all">
            <FaHome /> Dashboard
          </Link>
          <Link to="/jobs" className="flex items-center gap-3 hover:bg-cyan-800 px-4 py-2 rounded transition-all">
            <FaBriefcase /> Job Listing
          </Link>
          <Link to="/applications" className="flex items-center gap-3 bg-cyan-800 px-4 py-2 rounded font-semibold">
            <FaClipboardList /> My Applications
          </Link>
          <Link to="/resume" className="flex items-center gap-3 hover:bg-cyan-800 px-4 py-2 rounded transition-all">
            <FaFileAlt /> My Resume
          </Link>
          <Link to="/edit-profile" className="flex items-center gap-3 hover:bg-cyan-800 px-4 py-2 rounded transition-all">
            <FaUserEdit /> Edit Profile
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {/* Header */}
        <header className="bg-white shadow px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Time Pro Logo" className="h-12" />
            <h3 className="text-2xl font-bold text-cyan-600">Time Pro</h3>
          </div>
          <Link
            to="/login"
            className="bg-cyan-800 text-white px-5 py-2 rounded-full hover:bg-cyan-500 transition"
          >
            Login
          </Link>
        </header>

        {/* Body */}
        <section className="px-8 py-10">
          <motion.h2
            className="text-3xl font-bold mb-6 text-cyan-800"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            My Job Applications
          </motion.h2>

          {loading ? (
            <p className="text-gray-600">Loading applications...</p>
          ) : applications.length === 0 ? (
            <p className="text-gray-700">You haven’t applied to any jobs yet.</p>
          ) : (
            <motion.div
              className="overflow-auto rounded-lg bg-white shadow-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <table className="min-w-full text-sm text-left">
                <thead className="bg-cyan-800 text-white">
                  <tr>
                    <th className="px-6 py-3">Position</th>
                    <th className="px-6 py-3">Location</th>
                    <th className="px-6 py-3">Applied Date</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Salary</th>
                    <th className="px-6 py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app, idx) => (
                    <tr key={idx} className="border-t hover:bg-cyan-50">
                      <td className="px-6 py-4 font-medium">
                        {app.job?.title}<br />
                        <span className="text-gray-500 text-sm">{app.job?.company}</span>
                      </td>
                      <td className="px-6 py-4">{app.job?.location}</td>
                      <td className="px-6 py-4">{app.createdAt?.slice(0, 10)}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusStyle(app.status)}`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">${app.job?.salary?.toLocaleString() || 'N/A'}</td>
                      <td className="px-6 py-4 text-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-800"><FaEye /></button>
                        <button className="text-green-600 hover:text-green-800"><FaEdit /></button>
                        <button
                          className="text-red-600 hover:text-red-800"
                          onClick={() => handleDelete(app._id)}
                        >
                          <FaTrash />
                        </button>
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
