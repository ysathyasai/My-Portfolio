
import React, { useState, useEffect } from "react";
import { NavItem } from "@/lib/types";
import { Menu, X, Github, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeSection, setActiveSection] = useState("home");

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
      
      // Update active section based on scroll position
      const sections = document.querySelectorAll('section[id]');
      const scrollY = window.pageYOffset;
      
      sections.forEach(current => {
        const sectionHeight = (current as HTMLElement).offsetHeight;
        const sectionTop = (current as HTMLElement).offsetTop - 100;
        const sectionId = current.getAttribute('id') || '';
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrollPosition > 20
          ? "py-3 glass shadow-lg backdrop-blur-lg"
          : "py-5 bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <a 
            href="#home"
            className="text-2xl font-semibold tracking-tighter text-white hover:text-primary transition-colors duration-300"
          >
            YS<span className="text-primary">.</span>
          </a>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "text-gray-300 hover:text-white transition-colors relative py-2",
                  "after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[2px] after:bg-primary after:origin-left after:transition-transform",
                  activeSection === item.href.substring(1) 
                    ? "text-white after:scale-x-100" 
                    : "after:scale-x-0 hover:after:scale-x-100"
                )}
                onClick={() => setActiveSection(item.href.substring(1))}
              >
                {item.label}
              </a>
            ))}
            
            <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gray-700">
              <a 
                href="https://github.com/ysathyasai" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub Profile"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://www.linkedin.com/in/ysathyasai" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-300 hover:text-white focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden fixed inset-0 bg-background/95 backdrop-blur-md glass z-40 transition-all duration-300 ease-in-out transform",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8 text-xl">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "text-white hover:text-primary transition-colors duration-300",
                activeSection === item.href.substring(1) && "text-primary"
              )}
              onClick={() => {
                closeMenu();
                setActiveSection(item.href.substring(1));
              }}
            >
              {item.label}
            </a>
          ))}
          
          <div className="flex items-center space-x-6 mt-8 pt-8 border-t border-gray-800 w-32 justify-center">
            <a 
              href="https://github.com/ysathyasai" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="GitHub Profile"
            >
              <Github size={24} />
            </a>
            <a 
              href="https://www.linkedin.com/in/ysathyasai" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={24} />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
