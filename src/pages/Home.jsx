import { motion } from "framer-motion";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom"; // Link added

import logo from "../assets/logo.png";
import bg from "../assets/meeting.jpg";
import p1 from "../assets/brainstorm_1427161.png";
import p2 from "../assets/direction_10547456.png";
import bg2 from "../assets/bg2.jpeg"; // New background image


function App() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="font-sans">
      {/* Header */}
      <nav className="absolute top-0 left-0 w-full bg-white/80 shadow-md py-3 px-8 flex justify-between items-center z-20">
              <div className="flex items-center gap-2">
                <img src={logo} alt="Time Pro Logo" className="h-10" />
                <h2 className="text-xl font-bold text-[#0A4DA2]">Time Pro</h2>
              </div>
              <div className="space-x-4">
                <Link to="/" className="text-[#0A4DA2] font-medium hover:underline">Home</Link>
                <Link to="/login" className="text-[#0A4DA2] font-medium hover:underline">Login</Link>
                <Link to="/register" className="bg-[#0A4DA2] text-white px-4 py-1 rounded-full hover:bg-[#094db1] transition">Sign Up</Link>
              </div>
            </nav>

<section className="relative h-180 flex flex-col md:flex-row items-center justify-between px-10 py-24 overflow-hidden">
  {/* Blurred Background */}
  <div
    className="absolute inset-0 bg-cover bg-center scale-105 blur-[5px] brightness-30 z-0"
    style={{ backgroundImage: `url(${bg})` }}
  ></div>

  {/* Left Content */}
  <div className="relative z-10 max-w-lg space-y-6 text-white ml-35">
    <h1 className="text-5xl font-extrabold leading-tight drop-shadow-xl [text-shadow:_0_4px_4px_rgb(99_102_241_/_0.8)]">
      Discover Your <br />
      <span className="text-cyan-400">Dream Part-Time</span> <br />
      With Time Pro
    </h1>
    <p className="text-lg text-gray-300 drop-shadow-lg">
      Find remote jobs, create your profile, connect with employers, and build your career. Join millions of
      professionals already enjoying success with Time Pro.
    </p>
    <div className="flex gap-4">
      <Link
        to="/login"
        className="bg-cyan-400 group-hover:opacity-40  text-black font-semibold px-6 py-3 rounded-full shadow-xl transition duration-500"
      >
        Find Jobs
      </Link>
      <Link
        to="/login"
        className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-700 hover:text-white font-semibold px-6 py-3 rounded-full transition"
      >
        Create Your Job
      </Link>
    </div>
  </div>

  {/* Right Image with Animation */}
 <motion.div
  className="relative z-10 mt-10 md:mt-0 mr-[120px] md:w-1/2 lg:w-1/3 group"
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 1 }}
>
  <div className="relative overflow-hidden rounded-2xl shadow-2xl">
    <motion.img
      src={bg}
      alt="team working"
      className="w-[500px] object-cover group-hover:scale-134 transition-transform duration-500"
    />
    {/* Light overlay effect */}
    <motion.div
      className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
    ></motion.div>
  </div>
</motion.div>

</section>

      {/* Features Section */}
      <section className="bg-white text-center py-20 px-4 h-150">
        <h2 className="text-4xl font-bold mb-2">Find the Best Part-Time Jobs Hiring Now</h2>
        <p className="text-gray-600 mb-12">Discover opportunities tailored for students and professionals</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto ">
          <div className="bg-white mt-6 border shadow-lg rounded-xl p-6" data-aos="fade-up">
            <img src={p1} className="w-16 mx-auto mb-4" alt="job icon" />
            <h3 className="text-xl font-semibold">Find Opportunities</h3>
            <p className="text-gray-500 mt-2">
              Browse diverse part-time jobs tailored for students and professionals.
            </p>
          </div>
          <div className="bg-white border mt-6 shadow-lg rounded-xl p-6" data-aos="fade-up" data-aos-delay="200">
            <img src={p2} className="w-16 mx-auto mb-4" alt="resume icon" />
            <h3 className="text-xl font-semibold">AI-Powered Resume</h3>
            <p className="text-gray-500 mt-2">
              Automatically generate and update resumes with AI tools.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section with Blurred Background */}
<section className="relative text-white text-center h-120 py-35 px-6 overflow-hidden">
  {/* Blurred Background Image */}
  <div
    className="absolute inset-0 bg-cover bg-center scale-105 blur-[4px] brightness-[0.3] z-0 rounded-xl"
    style={{ backgroundImage: `url(${bg2})` }}
  ></div>

  {/* Foreground Content */}
  <div className="relative z-10 max-w-5xl mx-auto ">
    <h2 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">
      <span className="text-cyan-400">Millions</span> of professionals are already using Time Pro.
    </h2>
    <p className="text-lg text-gray-200 mb-8 drop-shadow-md">
      Be the next one to discover your dream opportunity with powerful part-time job tools.
    </p>

    {/* Glowing CTA Button */}
    <Link
      to="/get-started"
      className="relative overflow-hidden group bg-cyan-500 hover:bg-cyan-600 text-black font-bold px-8 py-4 rounded-full shadow-lg transition"
    >
      <span className="relative z-10">Get Started</span>
      <span className="absolute inset-0 group-hover:opacity-40 opacity-0 bg-cyan-200 blur-xl rounded-full transition duration-500"></span>
    </Link>
  </div>
</section>
<footer className="bg-white text-black px-6 py-12 border-t border-black">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-lg ">
    
    {/* Column 1: Time Pro Info */}
    <div>
      <h2 className="text-cyan-400 text-lg font-bold mb-2 ml-5">Time Pro</h2>
      <p className="text-black-500 ml-5">
        Connecting talented professionals with amazing part-time opportunities worldwide.
      </p>
    </div>

    {/* Column 2: Quick Links */}
    <div>
      <h3 className="text-cyan-400 font-bold mb-2 ml-19">Quick Links</h3>
      <ul className="space-y-1 text-black ml-19">
        <li><a href="#">Find Jobs</a></li>
        <li><a href="#">Post a Job</a></li>
        <li><a href="#">About Us</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </div>

    {/* Column 3: Support */}
    <div>
      <h3 className="text-cyan-400 font-bold mb-2 ml-14">Support</h3>
      <ul className="space-y-1 text-black ml-14">
        <li><a href="#">Help Center</a></li>
        <li><a href="#">FAQ</a></li>
        <li><a href="#">Terms of Service</a></li>
        <li><a href="#">Privacy Policy</a></li>
      </ul>
    </div>

    {/* Column 4: Connect */}
    <div>
      <h3 className="text-cyan-400 font-bold mb-2 ml-14">Connect</h3>
      <ul className="space-y-1 text-black ml-14">
        <li><a href="#">Twitter</a></li>
        <li><a href="#">LinkedIn</a></li>
        <li><a href="#">Facebook</a></li>
        <li><a href="#">Instagram</a></li>
      </ul>
    </div>
  </div>

  {/* Divider */}
  <hr className="my-8 border-gray-600" />

  {/* Bottom Text */}
  <p className="text-center text-black text-sm ">
    &copy; {new Date().getFullYear()} Time Pro. All rights reserved.
  </p>
</footer>

    </div>
  );
}

export default App;
