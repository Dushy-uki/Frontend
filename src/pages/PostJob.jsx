import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/logo.png';
import { toast } from 'react-toastify';
import {
  FaBriefcase,
  FaUserCircle,
  FaPlusCircle,
  FaClipboardList,
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

  // Only providers can access
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
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/provider/jobs`, jobData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
    <div className="flex min-h-screen font-sans bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#094DB1] text-white p-6 sticky top-0 min-h-screen">
        <nav className="flex flex-col mt-10 space-y-5 text-md">
          <Link
            to="/provider"
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
        <header className="bg-white flex items-center justify-between px-8 py-4 shadow">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
            <h1 className="text-xl font-bold text-gray-800">Time Pro</h1>
          </div>
          <Link
            to="/login"
            className="bg-[#E4ED73] text-black px-5 py-2 rounded-full hover:bg-blue-700"
          >
            Logout
          </Link>
        </header>

        {/* Form Section */}
        <section className="flex justify-center py-10 px-4">
          <div className="bg-white p-8 rounded-2xl w-full max-w-3xl shadow-lg">
            <h2 className="text-2xl font-bold mb-2">Post a New Job</h2>
            <p className="text-sm mb-6">Fill in the information below to create a new job listing.</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="title"
                  placeholder="Job Title"
                  value={jobData.title}
                  onChange={handleChange}
                  required
                  className="p-3 rounded-md w-full border shadow focus:ring-2 focus:ring-blue-400 outline-none"
                />
                <input
                  type="text"
                  name="companyName"
                  placeholder="Company Name"
                  value={jobData.companyName}
                  onChange={handleChange}
                  required
                  className="p-3 rounded-md w-full border shadow focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>

              <input
                type="text"
                name="location"
                placeholder="Location"
                value={jobData.location}
                onChange={handleChange}
                className="p-3 rounded-md w-full border shadow focus:ring-2 focus:ring-blue-400 outline-none"
              />

              <textarea
                name="description"
                placeholder="Job Description"
                value={jobData.description}
                onChange={handleChange}
                rows={4}
                required
                className="p-3 rounded-md w-full border shadow focus:ring-2 focus:ring-blue-400 outline-none"
              ></textarea>

              <input
                type="text"
                name="salary"
                placeholder="Salary (e.g., ₹15000/month)"
                value={jobData.salary}
                onChange={handleChange}
                className="p-3 rounded-md w-full border shadow focus:ring-2 focus:ring-blue-400 outline-none"
              />

              <input
                type="text"
                name="skills"
                placeholder="Required Skills (Optional)"
                value={jobData.skills}
                onChange={handleChange}
                className="p-3 rounded-md w-full border shadow focus:ring-2 focus:ring-blue-400 outline-none"
              />

              <div className="text-right">
                <button
                  type="submit"
                  className="bg-blue-700 text-white px-6 py-2 rounded-full hover:bg-blue-800 transition"
                >
                  Post Job
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PostJob;
