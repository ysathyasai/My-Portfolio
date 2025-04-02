
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Performance optimized page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.1,
      when: "beforeChildren",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

const Index: React.FC = () => {
  // Optimized scroll behavior
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.hash && anchor.hash.startsWith('#')) {
        e.preventDefault();
        const element = document.querySelector(anchor.hash);
        if (element) {
          window.scrollTo({
            top: element.getBoundingClientRect().top + window.scrollY - 80,
            behavior: 'smooth'
          });
        }
      }
    };
    
    document.addEventListener('click', handleAnchorClick, { passive: false });
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <motion.div 
      className="min-h-screen bg-background text-foreground overflow-hidden"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Contact />
      <Footer />
    </motion.div>
  );
};

export default Index;
