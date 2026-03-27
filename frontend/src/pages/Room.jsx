import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import { savePreferences, getRoomDetails } from "../services/roomApi";
import axios from "axios"; // Added for the update-date call

function Room() {
  const { id } = useParams();
  const location = useLocation();
  const isAdmin = location.state?.isAdmin || false;
  const userName = location.state?.userName || "Traveler";

  const [pref, setPref] = useState({
    budget: 50000,
    style: "comfort",
    days: 3,
    transport: "flight",
  });

  const [fixedDate, setFixedDate] = useState("");
  const [participants, setParticipants] = useState([]);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await getRoomDetails(id);
        setFixedDate(response.data.travelDate);
        setParticipants(response.data.members || []);
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    };

    fetchParticipants();
    const interval = setInterval(fetchParticipants, 5000);
    return () => clearInterval(interval);
  }, [id]);

  const handleUpdateDate = async (newDate) => {
    setFixedDate(newDate); // Optimistic UI update
    try {
      await axios.post(`http://localhost:8080/api/rooms/${id}/update-date?newDate=${newDate}`);
    } catch (error) {
      console.error("Failed to update date", error);
    }
  };

  const handleSavePreferences = async () => {
    setIsSyncing(true);
    const payload = {
      username: userName,
      budgetLimit: parseInt(pref.budget),
      availableDays: parseInt(pref.days),
      preferredStyle: pref.style,
      transportType: pref.transport,
    };

    try {
      await savePreferences(id, payload);
      alert("Preferences saved!");
    } catch (error) {
      alert("Failed to save preferences.");
    } finally {
      setIsSyncing(false);
    }
  };

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
      <div className="relative z-10 pt-32 px-6 max-w-7xl mx-auto grid lg:grid-cols-3 gap-8 pb-20">
        <div className="lg:col-span-2 space-y-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="bg-white/90 backdrop-blur-3xl border border-black/[0.04] shadow-sm rounded-[40px] p-8 md:p-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <span className="px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 font-bold text-[10px] uppercase tracking-widest border border-blue-100">
                  {isAdmin ? "👑 Admin Access" : "Member View"}
                </span>
                <h1 className="text-4xl font-black text-slate-900 mt-2">
                  Room: <span className="text-blue-600">{id}</span>
                </h1>
              </div>
              <div className="flex gap-2">
                <button onClick={handleCopyCode} className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-100 transition-all">{copiedCode ? "Copied!" : "Code"}</button>
                <button onClick={handleCopyLink} className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-all">{copiedLink ? "Link Copied!" : "Invite Friends"}</button>
              </div>
            </div>

            <div className="bg-[#f8f8fb] rounded-[32px] p-8 border border-black/[0.03]">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">Set Your Constraints</h3>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-black/[0.05] shadow-sm">
                  <span className="text-blue-600 text-lg">📅</span>
                  {isAdmin ? (
                    <input 
                      type="date" 
                      value={fixedDate || ""} 
                      onChange={(e) => handleUpdateDate(e.target.value)}
                      className="bg-transparent border-none outline-none font-black text-slate-700 text-sm cursor-pointer"
                    />
                  ) : (
                    <span className="text-sm font-black text-slate-700">{fixedDate || "Fetching..."}</span>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div>
                    <div className="flex justify-between mb-3">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Total Budget</label>
                      <span className="text-sm font-bold text-blue-600">₹{pref.budget}</span>
                    </div>
                    <input type="range" min="5000" max="200000" step="5000" value={pref.budget} onChange={(e) => setPref({ ...pref, budget: e.target.value })} className="w-full accent-blue-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer" />
                  </div>
                  <div>
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-4">Preferred Transport</label>
                    <div className="flex gap-2">
                      {["Flight", "Train", "Bus"].map(t => (
                        <button key={t} onClick={() => setPref({ ...pref, transport: t.toLowerCase() })} className={`flex-1 py-3 rounded-xl font-bold text-xs border transition-all ${pref.transport === t.toLowerCase() ? 'bg-slate-900 text-white border-slate-900 shadow-lg' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'}`}>{t}</button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-8">
                  <div>
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-4">Travel Style</label>
                    <div className="flex gap-2">
                      {["Budget", "Comfort", "Luxury"].map((s) => (
                        <button key={s} onClick={() => setPref({ ...pref, style: s.toLowerCase() })} className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all border ${pref.style === s.toLowerCase() ? "bg-blue-600 text-white border-blue-600 shadow-lg" : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"}`}>{s}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-3">Duration (Days)</label>
                    <input type="number" value={pref.days} onChange={(e) => setPref({ ...pref, days: e.target.value })} className="w-full p-4 rounded-xl border border-slate-200 bg-white outline-none focus:ring-2 focus:ring-blue-500/20 font-bold text-slate-700" />
                  </div>
                </div>
              </div>

              <button onClick={handleSavePreferences} disabled={isSyncing} className="w-full mt-12 bg-blue-600 text-white font-black py-5 rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 disabled:opacity-50 flex items-center justify-center gap-3 uppercase tracking-widest text-sm">
                {isSyncing ? "Updating System..." : "Save My Choices"}
              </button>
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-1">
          <motion.div className="bg-white border border-black/[0.04] rounded-[40px] p-8 shadow-sm h-fit sticky top-32">
            <h3 className="text-lg font-black text-slate-900 mb-6 flex justify-between items-center">The Crew <span className="px-2 py-0.5 rounded-md bg-green-100 text-green-600 text-[10px]">LIVE</span></h3>
            <div className="space-y-3">
              <AnimatePresence>
                {participants.map((member, idx) => (
                  <motion.div key={idx} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-black text-xs">{member.username.charAt(0).toUpperCase()}</div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{member.username}</p>
                        <p className="text-[9px] text-slate-400 font-black uppercase tracking-tighter">{member.transportType} • {member.preferredStyle}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-black text-blue-600">₹{member.budgetLimit / 1000}k</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Room;