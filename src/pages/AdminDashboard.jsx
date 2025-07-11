import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import profilePic from '../assets/profile.png';
import { FaBriefcase, FaUserGraduate, FaUsers } from 'react-icons/fa';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
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
    <div className="flex min-h-screen font-sans bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Sidebar */}
      <aside className="w-64 bg-cyan-600 text-white p-6 sticky top-0 min-h-screen shadow-xl">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col space-y-5 text-lg">
          <Link to="/admin" className="flex items-center gap-3 hover:bg-cyan-800 px-4 py-2 rounded font-semibold">
            Dashboard
          </Link>
          <Link to="/admin/manage-jobs" className="flex items-center gap-3 hover:bg-cyan-800 px-4 py-2 rounded transition-all">
            <FaBriefcase /> Manage Jobs
          </Link>
          <Link to="/admin/user" className="flex items-center gap-3 hover:bg-cyan-800 px-4 py-2 rounded transition-all">
            <FaUserGraduate /> Manage Users
          </Link>
          <Link to="/admin/payment" className="flex items-center gap-3 hover:bg-cyan-800 px-4 py-2 rounded transition-all">
            <FaUsers /> Payments
          </Link>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Time Pro Logo" className="h-12" />
            <h3 className="text-2xl font-bold text-gray-800">Time Pro</h3>
          </div>
          <Link to="/login" className="bg-cyan-800 text-white px-5 py-2 rounded-full hover:bg-cyan-500 transition">
            Login
          </Link>
        </header>

        {/* Welcome */}
        <section className="bg-white/60 backdrop-blur  mx-6 mt-8 p-6 rounded-xl flex items-center shadow-lg">
          <div className="py-3 px-6">
            <img src={profilePic} alt="Admin" className="w-24 h-24 rounded-full object-cover shadow-lg ring-2 ring-white" />
          </div>
          <div className="px-8 mr-9 mt-4">
            <h2 className="text-3xl font-bold text-gray-800">Welcome Admin!</h2>
            <p className="text-sm text-gray-600 mt-1">Monitor jobs, users, payments in one place.</p>
            <p className="text-md text-gray-700 mt-2">You're in control of the Time Pro platform.</p>
          </div>
        </section>

        {/* Stats */}
        <section className="px-8 mt-10">
          <h3 className="text-2xl font-bold mb-6 text-cyan-800">Platform Overview</h3>
          {loading ? (
            <p className="text-center text-gray-600">Loading stats...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white p-6 rounded-xl text-center shadow-md border-t-4 border-cyan-800">
                <FaBriefcase className="text-4xl mx-auto mb-2 text-cyan-700" />
                <h4 className="text-lg font-semibold text-gray-800">Active Jobs</h4>
                <p className="text-3xl mt-2">{stats.totalJobs}</p>
              </div>
              <div className="bg-white p-6 rounded-xl text-center shadow-md border-t-4 border-cyan-800">
                <FaUserGraduate className="text-4xl mx-auto mb-2 text-cyan-700" />
                <h4 className="text-lg font-semibold text-gray-800">Applications</h4>
                <p className="text-3xl mt-2">{stats.totalApplications}</p>
              </div>
              <div className="bg-white p-6 rounded-xl text-center shadow-md border-t-4 border-cyan-800">
                <FaUsers className="text-4xl mx-auto mb-2 text-cyan-700" />
                <h4 className="text-lg font-semibold text-gray-800">Registered Users</h4>
                <p className="text-3xl mt-2">{stats.totalUsers}</p>
              </div>
            </div>
          )}
        </section>
 {/* Chart */}
{!loading && (
  <section className="mx-auto mb-12 w-[90%] max-w-4xl">
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 8 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#155e75"
          strokeWidth={3}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </section>
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
