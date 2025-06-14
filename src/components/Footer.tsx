import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-slate-300">
              © {currentYear} Lokesh Prasanth. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center gap-2 text-slate-300">
            <span>Made with</span>
            <Heart size={16} className="text-red-500 fill-current" />
            <span>by Lokesh Prasanth</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;