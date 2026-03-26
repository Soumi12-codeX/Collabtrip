import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "Collaborative AI Planning",
    desc: "Plan journeys together where AI balances everyone's preferences to create the perfect itinerary.",
  },
  {
    title: "Book Everything Seamlessly",
    desc: "Flights, trains, buses, hotels, and experiences — manage your entire trip in one intelligent platform.",
  },
  {
    title: "Travel Without Hassle",
    desc: "AI handles schedules, comparisons, and logistics so you strictly focus on enjoying the journey.",
  },
  {
    title: "Smart Budget Optimization",
    desc: "Experience more while spending smarter with intelligent AI-driven, real-time cost planning.",
  },
];

function FeatureCards() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Staggered fade and scale up for cards as user scrolls down
      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 120, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              end: "top 60%",
              scrub: 1,
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 md:py-48 bg-[#f5f5f7] relative overflow-hidden font-[Inter]">
      
      {/* Background soft lighting glows */}
      <div className="absolute top-[10%] -right-32 w-[600px] h-[600px] bg-blue-400 rounded-full blur-[180px] pointer-events-none opacity-20" />
      <div className="absolute bottom-[5%] -left-32 w-[500px] h-[500px] bg-sky-300 rounded-full blur-[180px] pointer-events-none opacity-30" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">
        
        <h2 className="text-5xl md:text-[72px] font-heading font-bold mb-6 text-center tracking-tighter leading-tight max-w-4xl text-slate-900">
          Experience <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Intelligent</span> Travel.
        </h2>
        
        <p className="text-xl md:text-3xl text-slate-500 font-semibold mb-24 max-w-3xl text-center leading-relaxed tracking-tight">
          The future of travel planning is here. Designed to let you focus on what really matters.
        </p>

        {/* 2x2 Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full">
          {features.map((f, i) => (
            <div
              key={i}
              ref={el => cardsRef.current[i] = el}
              className="relative p-10 md:p-12 bg-white rounded-[32px] border border-black/[0.04] shadow-[0_20px_60px_rgba(0,0,0,0.06)] transition-all duration-500 group/card flex flex-col justify-center will-change-transform overflow-hidden hover:scale-[1.02] hover:shadow-[0_30px_80px_rgba(0,0,0,0.12)]"
            >
              {/* Inner subtle glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 text-blue-600 flex items-center justify-center font-heading font-bold text-xl mb-8 group-hover/card:bg-gradient-to-br group-hover/card:from-blue-600 group-hover/card:to-indigo-600 group-hover/card:text-white transition-all duration-500 shadow-sm">
                  0{i + 1}
                </div>
                
                <h3 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-slate-900 tracking-tight leading-snug">
                  {f.title}
                </h3>
                
                <p className="text-slate-500 text-lg md:text-xl leading-relaxed font-medium tracking-tight">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default FeatureCards;