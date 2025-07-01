import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/logo.png';
import {
  FaHome,
  FaBriefcase,
  FaClipboardList,
  FaUserEdit,
  FaFileAlt,
  FaSuitcase,
  FaGlobe,
  FaBuilding,
  FaClock
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const JobListingPage = () => {
  const [filters, setFilters] = useState({ jobType: '', location: '', keyword: '' });
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const jobsPerPage = 6;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/jobs?page=${currentPage}&limit=${jobsPerPage}`);
        setJobs(res.data.jobs);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      }
    };

    fetchJobs();
  }, [currentPage]);

  const filteredJobs = jobs.filter((job) => {
    const { jobType, location, keyword } = filters;
    return (
      (!jobType || job.type?.toLowerCase().includes(jobType.toLowerCase())) &&
      (!location || job.location?.toLowerCase().includes(location.toLowerCase())) &&
      (!keyword || job.title?.toLowerCase().includes(keyword.toLowerCase()))
    );
  });

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
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
          <Link to="/applications" className="flex items-center gap-2 hover:bg-white/10 rounded px-3 py-2 transition">
            <FaClipboardList /> My Application
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

        <div className="px-8 py-9">
          <motion.div 
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-8 rounded-xl shadow mb-10"
            initial={{ opacity: 0, y: -30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-2">Find Your Dream Job</h2>
            <p className="mb-6">Discover opportunities that match your skills and passion</p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input type="text" placeholder="Job title or keyword" className="p-3 rounded-lg text-black border border-gray-300 outline-blue-500" value={filters.keyword} onChange={(e) => setFilters({ ...filters, keyword: e.target.value })} onKeyDown={handleKeyDown} />
              <input type="text" placeholder="Location" className="p-3 rounded-lg text-black border border-gray-300 outline-blue-500" value={filters.location} onChange={(e) => setFilters({ ...filters, location: e.target.value })} onKeyDown={handleKeyDown} />
              <input type="text" placeholder="Job Type" className="p-3 rounded-lg text-black border border-gray-300 outline-blue-500" value={filters.jobType} onChange={(e) => setFilters({ ...filters, jobType: e.target.value })} onKeyDown={handleKeyDown} />
              <button onClick={handleSearch} className="px-5 py-2 bg-white text-indigo-700 font-semibold rounded-lg hover:bg-indigo-100">Search Jobs</button>
            </div>
          </motion.div>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="bg-white p-4 rounded-xl shadow text-center">
              <FaSuitcase className="text-2xl text-indigo-600 mx-auto mb-2" />
              <h4 className="text-xl font-bold">{jobs.length}</h4>
              <p className="text-gray-600">Total Jobs</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow text-center">
              <FaGlobe className="text-2xl text-green-600 mx-auto mb-2" />
              <h4 className="text-xl font-bold">{jobs.filter(j => j.remote).length}</h4>
              <p className="text-gray-600">Remote Jobs</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow text-center">
              <FaBuilding className="text-2xl text-yellow-600 mx-auto mb-2" />
              <h4 className="text-xl font-bold">{new Set(jobs.map(j => j.company)).size}</h4>
              <p className="text-gray-600">Companies</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow text-center">
              <FaClock className="text-2xl text-pink-500 mx-auto mb-2" />
              <h4 className="text-xl font-bold">{jobs.filter(j => j.newThisWeek).length}</h4>
              <p className="text-gray-600">New This Week</p>
            </div>
          </motion.div>

          <h3 className="text-xl font-semibold mb-4">Showing {filteredJobs.length} Job Postings</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <motion.div 
                key={job._id} 
                className="bg-white rounded-xl p-6 shadow-md space-y-4 hover:shadow-lg hover:bg-blue-50 transition duration-300"
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
              >
                <h4 className="text-lg font-bold">{job.title}</h4>
                <p className="text-sm text-gray-700 font-medium">{job.company || job.postedBy?.name}</p>
                <div className="flex flex-wrap gap-2 text-xs">
                  {job.urgent && <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full">Urgent</span>}
                  <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full">{job.type}</span>
                  {job.tags?.map((tag, idx) => (
                    <span key={idx} className="bg-purple-100 text-purple-600 px-2 py-1 rounded-full">{tag}</span>
                  ))}
                </div>
                <div className="text-lg text-gray-600 space-y-1">
                  <div>📍 {job.location}</div>
                  <div>💰 ₹{job.salary || 'N/A'}</div>
                  <div>🕒 {job.experience}+ years • {job.postedDate || '2 days ago'}</div>
                </div>
                <p className="text-sm text-gray-700">{job.description?.slice(0, 100)}...</p>
                <div className="flex flex-wrap gap-2">
                  {job.skills?.map((skill, idx) => (
                    <span key={idx} className="bg-gray-200 px-2 py-1 rounded-full text-xs">{skill}</span>
                  ))}
                </div>
                <Link to={`/apply/${job._id}`} className="inline-block mt-3 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700">Apply Now</Link>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center items-center space-x-4 mt-10">
            <button onClick={handlePrev} disabled={currentPage === 1} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50">Prev</button>
            <span className="text-lg font-semibold">{currentPage} / {totalPages}</span>
            <button onClick={handleNext} disabled={currentPage === totalPages} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50">Next</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JobListingPage;
