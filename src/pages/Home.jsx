import { motion } from "framer-motion";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

import logo from "../assets/logo.png";
import bg from "../assets/hero.avif";
import bg2 from "../assets/img1.jpg";
import p1 from "../assets/brainstorm_1427161.png";
import p2 from "../assets/direction_10547456.png";

function App() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const steps = [
    { title: "Sign Up", description: "Create your Time Pro account in seconds." },
    { title: "Complete Profile", description: "Add your skills, interests, and availability." },
    { title: "Browse Jobs", description: "Explore curated part-time jobs posted by top employers." },
    { title: "Apply with AI Resume", description: "Apply using smart, tailored AI-powered resumes." },
    { title: "Get Hired!", description: "Track offers, schedule interviews, and get hired fast." }
  ];

  return (
    <div className="font-sans">
      {/* Header */}
      <nav className="absolute top-0 left-0 w-full bg-white/80 shadow-md py-3 px-8 flex justify-between items-center z-20">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Time Pro Logo" className="h-10 ml-8" />
          <h2 className="text-xl font-bold text-[#0A4DA2]">Time Pro</h2>
        </div>
        <div className="space-x-4">
          <Link to="/" className="text-[#0A4DA2] font-medium hover:underline">Home</Link>
          <Link to="/login" className="text-[#0A4DA2] font-medium hover:underline">Login</Link>
          <Link to="/register" className="bg-[#0A4DA2] text-white px-4 py-1 rounded-full hover:bg-[#094db1] transition">Sign Up</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-190 flex flex-col md:flex-row items-center justify-between px-10 py-28 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center scale-105 blur-[5px] brightness-30 z-0" style={{ backgroundImage: `url(${bg2})` }}></div>
        <div className="relative z-10 max-w-lg space-y-6 text-white ml-45">
          <h1 className="text-5xl font-extrabold leading-tight drop-shadow-xl [text-shadow:_0_4px_4px_rgb(99_102_241_/_0.8)]">
            Discover Your <br />
            <span className="text-cyan-400">Dream Part-Time</span> <br />
            With Time Pro
          </h1>
          <p className="text-lg text-gray-300 drop-shadow-lg">
            Find remote jobs, create your profile, connect with employers, and build your career.
          </p>
          <div className="flex gap-4">
            <Link to="/login" className="bg-cyan-400 group-hover:opacity-40 text-black font-semibold px-6 py-3 rounded-full shadow-xl transition duration-500">
              Find Jobs
            </Link>
            <Link to="/login" className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-700 hover:text-white font-semibold px-6 py-3 rounded-full transition">
              Create Your Job
            </Link>
          </div>
        </div>
  <motion.div
  className="relative z-10 mt-10 md:mt-0 mr-40"
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 1 }}
>
  <div
    className="relative overflow-hidden shadow-2xl w-full max-w-[600px] h-[500px] border-6 border-cyan-400"
    style={{ clipPath: "inset(0 0 0 0 round 30% 30% 30% 30%)" }}
  >
    <motion.img
      src={bg}
      alt="team working"
      className="w-full h-full object-cover transition-transform duration-500"
      style={{ clipPath: "inset(0 0 0 0 round 30% 30% 30% 30%)" }}
      whileHover={{ scale: 1.05 }}
    />
    <motion.div
      className="absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none"
      whileHover={{ opacity: 0.1 }}
      style={{ clipPath: "inset(0 0 0 0 round 30% 30% 30% 30%)" }}
    />
  </div>
