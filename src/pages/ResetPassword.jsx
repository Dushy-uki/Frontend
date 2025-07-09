// pages/ResetPassword.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      toast.error('Invalid password reset link');
      navigate('/login');
    }
  }, [token]);

  const handleReset = async (e) => {
    e.preventDefault();
    if (newPassword.length < 6) return toast.error('Password too short');
    if (newPassword !== confirmPassword) return toast.error('Passwords do not match');

    try {
      setLoading(true);
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/reset-password/${token}`, {
        newPassword,
      });
      toast.success('Password reset successful! Please login.');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Reset failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form onSubmit={handleReset} className="bg-white shadow-md p-6 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Reset Password</h2>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full border p-2 rounded mb-4"
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full border p-2 rounded mb-4"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
