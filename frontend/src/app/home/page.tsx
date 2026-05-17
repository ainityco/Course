"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform, type Variants } from "framer-motion";
import { useState, useRef } from "react";
import { ChevronDown, Star, ArrowRight } from "lucide-react";

// Premium 3D Mouse-Move Parallax Card with dynamic spotlight glow
const ParallaxCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowX, setGlowX] = useState(0);
  const [glowY, setGlowY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    
    // Smooth 3D tilt calculation
    const xc = box.width / 2;
    const yc = box.height / 2;
    const rx = -(y - yc) / (box.height / 12);
    const ry = (x - xc) / (box.width / 12);
    
    setRotateX(rx);
    setRotateY(ry);
    setGlowX(x);
    setGlowY(y);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      animate={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        scale: isHovered ? 1.02 : 1,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      className={`relative overflow-hidden group ${className}`}
    >
      {/* Radial Spotlight Glow */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
        style={{
          background: `radial-gradient(350px circle at ${glowX}px ${glowY}px, rgba(59, 130, 246, 0.2), transparent 80%)`
        }}
      />
      {children}
    </motion.div>
  );
};

const FloatingSocialBar = () => {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50 hidden sm:flex">
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-slate-900/60 backdrop-blur-md p-3 rounded-full shadow-lg border border-white/5 hover:scale-110 hover:bg-brand-accent hover:text-white transition-all duration-300 text-slate-400 group">
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
      </a>
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-slate-900/60 backdrop-blur-md p-3 rounded-full shadow-lg border border-white/5 hover:scale-110 hover:bg-[#0077B5] hover:text-white transition-all duration-300 text-slate-400">
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
      </a>
      <a href="mailto:ainity.345@gmail.com" className="bg-slate-900/60 backdrop-blur-md p-3 rounded-full shadow-lg border border-white/5 hover:scale-110 hover:bg-brand-accent hover:text-white transition-all duration-300 text-slate-400">
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/></svg>
      </a>
    </div>
  );
};

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // Parallax scroll calculations for the Hero
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const courses = [
    {
      title: "AI Foundations for Students and Professionals",
      rating: 4.8,
      students: "1,200+",
      target: "Beginners & Career Starters",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "Practical Drone Technology and Robotics",
      rating: 4.9,
      students: "850+",
      target: "Engineering Students & Makers",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "Machine Learning for Real-World Projects",
      rating: 4.7,
      students: "900+",
      target: "Developers & Data Learners",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
    },
    {
      title: "Autonomous Systems and IoT Basics",
      rating: 4.6,
      students: "600+",
      target: "Robotics & IoT Learners",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "AI-Powered QA and Test Automation",
      rating: 4.9,
      students: "1,000+",
      target: "QA Engineers & Developers",
      image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=2128&auto=format&fit=crop",
    }
  ];

  const faqs = [
    { question: "Do I need prior coding experience?", answer: "Not at all! Our Introduction to AI course is designed for complete beginners with no prior programming knowledge." },
    { question: "How are the aquatic drones courses delivered?", answer: "Courses feature high-quality video lectures, 3D interactive simulations, and optional physical build kits shipped to your door." },
    { question: "Do I get a certificate upon completion?", answer: "Yes, you receive an industry-recognized AINITY certification for every course you successfully complete." },
  ];

  const testimonials = [
    { name: "Priya Sharma", role: "QA Automation Engineer", text: "AINITY helped me understand how AI can support test automation, from smarter test cases to faster defect analysis." },
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
      
      {/* Cybernetic Tech Grid and Cosmic Glow Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0"></div>
      <div className="absolute top-[20%] left-[10%] w-[450px] h-[450px] bg-blue-500/5 blur-[160px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute top-[60%] right-[10%] w-[500px] h-[500px] bg-indigo-500/5 blur-[180px] rounded-full pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        
        {/* PARALLAX HERO SECTION */}
        <div 
          ref={heroRef}
          className="mb-20 rounded-3xl overflow-hidden shadow-2xl relative min-h-[460px] flex items-center border border-white/5 bg-slate-950"
        >
          {/* Scroll-Parallaxed Background */}
          <motion.div 
            style={{ y: yBg, opacity: opacityHero }}
            className="absolute inset-0 w-full h-[130%] -top-[15%] z-0"
          >
            <Image 
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" 
              alt="AI and Humanity Abstract Background" 
              fill
              priority
              className="object-cover object-center"
            />
          </motion.div>
          
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-[1px] z-0"></div>
          
          {/* Scroll-Parallaxed Text */}
          <motion.div 
            style={{ y: yText, opacity: opacityHero }}
            className="relative z-10 px-8 py-20 sm:px-16 sm:py-24 text-white max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-accent/15 border border-brand-accent/35 text-brand-accent text-xs font-bold uppercase tracking-wider mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-ping"></span>
              Universal Learning & Innovation
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 drop-shadow-md text-glow leading-tight">
              Master the Future <br/>
              <span className="bg-gradient-to-r from-blue-400 via-indigo-200 to-white bg-clip-text text-transparent">with AI & Robotics</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mb-10 leading-relaxed font-light">
              Explore cutting-edge domains like AI technology, robotics, and advanced automation. Learn from industry leaders and build tomorrow&apos;s technology today.
            </p>
            <Link href="/learning" className="inline-flex items-center gap-3 bg-brand-accent hover:bg-blue-600 text-white font-bold py-4 px-10 rounded-xl shadow-[0_0_30px_rgba(59,130,246,0.35)] hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] hover:scale-105 transition-all duration-300 transform">
              Start Learning <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>

        {/* FEATURED CURRICULUMS SECTION */}
        <div className="mb-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
            <div>
              <p className="text-brand-accent text-xs font-extrabold tracking-widest uppercase mb-3">Academic Paths</p>
              <h2 className="text-3xl font-extrabold text-white tracking-tight text-glow">Featured Curriculums</h2>
            </div>
            <p className="text-slate-400 text-sm max-w-sm mt-3 sm:mt-0 font-light leading-relaxed">
              Explore state-of-the-art syllabus modules crafted alongside leading global tech pioneers.
            </p>
          </div>

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
                  <ParallaxCard className="glass-panel rounded-2xl border border-white/5 flex flex-col h-full hover:border-brand-accent/40 shadow-lg">
                    <div className="h-40 w-full relative overflow-hidden bg-slate-900 shrink-0">
                      <Image 
                        src={course.image} 
                        alt={course.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out opacity-80"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-60"></div>
                      <div className="absolute top-3 left-3 bg-brand-accent/20 backdrop-blur-md text-brand-accent text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-brand-accent/30 shadow-md">
                        Coming Soon
                      </div>
                    </div>
                    
                    <div className="p-5 flex flex-col flex-grow relative z-20">
                      <h3 className="font-bold text-white mb-2 line-clamp-2 min-h-[3rem] leading-snug group-hover:text-glow transition-all duration-300">{course.title}</h3>
                      <p className="text-xs text-brand-accent font-semibold mb-4 tracking-wide">{course.target}</p>
                      
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                        <div className="flex items-center">
                          <span className="text-yellow-400 text-sm font-bold mr-1">{course.rating}</span>
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-slate-500 text-xs ml-1">({course.students})</span>
                        </div>
                        <span className="text-xs font-bold text-slate-300 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10 group-hover:bg-brand-accent group-hover:text-white group-hover:border-brand-accent transition-all duration-300">Enroll</span>
                      </div>
                    </div>
                  </ParallaxCard>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* FOUNDER MESSAGE SECTION */}
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl border border-white/5"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-accent/5 blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-600/5 blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
              <div className="w-48 h-48 rounded-2xl overflow-hidden shrink-0 shadow-2xl border-2 border-brand-accent/25 rotate-3 relative">
                <Image 
                  src="/images/founder.jpeg" 
                  alt="Durga Prasad Bandaru" 
                  fill 
                  className="object-cover"
                />
              </div>
              <div>
                <span className="text-brand-accent text-xs font-extrabold tracking-widest uppercase mb-3 block">Our Core Belief</span>
                <h2 className="text-3xl font-extrabold text-white mb-5 tracking-tight text-glow">A Message From Our Founder</h2>
                <p className="text-slate-300 text-lg leading-relaxed mb-6 italic font-light">
                  &quot;I founded AINITY with a simple but powerful belief: that the tools of the future should belong to everyone. Whether you are in a tech hub or a rural village, your ideas deserve to become reality. Our platform is designed to help people across all sectors upskill themselves and drive innovation in their own domains. We are here to ensure that background and geography are never barriers to growth, learning, and making a real-world impact.&quot;
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
        <div className="mb-24">
          <div className="text-center mb-16">
            <p className="text-brand-accent text-xs font-extrabold tracking-widest uppercase mb-3">Global Impact</p>
            <h2 className="text-3xl font-extrabold text-white tracking-tight text-glow">What Our Students Say</h2>
          </div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
             {testimonials.map((testimonial, idx) => (
              <motion.div key={idx} variants={itemVariants} className="h-full">
                <ParallaxCard className="glass-panel p-8 rounded-3xl shadow-lg border border-white/5 flex flex-col justify-between h-full hover:border-brand-accent/30 duration-300">
                  <div className="relative z-20">
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />)}
                    </div>
                    <p className="text-slate-300 mb-6 italic leading-relaxed font-light">&quot;{testimonial.text}&quot;</p>
                  </div>
                  <div className="pt-4 border-t border-white/5 mt-auto relative z-20">
                    <h4 className="font-bold text-white">{testimonial.name}</h4>
                    <p className="text-sm text-brand-accent font-medium">{testimonial.role}</p>
                  </div>
                </ParallaxCard>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* FAQ SECTION */}
        <div className="mb-12 max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-brand-accent text-xs font-extrabold tracking-widest uppercase mb-3">Support</p>
            <h2 className="text-3xl font-extrabold text-white tracking-tight text-glow">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-panel rounded-2xl overflow-hidden border border-white/5"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none hover:bg-white/5 transition-colors duration-300"
                >
                  <span className="font-bold text-white">{faq.question}</span>
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
                      <div className="px-6 pb-5 text-slate-300 border-t border-white/5 pt-3 leading-relaxed font-light">
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
