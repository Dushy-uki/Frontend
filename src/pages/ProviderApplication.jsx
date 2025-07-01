// src/pages/ApplicationsByJob.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import logo from '../assets/logo.png';
import {
  FaBriefcase,
  FaClipboardList,
  FaPlusCircle,
  FaUserCircle,
} from 'react-icons/fa';

const ApplicationsByJob = () => {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/provider/jobs/${jobId}/applications`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setApplications(res.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast.error('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${import.meta.env.VITE_API_URL}/provider/applications/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Status updated');
      fetchApplications();
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  useEffect(() => {
    if (jobId) fetchApplications();
  }, [jobId]);

  return (
    <div className="flex min-h-screen font-sans bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#094DB1] text-white p-6 sticky top-0 min-h-screen">
        <nav className="flex flex-col mt-10 space-y-5 text-md">
          <Link to="/provider" className="text-xl font-bold border-b border-white pb-2">
            <FaUserCircle className="inline-block mr-2" /> Provider Profile
          </Link>
          <Link to="/post-job" className="flex items-center gap-2 hover:bg-white/10 rounded px-4 py-2">
            <FaPlusCircle /> <span>Post Job</span>
          </Link>
          <Link to="/provider/posted-jobs" className="flex items-center gap-2 hover:bg-white/10 rounded px-4 py-2">
            <FaBriefcase /> <span>Posted Jobs</span>
          </Link>
          <Link to="/provider/applications" className="flex items-center gap-2 hover:bg-white/10 rounded px-4 py-2">
            <FaClipboardList /> <span>Applications</span>
          </Link>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1">
        <header className="bg-white shadow px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Time Pro Logo" className="h-10" />
            <h2 className="text-2xl font-bold text-[#1F1F1F]">Applications</h2>
          </div>
          <Link to="/login" className="bg-[#E4ED73] text-black px-5 py-2 rounded-full hover:bg-blue-700">
            Logout
          </Link>
        </header>

        <section className="p-10">
          {loading ? (
            <p>Loading applications...</p>
          ) : applications.length === 0 ? (
            <p>No applications found for this job.</p>
          ) : (
            <div className="space-y-4">
              {applications.map((app) => (
                <div key={app._id} className="bg-white p-5 rounded-lg shadow">
                  <p><strong>Name:</strong> {app.applicant?.name}</p>
                  <p><strong>Email:</strong> {app.applicant?.email}</p>
                  <p><strong>Status:</strong> {app.status}</p>
                  <div className="mt-3 flex gap-3">
                    <button onClick={() => handleStatusChange(app._id, 'accepted')} className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700">Accept</button>
                    <button onClick={() => handleStatusChange(app._id, 'rejected')} className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700">Reject</button>
                    <button onClick={() => handleStatusChange(app._id, 'pending')} className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600">Pending</button>
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

export default ApplicationsByJob;
