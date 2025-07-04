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
    <div className="flex min-h-screen font-sans bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Sidebar */}
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

      {/* Main Content */}
      <main className="flex-1">
        {/* Header */}
        <header className="bg-white shadow px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Time Pro Logo" className="h-10" />
            <h3 className="text-2xl font-bold text-gray-800">Time Pro Admin</h3>
          </div>
          <Link to="/login" className="bg-cyan-800 text-white px-5 py-2 rounded-full hover:bg-cyan-500 transition">
           Login
          </Link>
        </header>

        {/* Page Title */}
        <section className="px-8 pt-10">
          <h2 className="text-3xl font-bold text-cyan-800 mb-1">Manage Job Postings</h2>
          <p className="text-gray-600 mb-6">Search, view, and manage all job listings on the platform.</p>

          {/* Search */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-1/2 p-3 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-[#094DB1]"
            />
          </div>
        </section>

        {/* Job Cards */}
        <section className="px-8 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.length === 0 ? (
              <p className="col-span-full text-center text-gray-500">No jobs found.</p>
            ) : (
              filteredJobs.map((job) => (
                <div key={job._id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition border-t-4 border-cyan-800">
                  <h4 className="text-xl font-semibold text-gray-800 mb-1">{job.title}</h4>
                  <p className="text-gray-600">{job.company}</p>
                  <p className="text-sm text-gray-500 mb-2">{job.location}</p>
                  <p className="text-gray-700 text-sm mb-1">Salary: ${job.salary}</p>
                  <p className="text-gray-700 text-sm mb-1">Applicants: {job.applicants?.length || 0}</p>
                  <p className="text-gray-500 text-sm mb-4">Posted: {new Date(job.createdAt).toLocaleDateString()}</p>
                  <Link
                    to={`/admin/applications/${job._id}`}
                    className="inline-block text-center bg-cyan-800 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition w-full"
                  >
                    View Applications
                  </Link>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
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
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default ManageJobs;
