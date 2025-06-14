import React from 'react';
import { ArrowDown, Download, Github, Linkedin, Mail } from 'lucide-react';

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-700"></div>
        <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="space-y-8 animate-fade-in-up">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Lokesh Prasanth
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto">
              Front-End Developer
            </p>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              I create beautiful, functional, and user-centered digital experiences 
              that solve real-world problems with clean code and thoughtful design.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => scrollToSection('projects')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              View My Work
            </button>
            <button className="bg-transparent border-2 border-white hover:bg-white hover:text-slate-900 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
              <a
                href="/Lokesh_resume.pdf"
                download="Lokesh_Resume.pdf"
                className="flex items-center gap-2"
              >
                <Download size={20} />
                Download Resume
              </a>
              </button>
          </div>

          <div className="flex justify-center gap-6 pt-8">
            <a
              href="https://github.com/lokesh2707"
              className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 transform hover:scale-110 backdrop-blur-sm"
            >
              <Github size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/lokesh-prasanth-6784022a7/"
              className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 transform hover:scale-110 backdrop-blur-sm"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="mailto:lokeshsridhara2005@gmail.com"
              className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 transform hover:scale-110 backdrop-blur-sm"
            >
              <Mail size={24} />
            </a>
          </div>
        </div>
      </div>

      <button
        onClick={() => scrollToSection('about')}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
      >
        <ArrowDown size={32} className="text-white/70 hover:text-white transition-colors" />
      </button>
    </section>
  );
};

export default Hero;