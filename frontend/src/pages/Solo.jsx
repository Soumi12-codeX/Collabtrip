import { useState } from "react";
import { motion } from "framer-motion";

function Solo() {
  const [form, setForm] = useState({
    from: "",
    to: "",
    budget: 50000,
    style: "comfort",
    days: 3,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
   <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center px-6 py-20 relative overflow-hidden">
      <div className="w-full max-w-7xl grid md:grid-cols-2 gap-14 items-center relative z-10">

        {/* LEFT FORM */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white/90 backdrop-blur-3xl border border-black/[0.04] shadow-[0_20px_60px_rgba(0,0,0,0.06)] rounded-[40px] p-12 space-y-7"
        >

          <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 leading-tight tracking-tight">
            AI Solo Planner
          </h2>

          <p className="text-slate-500 font-medium text-lg tracking-tight">
            Design your perfect solo experience with intelligent travel optimization.
          </p>

          <input
            name="from"
            placeholder="Departure City"
            onChange={handleChange}
            className="w-full p-4 rounded-2xl bg-slate-50 border border-black/10 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
          />

          <input
            name="to"
            placeholder="Destination"
            onChange={handleChange}
            className="w-full p-4 rounded-2xl bg-slate-50 border border-black/10 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
          />

          <div>
            <label className="font-semibold text-slate-700">
              Budget: ₹{form.budget}
            </label>
            <input
              type="range"
              min="5000"
              max="200000"
              onChange={(e)=>setForm({...form,budget:e.target.value})}
              className="w-full mt-2 accent-blue-600"
            />
          </div>

          {/* STYLE PILLS */}
          <div className="flex gap-3">
            {["Budget", "Comfort", "Luxury"].map((s) => (
              <button
                key={s}
                onClick={() => setForm({ ...form, style: s.toLowerCase() })}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  form.style === s.toLowerCase()
                    ? "bg-blue-600 text-white border border-blue-500 shadow-lg scale-105"
                    : "bg-slate-100 border border-black/5 text-slate-500 hover:text-slate-900 hover:border-black/10 hover:bg-slate-200"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <input
            type="number"
            name="days"
            placeholder="Trip Duration (Days)"
            onChange={handleChange}
            className="w-full p-4 rounded-2xl bg-slate-50 border border-black/10 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
          />

          <button className="w-full relative overflow-hidden group bg-blue-600 text-white p-4 rounded-2xl font-semibold shadow-[0_10px_30px_rgba(37,99,235,0.3)] hover:scale-[1.02] hover:shadow-[0_15px_40px_rgba(37,99,235,0.5)] transition-all">
             <span className="relative z-10 tracking-wide">Generate AI Travel Plan</span>
             <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>

        </motion.div>

        {/* RIGHT AI PANEL */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative h-full"
        >

          <div className="absolute -top-24 -left-24 w-80 h-80 bg-blue-400 rounded-full blur-[150px] opacity-40 pointer-events-none"></div>
          <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-purple-400 rounded-full blur-[150px] opacity-40 pointer-events-none"></div>

          <div className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-[40px] shadow-[0_30px_80px_rgba(37,99,235,0.3)] p-12 text-white flex flex-col justify-center h-full border border-white/20 overflow-hidden hover:scale-[1.01] transition-transform duration-500">
            {/* Glossy overlay mimicking glass */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none mix-blend-overlay"></div>

            <h3 className="text-4xl md:text-5xl font-heading font-bold mb-5 tracking-tight relative z-10">
              Your AI Travel Companion
            </h3>

            <p className="opacity-90 text-lg leading-relaxed relative z-10 font-medium tracking-tight">
              I analyze travel routes, accommodation ratings, weather trends,
              pricing insights, and local experiences to craft your perfect solo journey.
            </p>

            <div className="mt-10 space-y-4 text-sm relative z-10">
              <div className="bg-white/20 backdrop-blur-xl border border-white/20 rounded-xl p-4 font-medium flex items-center gap-3 shadow-md">
                <span className="text-xl">✈️</span> Smart route optimization
              </div>
              <div className="bg-white/20 backdrop-blur-xl border border-white/20 rounded-xl p-4 font-medium flex items-center gap-3 shadow-md">
                <span className="text-xl">🏨</span> Intelligent stay matching
              </div>
              <div className="bg-white/20 backdrop-blur-xl border border-white/20 rounded-xl p-4 font-medium flex items-center gap-3 shadow-md">
                <span className="text-xl">📍</span> Personalized itinerary
              </div>
              <div className="bg-white/20 backdrop-blur-xl border border-white/20 rounded-xl p-4 font-medium flex items-center gap-3 shadow-md">
                <span className="text-xl">💰</span> Budget intelligence
              </div>
            </div>

          </div>

        </motion.div>

      </div>

    </div>
  );
}

export default Solo;