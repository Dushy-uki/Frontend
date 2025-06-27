// ApplyJob.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { toast } from 'react-toastify';

const ApplyJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState('');
  const [resume, setResume] = useState(null);
  const [user, setUser] = useState({ name: '', email: '' });
  const [jobTitle, setJobTitle] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser({
        name: parsed.name || '',
        email: parsed.email || ''
      });
    }

    if (!jobId) return;

    const fetchJob = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/jobs/${jobId}`);
        const data = await res.json();
        if (res.ok) {
          setJobTitle(data.title);
        }
      } catch (err) {
        console.error('Failed to fetch job', err);
      }
    };

    fetchJob();
  }, [jobId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resume || !message) {
      alert('Resume and message are required!');
      return;
    }

    const formData = new FormData();
    formData.append('resume', resume);
    formData.append('message', message);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/applications/apply/${jobId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        toast.success('Applied successfully!');
        navigate('/applications');
      } else {
        alert(data.error || 'Failed to apply');
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong while applying.');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#094DB1] text-white p-6">
        <nav className="flex flex-col space-y-5 mt-10">
          <Link to="/dashboard" className="border-b pb-1">Dashboard</Link>
          <Link to="/jobs" className="border-b pb-1">Job Listing</Link>
          <Link to="/applications" className="border-b pb-1">My Applications</Link>
          <Link to="/resume" className="border-b pb-1">My Resume</Link>
          <Link to="/edit-profile" className="border-b pb-1">Edit Profile</Link>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1">
        {/* Header */}
        <div className="flex justify-between items-center bg-white shadow px-8 py-4">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Time Pro Logo" className="h-12" />
            <h3 className="text-2xl font-bold text-[#1F1F1F]">Time Pro</h3>
          </div>
          <Link
            to="/login"
            className="bg-[#E4ED73] text-black px-5 py-2 rounded-full hover:bg-blue-700 transition"
          >
            Login
          </Link>
        </div>

        {/* Application Form */}
        <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-2">Application Form</h2>
          <p className="mb-6 text-sm text-gray-600">
            You're applying for: <strong>{jobTitle || '...'}</strong>
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={user.name}
                disabled
                className="block w-full p-3 border rounded-lg bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={user.email}
                disabled
                className="block w-full p-3 border rounded-lg bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Resume (PDF/DOC)</label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setResume(e.target.files[0])}
                className="block w-full p-3 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="block w-full p-3 border rounded-lg"
                placeholder="Why are you a good fit for this job?"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-[#094DB1] text-white px-6 py-2 rounded-full hover:bg-blue-800 transition"
            >
              Submit Application
            </button>
          </form>
        </div>

        {/* Footer */}
        <footer className="bg-white py-2 text-center mt-10 shadow-inner">
          <img src={logo} alt="Time Pro Logo" className="h-5 mx-auto mb-2" />
          <p className="text-sm text-gray-600">© 2025 Time Pro</p>
          <p className="text-sm text-gray-500">Find Time Pro jobs</p>
        </footer>
      </main>
    </div>
  );
};

export default ApplyJob;
