// pages/ForgotPassword.jsx
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/forgot-password`, { email });
      toast.success('Reset link sent to your email.');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to send email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form onSubmit={handleSend} className="bg-white shadow-md p-6 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Forgot Password</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded mb-4"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
