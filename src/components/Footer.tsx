
import React, { useState, useEffect } from "react";
import { ArrowUp, Github, Linkedin, Twitter, FileText, ExternalLink } from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [isVisible, setIsVisible] = useState(false);
  
  // Show/hide back-to-top button based on scroll position
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  
  return (
    <footer className="py-12 relative overflow-hidden">
      {/* Gradient background with improved transitions */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background to-background/40"></div>
        <div className="absolute -top-40 left-1/4 w-80 h-80 bg-primary/5 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-20 right-1/4 w-80 h-80 bg-accent/5 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* About column */}
          <div className="col-span-1">
            <h3 className="text-xl font-semibold mb-4 text-gradient-primary">Yejju Sathya Sai</h3>
            <p className="text-gray-400 text-sm mb-4">
              AI & ML Student creating innovative solutions through clean, efficient code and cutting-edge technologies.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/ysathyasai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors duration-300 transform hover:scale-110"
                aria-label="GitHub"
              >
                <Github size={18} className="hover:shadow-glow" />
              </a>
              <a 
                href="https://www.linkedin.com/in/ysathyasai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors duration-300 transform hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} className="hover:shadow-glow" />
              </a>
              <a 
                href="https://x.com/ysathyasai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors duration-300 transform hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter size={18} className="hover:shadow-glow" />
              </a>
              <a 
                href="https://medium.com/@ysathyasai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors duration-300 transform hover:scale-110"
                aria-label="Medium"
              >
                <FileText size={18} className="hover:shadow-glow" />
              </a>
              <a 
                href="https://openprofile.dev/ysathyasai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors duration-300 transform hover:scale-110"
                aria-label="OpenProfile"
              >
                <ExternalLink size={18} className="hover:shadow-glow" />
              </a>
            </div>
          </div>
          
          {/* Quick links - kept simple and essential */}
          <div className="col-span-1">
            <h3 className="text-md font-semibold mb-4 uppercase text-gray-300">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-400 hover:text-white transition-all duration-300 text-sm hover:translate-x-1 inline-block">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-white transition-all duration-300 text-sm hover:translate-x-1 inline-block">
                  About
                </a>
              </li>
              <li>
                <a href="#projects" className="text-gray-400 hover:text-white transition-all duration-300 text-sm hover:translate-x-1 inline-block">
                  Projects
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-white transition-all duration-300 text-sm hover:translate-x-1 inline-block">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact info */}
          <div className="col-span-1">
            <h3 className="text-md font-semibold mb-4 uppercase text-gray-300">Contact</h3>
            <p className="text-gray-400 text-sm mb-2">
              Government Institute of Electronics
              <br />
              East Maredapally, Secunderabad
            </p>
            <a 
              href="mailto:ysathyasai.dev@gmail.com" 
              className="text-gray-400 hover:text-primary transition-colors duration-300 text-sm"
            >
              ysathyasai.dev@gmail.com
            </a>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-500 text-sm">
              &copy; {currentYear} Yejju Sathya Sai. All rights reserved.
            </p>
          </div>
          
          <div>
            <p className="text-gray-500 text-xs">
              Built with React & TailwindCSS | Last updated: June 2024
            </p>
          </div>
        </div>
      </div>
      
      {/* Enhanced Back to top button with smoother animation */}
      <button
        onClick={scrollToTop}
        className={`fixed right-6 bottom-6 p-3 rounded-full glass border border-primary/20 hover:border-primary shadow-lg transition-all duration-500 hover:shadow-[0_0_20px_rgba(88,85,251,0.4)] z-50 group ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5 text-primary group-hover:animate-bounce-subtle" />
      </button>
    </footer>
  );
};

export default Footer;
