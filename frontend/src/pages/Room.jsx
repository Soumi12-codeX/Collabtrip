import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

function Room() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = location.state?.isAdmin || false;
  const userName = location.state?.userName || "Traveler";

  const [pref, setPref] = useState({
    budget: 50000,
    style: "comfort",
    days: 3,
    transport: "flight",
    accommodation: "hotel",
  });

  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(id);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] relative overflow-hidden font-[Inter]">
      <Navbar />

      {/* BACKGROUND GLOW */}
      <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] bg-sky-200 rounded-full blur-[200px] opacity-50 pointer-events-none"></div>
      
      <div className="relative z-10 pt-32 px-6 max-w-7xl mx-auto flex flex-col items-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-3xl border border-black/[0.04] shadow-[0_20px_60px_rgba(0,0,0,0.06)] rounded-[40px] p-12 md:p-16 w-full text-center"
        >
          <div className="inline-block px-6 py-2 rounded-full bg-blue-50 text-blue-600 font-bold tracking-widest text-sm uppercase mb-6 border border-blue-100 shadow-sm">
            {isAdmin ? "👑 Admin: Active Room" : "Active Room Session"}
          </div>
          
          <h1 className="text-5xl md:text-7xl font-heading font-black text-slate-900 mb-6 tracking-tight">
            Code: <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{id}</span>
          </h1>

          <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            Welcome to the trip, <span className="font-bold text-slate-900">{userName}</span>! Start dropping your ideas into the shared workspace below.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            {isAdmin && (
              <button 
                onClick={handleCopyLink}
                className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition-colors shadow-[0_4px_14px_rgba(37,99,235,0.3)] hover:shadow-lg hover:-translate-y-0.5"
              >
                {copiedLink ? "Copied Link! ✓" : "Share Invite Link"}
              </button>
            )}
            <button 
              onClick={handleCopyCode}
              className="px-6 py-3 rounded-xl bg-white border border-black/10 text-slate-700 font-bold hover:bg-slate-50 transition-colors shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              {copiedCode ? "Copied Code! ✓" : "Copy Room Code"}
            </button>
          </div>

          {/* PREFERENCES PANEL */}
          <div className="mt-12 bg-[#f8f8fb] rounded-[32px] p-8 md:p-10 border border-black/[0.03] shadow-inner text-left mx-auto max-w-4xl">
            <h3 className="text-2xl font-heading font-bold text-slate-900 mb-2">My Travel Preferences</h3>
            <p className="text-slate-500 font-medium mb-8">Set your constraints for this trip. AI will automatically balance everyone's preferences.</p>
            
            <div className="grid md:grid-cols-2 gap-10">
              {/* Left col */}
              <div>
                <label className="font-semibold text-slate-700 block mb-3">
                  Budget Limit: ₹{pref.budget}
                </label>
                <input
                  type="range"
                  min="5000"
                  max="200000"
                  value={pref.budget}
                  onChange={(e) => setPref({ ...pref, budget: e.target.value })}
                  className="w-full accent-blue-600"
                />
                
                <label className="font-semibold text-slate-700 block mt-8 mb-3">
                  Preferred Style
                </label>
                <div className="flex flex-wrap gap-2">
                  {["Budget", "Comfort", "Luxury"].map((s) => (
                    <button
                      key={s}
                      onClick={() => setPref({ ...pref, style: s.toLowerCase() })}
                      className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                        pref.style === s.toLowerCase()
                          ? "bg-blue-600 text-white shadow-md scale-105"
                          : "bg-white border border-black/5 text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>

                <label className="font-semibold text-slate-700 block mt-8 mb-3">
                  Transport
                </label>
                <div className="flex flex-wrap gap-2">
                  {["Flight", "Train", "Bus", "Car"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setPref({ ...pref, transport: t.toLowerCase() })}
                      className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                        pref.transport === t.toLowerCase()
                          ? "bg-blue-600 text-white shadow-md scale-105"
                          : "bg-white border border-black/5 text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right col */}
              <div className="flex flex-col justify-between">
                <div>
                  <label className="font-semibold text-slate-700 block mb-3">
                    Available Days
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={pref.days}
                    onChange={(e) => setPref({ ...pref, days: e.target.value })}
                    className="w-full p-4 rounded-xl bg-white border border-black/5 text-slate-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all shadow-sm"
                  />

                  <label className="font-semibold text-slate-700 block mt-8 mb-3">
                    Accommodation
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["Hotel", "Villa", "Bungalow", "Hostel"].map((a) => (
                      <button
                        key={a}
                        onClick={() => setPref({ ...pref, accommodation: a.toLowerCase() })}
                        className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                          pref.accommodation === a.toLowerCase()
                            ? "bg-blue-600 text-white shadow-md scale-105"
                            : "bg-white border border-black/5 text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                        }`}
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                </div>

                <button className="w-full mt-8 bg-slate-900 hover:bg-black text-white font-bold py-4 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:shadow-lg transition-all hover:-translate-y-0.5 relative overflow-hidden group">
                  <span className="relative z-10">Save Preferences</span>
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
              </div>
            </div>
          </div>

          <button 
            onClick={() => navigate("/")}
            className="mt-16 px-8 py-4 rounded-full bg-slate-100 text-slate-600 font-bold border border-black/5 hover:bg-slate-200 hover:text-slate-900 transition-all shadow-sm"
          >
            Leave Room
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default Room;
