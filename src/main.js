import './style.css';
import { registerSW } from 'virtual:pwa-register';

registerSW({ immediate: true });

const toastContainer = document.createElement('div');
toastContainer.className = 'fixed bottom-6 right-6 z-[99999] flex flex-col gap-3 pointer-events-none';
document.body.appendChild(toastContainer);

function showToast(msg, type = 'success') {
    const toast = document.createElement('div');
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
    
    toast.className = `flex items-center gap-4 px-6 py-4 rounded-2xl border font-black uppercase tracking-widest text-sm transform translate-x-[120%] transition-transform duration-500 ${colors[type]}`;
    toast.innerHTML = `<i class="fas ${icons[type]} text-xl"></i> ${msg}`;
    toastContainer.appendChild(toast);
    
    requestAnimationFrame(() => {
        toast.classList.remove('translate-x-[120%]');
        toast.classList.add('translate-x-0');
    });
    
    setTimeout(() => {
        toast.classList.remove('translate-x-0');
        toast.classList.add('translate-x-[120%]');
        setTimeout(() => toast.remove(), 500);
    }, 4000);
}

document.addEventListener('contextmenu', event => event.preventDefault());

document.addEventListener('keydown', event => {
  if (event.key === 'F12' || 
     (event.ctrlKey && event.shiftKey && (event.key === 'I' || event.key === 'J' || event.key === 'C')) || 
     (event.ctrlKey && event.key === 'U')) {
    event.preventDefault();
  }
});

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
        { name: "SMART FISH BREEDER", link: "https://smart-fish-breeder-aqunar.vercel.app", type: "IoT & Web", icon: "fa-fish" },
        { name: "SMART ENERGY METER", link: "https://smart-energy-meter-electro-ix.vercel.app", type: "Electrical & IoT", icon: "fa-tachometer-alt" },
        { name: "SMART TRAFFIC SOLVING", link: "https://smart-traffic-solving.vercel.app", type: "Automation", icon: "fa-traffic-light" },
        { name: "SMART RAIL PASSENGER", link: "https://smart-rail-passenger.vercel.app", type: "Full System", icon: "fa-train" },
        { name: "SMART IRRIGATION", link: "https://smart-irrigation-system-srcb.vercel.app", type: "Agri-Tech", icon: "fa-seedling" },
        { name: "BPI BLOOD FINDER", link: "#", type: "Web App", icon: "fa-heartbeat" },
        { name: "RESCUE ROBOT", link: "#", type: "Robotics", icon: "fa-robot" },
        { name: "SMART HOME SECURITY", link: "#", type: "IoT Security", icon: "fa-shield-alt" }
    ]
};

const skillsHtml = CONFIG.skills.map(skill => `
    <div class="neo-glass p-8 rounded-[2rem] hover-glow group relative z-10 overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-black/5 dark:from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div class="flex items-center gap-6 mb-8 relative z-20">
            <div class="w-16 h-16 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 flex items-center justify-center text-3xl ${skill.color} group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-[0_0_15px_rgba(0,0,0,0.05)] dark:shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                <i class="fas ${skill.icon}"></i>
            </div>
            <h3 class="font-black text-2xl tracking-wide text-slate-900 dark:text-white">${skill.title}</h3>
        </div>
        <div class="flex flex-wrap gap-3 relative z-20">${skill.items.map(item => `<span class="px-4 py-2 bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-white/5 rounded-full text-xs md:text-sm font-bold text-slate-700 dark:text-slate-300 shadow-sm hover:border-[currentColor] hover:text-electric transition-colors cursor-default">${item}</span>`).join('')}</div>
    </div>
`).join('');

const projectsHtml = CONFIG.projects.map(project => `
    <div class="neo-glass rounded-[2rem] p-10 hover-glow group relative overflow-hidden flex flex-col justify-between min-h-[300px]">
        <div class="absolute -right-8 -top-8 text-9xl opacity-5 group-hover:scale-150 group-hover:opacity-10 group-hover:rotate-[25deg] transition-all duration-700 ${project.link !== '#' ? 'text-neon' : 'text-slate-500'}">
            <i class="fas ${project.icon}"></i>
        </div>
        <div class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-electric to-neon transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
        
        <div class="relative z-10">
            <div class="flex justify-between items-start mb-8">
                <div class="w-14 h-14 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 flex items-center justify-center text-2xl ${project.link !== '#' ? 'text-neon' : 'text-slate-400'} shadow-md group-hover:shadow-neon/20 transition-all">
                   <i class="fas ${project.icon}"></i>
                </div>
                <p class="text-[10px] font-black text-slate-700 dark:text-white uppercase tracking-[0.2em] bg-neon/10 dark:bg-neon/20 border border-neon/30 px-4 py-1.5 rounded-full">${project.type}</p>
            </div>
            <h3 class="text-3xl font-black mb-4 text-slate-900 dark:text-white group-hover:text-neon transition-colors leading-tight">${project.name}</h3>
        </div>
        <div class="relative z-10 flex gap-4 mt-8">
            <a ${project.link !== "#" ? `href="${project.link}" target="_blank"` : `href="#"`} class="w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 flex items-center justify-center hover:bg-neon hover:border-neon hover:text-white dark:hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.05)] dark:shadow-[0_0_15px_rgba(0,0,0,0.3)] group-hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] text-xl">
                <i class="fas ${project.link !== '#' ? 'fa-arrow-right -rotate-45 group-hover:rotate-0 transition-transform' : 'fa-lock'}"></i>
            </a>
        </div>
    </div>
`).join('');

