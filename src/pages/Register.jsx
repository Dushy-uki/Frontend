import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import smallclock from '../assets/clock1.png';
import bigclock from '../assets/clock2.png';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
    <div className="min-h-screen bg-[#1952CC] flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-0 left-0">
        <img src={smallclock} alt="Small Clock" className="w-30" />
      </div>

      <div className="absolute bottom-0 right-0">
        <img src={bigclock} alt="Big Clock" className="w-60" />
      </div>

      <div className="bg-[#F5F5F5] rounded-[30px] shadow-2xl px-20 py-20 w-full max-w-lg z-10">
        <h1 className="text-3xl font-bold text-center text-[#1F1F1F]">Time Pro</h1>
        <p className="text-lg text-center text-gray-600 mb-8">Create your account</p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
              className="mt-1 block w-full px-4 py-2 rounded-md bg-[#E9DCDC] border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="mt-1 block w-full px-4 py-2 rounded-md bg-[#E9DCDC] border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="mt-1 block w-full px-4 py-2 rounded-md bg-[#E9DCDC] border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#D0D24C] text-white font-semibold py-2 rounded-full hover:bg-[#c1c43f] transition-all"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-700">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-black underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
