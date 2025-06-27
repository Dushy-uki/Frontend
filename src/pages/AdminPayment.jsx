import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPayments = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/payment/all');
        setPayments(res.data);
      } catch (err) {
        console.error("Error fetching payments:", err);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">All Payments</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">User Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Purpose</th>
            <th className="border px-4 py-2">Amount</th>
            <th className="border px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p._id}>
              <td className="border px-4 py-2">{p.name}</td>
              <td className="border px-4 py-2">{p.email}</td>
              <td className="border px-4 py-2">{p.purpose}</td>
              <td className="border px-4 py-2">${(p.amount / 100).toFixed(2)}</td>
              <td className="border px-4 py-2">{new Date(p.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPayments;
