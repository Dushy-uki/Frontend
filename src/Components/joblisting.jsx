import React, { useEffect, useState } from 'react';
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

  const handleSearch = () => setCurrentPage(1);
  const handleKeyDown = (e) => e.key === 'Enter' && handleSearch();
  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

  return (
    <div className="flex min-h-screen font-sans bg-gradient-to-br from-blue-50 animate-fade-in">
      {/* Sidebar */}
      <aside className="w-64 bg-cyan-600 text-white p-6 sticky top-0 min-h-screen shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-white">Time Pro</h2>
        <nav className="flex flex-col space-y-5 text-lg">
          <Link to="/dashboard" className="flex items-center gap-3 bg-cyan-800 px-4 py-2 rounded font-semibold hover:bg-cyan-400 transition-all duration-300">
            <FaHome /> Dashboard
          </Link>
          <Link to="/jobs" className="flex items-center gap-3 hover:bg-cyan-800 px-4 py-2 rounded transition-all duration-300">
            <FaBriefcase /> Job Listing
          </Link>
          <Link to="/applications" className="flex items-center gap-3 hover:bg-cyan-800 px-4 py-2 rounded transition-all duration-300">
            <FaClipboardList /> My Applications
          </Link>
          <Link to="/resume" className="flex items-center gap-3 hover:bg-cyan-800 px-4 py-2 rounded transition-all duration-300">
            <FaFileAlt /> My Resume
          </Link>
          <Link to="/edit-profile" className="flex items-center gap-3 hover:bg-cyan-800 px-4 py-2 rounded transition-all duration-300">
            <FaUserEdit /> Edit Profile
          </Link>
        </nav>
      </aside>

      {/* Main Section */}
      <main className="flex-1">
        {/* Header */}
        <motion.header
          className="bg-white shadow px-8 py-4 flex justify-between items-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-4">
            <img src={logo} alt="Time Pro Logo" className="h-10" />
            <h3 className="text-2xl font-bold text-[#1F1F1F]">Time Pro</h3>
          </div>
          <Link
            to="/login"
            className="bg-cyan-800 text-white px-5 py-2 rounded-full hover:bg-[#0e4245] transition"
          >
            Login
          </Link>
        </motion.header>

        {/* Search & Stats */}
        <div className="px-8 py-9">
          <motion.div 
  className="bg-gradient-to-tr from-cyan-800 to-white text-black p-8 rounded-xl shadow mb-10"
  initial={{ opacity: 0, y: -30 }} 
  animate={{ opacity: 1, y: 0 }} 
  transition={{ duration: 0.8 }}
>
  <h2 className="text-3xl font-bold mb-2 text-gray-800">Find Your Dream Job</h2>
  <p className="mb-6 text-gray-700">Discover opportunities that match your skills and passion</p>
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
    <input type="text" placeholder="Job title or keyword" className="p-3 rounded-lg text-black border border-gray-300 outline-[#E4ED73]" value={filters.keyword} onChange={(e) => setFilters({ ...filters, keyword: e.target.value })} onKeyDown={handleKeyDown} />
    <input type="text" placeholder="Location" className="p-3 rounded-lg text-black border border-gray-300 outline-[#E4ED73]" value={filters.location} onChange={(e) => setFilters({ ...filters, location: e.target.value })} onKeyDown={handleKeyDown} />
    <input type="text" placeholder="Job Type" className="p-3 rounded-lg text-black border border-gray-300 outline-[#E4ED73]" value={filters.jobType} onChange={(e) => setFilters({ ...filters, jobType: e.target.value })} onKeyDown={handleKeyDown} />
    <button onClick={handleSearch} className="px-5 py-2 bg-white text-[#1F1F1F] font-semibold rounded-lg hover:bg-yellow-100 border border-gray-300">
      Search Jobs
    </button>
  </div>
</motion.div>


          {/* Stats */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="bg-white p-4 rounded-xl shadow text-center">
              <FaSuitcase className="text-2xl text-cyan-600 mx-auto mb-2" />
              <p className="text-gray-600">Total Jobs</p>
              <h4 className="text-xl font-bold">{jobs.length}</h4>
            </div>
            <div className="bg-white p-4 rounded-xl shadow text-center">
              <FaGlobe className="text-2xl text-green-600 mx-auto mb-2" />
              <p className="text-gray-600">Remote Jobs</p>
              <h4 className="text-xl font-bold">{jobs.filter(j => j.remote).length}</h4>
            </div>
            <div className="bg-white p-4 rounded-xl shadow text-center">
              <FaBuilding className="text-2xl text-yellow-600 mx-auto mb-2" />
              <p className="text-gray-600">Companies</p>
              <h4 className="text-xl font-bold">{new Set(jobs.map(j => j.company)).size}</h4>
            </div>
            <div className="bg-white p-4 rounded-xl shadow text-center">
              <FaClock className="text-2xl text-pink-500 mx-auto mb-2" />
              <p className="text-gray-600">New This Week</p>
              <h4 className="text-xl font-bold">{jobs.filter(j => j.newThisWeek).length}</h4>
            </div>
          </motion.div>

          {/* Job Listings */}
          <h3 className="text-xl font-semibold mb-4">Showing {filteredJobs.length} Job Postings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <motion.div 
                key={job._id} 
                className="bg-white rounded-xl p-6 shadow-md space-y-4 hover:shadow-lg hover:bg-cyan-50 transition duration-300"
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
              >
                <h4 className="text-xl font-bold">{job.title}</h4>
                <p className="text-sm text-gray-700 font-medium">{job.company || job.postedBy?.name}</p>
                <div className="text-md text-gray-600 space-y-1">
                  <div>Location: {job.location}</div>
                  <div>Salary: {job.salary || 'N/A'}</div>
                  <div>{job.experience}+ years • {job.postedDate || '2 days ago'}</div>
                </div>
                <p className="text-sm text-gray-700">{job.description?.slice(0, 100)}...</p>
                <div className="flex flex-wrap gap-2">
                  {job.skills?.map((skill, idx) => (
                    <span key={idx} className="bg-gray-200 px-2 py-1 rounded-full text-xs">{skill}</span>
                  ))}
                </div>
                <Link to={`/apply/${job._id}`} className="inline-block mt-3 bg-cyan-800 text-white px-4 py-2 rounded-full hover:bg-cyan-700">Apply Now</Link>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center space-x-4 mt-10">
            <button onClick={handlePrev} disabled={currentPage === 1} className="px-4 py-2 bg-cyan-800 rounded hover:bg-cyan-400 disabled:opacity-50">Prev</button>
            <span className="text-lg font-semibold">{currentPage} / {totalPages}</span>
            <button onClick={handleNext} disabled={currentPage === totalPages} className="px-4 py-2 bg-cyan-800 rounded hover:bg-cyan-400 disabled:opacity-50">Next</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JobListingPage;
