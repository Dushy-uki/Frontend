import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import login from '../assets/loginbg.jpg';
import logo from '../assets/logo.png';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { toast } from 'react-toastify';

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
        toast.success('Registration successful! Please login.');
        navigate('/login');
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || 'Registration failed.');
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 overflow-hidden">
      {/* Background Image Fullscreen */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105 brightness-100 z-0"
        style={{ backgroundImage: `url(${login})` }}
      ></div>

      {/* Navbar */}
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

      {/* Registration Form */}
      <div className="w-full max-w-md z-10 bg-white/90 backdrop-blur-md rounded-2xl px-8 py-10 shadow-xl mt-24">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="w-14" />
        </div>
        <h2 className="text-3xl font-bold text-center text-[#3B3B3B] mb-2">Register</h2>
        <p className="text-center text-sm text-gray-600 mb-6">Create your Time Pro account</p>

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
            className="w-full bg-gradient-to-tr from-cyan-800 to-white text-white py-2 rounded-full font-bold hover:opacity-90 transition"
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
  );
};

export default Register;
