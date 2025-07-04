import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/logo.png';
import { toast } from 'react-toastify';
import {
  FaBriefcase,
  FaUserCircle,
  FaPlusCircle,
} from 'react-icons/fa';

const PostJob = () => {
  const navigate = useNavigate();
  const [jobData, setJobData] = useState({
    title: '',
    companyName: '',
    location: '',
    description: '',
    salary: '',
    skills: '',
  });

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'provider') {
      toast.error('Access denied: Only providers can post jobs');
      navigate('/');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData({ ...jobData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, companyName, description } = jobData;
    if (!title || !companyName || !description) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post(`${import.meta.env.VITE_API_URL}/provider/jobs`, jobData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Job posted successfully!');
      setJobData({
        title: '',
        companyName: '',
        location: '',
        description: '',
        salary: '',
        skills: '',
      });
      navigate('/provider/posted-jobs');
    } catch (err) {
      console.error('Job post failed:', err);
      toast.error(err.response?.data?.error || 'Server error while posting job');
    }
  };

  return (
    <div className="flex min-h-screen font-sans bg-gradient-to-br from-blue-50 via-white to-purple-100">
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
     


      {/* Main Content */}
      <main className="flex-1">
        {/* Header */}
        <header className="bg-white flex items-center justify-between px-8 py-4 shadow">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
            <h1 className="text-xl font-bold text-gray-800">Time Pro</h1>
          </div>
          <Link
            to="/login"
            className="bg-cyan-800 text-white px-5 py-2 rounded-full hover:bg-cyan-600 transition"
          >
            Logout
          </Link>
        </header>

        {/* Form Section */}
        <section className="flex justify-center py-10 px-4 bg-gradient-to-br from-blue-50 via-white to-purple-100">
          <div className="bg-white p-8 rounded-2xl w-full max-w-3xl shadow-xl border-t-4 border-cyan-800">
            <h2 className="text-3xl font-bold text-cyan-800 mb-2">Post a New Job</h2>
            <p className="text-sm text-gray-500 mb-6">Fill in the information below to create a new job listing.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="title"
                  placeholder="Job Title *"
                  value={jobData.title}
                  onChange={handleChange}
                  required
                  className="p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-cyan-500 outline-none"
                />
                <input
                  type="text"
                  name="companyName"
                  placeholder="Company Name *"
                  value={jobData.companyName}
                  onChange={handleChange}
                  required
                  className="p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-cyan-500 outline-none"
                />
              </div>

              <input
                type="text"
                name="location"
                placeholder="Location"
                value={jobData.location}
                onChange={handleChange}
                className="p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-cyan-500 outline-none w-full"
              />

              <textarea
                name="description"
                placeholder="Job Description *"
                value={jobData.description}
                onChange={handleChange}
                rows={4}
                required
                className="p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-cyan-500 outline-none w-full"
              ></textarea>

              <input
                type="text"
                name="salary"
                placeholder="Salary (e.g., ₹15000/month)"
                value={jobData.salary}
                onChange={handleChange}
                className="p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-cyan-500 outline-none w-full"
              />

              <input
                type="text"
                name="skills"
                placeholder="Required Skills (comma-separated)"
                value={jobData.skills}
                onChange={handleChange}
                className="p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-cyan-500 outline-none w-full"
              />

              <div className="text-right">
                <button
                  type="submit"
                  className="bg-cyan-800 text-white px-6 py-2 rounded-full hover:bg-cyan-600 transition-all shadow-md"
                >
                  Post Job
                </button>
              </div>
            </form>
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

export default PostJob;
