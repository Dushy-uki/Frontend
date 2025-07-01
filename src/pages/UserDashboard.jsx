import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import searching from '../assets/searching.png';
import resume from '../assets/resume.png';
import cv from '../assets/cv.png';
import {
  FaHome,
  FaBriefcase,
  FaClipboardList,
  FaUserEdit,
  FaFileAlt
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const UserDashboard = () => {
  const [user, setUser] = useState({});
  const location = useLocation();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) setUser(storedUser);
  }, [location]);

  const getValidAvatarUrl = (avatar) => {
    if (typeof avatar !== 'string') return '/default-profile.png';
    const cloudinaryIndex = avatar.indexOf('https://res.cloudinary.com');
    if (cloudinaryIndex !== -1) {
      return avatar.slice(cloudinaryIndex);
    }
    if (avatar.startsWith('http')) {
      return avatar;
    }
    return '/default-profile.png';
  };

  return (
    <div className="flex min-h-screen font-sans bg-gradient-to-br from-blue-50 via-white to-purple-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-blue-800 to-blue-600 text-white p-6 sticky top-0 min-h-screen shadow-lg">
        <h2 className="text-2xl font-bold mb-6 animate-pulse">Time Pro</h2>
        <nav className="flex flex-col space-y-5 text-md">
          <Link to="/dashboard" className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded text-white font-semibold hover:bg-white/20">
            <FaHome /> Dashboard
          </Link>
          <Link to="/jobs" className="flex items-center gap-3 hover:bg-white/10 px-4 py-2 rounded transition-all">
            <FaBriefcase /> Job Listing
          </Link>
          <Link to="/applications" className="flex items-center gap-3 hover:bg-white/10 px-4 py-2 rounded transition-all">
            <FaClipboardList /> My Applications
          </Link>
          <Link to="/resume" className="flex items-center gap-3 hover:bg-white/10 px-4 py-2 rounded transition-all">
            <FaFileAlt /> My Resume
          </Link>
          <Link to="/edit-profile" className="flex items-center gap-3 hover:bg-white/10 px-4 py-2 rounded transition-all">
            <FaUserEdit /> Edit Profile
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {/* Header */}
        <header className="bg-white shadow px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Time Pro Logo" className="h-10" />
            <h3 className="text-2xl font-bold text-[#1F1F1F]">Time Pro</h3>
          </div>
          <Link to="/login" className="bg-[#E4ED73] text-black px-5 py-2 rounded-full hover:bg-blue-700 hover:text-white transition">
            Login
          </Link>
        </header>

        {/* Welcome Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/70 backdrop-blur-sm mx-6 mt-8 p-6 rounded-xl flex items-center shadow-lg border-2 border-blue-500"
        >
          <div className="py-3 px-6">
            <img
              src={getValidAvatarUrl(user.avatar)}
              alt="Avatar"
              className="w-28 h-28 rounded-full object-cover shadow-md ring-2 ring-white"
            />
          </div>
          <div className="px-8 mt-2">
            <h2 className="text-3xl font-bold text-[#094DB1]">Welcome {user.name || 'User'}!</h2>
            <p className="text-sm text-gray-600 mt-1">{user.email}</p>
            <p className="text-md text-gray-700 mt-2">
              Here's your job dashboard. Let's find your next opportunity.
            </p>
            {user.skills && <p className="text-sm text-gray-600 mt-1">Skills: {user.skills}</p>}
            {user.bio && <p className="text-sm text-gray-600">Bio: {user.bio}</p>}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <section className="mx-8 mt-10">
          <h3 className="text-2xl font-bold mb-4 py-3 text-[#1F1F1F]">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-white p-7 rounded-xl shadow hover:shadow-xl text-center transition border-2 border-blue-500"
            >
              <img src={searching} alt="Browse Jobs" className="h-20 mx-auto mb-4" />
              <h4 className="font-semibold text-lg text-gray-800">Browse Jobs</h4>
              <Link to="/jobs" className="text-blue-600 hover:underline text-sm">Go to Browse Jobs</Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-white p-7 rounded-xl shadow hover:shadow-xl text-center transition border-2 border-blue-500"
            >
              <img src={resume} alt="Applications" className="h-16 mx-auto mb-4" />
              <h4 className="font-semibold text-lg text-gray-800">My Applications</h4>
              <Link to="/applications" className="text-blue-600 hover:underline text-sm">Go to Applications</Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-white p-7 rounded-xl shadow hover:shadow-xl text-center transition border-2 border-blue-500"
            >
              <img src={cv} alt="Resume" className="h-16 mx-auto mb-4" />
              <h4 className="font-semibold text-lg text-gray-800">Update Resume</h4>
              <Link to="/resume" className="text-blue-600 hover:underline text-sm">Go to Resume</Link>
            </motion.div>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="mx-8 mt-10 mb-10 py-8">
          <h3 className="text-2xl font-bold mb-4 text-[#1F1F1F]">Recent Activity</h3>
          <div className="bg-gray-200 p-8 rounded-xl text-center text-gray-700 shadow">
            No recent activity to display. Apply for jobs or update your resume to see activity here.
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white py-4 text-center text-sm text-gray-500 border-t">
          <img src={logo} alt="Time Pro Logo" className="h-6 mx-auto mb-2" />
          <p>© 2025 Time Pro • Find your future job today.</p>
        </footer>
      </main>
    </div>
  );
};

export default UserDashboard;
