import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/logo.png';
import { FaBriefcase, FaUserGraduate, FaUsers } from 'react-icons/fa';


const ManageJobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [allJobs, setAllJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/jobs?page=${currentPage}&limit=6`);
        setAllJobs(res.data.jobs);
        setFilteredJobs(res.data.jobs);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, [currentPage]);

  useEffect(() => {
    const filtered = allJobs.filter((job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredJobs(filtered);
  }, [searchTerm, allJobs]);

  return (
    <div className="flex min-h-screen font-sans">
      {/* Sidebar */}
     <aside className="w-64 bg-[#094DB1] text-white p-6 sticky top-0 min-h-screen">
  <nav className="flex flex-col mt-10 space-y-5 text-md">
    <Link
      to="/admin"
      className="text-xl font-bold text-white mb-4 border-b border-white pb-2"
    >
      Admin Dashboard
    </Link>

    <Link
      to="/admin/manage-jobs"
      className="flex items-center gap-2 hover:bg-white/10 rounded px-4 py-2 transition"
    >
      <FaBriefcase className="text-lg" />
      <span>Manage Jobs</span>
    </Link>

    <Link
      to="/admin/user"
      className="flex items-center gap-2 hover:bg-white/10 rounded px-4 py-2 transition"
    >
      <FaUserGraduate className="text-lg" />
      <span>Manage Users</span>
    </Link>

    <Link
      to="/admin/payment"
      className="flex items-center gap-2 hover:bg-white/10 rounded px-4 py-2 transition"
    >
      <FaUsers className="text-lg" />
      <span>Payments</span>
    </Link>
  </nav>
</aside>


      {/* Main Content */}
      <main className="flex-1 bg-gray-50">
        {/* Header */}
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

        {/* Content */}
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-2">Manage Job Postings</h2>
          <p className="mb-6 text-gray-700">Oversee all job listings, view applicants, and manage their status.</p>

          {/* Search and Post */}
          <div className="p-4 rounded-xl flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <input
              type="text"
              placeholder="Search jobs"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-3 rounded-lg w-full md:w-1/2 border border-gray-300 focus:outline-blue-500"
            />
            
          </div>

          {/* Job Cards */}
          <h3 className="text-xl font-semibold mb-4">Job Posting(s)</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredJobs.length === 0 ? (
              <p className="col-span-full text-gray-600">No jobs found.</p>
            ) : (
              filteredJobs.map((job) => (
                <div key={job._id} className="bg-gray-200 rounded-xl p-4 space-y-2">
                  <h4 className="font-semibold text-xl">{job.title}</h4>
                  <p className="text-lg text-gray-800">{job.company}</p>
                  <p className="text-lg text-gray-800">{job.location}</p>
                  <p className="text-lg">Description: {job.description}</p>
                  <p className="text-lg">Salary: {job.salary}</p>
                  <p className="text-lg">Posted: {new Date(job.createdAt).toLocaleDateString()}</p>
                  <p className="text-lg">Applicants: {job.applicants?.length || 0}</p>
                  <Link
                    to={`/admin/applications/${job._id}`}
                    className="text-white bg-blue-600 px-4 py-2 rounded-xl hover:bg-blue-700"
                  >
                    View Applications
                  </Link>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6 space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded ${
                  currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ManageJobs;
