// ...imports stay the same
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
    github: '',
    summary: '',
    education: [],
    skills: {
      Frontend: '',
      Backend: '',
      DevOps: '',
      Languages: ''
    },
    experience: []
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
        phone: parsed.phone || ''
      }));
    }

    const query = new URLSearchParams(window.location.search);
    if (query.get('paid') === 'true') {
      setShowPaymentPrompt(true);
      window.history.replaceState(null, "", location.pathname);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSkillChange = (category, value) => {
    setFormData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: value
      }
    }));
  };

  const updateExperience = (index, field, value) => {
    const updated = [...formData.experience];
    updated[index][field] = field === 'details' ? value.split(',').map(s => s.trim()) : value;
    setFormData(prev => ({ ...prev, experience: updated }));
  };

  const addExperience = () => {
    setFormData(prev => ({
      ...prev,
      experience: [...prev.experience, { company: '', role: '', duration: '', details: [] }]
    }));
  };

  const updateEducation = (index, field, value) => {
    const updated = [...formData.education];
    updated[index][field] = value;
    setFormData(prev => ({ ...prev, education: updated }));
  };

  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, { institution: '', degree: '', year: '' }]
    }));
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      alert("Please complete your contact info.");
      return;
    }

    if (Object.values(formData.skills).every(val => !val.trim()) || formData.experience.length === 0 || formData.education.length === 0) {
      alert("Please complete skills, experience, and education.");
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
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          github: formData.github,
          summary: formData.summary,
          skills: {
            Frontend: formData.skills.Frontend.split(',').map(s => s.trim()),
            Backend: formData.skills.Backend.split(',').map(s => s.trim()),
            DevOps: formData.skills.DevOps.split(',').map(s => s.trim()),
            Languages: formData.skills.Languages.split(',').map(s => s.trim())
          },
          experience: formData.experience,
          education: formData.education
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
    <div className="flex min-h-screen font-sans bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <aside className="w-64 bg-cyan-600 text-white p-6 sticky top-0 min-h-screen shadow-xl">
        <h2 className="text-2xl font-bold mb-6">Time Pro</h2>
        <nav className="flex flex-col space-y-5 text-lg">
          <Link to="/dashboard" className="flex items-center gap-3 hover:bg-cyan-800 px-4 py-2 rounded transition-all">
            <FaHome /> Dashboard
          </Link>
          <Link to="/jobs" className="flex items-center gap-3 hover:bg-cyan-800 px-4 py-2 rounded transition-all">
            <FaBriefcase /> Job Listing
          </Link>
          <Link to="/applications" className="flex items-center gap-3 hover:bg-cyan-800 px-4 py-2 rounded transition-all">
            <FaClipboardList /> My Applications
          </Link>
          <Link to="/resume" className="flex items-center gap-3 bg-cyan-800 px-4 py-2 rounded font-semibold">
            <FaFileAlt /> My Resume
          </Link>
          <Link to="/edit-profile" className="flex items-center gap-3 hover:bg-cyan-800 px-4 py-2 rounded transition-all">
            <FaUserEdit /> Edit Profile
          </Link>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Time Pro Logo" className="h-12" />
            <h3 className="text-2xl font-bold text-cyan-600">Time Pro</h3>
          </div>
          <Link to="/dashboard" className="bg-cyan-800 text-white px-5 py-2 rounded-full hover:bg-cyan-500 transition">
            Dashboard
          </Link>
        </header>

        <main className="max-w-4xl mx-auto p-8 flex-grow">
          <h2 className="text-4xl font-bold mb-6 text-cyan-800">Generate Your Resume</h2>
          <form onSubmit={handlePayment} className="space-y-6 bg-white p-8 rounded-xl shadow-xl">
            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="input" required />
              <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="input" required />
              <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" className="input" />
              <input name="github" value={formData.github} onChange={handleChange} placeholder="GitHub Profile URL" className="input" />
            </div>

            {/* Summary */}
            <div>
              <h4 className="text-lg font-semibold mt-6 mb-2"> Summary</h4>
              <textarea
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                placeholder="Brief summary about your background and goals"
                className="input"
                rows={4}
              />
            </div>

            {/* Skills */}
            <div>
              <h4 className="text-lg font-semibold mt-6 mb-2">Skills (comma separated)</h4>
              {["Frontend", "Backend", "Languages"].map((cat) => (
                <input
                  key={cat}
                  placeholder={`${cat} Skills`}
                  value={formData.skills[cat]}
                  onChange={(e) => handleSkillChange(cat, e.target.value)}
                  className="input mb-3"
                />
              ))}
            </div>

            {/* Experience */}
            <div>
              <h4 className="text-lg font-semibold mt-6 mb-2">Experience</h4>
              {formData.experience.map((exp, i) => (
                <div key={i} className="border p-4 mb-4 rounded space-y-2">
                  <input placeholder="Company" value={exp.company} onChange={(e) => updateExperience(i, 'company', e.target.value)} className="input" />
                  <input placeholder="Role" value={exp.role} onChange={(e) => updateExperience(i, 'role', e.target.value)} className="input" />
                  <input placeholder="Duration" value={exp.duration} onChange={(e) => updateExperience(i, 'duration', e.target.value)} className="input" />
                  <textarea placeholder="Details (comma-separated)" value={exp.details.join(', ')} onChange={(e) => updateExperience(i, 'details', e.target.value)} className="input" />
                </div>
              ))}
              <button type="button" onClick={addExperience} className="btn">Add Experience</button>
            </div>

            {/* Education */}
            <div>
              <h4 className="text-lg font-semibold mt-6 mb-2">Education</h4>
              {formData.education.map((edu, i) => (
                <div key={i} className="border p-4 mb-4 rounded space-y-2">
                  <input placeholder="Institution" value={edu.institution} onChange={(e) => updateEducation(i, 'institution', e.target.value)} className="input" />
                  <input placeholder="Degree" value={edu.degree} onChange={(e) => updateEducation(i, 'degree', e.target.value)} className="input" />
                  <input placeholder="Year" value={edu.year} onChange={(e) => updateEducation(i, 'year', e.target.value)} className="input" />
                </div>
              ))}
              <button type="button" onClick={addEducation} className="btn">Add Education</button>
            </div>

            <button type="submit" disabled={loading} className={`w-full py-3 rounded-lg text-white font-semibold transition ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-cyan-800 hover:bg-cyan-600'}`}>
              {loading ? 'Redirecting to Payment...' : 'Pay $2 & Download Resume'}
            </button>
          </form>
        </main>
      </div>

      {/* Payment success prompt */}
      {showPaymentPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md">
            <h2 className="text-2xl font-bold text-green-600 mb-4">Payment Successful!</h2>
            <p className="mb-6">Click below to download your resume.</p>
            <button onClick={async () => {
              setShowPaymentPrompt(false);
              await generateAndDownloadResume();
            }} className="bg-cyan-800 text-white px-6 py-3 rounded-lg hover:bg-cyan-600">
              Download Resume
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerateResume;
