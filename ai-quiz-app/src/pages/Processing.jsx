import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Processing() {

  const navigate = useNavigate();

  const logs = [

    "Uploading video...",
    "Extracting audio from video...",
    "Running speech-to-text transcription...",
    "Detecting key learning topics...",
    "Generating intelligent quiz questions...",
    "Adding explanations and difficulty levels...",
    "Preparing interactive quiz interface...",
    "Finalizing AI output..."

  ];

  const [visibleLogs, setVisibleLogs] = useState([]);
  const [currentText, setCurrentText] = useState("");

  const containerRef = useRef(null);

  /* ===== CURSOR GLOW ===== */

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  const handleMouseMove = (e) => {
    mouseX.set(e.clientX - 200);
    mouseY.set(e.clientY - 200);
  };

  /* ===== AI TYPE EFFECT ===== */

  useEffect(() => {

    let logIndex = 0;

    function typeLog() {

      if (logIndex >= logs.length) {

        setTimeout(() => navigate("/quiz"), 1200);
        return;

      }

      let charIndex = 0;

      const typingInterval = setInterval(() => {

        setCurrentText(logs[logIndex].slice(0, charIndex + 1));

        charIndex++;

        if (charIndex >= logs[logIndex].length) {

          clearInterval(typingInterval);

          setVisibleLogs(prev => [...prev, logs[logIndex]]);
          setCurrentText("");

          logIndex++;

          setTimeout(typeLog, 600);

        }

      }, 30);

    }

    typeLog();

  }, [navigate]);

  /* ===== AUTO SCROLL ===== */

  useEffect(() => {

    if (containerRef.current) {

      containerRef.current.scrollTop =
        containerRef.current.scrollHeight;

    }

  }, [visibleLogs, currentText]);

  return (

    <div
      onMouseMove={handleMouseMove}
      className="relative min-h-screen bg-[#020617] text-white flex justify-center items-center px-6 overflow-hidden"
    >

      {/* CURSOR GLOW */}

      <motion.div
        style={{ x: smoothX, y: smoothY }}
        className="pointer-events-none fixed w-[400px] h-[400px]
        bg-cyan-500/20 blur-[120px] rounded-full"
      />

      {/* BACKGROUND GRADIENT */}

      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10"></div>

      <div className="relative w-full max-w-2xl">

        <div className="text-center mb-10">

          <h1 className="text-4xl font-bold tracking-tight">
            AI is Building Your Quiz
          </h1>

          <p className="text-gray-400 mt-3">
            Please wait while we process your video.
          </p>

        </div>

        {/* TERMINAL LOGS */}

        <div
          ref={containerRef}
          className="h-[350px] overflow-y-auto bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-4"
        >

          {visibleLogs.map((log, index) => (

            <div key={index} className="flex gap-3">

              <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>

              <p className="text-sm text-gray-200">{log}</p>

            </div>

          ))}

          {currentText && (

            <div className="flex gap-3">

              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>

              <p className="text-sm text-gray-200">
                {currentText}<span className="animate-pulse">|</span>
              </p>

            </div>

          )}

        </div>

        {/* PROGRESS BAR */}

        <div className="mt-8 w-full bg-white/10 rounded-full h-2 overflow-hidden">

          <div
            className="bg-cyan-400 h-full transition-all duration-500"
            style={{
              width: `${visibleLogs.length / logs.length * 100}%`
            }}
          />

        </div>

      </div>

    </div>

  );

}
