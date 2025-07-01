import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaBriefcase, FaClipboardList, FaPlusCircle, FaUserCircle, FaChartBar } from 'react-icons/fa';
import logo from '../assets/logo.png';
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
          headers: {
            Authorization: `Bearer ${token}`,
          },
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

  const chartData = {
    labels: jobs.map(job => job.title),
    datasets: [
      {
        label: 'Applicants per Job',
        data: jobs.map(job => job.applicants?.length || 0),
        backgroundColor: '#094DB1'
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Job Applications Overview',
      },
    },
  };

  return (
    <div className="flex min-h-screen font-sans bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#094DB1] text-white p-6 sticky top-0 min-h-screen">
        <nav className="flex flex-col mt-10 space-y-5 text-md">
          <Link
            to="/provider/profile"
            className="text-xl font-bold text-white mb-4 border-b border-white pb-2"
          >
            <FaUserCircle className="inline-block mr-2" />
            Provider Profile
          </Link>
          <Link
            to="/post-job"
            className="flex items-center gap-2 hover:bg-white/10 rounded px-4 py-2 transition"
          >
            <FaPlusCircle />
            <span>Post Job</span>
          </Link>
          <Link
            to="/provider/posted-jobs"
            className="flex items-center gap-2 hover:bg-white/10 rounded px-4 py-2 transition"
          >
            <FaBriefcase />
            <span>Posted Jobs</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {/* Header */}
        <header className="bg-white shadow px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Time Pro Logo" className="h-10" />
            <h2 className="text-2xl font-bold text-[#1F1F1F]">Time Pro</h2>
          </div>
          <Link
            to="/login"
            className="bg-[#E4ED73] text-black px-5 py-2 rounded-full hover:bg-blue-700 transition"
          >
            Logout
          </Link>
        </header>

        <section className="p-10">
          <h2 className="text-3xl font-bold mb-4 text-[#094DB1]">Welcome, {user.name}</h2>

          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h3 className="text-xl font-semibold mb-2">Profile Info</h3>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4">Applications Overview</h3>
            {jobs.length > 0 ? (
              <Bar data={chartData} options={chartOptions} />
            ) : (
              <p className="text-gray-500">No jobs to display chart.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProviderProfile;