const socialsHtml = CONFIG.socialLinks.map(link => `
    <a href="${link.url}" target="_blank" class="w-14 h-14 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-700 dark:text-slate-300 transition-all duration-500 ${link.color} text-2xl hover:-translate-y-2 relative group shadow-lg">
        <div class="absolute inset-0 bg-current opacity-0 group-hover:opacity-20 blur-xl rounded-2xl transition-opacity duration-500"></div>
        <i class="fab ${link.icon} relative z-10"></i>
    </a>
`).join('');

const fullPageContent = `
    <main class="min-h-screen pt-32 pb-20 px-6 flex items-center relative overflow-hidden" id="home">
        <div class="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-electric/20 rounded-full blur-[120px] animate-pulse mix-blend-multiply dark:mix-blend-screen pointer-events-none"></div>
        <div class="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-neon/10 rounded-full blur-[150px] animate-pulse delay-1000 mix-blend-multiply dark:mix-blend-screen pointer-events-none"></div>
        
        <div class="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-12 items-center w-full mt-10 md:mt-0 relative z-10">
            <div class="gs-reveal order-2 lg:order-1 text-center lg:text-left">
                <div class="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-electric/30 shadow-[0_0_20px_rgba(14,165,233,0.1)] dark:shadow-[0_0_20px_rgba(14,165,233,0.2)] mx-auto lg:mx-0 mb-10">
                    <span class="relative flex h-3 w-3">
                      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-energy opacity-75"></span>
                      <span class="relative inline-flex rounded-full h-3 w-3 bg-energy shadow-[0_0_10px_rgba(234,179,8,1)]"></span>
                    </span>
                    <span class="text-xs font-bold text-slate-800 dark:text-white tracking-widest uppercase">System Online</span>
                </div>
                
                <h1 class="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1] mb-6 tracking-tighter text-slate-900 dark:text-white">
                    REJUYANUL <br> HAQUE <br>
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-electric via-neon to-energy drop-shadow-[0_2px_10px_rgba(6,182,212,0.2)] dark:drop-shadow-[0_0_30px_rgba(6,182,212,0.4)]">RIFAT</span>
                </h1>
                
                <div class="h-16 mb-8 text-2xl md:text-4xl font-bold text-slate-700 dark:text-slate-300 flex justify-center lg:justify-start items-center gap-2">
                    <span class="text-electric">&gt;</span>
                    <span id="typed-text"></span>
                </div>
                
                <p class="text-lg md:text-xl max-w-xl text-slate-600 dark:text-slate-400 mb-12 leading-relaxed mx-auto lg:mx-0 font-medium">
                    "I build real systems, not just concepts." <br>
                    ইলেকট্রিক্যাল অটোমেশন থেকে শুরু করে আইওটি এবং মডার্ন ওয়েব ডেভেলপমেন্ট , আমি আইডিয়াকে বাস্তবে রূপ দিই।
                </p>
                
                <div class="flex flex-wrap justify-center lg:justify-start gap-6">
                    <a href="/projects" class="nav-link px-10 py-5 bg-transparent border-2 border-neon text-neon rounded-2xl font-black flex items-center gap-3 hover:bg-neon hover:text-white dark:hover:text-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:-translate-y-1 hover:scale-105 uppercase tracking-wider relative overflow-hidden group">
                        <span class="relative z-10 flex items-center gap-2">Explore Work <i class="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i></span>
                    </a>
                    <a href="/contact" class="nav-link px-10 py-5 neo-glass rounded-2xl font-black transition-all duration-300 hover-glow flex items-center gap-3 text-slate-900 dark:text-white uppercase tracking-wider">
                        <i class="fas fa-satellite-dish text-electric animate-pulse"></i> Connect
                    </a>
                </div>
                
                <div class="mt-12 flex justify-center lg:justify-start gap-4">
                    ${socialsHtml}
                </div>
            </div>
            
            <div class="relative flex justify-center items-center gs-reveal order-1 lg:order-2 mb-12 lg:mb-0 mt-8 lg:mt-0">
                <div class="absolute inset-0 bg-gradient-to-tr from-electric/30 to-neon/30 blur-[100px] rounded-full scale-125 animate-pulse mix-blend-multiply dark:mix-blend-screen"></div>
                <div class="relative z-10 w-full max-w-[300px] md:max-w-[400px] group flex justify-center">
                    <img id="profileImg" src="https://i.ibb.co.com/Q7mHDNC6/IMG-20260427-163628.jpg" alt="Rifat" class="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 cursor-pointer drop-shadow-2xl rounded-t-[3rem] rounded-b-xl" style="-webkit-mask-image: linear-gradient(to bottom, black 70%, transparent 100%); mask-image: linear-gradient(to bottom, black 70%, transparent 100%);">
                </div>
            </div>
        </div>
    </main>

    <section id="about" class="py-32 px-6 relative z-10">
        <div class="max-w-7xl mx-auto">
            <div class="flex flex-col items-center mb-24 text-center gs-reveal">
                <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-electric/10 border border-electric/30 mb-6 shadow-[0_0_20px_rgba(14,165,233,0.1)] dark:shadow-[0_0_20px_rgba(14,165,233,0.3)]">
                    <i class="fas fa-bolt text-electric text-3xl"></i>
                </div>
                <h2 class="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-slate-900 dark:text-white">THE <span class="text-transparent bg-clip-text bg-gradient-to-r from-electric to-neon">JOURNEY</span></h2>
                <p class="text-slate-600 dark:text-slate-400 max-w-2xl text-lg font-medium">ইঞ্জিনিয়ারিং, টেকনোলজি এবং ইনোভেশনের এক অনন্য সমন্বয়।</p>
            </div>
            <div class="grid md:grid-cols-2 gap-16 items-center">
                <div class="neo-glass p-10 rounded-[2.5rem] hover-glow gs-reveal relative overflow-hidden">
                    <div class="absolute -right-20 -top-20 w-64 h-64 bg-electric/10 dark:bg-electric/20 rounded-full blur-[80px]"></div>
                    <p class="text-xl leading-relaxed text-slate-700 dark:text-slate-300 mb-8 relative z-10 font-medium">
                        আমি বর্তমানে ডিপ্লোমা ইন ইলেকট্রিক্যাল ইঞ্জিনিয়ারিং , বগুড়া পলিটেকনিক ইনস্টিটিউটে (সেশন ২৩-২৪) পড়াশুনা করছি । তবে আমার দক্ষতা শুধু প্রথাগত পড়াশোনার মধ্যে সীমাবদ্ধ নয়। 
                    </p>
                    <p class="text-xl leading-relaxed text-slate-700 dark:text-slate-300 mb-10 relative z-10 font-medium">
                        ফিল্ড লেভেলের ইলেকট্রিক্যাল কাজ থেকে শুরু করে ইলেকট্রনিক্স, রোবোটিক্স, মেকাট্রনিক্স, এমবেডেড সিস্টেম, ফুল-স্ট্যাক ওয়েব ডেভেলপমেন্ট, গ্রাফিক্স , ফটো-ভিডিও এডিটিং, ডিজিটাল মার্কেটিং এবং ইন্ডাস্ট্রিয়াল ফ্যাব্রিকেশন পর্যন্ত বিস্তৃত আমার কাজের পরিধি। আর সম্পূর্ণ কিছু শিখেছি আমি আমার নিজের ইচ্ছাশক্তি, ফ্রি টুলস আর পরিশ্রমের মধ্য দিয়ে, আমি এখন পর্যন্ত কোনো বিষয়েই কোনধরনের কোর্স করিনাই ।
                    </p>
                    <div class="flex items-center gap-6 pt-8 border-t border-slate-200 dark:border-white/10 relative z-10">
                        <div class="w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-electric text-2xl border border-electric/30 shadow-[0_0_15px_rgba(14,165,233,0.1)] dark:shadow-[0_0_15px_rgba(14,165,233,0.2)]">
                            <i class="fas fa-graduation-cap"></i>
                        </div>
                        <div>
                            <h4 class="font-bold text-xl text-slate-900 dark:text-white mb-1">ডিপ্লোমা ইন ইলেকট্রিক্যাল ইঞ্জিনিয়ারিং</h4>
                            <p class="text-sm text-electric dark:text-neon font-bold tracking-wider uppercase">প্র্যাকটিক্যাল ও থিওরিটিক্যাল নলেজ</p>
                        </div>
                    </div>
                </div>
                <div class="space-y-8 relative before:absolute before:inset-0 before:ml-7 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-electric/30 dark:before:from-electric/50 before:via-neon/30 dark:before:via-neon/50 before:to-transparent">
                    <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active gs-reveal">
                        <div class="flex items-center justify-center w-14 h-14 rounded-2xl border border-slate-200 dark:border-white/20 bg-white dark:bg-slate-900 text-electric shadow-[0_0_15px_rgba(14,165,233,0.2)] dark:shadow-[0_0_20px_rgba(14,165,233,0.4)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 group-hover:scale-110 transition-transform">
                            <i class="fas fa-cogs text-xl"></i>
                        </div>
                        <div class="w-[calc(100%-5rem)] md:w-[calc(50%-3.5rem)] neo-glass p-6 rounded-[2rem] hover-glow">
                            <div class="font-black text-xl text-electric mb-2 tracking-wide">ইন্ডাস্ট্রিয়াল স্কিলস</div>
                            <div class="text-slate-600 dark:text-slate-400 font-medium">পাওয়ার সিস্টেম, ফ্যাব্রিকেশন এবং ওয়েল্ডিংয়ের বাস্তব অভিজ্ঞতা।</div>
                        </div>
                    </div>
                    <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active gs-reveal">
                        <div class="flex items-center justify-center w-14 h-14 rounded-2xl border border-slate-200 dark:border-white/20 bg-white dark:bg-slate-900 text-neon shadow-[0_0_15px_rgba(6,182,212,0.2)] dark:shadow-[0_0_20px_rgba(6,182,212,0.4)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 group-hover:scale-110 transition-transform">
                            <i class="fas fa-network-wired text-xl"></i>
                        </div>
                        <div class="w-[calc(100%-5rem)] md:w-[calc(50%-3.5rem)] neo-glass p-6 rounded-[2rem] hover-glow">
                            <div class="font-black text-xl text-neon mb-2 tracking-wide">অটোমেশন ও আইওটি</div>
                            <div class="text-slate-600 dark:text-slate-400 font-medium">স্মার্ট ডিভাইস ও রোবোটিক্স ইন্টিগ্রেশন।</div>
                        </div>
                    </div>
                    <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active gs-reveal">
                        <div class="flex items-center justify-center w-14 h-14 rounded-2xl border border-slate-200 dark:border-white/20 bg-white dark:bg-slate-900 text-energy shadow-[0_0_15px_rgba(234,179,8,0.2)] dark:shadow-[0_0_20px_rgba(234,179,8,0.4)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 group-hover:scale-110 transition-transform">
                            <i class="fas fa-code text-xl"></i>
                        </div>
                        <div class="w-[calc(100%-5rem)] md:w-[calc(50%-3.5rem)] neo-glass p-6 rounded-[2rem] hover-glow">
                            <div class="font-black text-xl text-energy mb-2 tracking-wide">সফটওয়্যার ও ওয়েব</div>
                            <div class="text-slate-600 dark:text-slate-400 font-medium">মডার্ন ফুল স্ট্যাক অ্যাপ এবং ইউআই/ইউএক্স ডিজাইন।</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="skills" class="py-32 px-6 relative z-10">
            <div class="absolute inset-0 bg-slate-100/40 dark:bg-slate-900/40 backdrop-blur-md skew-y-3 origin-top-left -z-10 border-y border-slate-200 dark:border-white/5"></div>
            <div class="max-w-7xl mx-auto">
                <div class="mb-20 gs-reveal flex flex-col md:flex-row items-end justify-between">
                    <div>
                        <h2 class="text-5xl md:text-7xl font-black mb-4 tracking-tighter text-slate-900 dark:text-white">CORE <span class="text-neon">TECH</span></h2>
                        <div class="h-1.5 w-32 bg-gradient-to-r from-neon to-electric rounded-full shadow-[0_2px_10px_rgba(6,182,212,0.3)] dark:shadow-[0_0_15px_rgba(6,182,212,0.5)]"></div>
                    </div>
                    <p class="text-slate-500 dark:text-slate-400 font-bold tracking-widest uppercase mt-6 md:mt-0">Technologies I Master</p>
                </div>
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    ${skillsHtml}
                </div>
            </div>
        </section>

        <section id="projects" class="py-32 px-6 relative z-10">
            <div class="max-w-7xl mx-auto">
                <div class="flex flex-col md:flex-row justify-between items-end mb-20 gs-reveal">
                    <div>
                        <h2 class="text-5xl md:text-7xl font-black mb-4 tracking-tighter text-slate-900 dark:text-white">FEATURED <span class="text-transparent bg-clip-text bg-gradient-to-r from-energy to-orange-500">SYSTEMS</span></h2>
                        <p class="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest">থিওরি নয়, বাস্তব প্রজেক্ট ইমপ্লিমেন্টেশন</p>
                    </div>
                </div>
                <div class="grid md:grid-cols-2 gap-10">
                    ${projectsHtml}
                </div>
            </div>
        </section>

        <section id="achievements" class="py-32 px-6 relative z-10">
            <div class="absolute inset-0 bg-slate-100/60 dark:bg-slate-900/60 backdrop-blur-lg -skew-y-2 origin-bottom-right -z-10 border-y border-slate-200 dark:border-white/10"></div>
            <div class="max-w-7xl mx-auto gs-reveal text-center">
                <h2 class="text-5xl md:text-7xl font-black mb-20 tracking-tighter text-slate-900 dark:text-white">IMPACT & <span class="text-electric">AWARDS</span></h2>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div class="neo-glass p-8 rounded-[2rem] hover-glow group">
                        <div class="w-20 h-20 mx-auto rounded-full bg-white dark:bg-slate-800 border border-electric/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-[0_5px_15px_rgba(14,165,233,0.1)] dark:shadow-[0_0_20px_rgba(14,165,233,0.3)]">
                            <i class="fas fa-globe text-4xl text-electric"></i>
                        </div>
                        <h3 class="font-black text-xl mb-2 text-slate-900 dark:text-white">আন্তর্জাতিক ইভেন্ট</h3>
                        <p class="text-sm text-slate-600 dark:text-slate-400 font-medium">কম্পিটিশনে অংশগ্রহণ</p>
                    </div>
                    <div class="neo-glass p-8 rounded-[2rem] hover-glow group">
                        <div class="w-20 h-20 mx-auto rounded-full bg-white dark:bg-slate-800 border border-neon/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-[0_5px_15px_rgba(6,182,212,0.1)] dark:shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                            <i class="fas fa-users text-4xl text-neon"></i>
                        </div>
                        <h3 class="font-black text-xl mb-2 text-slate-900 dark:text-white">মেন্টরিং</h3>
                        <p class="text-sm text-slate-600 dark:text-slate-400 font-medium">টেকনিক্যাল গাইডেন্স</p>
                    </div>
                    <div class="neo-glass p-8 rounded-[2rem] hover-glow group">
                        <div class="w-20 h-20 mx-auto rounded-full bg-white dark:bg-slate-800 border border-energy/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-[0_5px_15px_rgba(234,179,8,0.1)] dark:shadow-[0_0_20px_rgba(234,179,8,0.3)]">
                            <i class="fas fa-microchip text-4xl text-energy"></i>
                        </div>
                        <h3 class="font-black text-xl mb-2 text-slate-900 dark:text-white">ইনোভেশন</h3>
                        <p class="text-sm text-slate-600 dark:text-slate-400 font-medium">বাস্তব সমস্যার সমাধান</p>
                    </div>
                    <div class="neo-glass p-8 rounded-[2rem] hover-glow group">
                        <div class="w-20 h-20 mx-auto rounded-full bg-white dark:bg-slate-800 border border-circuit/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-[0_5px_15px_rgba(16,185,129,0.1)] dark:shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                            <i class="fas fa-project-diagram text-4xl text-circuit"></i>
                        </div>
                        <h3 class="font-black text-xl mb-2 text-slate-900 dark:text-white">সিস্টেম ডিজাইন</h3>
                        <p class="text-sm text-slate-600 dark:text-slate-400 font-medium">মাল্টিডিসিপ্লিনারি প্রজেক্টস</p>
                    </div>
                </div>
            </div>
        </section>

        <section id="contact" class="py-32 px-6 relative z-10">
            <div class="max-w-7xl mx-auto">
                <div class="grid lg:grid-cols-2 gap-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl rounded-[3rem] p-8 md:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.05)] dark:shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-slate-200 dark:border-white/10 gs-reveal relative overflow-hidden">
                    <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-electric/10 dark:bg-electric/20 rounded-full blur-[100px] pointer-events-none"></div>
                    <div class="absolute bottom-0 left-0 w-[300px] h-[300px] bg-neon/5 dark:bg-neon/10 rounded-full blur-[80px] pointer-events-none"></div>
                    
                    <div class="relative z-10 flex flex-col justify-center">
                        <h2 class="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-slate-900 dark:text-white">INITIATE <span class="text-electric">CONTACT</span></h2>
                        <p class="text-slate-600 dark:text-slate-400 mb-12 text-xl font-medium">নতুন প্রজেক্ট বা কোলাবোরেশনের জন্য ডেটা ট্রান্সমিট করুন。</p>
                        
                        <div class="space-y-8 mb-12">
                            <div class="flex items-center gap-6 p-4 rounded-2xl hover:bg-slate-100 dark:hover:bg-white/5 transition-colors group">
                                <div class="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-electric border border-electric/30 shadow-[0_5px_15px_rgba(14,165,233,0.1)] dark:shadow-[0_0_15px_rgba(14,165,233,0.2)] group-hover:scale-110 transition-transform text-2xl">
                                    <i class="fas fa-phone"></i>
                                </div>
                                <div>
                                    <p class="text-sm text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest mb-1">Comms Channel</p>
                                    <p class="font-black text-2xl text-slate-900 dark:text-white">01522138626</p>
                                </div>
                            </div>
                            <div class="flex items-center gap-6 p-4 rounded-2xl hover:bg-slate-100 dark:hover:bg-white/5 transition-colors group">
                                <div class="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-neon border border-neon/30 shadow-[0_5px_15px_rgba(6,182,212,0.1)] dark:shadow-[0_0_15px_rgba(6,182,212,0.2)] group-hover:scale-110 transition-transform text-2xl">
                                    <i class="fas fa-envelope"></i>
                                </div>
                                <div>
                                    <p class="text-sm text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest mb-1">Data Stream</p>
                                    <p class="font-black text-2xl text-slate-900 dark:text-white">mdrifat7464@gmail.com</p>
                                </div>
                            </div>
                            <div class="flex items-center gap-6 p-4 rounded-2xl hover:bg-slate-100 dark:hover:bg-white/5 transition-colors group">
                                <div class="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-energy border border-energy/30 shadow-[0_5px_15px_rgba(234,179,8,0.1)] dark:shadow-[0_0_15px_rgba(234,179,8,0.2)] group-hover:scale-110 transition-transform text-2xl">
                                    <i class="fas fa-map-marker-alt"></i>
                                </div>
                                <div>
                                    <p class="text-sm text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest mb-1">Coordinates</p>
                                    <p class="font-black text-2xl text-slate-900 dark:text-white">বগুড়া, বাংলাদেশ</p>
                                </div>
                            </div>
                        </div>
                        <div class="flex gap-4">
                            ${socialsHtml}
                        </div>
                    </div>
                    
                    <div class="relative z-10 bg-slate-50/50 dark:bg-slate-950/50 p-8 md:p-10 rounded-[2rem] border border-slate-200 dark:border-white/5 shadow-inner">
                        <form id="contactForm" class="space-y-6">
                            <div>
                                <label class="block text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3">Identity [Name]</label>
                                <input type="text" id="senderName" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-5 py-4 outline-none focus:border-electric focus:ring-1 focus:ring-electric transition-all text-slate-900 dark:text-white font-medium shadow-sm" required>
                            </div>
                            <div>
                                <label class="block text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3">Ping Address [Phone]</label>
                                <input type="text" id="senderPhone" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-5 py-4 outline-none focus:border-electric focus:ring-1 focus:ring-electric transition-all text-slate-900 dark:text-white font-medium shadow-sm" required>
                            </div>
                            <div>
                                <label class="block text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3">Payload [Message]</label>
                                <textarea id="senderMsg" rows="5" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-5 py-4 outline-none focus:border-electric focus:ring-1 focus:ring-electric transition-all text-slate-900 dark:text-white font-medium resize-none shadow-sm" required></textarea>
                            </div>
                            <button type="submit" id="submitBtn" class="w-full py-5 bg-gradient-to-r from-electric to-neon text-white dark:text-black rounded-xl font-black text-xl hover:shadow-[0_10px_20px_rgba(6,182,212,0.3)] dark:hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:-translate-y-1 hover:scale-[1.01] transition-all active:scale-95 uppercase tracking-widest mt-4">
                                Transmit <i class="fas fa-paper-plane ml-3"></i>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
`;

