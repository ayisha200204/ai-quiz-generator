import { useNavigate } from "react-router-dom";
import { GraduationCap, UploadCloud, Brain, ListChecks } from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function Home() {

  const navigate = useNavigate();

  /* ===== HIDE GLOBAL HEADER ONLY ON HOME ===== */

  useEffect(() => {

    const header = document.querySelector("header");

    if (header) {
      header.style.display = "none";
    }

    return () => {
      if (header) {
        header.style.display = "block";
      }
    };

  }, []);


  /* ===== CURSOR GLOW EFFECT ===== */

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  const handleMouseMove = (e) => {
    mouseX.set(e.clientX - 200);
    mouseY.set(e.clientY - 200);
  };

  return (

    <div
      onMouseMove={handleMouseMove}
      className="relative min-h-screen bg-[#020617] text-white overflow-hidden"
    >

      {/* CURSOR GLOW */}
      <motion.div
        style={{ x: smoothX, y: smoothY }}
        className="pointer-events-none fixed w-[400px] h-[400px]
        bg-cyan-500/20 blur-[120px] rounded-full z-0"
      />

      {/* BACKGROUND GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10"></div>


      {/* ===== MODIFIED HEADER / NAVBAR ===== */}

      <nav className="
        relative z-20
        w-full
        bg-gradient-to-r from-[#020617] via-[#021827] to-[#020617]
        border-b border-white/10
        shadow-lg
      ">

        <div className="max-w-7xl mx-auto px-8 md:px-20 py-6 flex justify-between items-center">

          <div className="flex items-center gap-3">

            <GraduationCap className="text-cyan-400"/>

            <span className="font-semibold tracking-wide text-lg">
              Quiz Converter
            </span>

          </div>

          <div
            onClick={() => navigate("/")}
            className="text-gray-300 hover:text-cyan-400 transition cursor-pointer"
          >
            Home
          </div>

        </div>

      </nav>


      {/* ===== HERO ===== */}

      <section className="relative z-10 px-8 md:px-20 py-28 max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">

        {/* LEFT */}
        <motion.div
          initial={{ opacity:0, y:40 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:0.7 }}
        >

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">

            Upload a Video.
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
              Get Quizzes Instantly.
            </span>

          </h1>

          <p className="text-gray-400 text-lg mt-8 max-w-xl">
            Transform lectures into interactive AI quizzes instantly.
          </p>

          <button
            onClick={() => navigate("/upload")}
            className="mt-12 px-10 py-4 rounded-lg font-medium
            bg-gradient-to-r from-cyan-400 to-blue-500 text-black
            hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl"
          >
            Upload Video
          </button>

        </motion.div>


        {/* RIGHT CARD */}
        <motion.div
          initial={{ opacity:0, y:80 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:0.8 }}
          className="relative flex justify-center"
        >

          <motion.div
            animate={{ y:[0,-12,0] }}
            transition={{ repeat:Infinity, duration:5 }}
            className="backdrop-blur-xl bg-white/5 border border-white/10
            rounded-2xl p-8 w-full max-w-md shadow-2xl space-y-6"
          >

            <FlowItem icon={<UploadCloud size={22}/>} title="Upload Video" desc="MP4 or lecture recordings" />
            <FlowItem icon={<Brain size={22}/>} title="AI Analysis" desc="Speech-to-text + understanding" />
            <FlowItem icon={<ListChecks size={22}/>} title="Quiz Generated" desc="Instant questions with explanations" />

          </motion.div>

        </motion.div>

      </section>

    </div>

  );

}


/* ===== FLOW ITEM ===== */

function FlowItem({ icon, title, desc }) {

  return (

    <motion.div
      whileHover={{ scale:1.06 }}
      className="flex gap-4 items-start bg-white/5 border border-white/10
      rounded-xl p-4"
    >

      <div className="text-cyan-400 mt-1">{icon}</div>

      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-gray-400">{desc}</p>
      </div>

    </motion.div>

  );

}
