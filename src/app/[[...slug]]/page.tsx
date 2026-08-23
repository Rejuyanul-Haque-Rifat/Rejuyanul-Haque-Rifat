"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const CONFIG = {
    telegram: {
        botToken: "8863449813:AAEGCyv77o9_2erL_rnb3d6ddkdkJ_ZnDkA",
        chatId: "7380295803"
    },
    googleSheetUrl: "", 
    roles: [
        "Electrical Engineer",
        "IoT Innovator",
        "Robotics Builder",
        "Industrial Creator",
        "Full Stack Developer"
    ],
    socialLinks: [
        { icon: 'fa-github', url: 'https://github.com/rejuyanul-haque-rifat', color: 'hover:text-slate-900 dark:hover:text-white hover:border-slate-900 dark:hover:border-white' },
        { icon: 'fa-facebook', url: 'https://facebook.com/rejuyanul.haque.rifat.r', color: 'hover:text-electric hover:border-electric' },
        { icon: 'fa-telegram', url: 'https://t.me/+8801522138626', color: 'hover:text-neon hover:border-neon' },
        { icon: 'fa-whatsapp', url: 'https://wa.me/+8801522138626', color: 'hover:text-circuit hover:border-circuit' }
    ],
    skills: [
        { title: "ইলেকট্রিক্যাল ইঞ্জিনিয়ারিং", icon: "fa-bolt", color: "text-energy", items: ["Planning", "Installation", "Testing", "Maintenance", "Industrial Works", "Power System"] },
        { title: "ইলেকট্রনিক্স", icon: "fa-microchip", color: "text-neon", items: ["MOSFET", "IGBT", "TRIAC", "SCR", "Amplifier", "Microprocessor"] },
        { title: "এমবেডেড সিস্টেম", icon: "fa-memory", color: "text-electric", items: ["Arduino", "ESP32", "NodeMCU", "Raspberry Pi"] },
        { title: "ডেভেলপমেন্ট", icon: "fa-laptop-code", color: "text-purple-500 dark:text-purple-400", items: ["Full Stack", "UI UX", "Web App"] },
        { title: "ইন্ডাস্ট্রিয়াল", icon: "fa-industry", color: "text-orange-500 dark:text-orange-400", items: ["Welding", "Fabrication", "Workshop"] },
        { title: "ক্রিয়েটিভ", icon: "fa-camera-retro", color: "text-pink-500 dark:text-pink-400", items: ["Photography", "Editing", "Graphics"] }
    ],
    projects: [
        { name: "BPI RCY BLOOD FINDER", link: "https://bpi-blood-finder.web.app", type: "Web App", icon: "fa-heartbeat" },
        { name: "SMART FISH BREEDER", link: "https://smart-fish-breeder-aqunar.vercel.app", type: "IoT & Web", icon: "fa-fish" },
        { name: "SMART ENERGY METER", link: "https://smart-energy-meter-electro-ix.vercel.app", type: "Electrical & IoT", icon: "fa-tachometer-alt" },
        { name: "SMART TRAFFIC SOLVING", link: "https://smart-traffic-solving.vercel.app", type: "Automation", icon: "fa-traffic-light" },
        { name: "SMART RAIL PASSENGER", link: "https://smart-rail-passenger.vercel.app", type: "Full System", icon: "fa-train" },
        { name: "SMART IRRIGATION", link: "https://smart-irrigation-system-srcb.vercel.app", type: "Agri-Tech", icon: "fa-seedling" },
        { name: "RESCUE ROBOT", link: "#", type: "Robotics", icon: "fa-robot" },
        { name: "SMART HOME SECURITY", link: "#", type: "IoT Security", icon: "fa-shield-alt" }
    ]
};



