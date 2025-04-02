
import React, { useEffect, useRef, useState, useCallback } from "react";
import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [typedText, setTypedText] = useState("");
  const fullName = "Yejju Sathya Sai";
  const [typeIndex, setTypeIndex] = useState(0);
  
  // Optimized typing animation with useCallback
  const typeText = useCallback(() => {
    if (typeIndex < fullName.length) {
      requestAnimationFrame(() => {
        setTypedText(prev => prev + fullName.charAt(typeIndex));
        setTypeIndex(prev => prev + 1);
      });
    } else {
      // Reset typing after delay
      setTimeout(() => {
        setTypedText("");
        setTypeIndex(0);
      }, 5000);
    }
  }, [typeIndex, fullName]);

  useEffect(() => {
    const typingDelay = setTimeout(typeText, 150);
    return () => clearTimeout(typingDelay);
  }, [typeIndex, typeText]);

  // Optimized intersection observer for animations
  useEffect(() => {
    if (!heroRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.animate-on-scroll').forEach((element, index) => {
              requestAnimationFrame(() => {
                element.classList.add('animate-fade-in');
              });
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    
    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.section 
      id="home" 
      ref={heroRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden will-change-transform"
    >
      {/* Hardware-accelerated video background */}
      <video 
        autoPlay 
        muted 
        loop 
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover z-[-1] transform-gpu"
      >
        <source 
          src="https://res.cloudinary.com/dlkksfa9e/video/upload/v1741388922/nwunqyg7pk9qdsltfbu0.mp4" 
          type="video/mp4" 
        />
      </video>
      
      {/* Optimized overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] z-[-1]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="glass-card p-8 md:p-10 rounded-2xl transform-gpu"
        >
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl bg-gradient-to-r from-primary via-accent to-blue-400 bg-clip-text text-transparent font-medium mb-4"
          >
            Hello, I'm
          </motion.h2>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="relative rounded-xl p-1 inline-block bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold p-4 tracking-tight bg-gradient-to-r from-primary via-accent to-blue-400 bg-clip-text text-transparent">
              {typedText}<span className="animate-pulse">|</span>
            </h1>
          </motion.div>
          
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="h-px w-40 mx-auto my-8 bg-gradient-to-r from-primary via-accent to-primary/50"
          />

          <motion.h3 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl sm:text-2xl md:text-3xl bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent font-medium max-w-2xl mx-auto mb-4"
          >
            Student at Government Institute of Electronics
          </motion.h3>

          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto mb-12"
          >
            Specializing in Artificial Intelligence and Machine Learning
          </motion.p>
          
          <motion.a
            href="#about"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block transform-gpu"
            aria-label="Scroll to About section"
          >
            <div className="glass p-3 rounded-full border border-primary/20 hover:border-primary transition-colors duration-300 hover:shadow-glow">
              <ArrowDown className="w-6 h-6 text-primary" />
            </div>
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;
