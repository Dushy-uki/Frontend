import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/logo.png';

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
    setCurrentPage(1); // Reset to first page on new search
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
    <div className="flex min-h-screen font-sans">
       <aside className="w-64 bg-[#094DB1] text-white p-6">
             <nav className="flex flex-col space-y-5 mt-10">
               <Link to="/dashboard" className="border-b pb-1">Dashboard</Link>
               <Link to="/jobs" className="border-b pb-1">Job Listing</Link>
               <Link to="/applications" className="border-b pb-1">My Application</Link>
               <Link to="/resume" className="border-b pb-1">My Resume</Link>
               <Link to="/edit-profile" className="border-b pb-1">Edit Profile</Link>
               <Link to="/payment" className="border-b pb-1">Payment</Link>
             </nav>
           </aside>

      <main className="flex-1 bg-gray-50">
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
          <h2 className="text-3xl font-bold mb-6">Find Your Next Opportunity</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <input
              type="text"
              placeholder="Job Type"
              className="p-3 rounded-lg border border-gray-300 outline-blue-500"
              value={filters.jobType}
              onChange={(e) => setFilters({ ...filters, jobType: e.target.value })}
              onKeyDown={handleKeyDown}
            />
            <input
              type="text"
              placeholder="Location"
              className="p-3 rounded-lg border border-gray-300 outline-blue-500"
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              onKeyDown={handleKeyDown}
            />
            <input
              type="text"
              placeholder="Search by keyword"
              className="p-3 rounded-lg border border-gray-300 outline-blue-500"
              value={filters.keyword}
              onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
              onKeyDown={handleKeyDown}
            />
          </div>

          <button
            onClick={handleSearch}
            className="mb-8 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Search
          </button>

          <h3 className="text-xl font-semibold mb-4">
            Showing {filteredJobs.length} Job Postings
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <div key={job._id} className="bg-white rounded-xl p-6 shadow-md space-y-2">
                <h4 className="text-lg font-bold">{job.title}</h4>
                <p className="text-sm text-gray-600">
                  {job.company || job.postedBy?.name}<br />
                  {job.type}<br />
                  {job.location}<br />
                  ₹{job.salary || 'N/A'}<br />
                </p>
                <p className="text-sm">{job.description?.slice(0, 100)}...</p>
                <p className="text-sm">
                  <strong>Skills:</strong> {job.skills?.join(', ') || 'Not specified'}
                </p>
                <Link
                  to={`/apply/${job._id}`}
                  className="inline-block mt-3 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700"
                >
                  Apply
                </Link>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center space-x-4 mt-10">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
            >
              Prev
            </button>
            <span className="text-lg font-semibold">{currentPage} / {totalPages}</span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JobListingPage;
