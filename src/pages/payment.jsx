import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Optional: show message, then redirect after few seconds
    const timer = setTimeout(() => {
      navigate('/resume'); // redirect back to resume page if needed
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-100">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-green-700">Payment Successful!</h1>
        <p className="mb-6">Thank you for your payment. Your resume should have downloaded automatically.</p>
        <button
          onClick={() => navigate('/resume')}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Go Back to Resume Page
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
