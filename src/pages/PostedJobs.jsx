import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  FaBriefcase,
  FaClipboardList,
  FaPlusCircle,
  FaUserCircle,
  FaTrash,
  FaEdit,
} from 'react-icons/fa';
import logo from '../assets/logo.png';
import { toast } from 'react-toastify';

const PostedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/provider/my-jobs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(res.data);
    } catch (error) {
      console.error('Error fetching posted jobs:', error);
      toast.error('Failed to load jobs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (jobId) => {
    const confirmDelete = confirm('Are you sure you want to delete this job?');
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${import.meta.env.VITE_API_URL}/provider/jobs/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Job deleted successfully!');
      setJobs((prev) => prev.filter((job) => job._id !== jobId));
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete the job.');
    }
  };

  return (
    <div className="flex min-h-screen font-sans bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#094DB1] text-white p-6 sticky top-0 min-h-screen">
        <nav className="flex flex-col mt-10 space-y-5 text-md">
          <Link to="/provider" className="text-xl font-bold text-white mb-4 border-b border-white pb-2">
            <FaUserCircle className="inline-block mr-2" /> Provider Profile
          </Link>
          <Link to="/post-job" className="flex items-center gap-2 hover:bg-white/10 rounded px-4 py-2 transition">
            <FaPlusCircle /> <span>Post Job</span>
          </Link>
          <Link to="/provider/posted-jobs" className="flex items-center gap-2 hover:bg-white/10 rounded px-4 py-2 transition">
            <FaBriefcase /> <span>Posted Jobs</span>
          </Link>
          <Link to="/provider/applications" className="flex items-center gap-2 hover:bg-white/10 rounded px-4 py-2 transition">
            <FaClipboardList /> <span>Applications</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <header className="bg-white shadow px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Time Pro Logo" className="h-10" />
            <h2 className="text-2xl font-bold text-[#1F1F1F]">Posted Jobs</h2>
          </div>
          <Link
            to="/login"
            className="bg-[#E4ED73] text-black px-5 py-2 rounded-full hover:bg-blue-700 transition"
          >
            Logout
          </Link>
        </header>

        <section className="p-10">
          {loading ? (
            <p>Loading posted jobs...</p>
          ) : jobs.length === 0 ? (
            <p className="text-gray-500">You haven't posted any jobs yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition"
                >
                  <h4 className="text-lg font-bold text-[#094DB1]">{job.title}</h4>
                  <p className="text-gray-600">{job.companyName}</p>
                  <p className="text-sm text-gray-500">{job.location}</p>
                  <p className="text-sm font-semibold">Salary: {job.salary}</p>

                  <div className="mt-4 flex justify-between text-sm">
                    <Link to={`/job/${job._id}/applications`} className="text-blue-600 hover:underline">
                       View Applications
                    </Link>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleDelete(job._id)}
                        className="text-red-600 hover:underline flex items-center gap-1"
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default PostedJobs;
