import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import { FaHome, FaBriefcase, FaClipboardList, FaUserEdit, FaFileAlt } from 'react-icons/fa';


const GenerateResume = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    skills: '',
    experience: '',
    education: '',
    theme: 'elegant' // default resume theme
  });

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [showPaymentPrompt, setShowPaymentPrompt] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      setFormData(prev => ({
        ...prev,
        name: parsed.name || '',
        email: parsed.email || '',
        phone: parsed.phone || '',
        skills: parsed.skills || ''
      }));
    }

    const query = new URLSearchParams(window.location.search);
    if (query.get('paid') === 'true') {
      setShowPaymentPrompt(true);
      window.history.replaceState(null, "", location.pathname);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.skills || !formData.experience || !formData.education) {
      alert("Please fill all required fields before payment.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/payment/create-checkout-session', {
        amount: 500,
        purpose: "Resume Download"
      });

      window.location.href = res.data.url;
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment initiation failed.');
    } finally {
      setLoading(false);
    }
  };

  const generateAndDownloadResume = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
      'http://localhost:5000/api/resume/generate', 
        {
           userId: user._id, // <-- Make sure this is passed
          ...formData,
          skills: formData.skills.split(',').map(skill => skill.trim()),
        },
        { responseType: 'blob' }
      );

      const blob = new Blob([res.data], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `${formData.name}_resume.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Resume generation error:', error);
      alert('Failed to generate resume.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
       <aside className="w-64 bg-[#094DB1] text-white p-6 sticky top-0 min-h-screen">
                    <nav className="flex flex-col space-y-4 mt-10 text-md">
                      <Link to="/dashboard" className="flex items-center gap-2 hover:bg-white/10 rounded px-3 py-2 transition">
                        <FaHome /> Dashboard
                      </Link>
                      <Link to="/jobs" className="flex items-center gap-2 hover:bg-white/10 rounded px-3 py-2 transition">
                        <FaBriefcase /> Job Listing
                      </Link>
                      <Link to="/applications" className="flex items-center gap-2 hover:bg-white/10 rounded px-3 py-2 transition">
                        <FaClipboardList /> My Application
                      </Link>
                      <Link to="/resume" className="flex items-center gap-2 hover:bg-white/10 rounded px-3 py-2 transition">
                        <FaFileAlt /> My Resume
                      </Link>
                      <Link to="/edit-profile" className="flex items-center gap-2 hover:bg-white/10 rounded px-3 py-2 transition">
                        <FaUserEdit /> Edit Profile
                      </Link>
                    </nav>
                  </aside>
      

      <div className="flex-1 flex flex-col">
        <header className="flex justify-between items-center bg-white shadow px-8 py-4">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Time Pro Logo" className="h-12" />
            <h3 className="text-2xl font-bold text-[#1F1F1F]">Time Pro</h3>
          </div>
          <Link to="/dashboard" className="bg-[#E4ED73] text-black px-5 py-2 rounded-full hover:bg-yellow-400 transition">
            Dashboard
          </Link>
        </header>

        <main className="max-w-4xl mx-auto p-8 flex-grow">
          <h2 className="text-4xl font-bold mb-6 text-[#094DB1]">Generate Your Resume</h2>
          <form onSubmit={handlePayment} className="space-y-6 bg-white p-8 rounded-xl shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#094DB1]"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#094DB1]"
                required
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#094DB1]"
              />
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="Skills (comma separated)"
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#094DB1]"
                required
              />
              <select
                name="theme"
                value={formData.theme}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#094DB1]"
              >
                <option value="elegant">Elegant</option>
                <option value="stack">Stack</option>
                <option value="spartan">Spartan</option>
              </select>
            </div>
            <textarea
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder="Experience"
              className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#094DB1]"
              rows="5"
              required
            />
            <textarea
              name="education"
              value={formData.education}
              onChange={handleChange}
              placeholder="Education"
              className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#094DB1]"
              rows="4"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg text-white font-semibold transition ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#094DB1] hover:bg-blue-700'
              }`}
            >
              {loading ? 'Redirecting to Payment...' : 'Pay $2 & Download Resume'}
            </button>
          </form>
        </main>
      </div>

      {showPaymentPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md">
            <h2 className="text-2xl font-bold text-green-600 mb-4">Payment Successful!</h2>
            <p className="mb-6">Click below to download your resume.</p>
            <button
              onClick={async () => {
                setShowPaymentPrompt(false);
                await generateAndDownloadResume();
              }}
              className="bg-[#094DB1] text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Download Resume
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerateResume;