</motion.div>


      </section>

      {/* Features Section */}
      <section className="bg-white text-center py-20 px-4 h-160">
        <h2 className="text-4xl font-bold mb-2">Find the Best Part-Time Jobs Hiring Now</h2>
        <p className="text-gray-600 mb-12">Discover opportunities tailored for students and professionals</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto ">
          <div className="bg-white mt-6 border shadow-lg rounded-xl p-6" data-aos="fade-up">
            <img src={p1} className="w-23 mx-auto mb-4" alt="job icon" />
            <h3 className="text-xl font-semibold">Find Opportunities</h3>
            <p className="text-gray-500 mt-2">Browse diverse part-time jobs tailored for students and professionals.</p>
          </div>
          <div className="bg-white border mt-6 shadow-lg rounded-xl p-9" data-aos="fade-up" data-aos-delay="200">
            <img src={p2} className="w-23 mx-auto mb-4" alt="resume icon" />
            <h3 className="text-xl font-semibold">AI-Powered Resume</h3>
            <p className="text-gray-500 mt-2">Automatically generate and update resumes with AI tools.</p>
          </div>
        </div>
      </section>

      {/* Infographic Section */}
   <section className="bg-gray-200 py-10 md:py-16 px-4">
  <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">Your Success Journey</h2>

  <div className="max-w-4xl mx-auto flex flex-col items-center space-y-6 relative">
    {/* Layer 1 - Bottom */}
    <div className="relative w-full" data-aos="fade-up">
      <div className="w-full bg-gradient-to-r from-cyan-700 to-cyan-500 text-white px-6 py-6 shadow-lg text-center rounded-md">
        <div className="flex items-center justify-center gap-4">
          <div className="bg-white text-cyan-700 w-18 h-18 flex flex-col items-center justify-center rounded-full text-[13px] font-bold shadow leading-tight">
            <span className="text-xs">STEP</span>
            <span className="text-base">01</span>
          </div>
          <div className="text-left">
            <h3 className="text-lg font-semibold">Create Account</h3>
            <p className="text-sm opacity-90">Sign up and start your journey instantly.</p>
          </div>
        </div>
      </div>
    </div>

    {/* Layer 2 */}
    <div className="relative w-[90%]" data-aos="fade-up" data-aos-delay="100">
      <div className="w-full bg-gradient-to-r from-cyan-600 to-cyan-400 text-white px-6 py-6 shadow-lg text-center rounded-md">
        <div className="flex items-center justify-center gap-4">
          <div className="bg-white mr-5 text-cyan-600 w-18 h-18 flex flex-col items-center justify-center rounded-full text-[13px] font-bold shadow leading-tight">
            <span className="text-xs">STEP</span>
            <span className="text-base">02</span>
          </div>
          <div className="text-left">
            <h3 className="text-lg font-semibold">Complete Profile</h3>
            <p className="text-sm opacity-90">Showcase your skills and interests.</p>
          </div>
        </div>
      </div>
    </div>

    {/* Layer 3 */}
    <div className="relative w-[80%]" data-aos="fade-up" data-aos-delay="200">
      <div className="w-full bg-gradient-to-r from-cyan-500 to-cyan-300 text-white px-6 py-6 shadow-lg text-center rounded-md">
        <div className="flex items-center justify-center gap-4">
          <div className="bg-white mr-3 text-cyan-500 w-18 h-18 flex flex-col items-center justify-center rounded-full text-[13px] font-bold shadow leading-tight">
            <span className="text-xs">STEP</span>
            <span className="text-base">03</span>
          </div>
          <div className="text-left">
            <h3 className="text-lg font-semibold">Search Jobs</h3>
            <p className="text-sm opacity-90">Browse top remote part-time jobs.</p>
          </div>
        </div>
      </div>
    </div>

    {/* Layer 4 - Top */}
    <div className="relative w-[70%] ml-3" data-aos="fade-up" data-aos-delay="300">
      <div className="w-full bg-gradient-to-r from-cyan-400 to-cyan-200 text-white px-6 py-6 shadow-lg text-center rounded-md">
        <div className="flex items-center justify-center gap-4">
          <div className="bg-white ml-3 text-cyan-400 w-18 h-18 flex flex-col items-center justify-center rounded-full text-[13px] font-bold shadow leading-tight">
            <span className="text-xs">STEP</span>
            <span className="text-base">04</span>
          </div>
          <div className="text-left">
            <h3 className="text-lg font-semibold">Get Hired</h3>
            <p className="text-sm opacity-90">Land your dream role and start growing.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>




      {/* CTA Section */}
      <section className="relative text-white text-center h-120 py-35 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center scale-105 blur-[4px] brightness-[0.3] z-0 rounded-xl" style={{ backgroundImage: `url(${bg2})` }}></div>
        <div className="relative z-10 max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">
            <span className="text-cyan-400">Millions</span> of professionals are already using Time Pro.
          </h2>
          <p className="text-lg text-gray-200 mb-8 drop-shadow-md">
            Be the next one to discover your dream opportunity with powerful part-time job tools.
          </p>
          <Link to="/login" className="relative overflow-hidden group bg-cyan-500 hover:bg-cyan-600 text-black font-bold px-8 py-4 rounded-full shadow-lg transition">
            <span className="relative z-10">Get Started</span>
            <span className="absolute inset-0 group-hover:opacity-40 opacity-0 bg-cyan-200 blur-xl rounded-full transition duration-500"></span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white text-black px-6 py-12 border-t border-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-lg">
          <div>
            <h2 className="text-cyan-400 text-lg font-bold mb-2 ml-5">Time Pro</h2>
            <p className="text-black-500 ml-5">Connecting talented professionals with amazing part-time opportunities worldwide.</p>
          </div>
          <div>
            <h3 className="text-cyan-400 font-bold mb-2 ml-19">Quick Links</h3>
            <ul className="space-y-1 text-black ml-19">
              <li><a href="#">Find Jobs</a></li>
              <li><a href="#">Post a Job</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-cyan-400 font-bold mb-2 ml-14">Support</h3>
            <ul className="space-y-1 text-black ml-14">
              <li><a href="#">Help Center</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
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
        <hr className="my-8 border-gray-600" />
        <p className="text-center text-black text-sm">&copy; {new Date().getFullYear()} Time Pro. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
