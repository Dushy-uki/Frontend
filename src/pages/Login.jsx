import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import smallclock from '../assets/clock1.png';
import bigclock from '../assets/clock2.png';
import { GoogleLogin } from '@react-oauth/google';
import logo from '../assets/logo.png'; 


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

      if (!data.user || !data.token || !data.user.role) {
        throw new Error('Invalid response from server');
      }

      localStorage.clear(); // Clears all localStorage

      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.user.role);
      localStorage.setItem('user', JSON.stringify(data.user));

      const role = data.user.role;
      if (role === 'admin') {
        navigate('/admin');
      } else if (role === 'user') {
        navigate('/dashboard');
      } else {
        navigate('/');
      }
    } catch (error) {
      setLoading(false);
      console.error('Login Error:', error);
      alert(error.response?.data?.error || error.message || 'Login failed');
    }
  };



  return (
    <div className="min-h-screen bg-[#1952CC] flex items-center justify-center relative overflow-hidden">
    {/* Navbar */}

<nav className="absolute top-0 left-0 w-full bg-white/90 shadow-md py-3 px-8 flex justify-between items-center z-20">
  <div className="flex items-center gap-2">
    <img src={logo} alt="Time Pro Logo" className="h-10" />
    <h2 className="text-xl font-bold text-[#094DB1]">Time Pro</h2>
  </div>
  <div className="space-x-4">
    <Link to="/" className="text-[#094DB1] font-medium hover:underline">Home</Link>
    <Link to="/login" className="text-[#094DB1] font-medium hover:underline">Login</Link>
    <Link to="/register" className="bg-[#E4ED73] text-black px-4 py-1 rounded-full hover:bg-[#dfe867] transition">Sign Up</Link>
  </div>
</nav>

      {/* Background clocks */}
      <div className="absolute top-0 left-0">
        <img src={smallclock} alt="Small Clock" className="w-30" />
      </div>
      <div className="absolute bottom-0 right-0">
        <img src={bigclock} alt="Big Clock" className="w-60" />
      </div>

      {/* Login Box */}
      <div className="bg-[#F5F5F5] rounded-[30px] shadow-2xl px-20 py-20 w-full max-w-lg z-10 mt-5">
        <h1 className="text-3xl font-bold text-center text-[#1F1F1F] mb-5">Time Pro</h1>
        <p className="text-lg text-center text-gray-600">User Login</p>

        <form className="space-y-6 mt-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="mt-1 block w-full px-4 py-2 rounded-md bg-[#E9DCDC] border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="mt-1 block w-full px-4 py-2 rounded-md bg-[#E9DCDC] border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#D0D24C] text-white font-semibold py-2 rounded-full hover:bg-[#c1c43f] transition-all"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* OR Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-4 text-gray-500">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Google Login Button */}
         <div>
      <h2>Sign in with Google</h2>
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

      const role = data.user.role;
      if (role === 'admin') {
        navigate('/admin');
      } else if (role === 'user') {
        navigate('/dashboard');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Google Login Error:', error);
      alert(error.response?.data?.error || error.message || 'Google login failed');
    }
  }}
  onError={() => {
    console.log('Google Login Failed');
  }}
/>

    </div>

        <p className="mt-4 text-center text-sm text-gray-700">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="font-semibold text-black underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
