import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import {
  FaBriefcase,
  FaClipboardList,
  FaPlusCircle,
  FaUserCircle,
  FaChartBar,
  FaListUl,
  FaUsers
} from 'react-icons/fa';
import logo from '../assets/logo.png';
import { motion } from 'framer-motion';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProviderProfile = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser || {});

    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/provider/my-jobs`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJobs(res.data);
      } catch (error) {
        console.error('Error fetching provider jobs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const totalApplications = jobs.reduce((acc, job) => acc + (job.applicants?.length || 0), 0);
  const avgApplications = jobs.length > 0 ? Math.round(totalApplications / jobs.length) : 0;

  const chartData = {
    labels: jobs.map(job => job.title),
    datasets: [
      {
        label: 'Applicants per Job',
        data: jobs.map(job => job.applicants?.length || 0),
        backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#6366F1', '#14B8A6', '#F472B6', '#A855F7', '#FACC15'],
        borderRadius: 5,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Job Applications Overview' },
    },
  };

  return (
    <div className="flex min-h-screen font-sans bg-gradient-to-br from-blue-50 via-white to-purple-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-blue-800 to-blue-600 text-white p-6 sticky top-0 min-h-screen shadow-lg">
        <h2 className="text-2xl font-bold mb-6 animate-pulse">Time Pro</h2>
        <nav className="flex flex-col space-y-5 text-md">
          <Link to="/provider" className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded text-white font-semibold hover:bg-white/20">
            <FaUserCircle /> Profile Overview
          </Link>
          <Link to="/post-job" className="flex items-center gap-3 hover:bg-white/10 px-4 py-2 rounded transition-all">
            <FaPlusCircle /> Post New Job
          </Link>
          <Link to="/provider/posted-jobs" className="flex items-center gap-3 hover:bg-white/10 px-4 py-2 rounded transition-all">
            <FaBriefcase /> Manage Jobs
          </Link>
        </nav>
      </aside>

      {/* Main Section */}
      <main className="flex-1">
        {/* Header */}
        <header className="bg-white shadow px-8 py-4 flex justify-between items-center">
          <div className="text-xl font-bold text-[#1F1F1F]">
            Welcome back, {user.name || 'Provider'}
            <p className="text-sm text-gray-500 font-normal">Manage your jobs and track performance</p>
          </div>
          <Link to="/login" className="bg-[#E4ED73] text-black px-5 py-2 rounded-full hover:bg-blue-700">
            Logout
          </Link>
        </header>

        {/* Dashboard Overview */}
        <section className="p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <motion.div whileHover={{ scale: 1.05 }} className="bg-gradient-to-br from-blue-100 to-blue-300 shadow rounded-lg p-5">
              <div className="flex items-center gap-3">
                <div>
                  <h4 className="text-lg text-gray-700">Total Jobs Posted</h4>
                  <p className="text-3xl font-bold text-blue-800">{jobs.length}</p>
                </div>
                <FaBriefcase className="text-blue-700 text-5xl ml-55" />
              </div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} className="bg-gradient-to-br from-green-100 to-green-300 shadow rounded-lg p-5">
              <div className="flex items-center gap-3">
                <div>
                  <h4 className="text-lg text-gray-700">Total Applications</h4>
                  <p className="text-3xl font-bold text-green-700">{totalApplications}</p>
                   </div>
                <FaUsers className="text-green-700 text-5xl ml-55" />
              </div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} className="bg-gradient-to-br from-purple-100 to-purple-300 shadow rounded-lg p-5">
              <div className="flex items-center gap-3">
                <div>
                  <h4 className="text-lg text-gray-700">Average Applications</h4>
                  <p className="text-3xl font-bold text-purple-700">{avgApplications}</p>
                </div>
                <FaListUl className="text-purple-700 text-4xl ml-55" />
              </div>
            </motion.div>
          </div>

          {/* Profile + Analytics Chart */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 shadow-lg rounded-lg p-6">
            <motion.div whileHover={{ scale: 1.02 }} className="bg-white shadow rounded-lg p-6 border-t-4 border-blue-500">
              <h3 className="text-xl font-bold mb-4 text-[#094DB1] flex items-center gap-2">
                <FaUserCircle className="text-[#094DB1]" /> Profile Information
              </h3>
              <div className="flex items-center gap-3 mb-3">
                <FaUserCircle className="text-black-500 w-6 h-6" />
                <p><strong>Name:</strong> {user.name}</p>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <FaClipboardList className="text-black-500 w-6 h-6" />
                <p><strong>Email:</strong> {user.email}</p>
              </div>
              <div className="flex items-center gap-3">
                <FaBriefcase className="text-black-500 w-6 h-6" />
                <p><strong>Role:</strong> {user.role}</p>
              </div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} className="bg-white shadow rounded-lg p-6 border-t-4 border-blue-500">
              <h3 className="text-xl font-bold mb-4 text-[#094DB1] flex items-center gap-2">
                <FaChartBar className="text-[#094DB1]" /> Applications Analytics
              </h3>
              {jobs.length > 0 ? (
                <div className="w-full h-48">
                  <Bar data={chartData} options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { display: false },
                      title: { display: false }
                    },
                    scales: {
                      x: { ticks: { font: { size: 10 } } },
                      y: { beginAtZero: true, ticks: { stepSize: 1, font: { size: 10 } } }
                    }
                  }} />
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No data available</p>
              )}
            </motion.div>
          </div>

          {/* Recent Job Posts */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 text-[#094DB1]">Recent Job Posts</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {jobs.map(job => (
                <motion.div whileHover={{ scale: 1.02 }} key={job._id} className="bg-gradient-to-tr from-indigo-50 to-white border rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900">{job.title}</h4>
                  <p className="text-sm text-gray-600">Applications: <strong>{job.applicants?.length || 0}</strong></p>
                  <Link
                    to={`/job/${job._id}/applications`}
                    className="text-sm text-blue-600 hover:underline mt-2 inline-block"
                  >
                    View Applications
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white py-4 text-center text-sm text-gray-500 border-t mt-5">
          <img src={logo} alt="Time Pro Logo" className="h-6 mx-auto mb-2" />
          <p>© 2025 Time Pro • Empowering careers one job at a time.</p>
        </footer>
      </main>
    </div>
  );
};

export default ProviderProfile;
