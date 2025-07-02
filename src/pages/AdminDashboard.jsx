import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import profilePic from '../assets/profile.png';
import { FaBriefcase, FaUserGraduate, FaUsers } from 'react-icons/fa';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalApplications: 0,
    totalUsers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(
          'http://localhost:5000/api/admin/dashboard-stats',
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setStats(res.data);
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const data = [
    { name: 'Jobs', value: stats.totalJobs },
    { name: 'Applications', value: stats.totalApplications },
    { name: 'Users', value: stats.totalUsers },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
     <aside className="w-64 bg-[#094DB1] text-white p-6 sticky top-0 min-h-screen">
  <nav className="flex flex-col mt-10 space-y-5 text-md">
    <Link
      to="/admin"
      className="text-xl font-bold text-white mb-4 border-b border-white pb-2"
    >
      Admin Dashboard
    </Link>

    <Link
      to="/admin/manage-jobs"
      className="flex items-center gap-2 hover:bg-white/10 rounded px-4 py-2 transition"
    >
      <FaBriefcase className="text-lg" />
      <span>Manage Jobs</span>
    </Link>

    <Link
      to="/admin/user"
      className="flex items-center gap-2 hover:bg-white/10 rounded px-4 py-2 transition"
    >
      <FaUserGraduate className="text-lg" />
      <span>Manage Users</span>
    </Link>

    <Link
      to="/admin/payment"
      className="flex items-center gap-2 hover:bg-white/10 rounded px-4 py-2 transition"
    >
      <FaUsers className="text-lg" />
      <span>Payments</span>
    </Link>
  </nav>
</aside>


      {/* Main */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center bg-white shadow px-8 py-4">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Time Pro Logo" className="h-10" />
            <h3 className="text-2xl font-bold text-[#1F1F1F]">Time Pro</h3>
          </div>
          <Link to="/login" className="bg-[#E4ED73] text-black px-5 py-2 rounded-full hover:bg-blue-700 hover:text-white transition">
            Login
          </Link>
        </header>

        {/* Welcome Board */}
        <section className="bg-white/40 backdrop-blur-sm border mx-6 mt-8 p-6 rounded-xl flex items-center shadow-lg">
          <div className="py-3 px-6">
            <img src={profilePic} alt="Admin" className="w-28 h-28 rounded-full object-cover shadow-lg ring-2 ring-white" />
          </div>
          <div className="px-8 mr-9 mt-4">
            <h2 className="text-3xl font-bold text-[#1F2937]">Welcome Admin!</h2>
            <p className="text-sm text-gray-600 mt-1">Manage job listings, users, and monitor performance in one place.</p>
            <p className="text-md text-gray-700 mt-2">You're in control of the Time Pro platform. Let’s empower students with the right jobs!</p>
          </div>
        </section>

        {/* Stats */}
        <section className="px-8 mt-10">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Platform Overview</h3>
          {loading ? (
            <p className="text-center text-gray-600">Loading stats...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 border-b pb-8">
              <div className="bg-white p-8 rounded-xl shadow hover:shadow-xl transition hover:-translate-y-1 text-center border-t-2 border-blue-500">
                <FaBriefcase className="text-4xl mx-auto mb-2 text-[#094DB1]" />
                <h4 className="text-lg font-semibold text-gray-800">Active Job Postings</h4>
                <p className="text-3xl mt-2 text-black">{stats.totalJobs}</p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow hover:shadow-xl transition hover:-translate-y-1 text-center border-t-2 border-blue-500">
                <FaUserGraduate className="text-4xl mx-auto mb-2 text-[#094DB1]" />
                <h4 className="text-lg font-semibold text-gray-800">Total Applicants</h4>
                <p className="text-3xl mt-2 text-black">{stats.totalApplications}</p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow hover:shadow-xl transition hover:-translate-y-1 text-center border-t-2 border-blue-500 ">
                <FaUsers className="text-4xl mx-auto mb-2 text-[#094DB1]" />
                <h4 className="text-lg font-semibold text-gray-800">Total Users</h4>
                <p className="text-3xl mt-2 text-black">{stats.totalUsers}</p>
              </div>
            </div>
          )}
        </section>

        {/* Chart */}
        {!loading && (
          <div className="mx-auto mb-12" style={{ width: '80%', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 8 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#094DB1" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Footer */}
        <footer className="bg-white py-4 text-center text-sm text-gray-500 border-t mt-auto">
          <img src={logo} alt="Time Pro Logo" className="h-6 mx-auto mb-2" />
          <p>© 2025 Time Pro • Empowering careers one job at a time.</p>
        </footer>
      </main>
    </div>
  );
};

export default AdminDashboard;
