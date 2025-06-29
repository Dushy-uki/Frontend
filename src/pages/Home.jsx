import React from 'react';
import { Link } from 'react-router-dom';
import pic1 from '../assets/pro1.png';
import job from '../assets/logo.png';
import icon1 from '../assets/direction_10547456.png';
import icon2 from '../assets/brainstorm_1427161.png';
import icon3 from '../assets/selection_17859012.png';
import bgImage from '../../src/assets/bg.jpeg';
import Footer from '../Components/Footer.jsx';  

export default function LandingPage() {
  return (
    <div className="min-h-screen">
          {/* Section 1: Header and Banner */}
            <div className="absolute inset-0 bg-cover bg-center"></div>
            <div className="container mx-auto px-4 py-2 flex justify-between items-center relative z-10">
              <img src={job} alt="Time Pro Logo" className="h-16" />
              <h3 className="text-2xl font-bold text-black mr-312">Time Pro</h3>
              <Link
          to="/login"
          className="bg-[#E4ED73] text-black px-5 py-2 rounded-full hover:bg-white"
        >
          Login
        </Link>
            </div>
             <header className="relative bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${bgImage})` }}>
            <div className="container mx-auto px-4 py-25 flex items-center relative z-10">
              <div className="w-1/2 text-left text-white mb-5">
                <h1 className="text-5xl font-bold">Discover Your Dream Part-Time With Time Pro</h1>
                <p className="mt-4 text-xl py-2">Find remote jobs, create your profile, find jobs.</p>
                <div className="mt-6 space-x-4 py-2">
                  <Link
            to="/login"
            className="bg-[#E4ED73] px-6 py-3  text-black rounded-full font-medium hover:bg-[#d4de60]"
          >
            Find jobs
          </Link>
                  <Link
            to="/login"
            className="bg-[#E4ED73] text-black px-6 py-3 rounded-full font-medium hover:bg-[#d4de60]"
          >
            Create your job
          </Link>
                </div>
              </div>
              <div className="w-1/2 flex">
                <img src={pic1} alt="Banner Image" className="h-70 w-180 ml-51" />
              </div>
            </div>
          </header>

          {/* Section 2: Job Opportunities */}
          <section className="container mx-auto px-6 py-32 text-center bg-white">
            <h2 className="text-5xl font-bold mb-5">Find the Best Part-Time Jobs Hiring Now</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
              <div className="bg-gray-50 p-6 rounded-lg shadow">
                <img src={icon1} alt="Icon 1" className="h-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold">Find Opportunities</h3>
                <p>Browse diverse part-time jobs tailored for students, gain supportability.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow">
                <img src={icon2} alt="Icon 2" className="h-12 mx-auto mb-4" />
                <h3 className="text-lg font-semibold">AI-Powered Resume</h3>
                <p>Automatically generated and updated with AI tools.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow">
                <img src={icon3} alt="Icon 3" className="h-12 mx-auto mb-4" />
                <h3 className="text-lg font-semibold">For Employers</h3>
                <p>Find employees, post jobs, and manage applications.</p>
              </div>
            </div>
          </section>

          {/* Section 3: Call to Action */}
          <section className="relative">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }}></div>
            <div className="container mx-auto px-4 py-32 text-center relative z-10">
              <h2 className="text-5xl font-bold text-white"><span className='text-[#E4ED73]'>Millions</span> of professionals are already enjoying with Time Pro.</h2>
              <p className="mt-4 text-white text-2xl ">Be the next one.</p><br/><br/>
              <Link
          to="/login"
          className="bg-[#E4ED73] text-black px-15 py-4 rounded-full mt-5 font-bold hover:bg-[#d4de60]"
        >
          Get started
        </Link>
            </div>
          </section>

          <Footer/>
         
        </div>
      );
    };
