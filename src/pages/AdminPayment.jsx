import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { FaBriefcase, FaUserGraduate, FaUsers } from 'react-icons/fa';

const PAYMENTS_PER_PAGE = 10;

const AdminPayments = () => {
  const [payments, setPayments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/payment/all', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPayments(res.data);
      } catch (err) {
        console.error("Error fetching payments:", err);
      }
    };

    fetchPayments();
  }, []);

  const indexOfLastPayment = currentPage * PAYMENTS_PER_PAGE;
  const indexOfFirstPayment = indexOfLastPayment - PAYMENTS_PER_PAGE;
  const currentPayments = payments.slice(indexOfFirstPayment, indexOfLastPayment);
  const totalPages = Math.ceil(payments.length / PAYMENTS_PER_PAGE);

  return (
    <div className="flex min-h-screen font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#094DB1] text-white p-6 sticky top-0 min-h-screen">
        <nav className="flex flex-col mt-10 space-y-5 text-md">
          <Link
            to="/admin"
            className="text-xl font-bold text-white mb-4 border-b border-white pb-2"
          >
            Admin Dashboard
          </Link>

          <Link
            to="/admin/manage-jobs"
            className="flex items-center gap-2 hover:bg-white/10 rounded px-4 py-2 transition"
          >
            <FaBriefcase className="text-lg" />
            <span>Manage Jobs</span>
          </Link>

          <Link
            to="/admin/user"
            className="flex items-center gap-2 hover:bg-white/10 rounded px-4 py-2 transition"
          >
            <FaUserGraduate className="text-lg" />
            <span>Manage Users</span>
          </Link>

          <Link
            to="/admin/payment"
            className="flex items-center gap-2 hover:bg-white/10 rounded px-4 py-2 transition"
          >
            <FaUsers className="text-lg" />
            <span>Payments</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50">
        {/* Header */}
        <header className="flex justify-between items-center bg-white shadow px-8 py-4">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Time Pro Logo" className="h-10" />
            <h3 className="text-2xl font-bold text-[#1F1F1F]">Time Pro</h3>
          </div>
          <Link
            to="/login"
            className="bg-[#E4ED73] text-black px-5 py-2 rounded-full hover:bg-blue-700 transition"
          >
            Login
          </Link>
        </header>

        {/* Payments Table */}
        <section className="p-8">
          <h1 className="text-3xl font-bold mb-6">All Payments</h1>
          <div className="overflow-x-auto shadow rounded-lg border border-gray-200">
            <table className="min-w-full bg-white">
              <thead className="bg-[#094DB1] text-white">
                <tr>
                  <th className="py-3 px-6 text-left">User Name</th>
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-left">Purpose</th>
                  <th className="py-3 px-6 text-left">Amount</th>
                  <th className="py-3 px-6 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {currentPayments.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-6 text-gray-600">No payments found.</td>
                  </tr>
                ) : (
                  currentPayments.map((p) => (
                    <tr key={p._id} className="border-b hover:bg-gray-100">
                      <td className="py-3 px-6">{p.name}</td>
                      <td className="py-3 px-6">{p.email}</td>
                      <td className="py-3 px-6">{p.purpose}</td>
                      <td className="py-3 px-6">${(p.amount / 100).toFixed(2)}</td>
                      <td className="py-3 px-6">{new Date(p.date).toLocaleString()}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6 space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
              >
                Prev
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 rounded ${
                    currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default AdminPayments;
