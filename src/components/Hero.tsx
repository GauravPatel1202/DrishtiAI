// components/Hero.tsx
import React from "react";
import gradientBlob from "../assets/images/gradient-blob.png";
import aiBrain from "../assets/images/image.png"; 
import { useNavigate } from "react-router-dom";

const Hero: React.FC = () => {
    const navigate = useNavigate();
    const getstarted = () => {
        navigate('/app/ai-app');
    }
  return (
      <section className="hero py-16 md:py-24 overflow-hidden">
          <div className="max-w-[1200px] mx-auto px-5 grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-12 items-center">

              {/* Left Side */}
              <div className="text-center md:text-left">
                  <span className="inline-block py-1.5 px-4 rounded-lg bg-[rgba(124,92,255,0.15)] text-[#00d1ff] text-sm font-semibold mb-4">
                      🚀 New: Workflow Builder now in beta
                  </span>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#7c5cff] to-[#00d1ff] bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradientMove_6s_linear_infinite]">
                      Build, ship, and scale with AI— in minutes.
                  </h1>
                  <p className="lead text-base sm:text-lg mt-4 text-[#a5afc7]">
                      An elegant, production-ready landing page template for AI tools and startups. No JS required.
                  </p>
                  <div className="cta mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                      <a
                          className="btn btn-primary py-3 px-6 rounded-xl font-semibold cursor-pointer transition-all duration-300 bg-gradient-to-br from-[#7c5cff] to-[#00d1ff] text-[#0b0d10] shadow-lg shadow-[rgba(124,92,255,0.25)] hover:translate-y-[-3px] hover:scale-105 hover:shadow-xl hover:shadow-[rgba(124,92,255,0.4)]"
                          onClick={getstarted}
                      >
                          Start free
                      </a>
                      <a
                          className="btn btn-ghost py-3 px-6 rounded-xl font-semibold cursor-pointer transition-all duration-300 border border-[rgba(255,255,255,0.16)] text-[#e6e8ee] hover:bg-[rgba(255,255,255,0.08)]"
                          href="#features"
                      >
                          See features
                      </a>
                  </div>
              </div>

              {/* Right Side - Multi Image Animation */}
              <div className="relative flex justify-center items-center mt-10 md:mt-0">
                  {/* Rotating gradient blob */}
                  <div className="absolute w-[260px] sm:w-[320px] md:w-[400px] animate-rotate-slow opacity-60">
                      <img
                          src={gradientBlob}
                          alt="Background Shape"
                          className="object-contain w-full h-full"
                      />
                  </div>

                  {/* Floating AI illustration */}
                  <div className="relative w-[200px] sm:w-[260px] md:w-[320px] animate-float">
                      <img
                          src={aiBrain}
                          alt="AI Illustration"
                          className="object-contain drop-shadow-2xl w-full h-full"
                      />
                  </div>
              </div>
          </div>
      </section>
  );
};

export default Hero;