const layout = `
  <div class="min-h-screen flex flex-col bg-slate-50 dark:bg-[#00020a] text-slate-900 dark:text-slate-100 antialiased selection:bg-neon selection:text-white dark:selection:text-black font-sans overflow-x-hidden transition-colors duration-500">
    <div id="custom-cursor" class="hidden md:block"></div>
    <div id="cursor-ring" class="hidden md:block"></div>
    <div class="bg-grid-pattern"></div>
    <div class="circuit-lines"></div>

    <nav class="fixed top-0 w-full z-50 px-4 py-4 transition-all duration-500" id="navbar">
        <div class="max-w-7xl mx-auto bg-white/80 dark:bg-[#04091a]/80 backdrop-blur-2xl rounded-2xl md:rounded-[2rem] px-4 md:px-8 py-4 flex justify-between items-center relative border border-slate-200/50 dark:border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.5)] transition-all duration-500">
            <a href="/" class="nav-link text-xl md:text-3xl font-black flex items-center gap-3 group tracking-tighter">
                <div class="w-12 h-12 rounded-xl bg-electric/10 border border-electric/30 flex items-center justify-center group-hover:bg-electric/20 group-hover:shadow-[0_0_15px_rgba(14,165,233,0.2)] dark:group-hover:shadow-[0_0_15px_rgba(14,165,233,0.5)] transition-all">
                   <i class="fas fa-microchip text-electric group-hover:rotate-180 transition-transform duration-700"></i>
                </div>
                <span class="text-slate-900 dark:text-white">RIFAT<span class="text-neon animate-pulse">_</span></span>
            </a>
            
            <div id="navLinks" class="absolute top-full left-0 mt-4 w-full bg-white/95 dark:bg-[#04091a]/95 backdrop-blur-3xl rounded-3xl flex flex-col p-8 gap-8 md:static md:w-auto md:bg-transparent md:border-none md:p-0 md:flex md:flex-row items-center md:gap-10 text-sm font-black tracking-widest uppercase transition-all duration-300 opacity-0 invisible md:opacity-100 md:visible translate-y-4 md:translate-y-0 shadow-2xl md:shadow-none border border-slate-200/50 dark:border-white/5 md:border-none z-50">
                <a href="/about" class="nav-link text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors relative after:absolute after:-bottom-3 after:left-0 after:w-0 after:h-1 after:bg-neon hover:after:w-full after:transition-all after:duration-300 w-fit dark:hover:drop-shadow-[0_0_10px_rgba(6,182,212,0.8)] hover:-translate-y-0.5 inline-block">ABOUT</a>
                <a href="/skills" class="nav-link text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors relative after:absolute after:-bottom-3 after:left-0 after:w-0 after:h-1 after:bg-electric hover:after:w-full after:transition-all after:duration-300 w-fit dark:hover:drop-shadow-[0_0_10px_rgba(14,165,233,0.8)] hover:-translate-y-0.5 inline-block">SKILLS</a>
                <a href="/projects" class="nav-link text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors relative after:absolute after:-bottom-3 after:left-0 after:w-0 after:h-1 after:bg-energy hover:after:w-full after:transition-all after:duration-300 w-fit dark:hover:drop-shadow-[0_0_10px_rgba(234,179,8,0.8)] hover:-translate-y-0.5 inline-block">PROJECTS</a>
                <a href="/achievements" class="nav-link text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors relative after:absolute after:-bottom-3 after:left-0 after:w-0 after:h-1 after:bg-circuit hover:after:w-full after:transition-all after:duration-300 w-fit dark:hover:drop-shadow-[0_0_10px_rgba(16,185,129,0.8)] hover:-translate-y-0.5 inline-block">LOGS</a>
            </div>

            <div class="flex items-center gap-3 md:gap-6">
                <button id="themeToggle" class="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/10 flex items-center justify-center hover:text-energy hover:rotate-12 hover:scale-110 transition-all text-slate-700 dark:text-white">
                    <i id="themeIcon" class="fas fa-moon"></i>
                </button>
                <a href="/contact" class="nav-link hidden md:flex px-8 py-3 bg-transparent border-2 border-electric dark:border-white/20 hover:border-neon text-electric dark:text-white rounded-xl font-black hover:bg-neon hover:text-white dark:hover:text-black hover:shadow-[0_5px_20px_rgba(6,182,212,0.3)] dark:hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] hover:-translate-y-1 hover:scale-105 transition-all uppercase tracking-widest text-sm">INIT.COMMS</a>
                <button class="md:hidden text-2xl w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/10 flex items-center justify-center focus:outline-none text-slate-700 dark:text-white hover:text-neon transition-colors" id="mobileMenuBtn">
                    <i class="fas fa-bars transition-transform duration-300" id="mobileMenuIcon"></i>
                </button>
            </div>
        </div>
    </nav>

    ${fullPageContent}

    <footer class="py-10 border-t border-slate-200 dark:border-white/5 text-center relative z-10 bg-slate-100 dark:bg-[#02040f] w-full mt-auto">
        <p class="text-slate-500 font-black tracking-widest text-xs uppercase flex items-center justify-center gap-3">
            <span>SYS.VERSION 2.0</span>
            <span class="w-1.5 h-1.5 rounded-full bg-neon animate-pulse"></span>
            <span>ENGINEERED BY RIFAT</span>
        </p>
    </footer>
  </div>
`;

