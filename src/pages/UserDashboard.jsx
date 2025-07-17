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
import { title } from 'framer-motion/client';

const handleLogout = async () => {
  const token = localStorage.getItem('token');

  try {
    await axios.post(
      'http://localhost:5000/api/auth/logout',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    localStorage.removeItem('token');
    window.location.href = '/login'; // Redirect to login after logout
  } catch (err) {
    console.error('Logout failed:', err);
    alert('Logout failed. Try again.');
  }
};

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
    <div className="flex min-h-screen font-sans bg-gradient-to-br from-blue-50 animate-fade-in">
      {/* Sidebar */}
      <aside className="w-64 bg-cyan-600 text-white p-6 sticky top-0 min-h-screen shadow-xl">
        <motion.h2
          className="text-2xl font-bold mb-6 text-white"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          Time Pro
        </motion.h2>
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

      {/* Main Content */}
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
            <h3 className="text-2xl font-bold text-cyan-600">Time Pro</h3>
          </div>
          <button
            onClick={handleLogout}
            className="bg-cyan-800 text-white px-5 py-2 rounded-full hover:bg-red-400 transition"
            >
           Logout
         </button> 

        </motion.header>

        {/* Welcome Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/90 backdrop-blur-sm mx-6 mt-8 p-6 bg-gradient-to-tr from-cyan-800 to-white rounded-xl flex items-center shadow-lg "
        >
          <div className="py-3 px-6">
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              src={getValidAvatarUrl(user.avatar)}
              alt="Avatar"
              className="w-28 h-28 rounded-full object-cover shadow-md ring-2 ring-cyan-600"
            />
          </div>
          <div className="px-8 mt-2">
            <h2 className="text-3xl font-bold text-white">
              Welcome {user.name || 'User'}!
            </h2>
            <p className="text-md text-white mt-1">{user.email}</p>
            <p className="text-md text-white mt-2">
              Here's your job dashboard. Let's find your next opportunity.
            </p>
            {user.skills && (
              <p className="text-sm text-white mt-2">
                <span className="font-semibold text-cyan-500">Skills:</span> {user.skills}
              </p>
            )}
            {user.bio && (
              <p className="text-sm text-white mt-1">
                <span className="font-semibold text-white">Bio:</span> {user.bio}
              </p>
            )}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <section className="mx-8 mt-10">
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold mb-4 py-3 text-[#1F1F1F]"
          >
            Quick Actions
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{
              title: 'Browse Jobs',
              img: searching,
              link: '/jobs'
            }, {
              title: 'My Applications',
              img: resume,
              link: '/applications'
            }, {
              title: 'Update Resume',
              img: cv,
              link: '/resume'
            }
           ].map(({ title, img, link }, index) => (
              <motion.div
                key={title}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white p-7 rounded-xl shadow hover:shadow-xl text-center transition border-t-4 border-[#0e4245]"
              >
                <img src={img} alt={title} className="h-20 mx-auto mb-4" />
                <h4 className="font-semibold text-lg text-gray-800">{title}</h4>
                <Link to={link} className="text-cyan-600 hover:underline text-sm">Go to {title}</Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white py-4 text-center text-sm text-gray-500 border-t mt-50">
          <img src={logo} alt="Time Pro Logo" className="h-6 mx-auto mb-2" />
          <p>© 2025 Time Pro • Find your future job today.</p>
        </footer>
      </main>
    </div>
  );
};

export default UserDashboard;
