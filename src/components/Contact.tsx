import React, { useRef, useEffect, useState } from "react";
import { Github, Linkedin, Mail, ExternalLink, Twitter, FileText, Send, MessageCircle } from "lucide-react";
import { toast } from "sonner";

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formErrors, setFormErrors] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);

  // Animation for pulsing contact button
  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setIsPulsing(prev => !prev);
    }, 2000);

    return () => clearInterval(pulseInterval);
  }, []);

  // Animation for opening envelope when user scrolls to contact section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            setTimeout(() => setEnvelopeOpen(true), 600);
            const fadeElements = entry.target.querySelectorAll('.fade-up');
            fadeElements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('visible');
                el.classList.remove('hidden');
                el.classList.add('opacity-100');
                el.classList.remove('opacity-0');
              }, index * 100);
            });
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: '', email: '', message: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    }

    setFormErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      // Create mailto link with form data
      const subject = `Message from ${formData.name}`;
      const body = `${formData.message}\n\nFrom: ${formData.name} (${formData.email})`;
      const mailtoLink = `mailto:ysathyasai.dev@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      // Open email client
      window.location.href = mailtoLink;

      // Show success toast
      toast.success("Opening your email client to send the message!");

      // Reset form after short delay
      setTimeout(() => {
        setFormData({ name: '', email: '', message: '' });
        setIsSubmitting(false);
      }, 1000);
    }
  };

  // Dynamic text animation
  const [textIndex, setTextIndex] = useState(0);
  const contactTexts = [
    "Let's work together on your next project!",
    "Have a question? I'm here to help!",
    "Want to discuss an opportunity?",
    "Let's create something amazing!"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex(prev => (prev + 1) % contactTexts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setEnvelopeOpen((prev) => !prev);
    }, 5000); // Toggle every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="py-24 relative transition-all duration-500">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 left-40 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-accent/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-background via-background/80 to-transparent opacity-70"></div>
      </div>

      <div className="section-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-16 text-center fade-up hidden transition-all duration-500 transform translate-y-8">
          <h2 className="text-3xl font-bold tracking-tight text-gradient">Get In Touch</h2>
          <div className="h-1 w-24 mx-auto mt-4 bg-gradient-to-r from-primary via-accent to-primary/50 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form Section */}
          <div className="glass-card rounded-2xl p-8 fade-up hidden transition-all duration-500 transform translate-y-8 hover:shadow-glow transition-all duration-300">
            <div className="mb-6">
              <h3 className="text-xl font-medium mb-4 text-gradient-primary">Send Me a Message</h3>
              <p className="text-gray-300 mb-6">
                <span className="block h-12 text-gradient font-semibold">
                  {contactTexts[textIndex]}
                </span>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full p-3 glass rounded-lg focus:ring-2 focus:ring-primary/50 transition-all ${formErrors.name ? 'border-red-500' : 'border-white/10'}`}
                  placeholder="Your name"
                />
                {formErrors.name && <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full p-3 glass rounded-lg focus:ring-2 focus:ring-primary/50 transition-all ${formErrors.email ? 'border-red-500' : 'border-white/10'}`}
                  placeholder="your.email@example.com"
                />
                {formErrors.email && <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className={`w-full p-3 glass rounded-lg focus:ring-2 focus:ring-primary/50 transition-all ${formErrors.message ? 'border-red-500' : 'border-white/10'}`}
                  placeholder="What would you like to discuss?"
                ></textarea>
                {formErrors.message && <p className="mt-1 text-sm text-red-500">{formErrors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 btn-gradient rounded-lg flex items-center justify-center space-x-2 transform transition ${
                  isPulsing ? 'scale-[1.03] shadow-[0_0_25px_rgba(88,85,251,0.4)]' : 'scale-[1.00]'
                } hover:scale-[1.02] active:scale-[0.98]`}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <span className="animate-spin h-5 w-5 mr-3 border-2 border-white border-t-transparent rounded-full"></span>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </span>
                )}
              </button>
            </form>
          </div>

          {/* Connect Section */}
          <div className="flex flex-col">
            <div className="glass-card rounded-2xl p-8 fade-up hidden transition-all duration-500 transform translate-y-8 mb-6 h-[320px] flex items-center justify-center relative overflow-hidden">
              <div className={`transition-all duration-700 transform ${envelopeOpen ? 'scale-110' : 'scale-100'}`}>
                <div className="relative">
                  <Mail 
                    className={`w-24 h-24 text-primary transition-all duration-700 transform ${envelopeOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`} 
                  />
                  <MessageCircle 
                    className={`w-24 h-24 text-primary absolute top-0 left-0 transition-all duration-700 transform ${envelopeOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`} 
                  />
                </div>
                <p className="text-xl mt-6 text-center text-gradient-primary">
                  {envelopeOpen ? "Let's Connect!" : "Send me an email"}
                </p>
                <div className="mt-4 text-center">
                  <a
                    href="mailto:ysathyasai.dev@gmail.com"
                    className="inline-flex items-center text-center px-5 py-2 glass border border-primary/30 rounded-full hover:border-primary transition-all duration-300 hover:shadow-glow group"
                  >
                    <Mail className="w-4 h-4 mr-2 text-primary group-hover:animate-pulse" />
                    <span className="text-sm">ysathyasai.dev@gmail.com</span>
                  </a>
                </div>
              </div>

              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 to-accent/5"></div>
                <div className="absolute top-10 right-10 w-20 h-20 bg-primary/10 rounded-full filter blur-2xl animate-pulse-slow"></div>
                <div className="absolute bottom-10 left-10 w-16 h-16 bg-accent/10 rounded-full filter blur-2xl animate-pulse-slow" style={{ animationDelay: "1s" }}></div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-8 fade-up hidden transition-all duration-500 transform translate-y-8 flex-1">
              <h3 className="text-xl font-medium mb-6 text-gradient-primary">Connect With Me</h3>

              <div className="grid grid-cols-2 gap-4">
                <a 
                  href="https://github.com/ysathyasai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-3 p-4 glass rounded-lg hover:bg-primary/10 transition-all duration-300 hover:scale-105 hover:shadow-glow"
                >
                  <Github className="w-6 h-6 text-primary" />
                  <span className="text-sm">GitHub</span>
                </a>

                <a 
                  href="https://www.linkedin.com/in/ysathyasai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-3 p-4 glass rounded-lg hover:bg-primary/10 transition-all duration-300 hover:scale-105 hover:shadow-glow"
                >
                  <Linkedin className="w-6 h-6 text-primary" />
                  <span className="text-sm">LinkedIn</span>
                </a>

                <a 
                  href="https://x.com/ysathyasai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-3 p-4 glass rounded-lg hover:bg-primary/10 transition-all duration-300 hover:scale-105 hover:shadow-glow"
                >
                  <Twitter className="w-6 h-6 text-primary" />
                  <span className="text-sm">Twitter/X</span>
                </a>

                <a 
                  href="https://medium.com/@ysathyasai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-3 p-4 glass rounded-lg hover:bg-primary/10 transition-all duration-300 hover:scale-105 hover:shadow-glow"
                >
                  <FileText className="w-6 h-6 text-primary" />
                  <span className="text-sm">Medium</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
