"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useState } from "react";
import { ChevronDown, Star } from "lucide-react";

const FloatingSocialBar = () => {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50 hidden sm:flex">
      {/* Twitter */}
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg border border-slate-100 hover:scale-110 hover:bg-brand-accent hover:text-white transition-all duration-300 text-brand-text-muted group">
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
      </a>
      {/* LinkedIn */}
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg border border-slate-100 hover:scale-110 hover:bg-[#0077B5] hover:text-white transition-all duration-300 text-brand-text-muted">
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
      </a>
      {/* Facebook */}
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg border border-slate-100 hover:scale-110 hover:bg-[#1877F2] hover:text-white transition-all duration-300 text-brand-text-muted">
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
      </a>
      {/* Instagram */}
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg border border-slate-100 hover:scale-110 hover:bg-[#E4405F] hover:text-white transition-all duration-300 text-brand-text-muted">
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
      </a>
      {/* YouTube */}
      <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg border border-slate-100 hover:scale-110 hover:bg-[#FF0000] hover:text-white transition-all duration-300 text-brand-text-muted">
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
      </a>
      {/* Email */}
      <a href="mailto:contact@ainity.example.com" className="bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg border border-slate-100 hover:scale-110 hover:bg-brand-accent hover:text-white transition-all duration-300 text-brand-text-muted">
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/></svg>
      </a>
    </div>
  );
};

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const courses = [
    {
      title: "Introduction to Artificial Intelligence",
      rating: 4.8,
      students: "12,400",
      target: "Beginners & Tech Enthusiasts",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "Advanced Aquatic Drones Engineering",
      rating: 4.9,
      students: "8,200",
      target: "Mechanical Engineers & Hobbyists",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "Machine Learning in Oceanography",
      rating: 4.7,
      students: "5,100",
      target: "Researchers & Marine Scientists",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
    },
    {
      title: "Autonomous Underwater Vehicles (AUVs)",
      rating: 4.6,
      students: "3,800",
      target: "Robotics Students & Engineers",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "QA Automation with AI",
      rating: 4.9,
      students: "9,100",
      target: "Software Testers & Developers",
      image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=2128&auto=format&fit=crop",
    }
  ];

  const faqs = [
    { question: "Do I need prior coding experience?", answer: "Not at all! Our Introduction to AI course is designed for complete beginners with no prior programming knowledge." },
    { question: "How are the aquatic drones courses delivered?", answer: "Courses feature high-quality video lectures, 3D interactive simulations, and optional physical build kits shipped to your door." },
    { question: "Do I get a certificate upon completion?", answer: "Yes, you receive an industry-recognized AINITY certification for every course you successfully complete." },
  ];

  const testimonials = [
    { name: "Priya Sharma", role: "Marine Biologist", text: "The Machine Learning in Oceanography course completely transformed how I analyze sonar data. Highly recommended!" },
    { name: "Arjun Mehta", role: "Software Engineer", text: "Incredible platform. The UI is stunning and the AI curriculum is world-class. Worth every penny." },
    { name: "Ananya Iyer", role: "Robotics Student", text: "The AUV course gave me practical insights I couldn't find anywhere else. The simulations are insanely good." },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const }
    }
  };

  return (
    <>
      <FloatingSocialBar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* HERO SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-16 rounded-3xl overflow-hidden shadow-2xl relative min-h-[400px] flex items-center"
        >
          <Image 
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" 
            alt="AI and Humanity Abstract Background" 
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-brand-primary/60 z-0"></div>
          <div className="relative z-10 px-8 py-16 sm:px-16 sm:py-24 text-white">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 drop-shadow-md min-h-[4rem] sm:min-h-[5rem] flex items-center">
              Master the Future with AI & Robotics
            </h1>
            <p className="text-xl sm:text-2xl text-brand-accent-soft max-w-2xl mb-8 drop-shadow-sm">
              Explore cutting-edge domains like AI technology and aquatic drones. Learn from industry leaders and build tomorrow's technology today.
            </p>
            <Link href="/learning" className="inline-block bg-white text-brand-primary font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-brand-accent-soft hover:scale-105 transition-all transform">
              Start Learning
            </Link>
          </div>
        </motion.div>

        {/* COURSES SECTION */}
        <div className="mb-20 pr-0 sm:pr-16">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-extrabold text-brand-primary mb-8 tracking-tight"
          >
            Featured Courses
          </motion.h2>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {courses.map((course, idx) => (
              <motion.div key={idx} variants={itemVariants} className="h-full">
                <Link href="/learning" className="block h-full">
                  <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-slate-50 cursor-pointer group h-full flex flex-col hover:shadow-xl transition-shadow duration-300">
                    <div className="h-48 w-full relative overflow-hidden bg-slate-100 shrink-0">
                      <Image 
                        src={course.image} 
                        alt={course.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-3 left-3 bg-brand-accent/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md border border-white/20">
                        Coming Soon
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="font-bold text-brand-primary mb-1 line-clamp-2 min-h-[3rem] leading-tight">{course.title}</h3>
                      <p className="text-xs text-brand-accent font-semibold mb-3 tracking-wide">{course.target}</p>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center">
                          <span className="text-yellow-500 text-sm font-bold mr-1">{course.rating}</span>
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-brand-text-muted text-xs ml-1">({course.students})</span>
                        </div>
                        <span className="text-xs font-bold text-brand-accent px-2 py-1 bg-brand-accent-soft rounded group-hover:bg-brand-accent group-hover:text-white transition-colors">Enroll Now</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>



        {/* FOUNDER MESSAGE SECTION */}
        <div className="mb-20 pr-0 sm:pr-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-slate-900 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/20 blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-primary/20 blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
              <div className="w-48 h-48 rounded-2xl overflow-hidden shrink-0 shadow-2xl border-2 border-brand-accent/30 rotate-3">
                <Image 
                  src="/images/founder.jpeg" 
                  alt="Durga Prasad Bandaru" 
                  fill 
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-3xl font-extrabold text-white mb-6 tracking-tight">A Message From Our Founder</h2>
                <p className="text-brand-accent-soft text-lg leading-relaxed mb-6 italic">
                  "I founded AINITY with a simple but powerful belief: that the tools of the future should belong to everyone. Whether you are in a tech hub or a rural village, your ideas deserve to become reality. Our platform is designed to help people across all sectors upskill themselves and drive innovation in their own domains. We are here to ensure that background and geography are never barriers to growth, learning, and making a real-world impact."
                </p>
                <div>
                  <div className="text-white font-bold text-xl">Durga Prasad Bandaru</div>
                  <div className="text-brand-accent font-medium">Founder & Lead Architect</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* TESTIMONIALS SECTION */}
        <div className="mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-extrabold text-brand-primary mb-8 tracking-tight text-center"
          >
            What Our Students Say
          </motion.h2>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
             {testimonials.map((testimonial, idx) => (
              <motion.div key={idx} variants={itemVariants} className="bg-white p-8 rounded-3xl shadow-lg border border-slate-50 relative">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />)}
                </div>
                <p className="text-brand-text-muted mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <h4 className="font-bold text-brand-primary">{testimonial.name}</h4>
                  <p className="text-sm text-brand-accent font-medium">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* FAQ SECTION */}
        <div className="mb-12 max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-extrabold text-brand-primary mb-8 tracking-tight text-center"
          >
            Frequently Asked Questions
          </motion.h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 flex justify-between items-center text-left focus:outline-none"
                >
                  <span className="font-bold text-brand-primary">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-4 text-slate-600">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}