document.getElementById('app').innerHTML = layout;

const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
const profileImg = document.getElementById('profileImg');

if (html.classList.contains('dark')) {
    themeIcon.classList.replace('fa-moon', 'fa-sun');
} else {
    themeIcon.classList.replace('fa-sun', 'fa-moon');
}

themeToggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    html.classList.toggle('light');
    if (html.classList.contains('dark')) {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    }
});

mobileMenuBtn.addEventListener('click', () => {
    const icon = document.getElementById('mobileMenuIcon');
    const isExpandedCheck = navLinks.classList.contains('opacity-100');
    
    if (!isExpandedCheck) {
        navLinks.classList.remove('opacity-0', 'invisible', 'translate-y-4');
        navLinks.classList.add('opacity-100', 'visible', 'translate-y-0');
        if(icon) {
            icon.classList.replace('fa-bars', 'fa-times');
            icon.classList.add('rotate-90');
        }
    } else {
        navLinks.classList.add('opacity-0', 'invisible', 'translate-y-4');
        navLinks.classList.remove('opacity-100', 'visible', 'translate-y-0');
        if(icon) {
            icon.classList.replace('fa-times', 'fa-bars');
            icon.classList.remove('rotate-90');
        }
    }
});

if (profileImg) {
    profileImg.addEventListener('click', () => {
        profileImg.classList.toggle('grayscale');
    });
}

