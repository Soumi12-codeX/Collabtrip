import { motion } from "framer-motion";

function JourneyIntro() {
  return (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-[#f5f5f7]">

      {/* Atmospheric cinematic background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f5f5f7] via-white to-[#f5f5f7]" />

      {/* subtle central glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_60%)]" />

      {/* cinematic fade into next scene */}
      <div className="absolute bottom-0 w-full h-40 bg-gradient-to-b from-transparent to-[#f5f5f7]" />

      {/* content */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative text-center max-w-4xl px-6"
      >

        <p className="tracking-[0.4em] text-slate-400 text-xs uppercase mb-8 font-bold">
          Begin the Journey
        </p>

        <h2 className="text-[40px] md:text-[68px] font-heading font-extrabold leading-[1.05] tracking-tighter text-slate-900">
          Travel is not just where you go. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
            It’s how you experience the world.
          </span>
        </h2>

        {/* cinematic scroll indicator */}
        <div className="mt-20 flex justify-center">
          <div className="w-[1px] h-24 bg-slate-300 relative overflow-hidden">
            <div className="absolute top-0 w-full h-10 bg-blue-500 animate-bounce shadow-[0_0_10px_rgba(59,130,246,0.5)]"/>
          </div>
        </div>

      </motion.div>

    </section>
  );
}

export default JourneyIntro;