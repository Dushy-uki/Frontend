import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { toast } from 'react-toastify';
import loginBg from '../assets/loginbg.jpg';
import logo from '../assets/logo.png';
import { FaUser, FaLock } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Role-based redirect
  const redirectByRole = (role) => {
    if (role === 'admin') navigate('/admin');
    else if (role === 'provider') navigate('/provider');
    else navigate('/dashboard');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
        email,
        password,
      });

      const data = res.data;
      localStorage.clear();
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.user.role);
      localStorage.setItem('user', JSON.stringify(data.user));

      toast.success('Login successful!');
      redirectByRole(data.user.role);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/google-login`, {
        token: credentialResponse.credential,
      });

      const data = res.data;
      localStorage.clear();
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.user.role);
      localStorage.setItem('user', JSON.stringify(data.user));

      toast.success('Google login successful!');
      redirectByRole(data.user.role);
    } catch (err) {
      toast.error('Google login failed');
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center relative"
      style={{ backgroundImage: `url(${loginBg})` }}
      
    >
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
      
      {/* Overlay */}
      <div className="absolute inset-0 opacity-50 z-0"></div>

      {/* Login Box */}
      <div className="z-10 w-full max-w-md bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="w-19" />
        </div>
        <h2 className="text-3xl font-bold text-center text-gray-800">Login</h2>
        <p className="text-center text-sm text-gray-600 mb-6">Welcome back! Please log in</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-full">
            <FaUser className="text-gray-500" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent w-full focus:outline-none"
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-full">
            <FaLock className="text-gray-500" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent w-full focus:outline-none"
              required
            />
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end text-sm text-gray-600">
            <Link to="/forgot-password" className="hover:underline">
              Forgot Password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-tr from-cyan-800 to-white text-white py-2 rounded-full font-bold hover:opacity-90 transition"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Google */}
        <div className="my-6">
          <p className="text-center text-gray-500 text-sm mb-2">Or continue with</p>
          <div className="flex justify-center">
            <GoogleLogin onSuccess={handleGoogleLogin} onError={() => toast.error('Google login failed')} />
          </div>
        </div>

        {/* Signup */}
        <p className="text-center text-sm text-gray-700 mt-4">
          Don’t have an account?{' '}
          <Link to="/register" className="text-purple-700 font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
