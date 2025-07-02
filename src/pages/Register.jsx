import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import login from '../assets/login2.jpeg';
import logo from '../assets/logo.png';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, formData);
      if (res.status === 201 || res.status === 200) {
        alert('Registration successful! Please login.');
        navigate('/login');
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || 'Registration failed.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative">
      {/* Navbar - floats over both panels */}
      <nav className="absolute top-0 left-0 w-full bg-white/90 shadow-md py-3 px-8 flex justify-between items-center z-30">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Time Pro Logo" className="h-10" />
          <h2 className="text-xl font-bold text-[#0A4DA2]">Time Pro</h2>
        </div>
        <div className="space-x-4">
          <Link to="/" className="text-[#0A4DA2] font-medium hover:underline">Home</Link>
          <Link to="/login" className="text-[#0A4DA2] font-medium hover:underline">Login</Link>
          <Link to="/register" className="bg-[#0A4DA2] text-white px-4 py-1 rounded-full hover:bg-[#094db1] transition">Sign Up</Link>
        </div>
      </nav>

      {/* Left Image */}
      <div
        className="hidden md:flex w-full md:w-1/2 h-screen bg-cover bg-center relative"
        style={{ backgroundImage: `url(${login})` }}
      >
        <div className="bg-black/20 w-full h-full rounded-l-2xl"></div>
      </div>

      {/* Right Form */}
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center py-20 px-6 relative z-10">
        <div className="max-w-md w-full">
          <div className="flex justify-center mb-6">
                      <img src={logo} alt="Logo" className="w-14" />
                    </div>
          <h2 className="text-3xl font-bold text-center text-[#3B3B3B] mb-2">Register</h2>
          <p className="text-center text-sm text-gray-500 mb-6">Create your Time Pro account</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-full">
              <FaUser className="text-gray-500" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="bg-transparent w-full focus:outline-none"
                required
              />
            </div>

            {/* Email */}
            <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-full">
              <FaEnvelope className="text-gray-500" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="bg-transparent w-full focus:outline-none"
                required
              />
            </div>

            {/* Password */}
            <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-full">
              <FaLock className="text-gray-500" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="bg-transparent w-full focus:outline-none"
                required
              />
            </div>

            {/* Role */}
            <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-full">
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="bg-transparent w-full focus:outline-none text-gray-700"
              >
                <option value="user">User</option>
                <option value="provider">Provider</option>
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-cyan-400 to-r from-[#8A4DFF] to-[#6A1B9A] text-white py-2 rounded-full font-bold hover:opacity-90"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-[#6A1B9A] font-semibold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
