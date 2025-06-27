import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import profilePic from '../assets/profile.png';
import { FaBriefcase, FaUserGraduate, FaUsers } from 'react-icons/fa';


// Import recharts components
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
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
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

  // Prepare data for chart
  const data = [
    { name: 'Jobs', value: stats.totalJobs },
    { name: 'Applications', value: stats.totalApplications },
    { name: 'Users', value: stats.totalUsers },
  ];

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-[#094DB1] text-white p-6 space-y-6">
          <div className="text-white text-lg font-semibold">
            <Link to="/admin">Admin Dashboard</Link>
          </div>
          <nav className="space-y-4">
            <Link to="/admin/manage-jobs" className="block border-b pb-1">
              Manage Jobs
            </Link>
            <Link to="/admin/user" className="block border-b pb-1">
              Manage Users
            </Link>
            <Link to="/admin/payment" className="block border-b pb-1">
              Payment
            </Link>
          </nav>
        </aside>

        {/* Main content */}
        <div className="flex-1 bg-gray-50 flex flex-col">
          {/* Top Bar */}
          <div className="flex justify-between items-center bg-white shadow px-8 py-4">
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
          </div>

          {/* Content Body */}
          <div className="flex-1">
            {/* Dashboard Title */}
            <div className="px-8 mt-8">
              <h2 className="text-3xl font-bold text-gray-800">Admin Dashboard</h2>
            </div>

            {/* Welcome Box */}
            <div className="bg-gray-200 mx-8 mt-6 p-7 rounded-xl flex items-center gap-6 shadow">
              <img
                src={profilePic}
                alt="Admin Profile"
                className="w-24 h-24 rounded-full"
              />
              <p className="text-gray-800 text-lg">
                Welcome to the Time Pro admin panel. <br />
                From here, you can efficiently manage all aspects of
                connecting students with valuable part-time job opportunities.
              </p>
            </div>

            {/* Overview Section */}
            <div className="px-6 mt-7">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Overview</h3>

              {loading ? (
                <p className="text-center text-gray-600">Loading stats...</p>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
  <div className="bg-gray-200 p-8 rounded-lg shadow text-center">
    <FaBriefcase className="text-4xl mx-auto mb-2 text-[#094DB1]" />
    <h4 className="text-lg font-semibold text-gray-800">Active Job Postings</h4>
    <p className="text-2xl mt-2 text-black">{stats.totalJobs}</p>
  </div>
  <div className="bg-gray-200 p-8 rounded-lg shadow text-center">
    <FaUserGraduate className="text-4xl mx-auto mb-2 text-[#094DB1]" />
    <h4 className="text-lg font-semibold text-gray-800">Total Applicants</h4>
    <p className="text-2xl mt-2 text-black">{stats.totalApplications}</p>
  </div>
  <div className="bg-gray-200 p-8 rounded-lg shadow text-center">
    <FaUsers className="text-4xl mx-auto mb-2 text-[#094DB1]" />
    <h4 className="text-lg font-semibold text-gray-800">Total Users</h4>
    <p className="text-2xl mt-2 text-black">{stats.totalUsers}</p>
  </div>
</div>


                  {/* Bar Chart */}
                  <div className="mx-auto" style={{ width: '90%', height: 300 }}>
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
                </>
              )}
            </div>
          </div>

          {/* Footer */}
          <footer className="bg-white py-2 text-center mt-5 shadow-inner">
            <img src={logo} alt="Time Pro Logo" className="h-10 mx-auto mb-2" />
            <p className="text-sm text-gray-600">© 2025 Time Pro</p>
            <p className="text-sm text-gray-500">Find Time Pro jobs</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
