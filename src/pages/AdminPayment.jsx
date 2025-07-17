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
    <div className="flex min-h-screen font-sans bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Sidebar */}
      <aside className="w-64 bg-cyan-600 text-white p-6 sticky top-0 min-h-screen shadow-xl">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col space-y-5 text-lg">
          <Link to="/admin" className="flex items-center gap-3 hover:bg-cyan-800 px-4 py-2 rounded font-semibold">Dashboard</Link>
          <Link to="/admin/manage-jobs" className="flex items-center gap-3 hover:bg-cyan-800 px-4 py-2 rounded transition-all"><FaBriefcase /> Manage Jobs</Link>
          <Link to="/admin/user" className="flex items-center gap-3 hover:bg-cyan-800 px-4 py-2 rounded transition-all"><FaUserGraduate /> Manage Users</Link>
          <Link to="/admin/payment" className="flex items-center gap-3 hover:bg-cyan-800 px-4 py-2 rounded transition-all"><FaUsers /> Payments</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50">
        {/* Header */}
        <header className="flex justify-between items-center bg-white shadow px-8 py-4">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Time Pro Logo" className="h-12" />
            <h3 className="text-2xl font-bold text-cyan-600">Time Pro</h3>
          </div>
          <Link
            to="/admin"
            className="bg-cyan-800 text-white px-5 py-2 rounded-full hover:bg-cyan-500 transition"
          >
            Dashboard
          </Link>
        </header>

        {/* Payments Table */}
        <section className="p-8">
          <h1 className="text-3xl font-bold mb-6 text-cyan-800">All Payments</h1>
          <div className="overflow-x-auto shadow rounded-lg border border-gray-200 bg-white">
            <table className="min-w-full">
              <thead className="bg-cyan-800 text-white">
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
                    currentPage === i + 1 ? 'bg-cyan-800 text-white' : 'bg-gray-200'
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
