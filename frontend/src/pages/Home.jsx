import { useNavigate } from "react-router-dom";
import video from "../assets/videos/travel_2.webm";
import FeatureCards from "../components/FeatureCards";
import Navbar from "../components/Navbar";
import TravelSequence from "../components/TravelSequence";
import { motion } from "framer-motion";

function Home() {
  const navigate = useNavigate();

  return (
    
    <div className="relative w-full bg-[#f5f5f7]">
      <Navbar />

{/* HERO SECTION */}
<section className="relative h-screen w-full overflow-hidden">

  {/* VIDEO BACKGROUND */}
  <video
    autoPlay
    muted
    playsInline
    loop
    className="absolute w-full h-full object-cover"
  >
    <source src={video} type="video/webm" />
  </video>

  {/* CINEMATIC OVERLAY */}
  <div className="absolute w-full h-full bg-gradient-to-b 
  from-white/10 via-white/30 to-[#f5f5f7]/90"></div>

  {/* ⭐ NEW SPACE TRANSITION FADE */}
  <div className="absolute bottom-0 left-0 w-full h-[40vh] 
  bg-gradient-to-b from-transparent to-[#f5f5f7] pointer-events-none"></div>

  {/* HERO CONTENT */}
  <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-slate-900 px-6">

    {/* MAIN HEADING */}
    <motion.h1 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-[54px] md:text-[64px] font-heading font-extrabold leading-[1.05] tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-br from-slate-900 to-slate-600 drop-shadow-sm"
    >
      Travel Planning, Made Seamless
    </motion.h1>

    {/* BRAND EMOTION LINE */}
    <motion.p 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      className="mt-2 text-slate-600 text-lg md:text-xl font-medium"
    >
      Simple • Collaborative • Effortless Travel
    </motion.p>

    {/* CTA BUTTONS */}
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
      className="mt-12 flex flex-col items-center gap-5"
    >

      <button
        onClick={() => navigate("/group")}
        className="group relative px-10 py-4 rounded-2xl
        bg-blue-600 hover:bg-blue-500
        text-white text-base font-semibold
        shadow-[0_20px_60px_rgba(37,99,235,0.3)]
        hover:shadow-[0_20px_60px_rgba(37,99,235,0.5)]
        hover:scale-[1.05] active:scale-95 transition-all duration-300"
      >
        Create Group Trip →
        <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </button>

      <button
        onClick={() => navigate("/solo")}
        className="text-slate-500 hover:text-slate-900 transition text-sm hover:underline underline-offset-4 font-medium"
      >
        Planning alone? Try Solo Mode
      </button>

    </motion.div>

  </div>

</section>

      {/* FEATURE CARDS */}
      <FeatureCards />

      <TravelSequence />
    </div>
  );
}

export default Home;