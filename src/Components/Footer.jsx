import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // make sure your logo path is correct
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white text-[#1F1F1F] py-10 border-t border-gray-300 mt-16">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-4 sm:grid-cols-2 gap-25 text-lg">

        {/* Logo & Social */}
        <div>
          <img src={logo} alt="Time Pro Logo" className="h-10 w-10 mb-4 ml-7" />
          <div className="flex space-x-4 text-[#1F1F1F] text-lg mt-2">
            <a href="#" aria-label="Facebook"><FaFacebookF /></a>
            <a href="#" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
          </div>
        </div>

        {/* About Section */}
        <div>
          <h3 className="font-semibold mb-3">About Time Pro</h3>
          <ul className="space-y-2">
            <li><Link to="/jobs" className="hover:underline">Find Part-Time Jobs</Link></li>
            <li><Link to="/resume" className="hover:underline">AI Resume Builder</Link></li>
            <li><Link to="/faq" className="hover:underline">FAQ</Link></li>
          </ul>
        </div>

        {/* Policies */}
        <div>
          <h3 className="font-semibold mb-3">Policies</h3>
          <ul className="space-y-2">
            <li><Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:underline">Terms of Use</Link></li>
            <li><Link to="/gdpr" className="hover:underline">CCPA / GDPR</Link></li>
          </ul>
        </div>

        {/* Contact Support */}
        <div>
          <h3 className="font-semibold mb-3">Customer Support</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><FaPhone /> 1-800-123-4567</li>
            <li className="flex items-center gap-2"><FaClock /> Mon - Fri: 9AM - 6PM IST</li>
            <li className="flex items-center gap-2"><FaEnvelope /> support@timepro.io</li>
            <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="text-center text-xs text-gray-600 mt-10 border-t pt-4">
        © 2025 Time Pro — Built for University Students | All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