const cursor = document.getElementById('custom-cursor');
const cursorRing = document.getElementById('cursor-ring');
if (cursor && cursorRing) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        setTimeout(() => {
            cursorRing.style.left = e.clientX + 'px';
            cursorRing.style.top = e.clientY + 'px';
        }, 50);
    });

    document.querySelectorAll('a, button, input, textarea, .magnetic-btn, #profileImg, #themeToggle').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorRing.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorRing.style.borderColor = '#0ea5e9';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorRing.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorRing.style.borderColor = 'rgba(6, 182, 212, 0.6)';
        });
    });
}

if (document.getElementById('typed-text')) {
    new Typed('#typed-text', {
        strings: CONFIG.roles,
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true,
        cursorChar: '_'
    });
}

if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray('.gs-reveal').forEach(function(elem) {
        gsap.fromTo(elem, 
            { y: 60, opacity: 0 }, 
            { 
                y: 0, opacity: 1, duration: 1.2, ease: "power4.out",
                scrollTrigger: {
                    trigger: elem,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });
}

const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
if (form && submitBtn) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const phone = document.getElementById('senderPhone').value;
        const phoneRegex = /^[0-9]{11}$/;
        if (!phoneRegex.test(phone)) {
            showToast('11-digit Ping Address required!', 'warning');
            return;
        }

        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> TRANSMITTING...';
        submitBtn.disabled = true;

        const name = document.getElementById('senderName').value;
        const msg = document.getElementById('senderMsg').value;
        const text = `🚀 *New Cyber Lead*\n\n👤 *ID:* ${name}\n📞 *Ping:* ${phone}\n💬 *Payload:* ${msg}`;
        const tgUrl = `https://api.telegram.org/bot${CONFIG.telegram.botToken}/sendMessage`;

        try {
            await fetch(tgUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: CONFIG.telegram.chatId, text: text, parse_mode: 'Markdown' })
            });

            if(CONFIG.googleSheetUrl !== "") {
                let formData = new FormData();
                formData.append('Name', name);
                formData.append('Phone', phone);
                formData.append('Message', msg);
                fetch(CONFIG.googleSheetUrl, { method: 'POST', body: formData }).catch(e => console.log(e));
            }

            submitBtn.innerHTML = 'DATA SENT <i class="fas fa-check-circle ml-2"></i>';
            submitBtn.classList.replace('from-electric', 'from-circuit');
            submitBtn.classList.replace('to-neon', 'to-circuit');
            showToast('Data Transmitted Successfully!', 'success');
            form.reset();
        } catch (error) {
            submitBtn.innerHTML = 'FAILED! RETRY';
            submitBtn.classList.replace('from-electric', 'from-red-600');
            submitBtn.classList.replace('to-neon', 'to-red-700');
            showToast('Transmission Failed!', 'error');
        }

        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.className = 'w-full py-5 bg-gradient-to-r from-electric to-neon text-white dark:text-black rounded-xl font-black text-xl hover:shadow-[0_10px_20px_rgba(6,182,212,0.3)] dark:hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:-translate-y-1 hover:scale-[1.01] transition-all active:scale-95 uppercase tracking-widest mt-4';
            submitBtn.disabled = false;
        }, 3000);
    });
}

