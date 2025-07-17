import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { toast } from 'react-toastify';
import {
  FaHome,
  FaBriefcase,
  FaClipboardList,
  FaUserEdit,
  FaFileAlt
} from 'react-icons/fa';

const EditProfile = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    skills: '',
    bio: '',
    avatar: null,
  });

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        skills: user.skills || '',
        bio: user.bio || '',
        avatar: user.avatar || null,
      });
      if (user.avatar) setPreview(user.avatar);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, avatar: file });
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const userString = localStorage.getItem('user');
    if (!userString) return alert('No user found in localStorage');

    const user = JSON.parse(userString);
    const userId = user._id || user.id;
    if (!userId) return alert('User ID is missing');

    const profileData = new FormData();
    profileData.append('name', formData.name);
    profileData.append('email', formData.email);
    profileData.append('skills', formData.skills);
    profileData.append('bio', formData.bio);
    if (formData.avatar instanceof File) {
      profileData.append('avatar', formData.avatar);
    }

    try {
      const res = await axios.put(`${import.meta.env.VITE_API_URL}/users/profile/${userId}`, profileData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.setItem('user', JSON.stringify(res.data.user));
      toast.success('Profile updated successfully!');
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      toast.error('Profile update failed');
    }
  };

  return (
    <div className="flex min-h-screen font-sans bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <aside className="w-64 bg-cyan-600 text-white p-6 sticky top-0 min-h-screen shadow-xl">
        <h2 className="text-2xl font-bold mb-6">Time Pro</h2>
        <nav className="flex flex-col space-y-5 text-lg">
          <Link to="/dashboard" className="flex items-center gap-3 hover:bg-cyan-800 px-4 py-2 rounded transition-all"><FaHome /> Dashboard</Link>
          <Link to="/jobs" className="flex items-center gap-3 hover:bg-cyan-800 px-4 py-2 rounded transition-all"><FaBriefcase /> Job Listing</Link>
          <Link to="/applications" className="flex items-center gap-3 hover:bg-cyan-800 px-4 py-2 rounded transition-all"><FaClipboardList /> My Application</Link>
          <Link to="/resume" className="flex items-center gap-3 hover:bg-cyan-800 px-4 py-2 rounded transition-all"><FaFileAlt /> My Resume</Link>
          <Link to="/edit-profile" className="flex items-center gap-3 bg-cyan-800 px-4 py-2 rounded font-semibold"><FaUserEdit /> Edit Profile</Link>
        </nav>
      </aside>

      <div className="flex-1">
        <header className="bg-white shadow px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Time Pro Logo" className="h-12" />
            <h3 className="text-2xl font-bold text-cyan-600">Time Pro</h3>
          </div>
          <Link to="/dashboard" className="bg-cyan-800 text-white px-5 py-2 rounded-full hover:bg-cyan-500 transition">
            Dashboard
          </Link>
        </header>

        <main className="bg-white p-10 rounded-xl shadow-md max-w-3xl mx-auto mt-10">
          <h2 className="text-3xl font-bold text-cyan-800 mb-2">Personal Information</h2>
          <p className="text-gray-600 mb-6">Update your personal details and academic background.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/2">
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="mt-1 w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-600" required />
              </div>
              <div className="w-full md:w-1/2">
                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-600" required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Skills</label>
              <input type="text" name="skills" value={formData.skills} onChange={handleChange} className="mt-1 w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-600" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Short Bio (Optional)</label>
              <textarea name="bio" value={formData.bio} onChange={handleChange} rows={3} className="mt-1 w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-600"></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Profile Photo</label>
              <input type="file" accept="image/*" onChange={handleFileChange} className="mt-1" />
              {preview && <img src={preview} alt="Preview" className="w-24 h-24 mt-2 rounded-full object-cover" />}
            </div>

            <button type="submit" className="bg-cyan-800 text-white py-3 px-6 rounded-lg hover:bg-cyan-600 transition w-full">Save Changes</button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default EditProfile;