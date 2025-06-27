import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // 🖼️ Use your logo path
import { toast } from 'react-toastify';
import { FaBriefcase, FaUserGraduate, FaUsers } from 'react-icons/fa';


const PostJob = () => {
  const navigate = useNavigate();
  const [jobData, setJobData] = useState({
    title: '',
    company: '',
    location: '',
    description: '',
    salary: '',
    skills: '',
  });

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData({ ...jobData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!jobData.title || !jobData.company || !jobData.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    const existingJobs = JSON.parse(localStorage.getItem('jobs')) || [];
    const updatedJobs = [...existingJobs, jobData];
    localStorage.setItem('jobs', JSON.stringify(updatedJobs));

    toast.success('Job posted successfully!');
    navigate('/admin/manage-jobs');
  };

  return (
    <div className="flex min-h-screen font-sans bg-gray-100">
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
      <main className="flex-1">
        {/* Header/Navbar */}
        <header className="bg-white flex items-center justify-between px-8 py-4 shadow">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
            <h1 className="text-xl font-bold text-gray-800">Time Pro</h1>
          </div>
          <Link
            to="/login"
            className="bg-[#E4ED73] text-black px-5 py-2 rounded-full hover:bg-blue-700"
          >
            Login
          </Link>
        </header>

        {/* Form Section */}
        <section className="flex justify-center py-10 px-4">
          <div className="bg-white p-8 rounded-2xl w-full max-w-3xl shadow-lg">
            <h2 className="text-2xl font-bold mb-2">Post a New Job</h2>
            <p className="text-sm mb-6">Fill in the information below to create a new job listing.</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Title & Company */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="title"
                  placeholder="Job Title"
                  value={jobData.title}
                  onChange={handleChange}
                  className="p-3 rounded-md w-full border shadow focus:ring-2 focus:ring-blue-400 outline-none"
                  required
                />
                <input
                  type="text"
                  name="company"
                  placeholder="Company Name"
                  value={jobData.company}
                  onChange={handleChange}
                  className="p-3 rounded-md w-full border shadow focus:ring-2 focus:ring-blue-400 outline-none"
                  required
                />
              </div>

              {/* Location */}
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={jobData.location}
                onChange={handleChange}
                className="p-3 rounded-md w-full border shadow focus:ring-2 focus:ring-blue-400 outline-none"
              />

              {/* Description */}
              <textarea
                name="description"
                placeholder="Job Description"
                value={jobData.description}
                onChange={handleChange}
                rows={4}
                className="p-3 rounded-md w-full border shadow focus:ring-2 focus:ring-blue-400 outline-none"
                required
              ></textarea>

              {/* Salary */}
              <input
                type="text"
                name="salary"
                placeholder="Salary/Stipend (Optional)"
                value={jobData.salary}
                onChange={handleChange}
                className="p-3 rounded-md w-full border shadow focus:ring-2 focus:ring-blue-400 outline-none"
              />

              {/* Skills */}
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
                  className="bg-blue-700 text-white px-6 py-2 rounded-full hover:bg-blue-800"
                >
                  Post job
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