function handleNavigation(path, saveHistory = true) {
    if (saveHistory) {
        window.history.pushState(null, '', path);
    }
    const sectionId = path === '/' ? 'home' : path.substring(1);
    const section = document.getElementById(sectionId);
    
    if (section) {
        const yOffset = -100; 
        const y = section.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    const navContainer = navbar.querySelector('div');
    if (window.scrollY > 30) {
        navbar.classList.add('py-2');
        navbar.classList.remove('py-4');
        navContainer.classList.add('bg-white/95', 'dark:bg-[#04091a]/95');
        navContainer.classList.remove('bg-white/80', 'dark:bg-[#04091a]/80');
    } else {
        navbar.classList.add('py-4');
        navbar.classList.remove('py-2');
        navContainer.classList.add('bg-white/80', 'dark:bg-[#04091a]/80');
        navContainer.classList.remove('bg-white/95', 'dark:bg-[#04091a]/95');
    }
});

document.body.addEventListener('click', event => {
    const targetLink = event.target.closest('.nav-link');
    if (targetLink) {
        event.preventDefault();
        const path = targetLink.getAttribute('href');
        handleNavigation(path);
        
        const isExpandedCheck = navLinks.classList.contains('opacity-100');
        if (isExpandedCheck && window.innerWidth < 768) {
            navLinks.classList.add('opacity-0', 'invisible', 'translate-y-4');
            navLinks.classList.remove('opacity-100', 'visible', 'translate-y-0');
            const icon = document.getElementById('mobileMenuIcon');
            if(icon) {
                icon.classList.replace('fa-times', 'fa-bars');
                icon.classList.remove('rotate-90');
            }
        }
    }
});

window.addEventListener('popstate', () => {
    handleNavigation(window.location.pathname, false);
});

const initialPath = window.location.pathname;
setTimeout(() => {
    if(initialPath.length > 1) {
        handleNavigation(initialPath, false);
    }
}, 100);
