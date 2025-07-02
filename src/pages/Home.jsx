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
      <header className="bg-black text-white flex justify-between items-center px-6 py-4 shadow-lg ">
        <div className="flex items-center gap-2">
          <img src={logo} className="w-15 ml-20" alt="logo" />
          <span className="text-cyan-400 font-bold text-xl">Time Pro</span>
        </div>
        <Link
          to="/login"
          className="bg-cyan-400 hover:bg-cyan-500 text-black font-bold px-5 py-2 rounded-full shadow-lg"
        >
          Login
        </Link>
      </header>

<section className="relative h-160 flex flex-col md:flex-row items-center justify-between px-10 py-24 overflow-hidden">
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
      <section className="bg-white text-center py-20 px-4">
        <h2 className="text-4xl font-bold mb-2">Find the Best Part-Time Jobs Hiring Now</h2>
        <p className="text-gray-600 mb-12">Discover opportunities tailored for students and professionals</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <div className="bg-white border shadow-lg rounded-xl p-6" data-aos="fade-up">
            <img src={p1} className="w-16 mx-auto mb-4" alt="job icon" />
            <h3 className="text-xl font-semibold">Find Opportunities</h3>
            <p className="text-gray-500 mt-2">
              Browse diverse part-time jobs tailored for students and professionals.
            </p>
          </div>
          <div className="bg-white border shadow-lg rounded-xl p-6" data-aos="fade-up" data-aos-delay="200">
            <img src={p2} className="w-16 mx-auto mb-4" alt="resume icon" />
            <h3 className="text-xl font-semibold">AI-Powered Resume</h3>
            <p className="text-gray-500 mt-2">
              Automatically generate and update resumes with AI tools.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section with Blurred Background */}
<section className="relative text-white text-center py-24 px-6 overflow-hidden">
  {/* Blurred Background Image */}
  <div
    className="absolute inset-0 bg-cover bg-center scale-105 blur-[4px] brightness-[0.3] z-0"
    style={{ backgroundImage: `url(${bg2})` }}
  ></div>

  {/* Foreground Content */}
  <div className="relative z-10 max-w-3xl mx-auto">
    <h2 className="text-4xl md:text-4xl font-bold mb-6 drop-shadow-lg">
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
<footer className="bg-black text-white px-6 py-12">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
    
    {/* Time Pro Info */}
    <div>
      <h2 className="text-2xl font-bold">
        <span className="text-cyan-400">Time</span>Pro
      </h2>
      <p className="text-sm mt-4 text-gray-300">
        Find remote jobs, build your profile, and connect with top employers. Time Pro helps you shape your career from anywhere.
      </p>
      <div className="flex gap-4 mt-4 text-xl">
        <span className="bg-white text-black p-2 rounded-full">&#x1F426;</span>
        <span className="bg-white text-black p-2 rounded-full">&#127909;</span>
        <span className="bg-white text-black p-2 rounded-full">&#128101;</span>
      </div>
      <p className="mt-4 font-semibold text-sm">Time Pro © {new Date().getFullYear()}</p>
    </div>

    {/* Address */}
    <div>
      <h3 className="text-lg font-bold mb-2">Address</h3>
      <p className="text-sm text-gray-300">📍 456 Tech Street, Chennai, India</p>
      <p className="text-sm mt-2">📞 +91 98765 43210</p>
      <p className="text-sm">📧 support@timepro.com</p>
    </div>

    {/* Newsletter */}
    <div className="md:col-span-2">
      <h3 className="text-lg font-bold mb-2 ml-30">Newsletter</h3>
      <p className="text-sm text-gray-300 mb-3">Join our mailing list for job updates</p>
      <div className="flex max-w-md">
        <input
          type="email"
          placeholder="Your email"
          className="px-4 py-2 text-black w-full rounded-l-md border border-gray-400 focus:outline-none"
        />
        <button className="bg-orange-500 text-white px-5 py-2 rounded-r-md hover:bg-orange-600">
          Signup
        </button>
      </div>
    </div>
  </div>

  {/* Bottom Note */}
  <div className="text-center text-gray-400 text-sm mt-10">
    Built with ❤️ by Time Pro Team
  </div>
</footer>



    </div>
  );
}

export default App;
