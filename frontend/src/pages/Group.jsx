import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createRoom, getRoomDetails } from "../services/roomApi";

function Group() {
  const [roomCode, setRoomCode] = useState("");
  const [createName, setCreateName] = useState("");
  const [joinName, setJoinName] = useState("");
  const navigate = useNavigate();
  const [travelDate, setTravelDate] = useState("");

  const handleCreateRoom = async () => {
    if (!createName.trim() || !travelDate) return alert("Please enter your name to create a room.");
    // Generate a random 6-digit room code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    try {
      await createRoom(code, createName.trim(), travelDate);
      navigate(`/room/${code}`, {
        state: {
          isAdmin: true, userName: createName.trim()
        }
      });
    }
    catch (error) {
      alert("Backend error : could not create room");
      console.error(error);
    }
  };

  const handleJoinRoom = async () => {
    if (!joinName.trim() || !roomCode.trim()) return alert("Please enter both your name and the room code.");
    try {
      const response = await getRoomDetails(roomCode.trim());
      // Check if the person joining is the one who created it
      const isUserAdmin = response.data.adminName === joinName.trim();

      navigate(`/room/${roomCode.trim()}`, {
        state: {
          isAdmin: isUserAdmin, // Use the calculated boolean here
          userName: joinName.trim()
        }
      });
    } catch (err) {
      alert("Room not found!");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center px-6 relative overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-sky-200 rounded-full blur-[180px] opacity-60 pointer-events-none"></div>
      <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-blue-200 rounded-full blur-[180px] opacity-60 pointer-events-none"></div>

      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-12 relative z-10">

        {/* CREATE ROOM */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="group bg-white/90 backdrop-blur-3xl border border-black/[0.04] shadow-[0_20px_60px_rgba(0,0,0,0.06)] rounded-[40px] p-12 md:p-14 flex flex-col justify-between transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_30px_80px_rgba(0,0,0,0.12)]"
        >

          <div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-5 leading-tight tracking-tight">
              Create <br /> Travel Room
            </h2>

            <p className="text-slate-500 text-lg tracking-tight font-medium mb-8">
              Start planning your journey together with intelligent AI collaboration.
            </p>

            <input
              value={createName}
              onChange={(e) => setCreateName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreateRoom()}
              placeholder="Your Name"
              className="w-full p-5 rounded-2xl bg-slate-50 border border-black/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-900 placeholder-slate-400 outline-none text-lg transition-all"
            />
            <input
              type="date"
              value={travelDate}
              onChange={(e) => setTravelDate(e.target.value)}
              className="w-full mt-4 p-5 rounded-2xl bg-slate-50 border border-black/10 text-slate-900 outline-none text-lg transition-all"
            />
          </div>

          <button
            onClick={handleCreateRoom}
            className="mt-10 overflow-hidden relative group bg-blue-600 text-white p-5 rounded-2xl font-semibold shadow-[0_10px_30px_rgba(37,99,235,0.3)] hover:bg-blue-500 hover:shadow-[0_15px_40px_rgba(37,99,235,0.5)] transition-all"
          >
            <span className="relative z-10 font-bold tracking-wide">Create Room</span>
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>

        </motion.div>

        {/* JOIN ROOM */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="group bg-white/90 backdrop-blur-3xl border border-black/[0.04] shadow-[0_20px_60px_rgba(0,0,0,0.06)] rounded-[40px] p-12 md:p-14 flex flex-col justify-between transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_30px_80px_rgba(0,0,0,0.12)]"
        >

          <div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-5 leading-tight tracking-tight">
              Join <br /> Travel Room
            </h2>

            <p className="text-slate-500 text-lg mb-8 tracking-tight font-medium">
              Enter your name and the room code shared by your group.
            </p>

            <div className="space-y-4">
              <input
                value={joinName}
                onChange={(e) => setJoinName(e.target.value)}
                placeholder="Your Name"
                className="w-full p-5 rounded-2xl bg-slate-50 border border-black/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-900 placeholder-slate-400 outline-none text-lg transition-all"
              />
              <input
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleJoinRoom()}
                placeholder="Enter 6-Digit Code"
                className="w-full p-5 rounded-2xl bg-slate-50 border border-black/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-900 placeholder-slate-400 outline-none text-lg transition-all font-mono"
              />
            </div>
          </div>

          <button
            onClick={handleJoinRoom}
            className="mt-10 overflow-hidden relative group bg-slate-100 hover:bg-slate-200 border border-black/5 text-slate-900 p-5 rounded-2xl font-bold tracking-wide shadow-sm hover:shadow-md transition-all"
          >
            <span className="relative z-10">Join Room</span>
          </button>

        </motion.div>

      </div>

    </div>
  );
}

export default Group;