export default function App() {
  const [isDark, setIsDark] = useState<boolean>(true);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [toasts, setToasts] = useState<{ id: number; msg: string; type: string }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const typedRef = useRef<any>(null);
  const pathname = usePathname();

  useEffect(() => {
    const path = pathname?.replace('/', '');
    if (path) {
      const el = document.getElementById(path);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname]);

  useEffect(() => {
    // Disable right click and devtools shortcuts to protect source code
    const handleContextMenu = (e) => e.preventDefault();
    const handleKeyDown = (e) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i')) ||
        (e.ctrlKey && e.shiftKey && (e.key === 'J' || e.key === 'j')) ||
        (e.ctrlKey && e.shiftKey && (e.key === 'C' || e.key === 'c')) ||
        (e.ctrlKey && (e.key === 'U' || e.key === 'u')) ||
        (e.metaKey && e.altKey && (e.key === 'I' || e.key === 'i')) ||
        (e.metaKey && e.altKey && (e.key === 'J' || e.key === 'j')) ||
        (e.metaKey && e.altKey && (e.key === 'C' || e.key === 'c')) ||
        (e.metaKey && e.shiftKey && (e.key === 'C' || e.key === 'c'))
      ) {
        e.preventDefault();
      }
    };
    
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
      setIsDark(true);
    } else {
      setIsDark(false);
    }

    const isDesktop = window.matchMedia('(min-width: 768px)').matches;

    const handleMouseMove = (e) => {
      if (!isDesktop) return;
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px';
        cursorRef.current.style.top = e.clientY + 'px';
      }
      if (cursorRingRef.current) {
        setTimeout(() => {
          if (cursorRingRef.current) {
            cursorRingRef.current.style.left = e.clientX + 'px';
            cursorRingRef.current.style.top = e.clientY + 'px';
          }
        }, 50);
      }
    };

    if (isDesktop) {
      document.addEventListener('mousemove', handleMouseMove);
    }

    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .magnetic-btn, img');
    
    const handleMouseEnter = () => {
      if (!isDesktop) return;
      if (cursorRef.current) cursorRef.current.style.transform = 'translate(-50%, -50%) scale(1.5)';
      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorRingRef.current.style.borderColor = '#0ea5e9';
      }
    };

    const handleMouseLeave = () => {
      if (!isDesktop) return;
      if (cursorRef.current) cursorRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorRingRef.current.style.borderColor = 'rgba(6, 182, 212, 0.6)';
      }
    };

    if (isDesktop) {
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    }

    if (window.Typed) {
      typedRef.current = new window.Typed('#typed-text', {
        strings: CONFIG.roles,
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true,
        cursorChar: '_'
      });
    }

    if (window.gsap && window.ScrollTrigger) {
      window.gsap.registerPlugin(window.ScrollTrigger);
      setTimeout(() => {
        window.gsap.utils.toArray('.gs-reveal').forEach(function(elem) {
          window.gsap.fromTo(elem, 
            { y: 40, opacity: 0 }, 
            { 
              y: 0, opacity: 1, duration: 1, ease: "power3.out",
              scrollTrigger: {
                trigger: elem,
                start: "top 85%",
                toggleActions: "play none none reverse"
              }
            }
          );
        });
        
        window.gsap.fromTo('.hero-reveal',
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out", stagger: 0.2 }
        );
      }, 100);
    }

    return () => {
      if (isDesktop) {
        document.removeEventListener('mousemove', handleMouseMove);
        interactiveElements.forEach(el => {
          el.removeEventListener('mouseenter', handleMouseEnter);
          el.removeEventListener('mouseleave', handleMouseLeave);
        });
      }
      if (typedRef.current) {
        typedRef.current.destroy();
      }
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScrollTopBtn = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScrollTopBtn);
    return () => window.removeEventListener('scroll', handleScrollTopBtn);
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    html.classList.toggle('dark');
    html.classList.toggle('light');
    setIsDark(html.classList.contains('dark'));
  };

  const showToast = (msg: string, type: string = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, msg, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = (formData.get('senderName') as string)?.trim();
    const phone = (formData.get('senderPhone') as string)?.trim();
    const msg = (formData.get('senderMsg') as string)?.trim();

    if (!name) return showToast('Identity [Name] is required!', 'warning');
    if (!phone) return showToast('Ping Address [Phone] is required!', 'warning');
    if (!/^[0-9]{11}$/.test(phone)) return showToast('Ping Address must be 11 digits!', 'error');
    if (!msg) return showToast('Payload [Message] is empty!', 'warning');

    setIsSubmitting(true);
    
    const text = `🚀 *New Cyber Lead*\n\n👤 *ID:* ${name}\n📞 *Ping:* ${phone}\n💬 *Payload:* ${msg}`;
    const tgUrl = `https://api.telegram.org/bot${CONFIG.telegram.botToken}/sendMessage`;

    try {
      await fetch(tgUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: CONFIG.telegram.chatId, text: text, parse_mode: 'Markdown' })
      });
      showToast('Data Transmitted Successfully!', 'success');
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      showToast('Transmission Failed!', 'error');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex flex-col w-full relative">
      <div id="custom-cursor" ref={cursorRef} className="hidden md:block"></div>
      <div id="cursor-ring" ref={cursorRingRef} className="hidden md:block"></div>
      <div className="bg-grid-pattern"></div>
      <div className="circuit-lines"></div>


      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[99999] flex flex-col gap-3 pointer-events-none">
        {toasts.map(toast => {
          const colors = {
            success: 'bg-circuit text-white border-white/20 shadow-[0_0_20px_rgba(16,185,129,0.5)]',
            error: 'bg-red-600 text-white border-white/20 shadow-[0_0_20px_rgba(220,38,38,0.5)]',
            warning: 'bg-energy text-black border-black/10 shadow-[0_0_20px_rgba(234,179,8,0.5)]'
          };
          const icons = {
            success: 'fa-check-circle',
            error: 'fa-times-circle',
            warning: 'fa-exclamation-triangle'
          };
          return (
            <div key={toast.id} className={`flex items-center gap-3 md:gap-4 px-4 py-3 md:px-6 md:py-4 rounded-xl md:rounded-2xl border font-black uppercase tracking-widest text-xs md:text-sm transition-transform duration-500 animate-toast-slide ${colors[toast.type]}`}>
              <i className={`fas ${icons[toast.type]} text-lg md:text-xl`}></i> {toast.msg}
            </div>
          );
        })}
      </div>

      <nav className="fixed top-0 w-full z-50 px-4 py-4 transition-all duration-500" id="navbar">
        <div className="max-w-5xl mx-auto bg-white/80 dark:bg-[#04091a]/80 backdrop-blur-md md:backdrop-blur-2xl rounded-2xl md:rounded-[2rem] px-4 md:px-8 py-3 md:py-4 flex justify-between items-center relative border border-slate-200/50 dark:border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.5)] transition-all duration-500">
          <Link href="/" onClick={scrollToTop} className="nav-link text-xl md:text-3xl font-black flex items-center gap-2 md:gap-3 group tracking-tighter">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-electric/10 border border-electric/30 flex items-center justify-center group-hover:bg-electric/20 group-hover:shadow-[0_0_15px_rgba(14,165,233,0.2)] dark:group-hover:shadow-[0_0_15px_rgba(14,165,233,0.5)] transition-all">
               <i className="fas fa-microchip text-electric group-hover:rotate-180 transition-transform duration-700"></i>
            </div>
            <span className="text-slate-900 dark:text-white">RIFAT<span className="text-neon animate-pulse">_</span></span>
          </Link>
          
          <div className={`absolute top-full left-0 mt-4 w-full bg-white/95 dark:bg-[#04091a]/95 backdrop-blur-xl rounded-3xl flex flex-col p-6 gap-6 md:static md:w-auto md:bg-transparent md:border-none md:p-0 md:flex md:flex-row items-center md:gap-10 text-xs md:text-sm font-black tracking-widest uppercase transition-all duration-300 shadow-2xl md:shadow-none border border-slate-200/50 dark:border-white/5 md:border-none z-50 ${menuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible md:opacity-100 md:visible translate-y-4 md:translate-y-0'}`}>
            <Link href="/about" className="nav-link text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors relative after:absolute after:-bottom-2 md:after:-bottom-3 after:left-0 after:w-0 after:h-1 after:bg-neon hover:after:w-full after:transition-all after:duration-300 w-fit dark:hover:drop-shadow-[0_0_10px_rgba(6,182,212,0.8)] hover:-translate-y-0.5 inline-block" onClick={() => setMenuOpen(false)}>ABOUT</Link>
            <Link href="/skills" className="nav-link text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors relative after:absolute after:-bottom-2 md:after:-bottom-3 after:left-0 after:w-0 after:h-1 after:bg-electric hover:after:w-full after:transition-all after:duration-300 w-fit dark:hover:drop-shadow-[0_0_10px_rgba(14,165,233,0.8)] hover:-translate-y-0.5 inline-block" onClick={() => setMenuOpen(false)}>SKILLS</Link>
            <Link href="/projects" className="nav-link text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors relative after:absolute after:-bottom-2 md:after:-bottom-3 after:left-0 after:w-0 after:h-1 after:bg-energy hover:after:w-full after:transition-all after:duration-300 w-fit dark:hover:drop-shadow-[0_0_10px_rgba(234,179,8,0.8)] hover:-translate-y-0.5 inline-block" onClick={() => setMenuOpen(false)}>PROJECTS</Link>
            <Link href="/achievements" className="nav-link text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors relative after:absolute after:-bottom-2 md:after:-bottom-3 after:left-0 after:w-0 after:h-1 after:bg-circuit hover:after:w-full after:transition-all after:duration-300 w-fit dark:hover:drop-shadow-[0_0_10px_rgba(16,185,129,0.8)] hover:-translate-y-0.5 inline-block" onClick={() => setMenuOpen(false)}>LOGS</Link>
          </div>
          
          <div className="flex items-center gap-3 md:gap-6">
            <button onClick={toggleTheme} className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/10 flex items-center justify-center hover:text-energy hover:rotate-12 hover:scale-110 transition-all text-slate-700 dark:text-white">
                <i className={`fas ${isDark ? 'fa-sun' : 'fa-moon'}`}></i>
            </button>
            <Link href="/contact" className="nav-link hidden md:flex px-8 py-3 bg-transparent border-2 border-electric dark:border-white/20 hover:border-neon text-electric dark:text-white rounded-xl font-black hover:bg-neon hover:text-white dark:hover:text-black hover:shadow-[0_5px_20px_rgba(6,182,212,0.3)] dark:hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] hover:-translate-y-1 hover:scale-105 transition-all uppercase tracking-widest text-sm">INIT.COMMS</Link>
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-xl w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/10 flex items-center justify-center focus:outline-none text-slate-700 dark:text-white hover:text-neon transition-colors">
                <i className={`fas transition-transform duration-300 ${menuOpen ? 'fa-times rotate-90' : 'fa-bars'}`}></i>
            </button>
          </div>
        </div>
      </nav>

      <main className="min-h-screen pt-28 pb-16 px-4 md:px-6 flex items-center relative overflow-hidden" id="home">
        <div className="hidden md:block absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-electric/20 rounded-full blur-[120px] animate-pulse mix-blend-multiply dark:mix-blend-screen pointer-events-none"></div>
        <div className="hidden md:block absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-neon/10 rounded-full blur-[150px] animate-pulse delay-1000 mix-blend-multiply dark:mix-blend-screen pointer-events-none"></div>
        
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-12 items-center lg:items-start w-full mt-6 md:mt-0 relative z-10">
          <div className="hero-reveal order-2 lg:order-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 md:gap-3 px-4 py-2 md:px-6 md:py-2.5 rounded-full bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-electric/30 shadow-[0_0_15px_rgba(14,165,233,0.1)] dark:shadow-[0_0_20px_rgba(14,165,233,0.2)] mx-auto lg:mx-0 mb-6 md:mb-10">
              <span className="relative flex h-2 w-2 md:h-3 md:w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-energy opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 md:h-3 md:w-3 bg-energy shadow-[0_0_10px_rgba(234,179,8,1)]"></span>
              </span>
              <span className="text-[10px] md:text-xs font-bold text-slate-800 dark:text-white tracking-widest uppercase">System Online</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-black leading-[1.1] mb-4 md:mb-6 tracking-tighter text-slate-900 dark:text-white">
              REJUYANUL <br className="hidden md:block" /> HAQUE <br className="hidden md:block" />
              <span className="text-gradient drop-shadow-[0_2px_10px_rgba(6,182,212,0.2)] dark:drop-shadow-[0_0_30px_rgba(6,182,212,0.4)] ml-2 md:ml-0">RIFAT</span>
            </h1>
            
            <div className="h-8 md:h-16 mb-4 md:mb-8 text-lg md:text-3xl lg:text-4xl font-bold text-slate-700 dark:text-slate-300 flex justify-center lg:justify-start items-center gap-2">
              <span className="text-electric">&gt;</span>
              <span id="typed-text"></span>
            </div>
            
            <p className="text-sm md:text-lg lg:text-xl max-w-xl text-slate-600 dark:text-slate-400 mb-8 md:mb-12 leading-relaxed mx-auto lg:mx-0 font-medium">
              "I build real systems, not just concepts." <br className="hidden md:block" />
              ইলেকট্রিক্যাল অটোমেশন থেকে শুরু করে আইওটি এবং মডার্ন ওয়েব ডেভেলপমেন্ট , আমি আইডিয়াকে বাস্তবে রূপ দিই।
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 md:gap-6">
              <Link href="/projects" className="nav-link px-6 py-4 md:px-10 md:py-5 bg-transparent border-2 border-neon text-neon rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-neon hover:text-white dark:hover:text-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] md:hover:-translate-y-1 md:hover:scale-105 uppercase tracking-wider relative overflow-hidden group text-sm md:text-base">
                <span className="relative z-10 flex items-center gap-2">Explore Work <i className="fas fa-arrow-right md:group-hover:translate-x-1 transition-transform"></i></span>
              </Link>
              <Link href="/contact" className="nav-link px-6 py-4 md:px-10 md:py-5 neo-glass rounded-2xl font-black transition-all duration-300 md:hover:hover-glow flex items-center justify-center gap-3 text-slate-900 dark:text-white uppercase tracking-wider text-sm md:text-base">
                <i className="fas fa-satellite-dish text-electric animate-pulse"></i> Connect
              </Link>
            </div>
            
            <div className="mt-8 md:mt-12 flex justify-center lg:justify-start gap-3 md:gap-4">
              {CONFIG.socialLinks.map((link, idx) => (
                <a key={idx} href={link.url} target="_blank" rel="noreferrer" className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-700 dark:text-slate-300 transition-all duration-500 ${link.color} text-xl md:text-2xl md:hover:-translate-y-2 relative group shadow-md md:shadow-lg`}>
                  <div className="hidden md:block absolute inset-0 bg-current opacity-0 group-hover:opacity-20 blur-xl rounded-2xl transition-opacity duration-500"></div>
                  <i className={`fab ${link.icon} relative z-10`}></i>
                </a>
              ))}
            </div>
          </div>
          
          <div className="relative flex justify-center items-center lg:items-start hero-reveal order-1 lg:order-2 mb-6 lg:mb-0 mt-8 lg:mt-[80px]">
            <div className="hidden md:block absolute inset-0 bg-gradient-to-tr from-electric/30 to-neon/30 blur-[100px] rounded-full scale-110 animate-pulse mix-blend-multiply dark:mix-blend-screen"></div>
            <div className="relative z-10 w-[80%] max-w-[220px] sm:max-w-[280px] md:max-w-[320px] lg:max-w-[360px] group flex justify-center mx-auto lg:ml-auto lg:mr-8 transform md:hover:-translate-y-4 transition-transform duration-700">
              <img src="/rifat.jpg" alt="Rifat" className="w-full h-auto object-cover transition-all duration-1000 cursor-pointer drop-shadow-2xl rounded-t-[2.5rem] md:rounded-t-[3.5rem] rounded-b-[1.5rem] border-4 border-white/10 dark:border-white/5" style={{ WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)', maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)' }} />
            </div>
          </div>
        </div>
      </main>

      <section id="about" className="py-20 md:py-32 px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center mb-16 md:mb-24 text-center gs-reveal">
            <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-electric/10 border border-electric/30 mb-4 md:mb-6 shadow-[0_0_15px_rgba(14,165,233,0.1)] dark:shadow-[0_0_20px_rgba(14,165,233,0.2)]">
              <i className="fas fa-bolt text-electric text-2xl md:text-3xl"></i>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-black mb-4 md:mb-6 tracking-tighter text-slate-900 dark:text-white">THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric to-neon">JOURNEY</span></h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-sm md:text-lg font-medium">ইঞ্জিনিয়ারিং, টেকনোলজি এবং ইনোভেশনের এক অনন্য সমন্বয়।</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="neo-glass p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] md:hover-glow gs-reveal relative overflow-hidden">
              <div className="hidden md:block absolute -right-20 -top-20 w-64 h-64 bg-electric/10 dark:bg-electric/20 rounded-full blur-[80px]"></div>
              <p className="text-sm md:text-xl leading-relaxed text-slate-700 dark:text-slate-300 mb-6 md:mb-8 relative z-10 font-medium">
                আমি বর্তমানে ডিপ্লোমা ইন ইলেকট্রিক্যাল ইঞ্জিনিয়ারিং , বগুড়া পলিটেকনিক ইনস্টিটিউটে (সেশন ২৩-২৪) পড়াশুনা করছি । তবে আমার দক্ষতা শুধু প্রথাগত পড়াশোনার মধ্যে সীমাবদ্ধ নয়। 
              </p>
              <p className="text-sm md:text-xl leading-relaxed text-slate-700 dark:text-slate-300 mb-8 md:mb-10 relative z-10 font-medium">
                ফিল্ড লেভেলের ইলেকট্রিক্যাল কাজ থেকে শুরু করে ইলেকট্রনিক্স, রোবোটিক্স, মেকাট্রনিক্স, এমবেডেড সিস্টেম, ফুল-স্ট্যাক ওয়েব ডেভেলপমেন্ট, গ্রাফিক্স , ফটো-ভিডিও এডিটিং, ডিজিটাল মার্কেটিং এবং ইন্ডাস্ট্রিয়াল ফ্যাব্রিকেশন পর্যন্ত বিস্তৃত আমার কাজের পরিধি। আর সম্পূর্ণ কিছু শিখেছি আমি আমার নিজের ইচ্ছাশক্তি, ফ্রি টুলস আর পরিশ্রমের মধ্য দিয়ে, আমি এখন পর্যন্ত কোনো বিষয়েই কোনধরনের কোর্স করিনাই ।
              </p>
              <div className="flex items-center gap-4 md:gap-6 pt-6 md:pt-8 border-t border-slate-200 dark:border-white/10 relative z-10">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-electric text-xl md:text-2xl border border-electric/30 shadow-[0_0_10px_rgba(14,165,233,0.1)] dark:shadow-[0_0_15px_rgba(14,165,233,0.2)]">
                  <i className="fas fa-graduation-cap"></i>
                </div>
                <div>
                  <h4 className="font-bold text-base md:text-xl text-slate-900 dark:text-white mb-1">ডিপ্লোমা ইন ইলেকট্রিক্যাল ইঞ্জিনিয়ারিং</h4>
                  <p className="text-[10px] md:text-sm text-electric dark:text-neon font-bold tracking-wider uppercase">প্র্যাকটিক্যাল ও থিওরিটিক্যাল নলেজ</p>
                </div>
              </div>
            </div>
            <div className="space-y-6 md:space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-electric/30 dark:before:from-electric/50 before:via-neon/30 dark:before:via-neon/50 before:to-transparent">
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active gs-reveal">
                <div className="flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl border border-slate-200 dark:border-white/20 bg-white dark:bg-slate-900 text-electric shadow-[0_0_10px_rgba(14,165,233,0.2)] dark:shadow-[0_0_20px_rgba(14,165,233,0.4)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 md:group-hover:scale-110 transition-transform">
                  <i className="fas fa-cogs text-lg md:text-xl"></i>
                </div>
                <div className="w-[calc(100%-3.5rem)] md:w-[calc(50%-3.5rem)] neo-glass p-4 md:p-6 rounded-2xl md:rounded-[2rem] md:hover-glow">
                  <div className="font-black text-base md:text-xl text-electric mb-1 md:mb-2 tracking-wide">ইন্ডাস্ট্রিয়াল স্কিলস</div>
                  <div className="text-xs md:text-base text-slate-600 dark:text-slate-400 font-medium">পাওয়ার সিস্টেম, ফ্যাব্রিকেশন এবং ওয়েল্ডিংয়ের বাস্তব অভিজ্ঞতা।</div>
                </div>
              </div>
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active gs-reveal">
                <div className="flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl border border-slate-200 dark:border-white/20 bg-white dark:bg-slate-900 text-neon shadow-[0_0_10px_rgba(6,182,212,0.2)] dark:shadow-[0_0_20px_rgba(6,182,212,0.4)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 md:group-hover:scale-110 transition-transform">
                  <i className="fas fa-network-wired text-lg md:text-xl"></i>
                </div>
                <div className="w-[calc(100%-3.5rem)] md:w-[calc(50%-3.5rem)] neo-glass p-4 md:p-6 rounded-2xl md:rounded-[2rem] md:hover-glow">
                  <div className="font-black text-base md:text-xl text-neon mb-1 md:mb-2 tracking-wide">অটোমেশন ও আইওটি</div>
                  <div className="text-xs md:text-base text-slate-600 dark:text-slate-400 font-medium">স্মার্ট ডিভাইস ও রোবোটিক্স ইন্টিগ্রেশন।</div>
                </div>
              </div>
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active gs-reveal">
                <div className="flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl border border-slate-200 dark:border-white/20 bg-white dark:bg-slate-900 text-energy shadow-[0_0_10px_rgba(234,179,8,0.2)] dark:shadow-[0_0_20px_rgba(234,179,8,0.4)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 md:group-hover:scale-110 transition-transform">
                  <i className="fas fa-code text-lg md:text-xl"></i>
                </div>
                <div className="w-[calc(100%-3.5rem)] md:w-[calc(50%-3.5rem)] neo-glass p-4 md:p-6 rounded-2xl md:rounded-[2rem] md:hover-glow">
                  <div className="font-black text-base md:text-xl text-energy mb-1 md:mb-2 tracking-wide">সফটওয়্যার ও ওয়েব</div>
                  <div className="text-xs md:text-base text-slate-600 dark:text-slate-400 font-medium">মডার্ন ফুল স্ট্যাক অ্যাপ এবং ইউআই/ইউএক্স ডিজাইন।</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="py-20 md:py-32 px-4 md:px-6 relative z-10">
        <div className="absolute inset-0 bg-slate-100/30 dark:bg-slate-900/30 backdrop-blur-sm md:backdrop-blur-md skew-y-3 origin-top-left -z-10 border-y border-slate-200 dark:border-white/5"></div>
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 md:mb-20 gs-reveal flex flex-col md:flex-row items-end justify-between">
            <div>
              <h2 className="text-3xl md:text-5xl lg:text-7xl font-black mb-2 md:mb-4 tracking-tighter text-slate-900 dark:text-white">CORE <span className="text-neon">TECH</span></h2>
              <div className="h-1 md:h-1.5 w-20 md:w-32 bg-gradient-to-r from-neon to-electric rounded-full shadow-[0_2px_10px_rgba(6,182,212,0.3)] dark:shadow-[0_0_15px_rgba(6,182,212,0.5)]"></div>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm font-bold tracking-widest uppercase mt-4 md:mt-0">Technologies I Master</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {CONFIG.skills.map((skill, idx) => (
              <div key={idx} className="neo-glass p-6 md:p-8 rounded-3xl md:rounded-[2rem] md:hover-glow group relative z-10 overflow-hidden">
                <div className="hidden md:block absolute inset-0 bg-gradient-to-br from-black/5 dark:from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="flex items-center gap-4 md:gap-6 mb-6 md:mb-8 relative z-20">
                  <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 flex items-center justify-center text-2xl md:text-3xl ${skill.color} md:group-hover:scale-110 md:group-hover:rotate-12 transition-all duration-500 shadow-[0_0_10px_rgba(0,0,0,0.05)] dark:shadow-[0_0_15px_rgba(0,0,0,0.3)]`}>
                    <i className={`fas ${skill.icon}`}></i>
                  </div>
                  <h3 className="font-black text-lg md:text-2xl tracking-wide text-slate-900 dark:text-white">{skill.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2 md:gap-3 relative z-20">
                  {skill.items.map((item, i) => (
                    <span key={i} className="px-3 py-1.5 md:px-4 md:py-2 bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-white/5 rounded-full text-[10px] md:text-sm font-bold text-slate-700 dark:text-slate-300 shadow-sm md:hover:border-[currentColor] md:hover:text-electric transition-colors cursor-default">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="spotlight" className="py-20 md:py-32 px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 md:mb-16 gs-reveal text-center">
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-black mb-2 md:mb-4 tracking-tighter text-slate-900 dark:text-white">PROJECT <span className="text-red-500">SPOTLIGHT</span></h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm font-bold uppercase tracking-widest">Most Popular Launch</p>
          </div>
          
          <a href="https://bpi-blood-finder.web.app" target="_blank" rel="noreferrer" className="block relative w-full rounded-3xl md:rounded-[3rem] overflow-hidden group gs-reveal shadow-[0_10px_30px_rgba(239,68,68,0.2)] dark:shadow-[0_10px_40px_rgba(239,68,68,0.3)] border-2 border-red-500/30 md:hover:border-red-500/60 transition-all duration-500 md:hover:-translate-y-2 md:hover:scale-[1.02]">
            <div className="w-full aspect-video md:aspect-[21/9] bg-gradient-to-br from-red-950 via-slate-900 to-black md:group-hover:scale-105 transition-transform duration-700 flex items-center justify-center">
              <i className="fas fa-heartbeat text-7xl md:text-9xl text-red-500/20 md:group-hover:scale-110 transition-transform duration-500"></i>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent flex flex-col justify-end items-start p-6 md:p-10">
              <div className="inline-flex items-center justify-center w-fit px-6 py-3 md:px-8 md:py-4 bg-red-500/20 backdrop-blur-md border border-red-500/50 rounded-2xl text-white font-black text-sm md:text-base uppercase tracking-widest group-hover:bg-red-500 group-hover:shadow-[0_0_20px_rgba(239,68,68,0.5)] transition-all">
                Explore App <i className="fas fa-external-link-alt ml-2 md:group-hover:translate-x-1 md:group-hover:-translate-y-1 transition-transform"></i>
              </div>
            </div>
          </a>
        </div>
      </section>

      <section id="projects" className="py-20 md:py-32 px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-20 gs-reveal">
            <div>
              <h2 className="text-3xl md:text-5xl lg:text-7xl font-black mb-2 md:mb-4 tracking-tighter text-slate-900 dark:text-white">FEATURED <span className="text-transparent bg-clip-text bg-gradient-to-r from-energy to-orange-500">SYSTEMS</span></h2>
              <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm font-bold uppercase tracking-widest">থিওরি নয়, বাস্তব প্রজেক্ট ইমপ্লিমেন্টেশন</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6 md:gap-10">
            {CONFIG.projects.map((project, idx) => {
              const CardWrapper = project.link !== '#' ? 'a' : 'div';
              const linkProps = project.link !== '#' ? { href: project.link, target: "_blank", rel: "noreferrer" } : {};
              
              return (
              <CardWrapper key={idx} {...linkProps} className={`block cursor-pointer neo-glass rounded-3xl md:rounded-[2rem] p-6 md:p-10 md:hover-glow group relative overflow-hidden flex flex-col justify-between min-h-[220px] md:min-h-[300px] ${project.img ? 'border-neon/30' : ''}`}>
                {project.img && (
                  <>
                    <img src={project.img} alt={project.name} className="absolute inset-0 w-full h-full object-cover opacity-80 dark:opacity-90 md:group-hover:opacity-100 md:group-hover:scale-110 transition-all duration-700 z-0" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-100/95 via-slate-100/60 to-slate-100/20 dark:from-[#04091a]/95 dark:via-[#04091a]/60 dark:to-[#04091a]/20 z-0"></div>
                  </>
                )}
                {!project.img && (
                  <div className={`absolute -right-4 -top-4 md:-right-8 md:-top-8 text-7xl md:text-9xl opacity-5 md:group-hover:scale-150 md:group-hover:opacity-10 md:group-hover:rotate-[25deg] transition-all duration-700 ${project.link !== '#' ? 'text-neon' : 'text-slate-500'}`}>
                    <i className={`fas ${project.icon}`}></i>
                  </div>
                )}
                <div className="hidden md:block absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-electric to-neon transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20"></div>
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6 md:mb-8">
                    <div className={`w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 flex items-center justify-center text-xl md:text-2xl ${project.link !== '#' ? 'text-neon' : 'text-slate-400'} shadow-sm md:group-hover:shadow-neon/20 transition-all`}>
                       <i className={`fas ${project.icon}`}></i>
                    </div>
                    <p className="text-[8px] md:text-[10px] font-black text-slate-700 dark:text-white uppercase tracking-[0.2em] bg-neon/10 dark:bg-neon/20 border border-neon/30 px-3 py-1 md:px-4 md:py-1.5 rounded-full">{project.type}</p>
                  </div>
                  <h3 className="text-xl md:text-3xl font-black mb-2 md:mb-4 text-slate-900 dark:text-white md:group-hover:text-neon transition-colors leading-tight">{project.name}</h3>
                </div>
                <div className="relative z-10 flex gap-3 md:gap-4 mt-6 md:mt-8">
                  <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 flex items-center justify-center md:group-hover:bg-neon md:group-hover:border-neon group-hover:text-white dark:group-hover:text-black transition-all duration-300 shadow-sm md:shadow-[0_0_15px_rgba(0,0,0,0.3)] md:group-hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] text-base md:text-xl">
                    <i className={`fas ${project.link !== '#' ? 'fa-arrow-right md:-rotate-45 md:group-hover:rotate-0 transition-transform' : 'fa-lock'}`}></i>
                  </div>
                </div>
              </CardWrapper>
            );
            })}
          </div>
        </div>
      </section>

      <section id="achievements" className="py-20 md:py-32 px-4 md:px-6 relative z-10">
        <div className="absolute inset-0 bg-slate-100/40 dark:bg-slate-900/40 backdrop-blur-sm md:backdrop-blur-lg -skew-y-2 origin-bottom-right -z-10 border-y border-slate-200 dark:border-white/10"></div>
        <div className="max-w-5xl mx-auto gs-reveal text-center">
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-black mb-12 md:mb-20 tracking-tighter text-slate-900 dark:text-white">IMPACT & <span className="text-electric">AWARDS</span></h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div className="neo-glass p-4 md:p-8 rounded-3xl md:rounded-[2rem] md:hover-glow group">
              <div className="w-12 h-12 md:w-20 md:h-20 mx-auto rounded-full bg-white dark:bg-slate-800 border border-electric/30 flex items-center justify-center mb-4 md:mb-6 md:group-hover:scale-110 transition-transform shadow-[0_5px_10px_rgba(14,165,233,0.1)] dark:shadow-[0_0_20px_rgba(14,165,233,0.3)]">
                <i className="fas fa-globe text-2xl md:text-4xl text-electric"></i>
              </div>
              <h3 className="font-black text-sm md:text-xl mb-1 md:mb-2 text-slate-900 dark:text-white">আন্তর্জাতিক ইভেন্ট</h3>
              <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400 font-medium">কম্পিটিশনে অংশগ্রহণ</p>
            </div>
            <div className="neo-glass p-4 md:p-8 rounded-3xl md:rounded-[2rem] md:hover-glow group">
              <div className="w-12 h-12 md:w-20 md:h-20 mx-auto rounded-full bg-white dark:bg-slate-800 border border-neon/30 flex items-center justify-center mb-4 md:mb-6 md:group-hover:scale-110 transition-transform shadow-[0_5px_10px_rgba(6,182,212,0.1)] dark:shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                <i className="fas fa-users text-2xl md:text-4xl text-neon"></i>
              </div>
              <h3 className="font-black text-sm md:text-xl mb-1 md:mb-2 text-slate-900 dark:text-white">মেন্টরিং</h3>
              <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400 font-medium">টেকনিক্যাল গাইডেন্স</p>
            </div>
            <div className="neo-glass p-4 md:p-8 rounded-3xl md:rounded-[2rem] md:hover-glow group">
              <div className="w-12 h-12 md:w-20 md:h-20 mx-auto rounded-full bg-white dark:bg-slate-800 border border-energy/30 flex items-center justify-center mb-4 md:mb-6 md:group-hover:scale-110 transition-transform shadow-[0_5px_10px_rgba(234,179,8,0.1)] dark:shadow-[0_0_20px_rgba(234,179,8,0.3)]">
                <i className="fas fa-microchip text-2xl md:text-4xl text-energy"></i>
              </div>
              <h3 className="font-black text-sm md:text-xl mb-1 md:mb-2 text-slate-900 dark:text-white">ইনোভেশন</h3>
              <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400 font-medium">বাস্তব সমস্যার সমাধান</p>
            </div>
            <div className="neo-glass p-4 md:p-8 rounded-3xl md:rounded-[2rem] md:hover-glow group">
              <div className="w-12 h-12 md:w-20 md:h-20 mx-auto rounded-full bg-white dark:bg-slate-800 border border-circuit/30 flex items-center justify-center mb-4 md:mb-6 md:group-hover:scale-110 transition-transform shadow-[0_5px_10px_rgba(16,185,129,0.1)] dark:shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                <i className="fas fa-project-diagram text-2xl md:text-4xl text-circuit"></i>
              </div>
              <h3 className="font-black text-sm md:text-xl mb-1 md:mb-2 text-slate-900 dark:text-white">সিস্টেম ডিজাইন</h3>
              <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400 font-medium">মাল্টিডিসিপ্লিনারি প্রজেক্টস</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 md:py-32 px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl md:backdrop-blur-2xl rounded-3xl md:rounded-[3rem] p-6 md:p-16 shadow-[0_10px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_0_40px_rgba(0,0,0,0.6)] border border-slate-200 dark:border-white/10 gs-reveal relative overflow-hidden">
            <div className="hidden md:block absolute top-0 right-0 w-[500px] h-[500px] bg-electric/10 dark:bg-electric/20 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="hidden md:block absolute bottom-0 left-0 w-[300px] h-[300px] bg-neon/5 dark:bg-neon/10 rounded-full blur-[80px] pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col justify-center">
              <h2 className="text-3xl md:text-5xl lg:text-7xl font-black mb-4 md:mb-6 tracking-tighter text-slate-900 dark:text-white">INITIATE <span className="text-electric">CONTACT</span></h2>
              <p className="text-slate-600 dark:text-slate-400 mb-8 md:mb-12 text-sm md:text-xl font-medium">নতুন প্রজেক্ট বা কোলাবোরেশনের জন্য ডেটা ট্রান্সমিট করুন।</p>
              
              <div className="space-y-4 md:space-y-8 mb-8 md:mb-12">
                <div className="flex items-center gap-4 md:gap-6 p-3 md:p-4 rounded-2xl hover:bg-slate-100 dark:hover:bg-white/5 transition-colors group">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-white dark:bg-slate-800 rounded-xl md:rounded-2xl flex items-center justify-center text-electric border border-electric/30 shadow-[0_5px_10px_rgba(14,165,233,0.1)] dark:shadow-[0_0_15px_rgba(14,165,233,0.2)] md:group-hover:scale-110 transition-transform text-lg md:text-2xl">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div>
                    <p className="text-[10px] md:text-sm text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest mb-0.5 md:mb-1">Comms Channel</p>
                    <p className="font-black text-lg md:text-2xl text-slate-900 dark:text-white">01522138626</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 md:gap-6 p-3 md:p-4 rounded-2xl hover:bg-slate-100 dark:hover:bg-white/5 transition-colors group">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-white dark:bg-slate-800 rounded-xl md:rounded-2xl flex items-center justify-center text-neon border border-neon/30 shadow-[0_5px_10px_rgba(6,182,212,0.1)] dark:shadow-[0_0_15px_rgba(6,182,212,0.2)] md:group-hover:scale-110 transition-transform text-lg md:text-2xl">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <p className="text-[10px] md:text-sm text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest mb-0.5 md:mb-1">Data Stream</p>
                    <p className="font-black text-base md:text-2xl text-slate-900 dark:text-white break-all">mdrifat7464@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 md:gap-6 p-3 md:p-4 rounded-2xl hover:bg-slate-100 dark:hover:bg-white/5 transition-colors group">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-white dark:bg-slate-800 rounded-xl md:rounded-2xl flex items-center justify-center text-energy border border-energy/30 shadow-[0_5px_10px_rgba(234,179,8,0.1)] dark:shadow-[0_0_15px_rgba(234,179,8,0.2)] md:group-hover:scale-110 transition-transform text-lg md:text-2xl">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div>
                    <p className="text-[10px] md:text-sm text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest mb-0.5 md:mb-1">Coordinates</p>
                    <p className="font-black text-lg md:text-2xl text-slate-900 dark:text-white">বগুড়া, বাংলাদেশ</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 md:gap-4">
                {CONFIG.socialLinks.map((link, idx) => (
                  <a key={idx} href={link.url} target="_blank" rel="noreferrer" className={`w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-700 dark:text-slate-300 transition-all duration-500 ${link.color} text-xl md:text-2xl md:hover:-translate-y-2 relative group shadow-sm md:shadow-lg`}>
                    <div className="hidden md:block absolute inset-0 bg-current opacity-0 group-hover:opacity-20 blur-xl rounded-2xl transition-opacity duration-500"></div>
                    <i className={`fab ${link.icon} relative z-10`}></i>
                  </a>
                ))}
              </div>
            </div>
            
            <div className="relative z-10 bg-slate-50/80 dark:bg-slate-950/80 p-6 md:p-10 rounded-2xl md:rounded-[2rem] border border-slate-200 dark:border-white/5 shadow-inner mt-8 lg:mt-0">
              <form id="contactForm" className="space-y-4 md:space-y-6" noValidate onSubmit={handleFormSubmit}>
                <div>
                  <label className="block text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2 md:mb-3">Identity [Name]</label>
                  <input type="text" name="senderName" id="senderName" className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg md:rounded-xl px-4 md:px-5 py-3 md:py-4 outline-none focus:border-electric focus:ring-1 focus:ring-electric transition-all text-sm md:text-base text-slate-900 dark:text-white font-medium shadow-sm" />
                </div>
                <div>
                  <label className="block text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2 md:mb-3">Ping Address [Phone]</label>
                  <input type="text" name="senderPhone" id="senderPhone" className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg md:rounded-xl px-4 md:px-5 py-3 md:py-4 outline-none focus:border-electric focus:ring-1 focus:ring-electric transition-all text-sm md:text-base text-slate-900 dark:text-white font-medium shadow-sm" />
                </div>
                <div>
                  <label className="block text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2 md:mb-3">Payload [Message]</label>
                  <textarea name="senderMsg" id="senderMsg" rows="4" className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg md:rounded-xl px-4 md:px-5 py-3 md:py-4 outline-none focus:border-electric focus:ring-1 focus:ring-electric transition-all text-sm md:text-base text-slate-900 dark:text-white font-medium resize-none shadow-sm"></textarea>
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full py-4 md:py-5 bg-gradient-to-r from-electric to-neon text-white dark:text-black rounded-lg md:rounded-xl font-black text-base md:text-xl md:hover:shadow-[0_10px_20px_rgba(6,182,212,0.3)] md:dark:hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] md:hover:-translate-y-1 md:hover:scale-[1.01] transition-all active:scale-95 uppercase tracking-widest mt-2 md:mt-4 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:scale-100 disabled:cursor-not-allowed">
                  {isSubmitting ? (
                    <><i className="fas fa-spinner fa-spin"></i> TRANSMITTING...</>
                  ) : (
                    <>Transmit <i className="fas fa-paper-plane ml-2 md:ml-3"></i></>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-6 md:py-10 border-t border-slate-200 dark:border-white/5 text-center relative z-10 bg-slate-100 dark:bg-[#02040f] w-full mt-auto">
        <p className="text-slate-500 font-black tracking-widest text-[10px] md:text-xs uppercase flex items-center justify-center gap-2 md:gap-3">
          <span>SYS.VERSION 2.0</span>
          <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse"></span>
          <span>ENGINEERED BY RIFAT</span>
        </p>
      </footer>

      <button 
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[40] w-12 h-12 md:w-14 md:h-14 bg-electric/90 dark:bg-electric text-white rounded-full shadow-[0_0_20px_rgba(14,165,233,0.5)] flex items-center justify-center text-xl hover:scale-110 hover:-translate-y-2 hover:bg-neon transition-all duration-300 ${showScrollTop ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-10'}`}
      >
        <i className="fas fa-arrow-up"></i>
      </button>
    </div>
  );
}
