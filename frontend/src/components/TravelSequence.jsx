import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import ladakhImg from "../assets/ladakh_winter.png";

gsap.registerPlugin(ScrollTrigger);

const destinations = [
  {
    type: "The Peaks",
    title: "Conquer the Unseen",
    subtitle: "Elevate your spirit where the earth meets the sky.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2670&auto=format&fit=crop"
  },
  {
    type: "The Forest",
    title: "Whispering Woods",
    subtitle: "Lose yourself in emerald canopies and ancient mist.",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2670&auto=format&fit=crop"
  },
  {
    type: "The Desert",
    title: "Infinite Sands",
    subtitle: "Discover profound silence and golden horizons.",
    image: "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?q=80&w=2674&auto=format&fit=crop"
  },
  {
    type: "The Snow",
    title: "Ladakh in Winter",
    subtitle: "Where the Himalayas touch the sky and silence is golden.",
    image: ladakhImg
  },
  {
    type: "The Sea",
    title: "Endless Oceans",
    subtitle: "Let the rhythm of the waves wash your worries away.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2673&auto=format&fit=crop"
  }
];

function TravelSequence() {
  const pinRef = useRef(null);
  const boxRef = useRef(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: "+=2500",
          scrub: 1.5,
          pin: true,
        }
      });

      // Box pops up
      tl.fromTo(boxRef.current,
        { scale: 0.1, opacity: 0, borderRadius: "50%" },
        { scale: 1, opacity: 1, borderRadius: "40px", duration: 1, ease: "power2.out" }
      );

      // Horizontal scrub
      tl.to(sliderRef.current, {
        xPercent: -100 + (100 / destinations.length),
        ease: "none",
        duration: destinations.length * 1.5
      });

      // Box shrinks down at the end
      tl.to(boxRef.current, {
        scale: 0.2,
        opacity: 0,
        borderRadius: "100%",
        duration: 1.5,
        ease: "power2.inOut"
      });

    }, pinRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full bg-[#f5f5f7] relative font-[Inter]">

      {/* Intro section */}
      <div className="h-screen w-full flex flex-col items-center justify-center gap-12 px-6">
        <h2 className="text-6xl md:text-[80px] font-heading font-bold text-slate-900 tracking-tighter leading-none text-center">
          Scroll to Explore.
        </h2>

        {/* Mouse Scroll Icon */}
        <div className="flex flex-col items-center gap-4 text-slate-500">
          <div className="w-8 h-14 border-2 border-slate-300 rounded-full flex justify-center p-1.5 backdrop-blur-md">
            <motion.div
              animate={{ y: [0, 16, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-3 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
            />
          </div>
        </div>
      </div>

      {/* Pinned gallery section */}
      <div ref={pinRef} className="h-screen w-full flex items-center justify-center bg-[#f5f5f7] overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_60%)]" />

        <div
          ref={boxRef}
          className="relative w-[95vw] h-[90vh] md:w-[90vw] md:h-[85vh] bg-white overflow-hidden shadow-2xl will-change-transform border border-black/[0.04]"
        >
          <div
            ref={sliderRef}
            className="flex h-full will-change-transform"
            style={{ width: `${destinations.length * 100}%` }}
          >
            {destinations.map((dest, i) => (
              <div key={i} className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
                <img
                  src={dest.image}
                  className="absolute inset-0 w-full h-full object-cover scale-105"
                  alt={dest.type}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                <div className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-auto mb-24 md:mb-32">
                  <h3 className="text-sm md:text-xl text-sky-400 font-bold uppercase tracking-[0.4em] mb-6 drop-shadow-md">
                    {dest.type}
                  </h3>
                  <h2 className="text-5xl md:text-7xl font-heading font-bold text-white mb-8 leading-tight drop-shadow-2xl tracking-tight">
                    {dest.title}
                  </h2>
                  <p className="text-lg md:text-3xl text-gray-200 font-medium max-w-3xl mx-auto leading-relaxed drop-shadow-lg tracking-tight">
                    {dest.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Outro section */}
      <div className="min-h-[100vh] w-full flex flex-col items-center justify-center bg-[#f5f5f7] px-6 relative overflow-hidden">

        {/* Soft atmospheric background glow contained strictly within the view */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-200 rounded-full blur-[180px] pointer-events-none opacity-40 mix-blend-multiply"></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          viewport={{ margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center text-center px-4"
        >
          <h2 className="text-5xl md:text-[100px] font-heading font-bold text-slate-900 tracking-tighter leading-[1.05] mb-8 drop-shadow-sm">
            Your Journey <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 drop-shadow-sm">Starts Here.</span>
          </h2>
          <p className="text-xl md:text-3xl text-slate-500 font-semibold mb-12 max-w-2xl leading-relaxed tracking-tight">
            Every detail meticulously planned by AI. Uncover the world's beauty.
          </p>

          <button className="group relative px-14 py-5 rounded-full bg-blue-600 text-white text-lg md:text-xl font-bold hover:shadow-[0_15px_40px_rgba(37,99,235,0.4)] hover:bg-blue-500 hover:scale-[1.02] transition-all duration-300">
            <span className="relative z-10 tracking-wide">Book Today</span>
          </button>
        </motion.div>

      </div>

    </div>
  );
}

export default TravelSequence;