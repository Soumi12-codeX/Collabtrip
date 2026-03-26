import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const menuContent = {
  Features: {
    title: "Powerful AI Capabilities",
    items: [
      { title: "Collaborative Planning", desc: "Sync itineraries in real-time natively with your friends and family." },
      { title: "Predictive Budgets", desc: "AI forecasts local costs and provides instant intelligent estimates." },
      { title: "Universal Booking", desc: "Connects directly with global airlines and luxury hotel chains." },
    ]
  },
  "How it Works": {
    title: "Three Simple Steps",
    items: [
      { title: "1. Prompt the AI", desc: "Tell us exactly where you want to go and express your unique style." },
      { title: "2. Review Itinerary", desc: "Explore the custom-generated roadmap carefully designed for you." },
      { title: "3. Pack & Travel", desc: "Enjoy your beautifully organized, stress-free trip." },
    ]
  },
  About: {
    title: "Our Mission",
    desc: "We are radically redefining exploration. By combining cutting-edge artificial intelligence with deep travel industry integrations, PlanSe completely removes the friction from journey planning. Your only job is to go out and experience the world.",
    items: []
  }
};

function Navbar() {
  const navigate = useNavigate();
  const [show, setShow] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const current = window.scrollY;
      
      setScrolled(current > 50);

      // Hide navbar when scrolling down past 80px, show when scrolling up
      if (current > lastScrollY && current > 80) {
        setShow(false);
        setActiveMenu(null); // Auto close menu when scrolling down
      } else {
        setShow(true);
      }

      lastScrollY = current;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        onMouseLeave={() => setActiveMenu(null)}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: show ? 0 : -100, opacity: show ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-50 transition-colors duration-500 will-change-transform ${
          scrolled || activeMenu
            ? "backdrop-blur-2xl bg-slate-900/85 border-b border-white/10 shadow-2xl py-1" 
            : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-10 py-4 transition-all duration-300 relative z-50">

          {/* LOGO */}
          <div
            onClick={() => navigate("/")}
            className="text-slate-900 text-2xl font-heading font-black tracking-tighter cursor-pointer hover:scale-[1.03] active:scale-95 transition"
          >
            PlanSe
          </div>

          {/* NAV LINKS */}
          <div className="hidden md:flex items-center gap-12 text-slate-600 text-sm font-medium">
            {Object.keys(menuContent).map((item) => (
              <span
                key={item}
                onMouseEnter={() => setActiveMenu(item)}
                className={`cursor-pointer py-4 transition-colors duration-300 ${
                  activeMenu === item ? "text-blue-600" : "hover:text-slate-900"
                }`}
              >
                {item}
              </span>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={() => navigate("/group")}
            className="bg-blue-600 hover:bg-blue-500
            px-5 py-2 rounded-full text-xs font-semibold text-white tracking-widest uppercase
            shadow-[0_4px_14px_rgba(37,99,235,0.3)]
            hover:shadow-[0_6px_20px_rgba(37,99,235,0.5)]
            hover:-translate-y-0.5 active:scale-95 transition-all duration-300 relative"
          >
            Start Trip
          </button>

        </div>

        {/* APPLE-STYLE MEGA MENU */}
        <div className="absolute top-full left-0 w-full overflow-hidden pointer-events-none">
          <AnimatePresence>
            {activeMenu && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="w-full bg-white/95 backdrop-blur-3xl border-b border-black/[0.04] pointer-events-auto shadow-2xl"
              >
                <div className="max-w-7xl mx-auto px-10 py-16">
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="grid md:grid-cols-4 gap-16"
                  >
                    
                    {/* Left Column: Heading */}
                    <div className="col-span-1 border-r border-black/5 pr-8">
                      <h3 className="text-4xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-br from-slate-900 to-slate-500 leading-tight">
                        {menuContent[activeMenu].title}
                      </h3>
                    </div>

                    {/* Right Columns: Content */}
                    <div className="col-span-3 grid md:grid-cols-3 gap-12">
                      {menuContent[activeMenu].desc ? (
                        <div className="col-span-3 flex items-center pr-12">
                          <p className="text-xl md:text-2xl text-slate-600 leading-relaxed font-medium max-w-4xl drop-shadow-sm">
                            {menuContent[activeMenu].desc}
                          </p>
                        </div>
                      ) : (
                        menuContent[activeMenu].items.map((sub, idx) => (
                          <div key={idx} className="group/item cursor-default flex flex-col justify-start">
                            <h4 className="text-lg md:text-xl font-heading font-bold text-slate-900 mb-3 group-hover/item:text-blue-600 transition-colors">
                              {sub.title}
                            </h4>
                            <p className="text-sm md:text-base text-slate-500 leading-relaxed font-medium group-hover/item:text-slate-700 transition-colors">
                              {sub.desc}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                    
                  </motion.div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
      
      {/* Background Dimmer overlay when menu is active -> perfectly focuses the user */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm pointer-events-none"
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;