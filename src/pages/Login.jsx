import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import login from '../assets/login2.jpeg';
import logo from '../assets/logo.png';
import { FaUser, FaLock } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const redirectByRole = (role) => {
    if (role === 'admin') navigate('/admin');
    else if (role === 'user') navigate('/dashboard');
    else if (role === 'provider') navigate('/provider');
    else navigate('/');
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
      setLoading(false);

      localStorage.clear();
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.user.role);
      localStorage.setItem('user', JSON.stringify(data.user));
      redirectByRole(data.user.role);
    } catch (error) {
      setLoading(false);
      alert(error.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative">
      {/* Navbar on top of both sides */}
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

      {/* Left Side Image */}
      <div className="hidden md:flex w-full md:w-1/2 h-screen bg-cover bg-center relative" style={{ backgroundImage: `url(${login})` }}>
        <div className="bg-black/20 w-full h-full rounded-l-2xl"></div>
      </div>

      {/* Right Side Login Form */}
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center px-10 py-12 z-10">
        <div className="max-w-md w-full mx-auto mt-16 md:mt-0">
          <div className="flex justify-center mb-6">
            <img src={logo} alt="Logo" className="w-14" />
          </div>
          <h2 className="text-3xl font-bold text-center text-[#3B3B3B]">LOGIN</h2>
          <p className="text-center text-sm text-gray-500 mb-6">Welcome back! Please login to your account</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
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

            {/* Password Field */}
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

            {/* Remember / Forgot */}
            <div className="flex items-center justify-between text-sm text-gray-600">
              <label>
                <input type="checkbox" className="mr-1" />
                Remember
              </label>
              <a href="#" className="hover:underline">Forgot Password?</a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cyan-400 to-r from-[#8A4DFF] to-[#6A1B9A] text-white py-2 rounded-full font-bold hover:opacity-90"
            >
              {loading ? 'Logging in...' : 'LOGIN'}
            </button>
          </form>

          {/* Google Login */}
          <div className="my-6">
            <div className="text-center text-gray-500 text-sm mb-2">Or continue with</div>
            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  try {
                    const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/google-login`, {
                      token: credentialResponse.credential,
                    });

                    const data = res.data;
                    localStorage.clear();
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('role', data.user.role);
                    localStorage.setItem('user', JSON.stringify(data.user));
                    redirectByRole(data.user.role);
                  } catch (err) {
                    alert('Google login failed');
                  }
                }}
                onError={() => console.log('Google login failed')}
              />
            </div>
          </div>

          {/* Sign Up */}
          <p className="text-center text-sm text-gray-600">
            Don’t have an account?{' '}
            <Link to="/register" className="text-[#6A1B9A] font-semibold hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
