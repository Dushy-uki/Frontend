import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2'; // Make sure this import is present

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
        backgroundColor: '#155e75',
        borderRadius: 4
      }
    ]
  };

  return (
    <div className="flex min-h-screen font-sans bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Sidebar */}
      <aside className="w-64 bg-cyan-600 text-white p-6 sticky top-0 min-h-screen shadow-xl">
        <h2 className="text-2xl font-bold mb-6">Time Pro</h2>
        <nav className="flex flex-col space-y-5 text-md">
          <Link to="/provider" className="flex items-center gap-3 hover:bg-cyan-800 px-4 py-2 rounded font-semibold">
            <FaUserCircle /> Profile Overview
          </Link>
          <Link to="/post-job" className="flex items-center gap-3 hover:bg-cyan-800 px-4 py-2 rounded transition">
            <FaPlusCircle /> Post New Job
          </Link>
          <Link to="/provider/posted-jobs" className="flex items-center gap-3 hover:bg-cyan-800 px-4 py-2 rounded transition">
            <FaBriefcase /> Manage Jobs
          </Link>
        </nav>
      </aside>

      {/* Main Section */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Time Pro Logo" className="h-12" />
            <h3 className="text-2xl font-bold text-cyan-600">Time Pro</h3>
          </div>
          <Link to="/login" className="bg-cyan-800 text-white px-5 py-2 rounded-full hover:bg-cyan-500 transition">
            Login
          </Link>
        </header>

        {/* Overview Cards */}
        <section className="px-8 mt-10">
          <h3 className="text-2xl font-bold mb-6 text-cyan-800">Job Stats Overview</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white p-6 rounded-xl text-center shadow-md border-t-4 border-cyan-800">
              <FaBriefcase className="text-4xl mx-auto mb-2 text-cyan-700" />
              <h4 className="text-lg font-semibold text-gray-800">Jobs Posted</h4>
              <p className="text-3xl mt-2">{jobs.length}</p>
            </div>
            <div className="bg-white p-6 rounded-xl text-center shadow-md border-t-4 border-cyan-800">
              <FaUsers className="text-4xl mx-auto mb-2 text-cyan-700" />
              <h4 className="text-lg font-semibold text-gray-800">Total Applications</h4>
              <p className="text-3xl mt-2">{totalApplications}</p>
            </div>
            <div className="bg-white p-6 rounded-xl text-center shadow-md border-t-4 border-cyan-800">
              <FaListUl className="text-4xl mx-auto mb-2 text-cyan-700" />
              <h4 className="text-lg font-semibold text-gray-800">Average per Job</h4>
              <p className="text-3xl mt-2">{avgApplications}</p>
            </div>
          </div>
        </section>

        {/* Analytics Chart + Profile */}
        <section className="px-8 mb-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white shadow rounded-lg p-6 border-t-4 border-cyan-800">
            <h3 className="text-xl font-bold mb-4 text-cyan-800 flex items-center gap-2">
              <FaUserCircle /> Profile Information
            </h3>
            <p className="mb-2"><strong>Name:</strong> {user.name}</p>
            <p className="mb-2"><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </div>

          <div className="bg-white shadow rounded-lg p-6 border-t-4 border-cyan-800">
  <h3 className="text-xl font-bold mb-4 text-cyan-800 flex items-center gap-2">
    <FaChartBar /> Applications Analytics
  </h3>
  {jobs.length > 0 ? (
    <div className="w-full h-64">
      <Bar
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            title: { display: false }
          },
          scales: {
            x: {
              ticks: { font: { size: 10 } },
              grid: { display: false }
            },
            y: {
              beginAtZero: true,
              ticks: { stepSize: 1, font: { size: 10 } },
              grid: { color: '#E5E7EB' }
            }
          },
          elements: {
            bar: {
              borderRadius: 4,
              barThickness: 15  // reduced bar width
            }
          }
        }}
      />
    </div>
  ) : (
    <p className="text-gray-500 text-sm">No data available</p>
  )}
</div>

        </section>

        {/* Recent Job Posts */}
        <section className="px-8 pb-10">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 text-cyan-800">Recent Job Posts</h3>
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
        <footer className="bg-white py-4 text-center text-sm text-gray-500 border-t mt-auto">
          <img src={logo} alt="Time Pro Logo" className="h-6 mx-auto mb-2" />
          <p>© 2025 Time Pro • Empowering careers one job at a time.</p>
        </footer>
      </main>
    </div>
  );
};

export default ProviderProfile;
