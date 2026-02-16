import { useState, useRef } from "react";
import { UploadCloud } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Upload() {

  const [dragActive, setDragActive] = useState(false);
  const [progress, setProgress] = useState(0);

  const inputRef = useRef(null);
  const navigate = useNavigate();

  /* ===== CURSOR GLOW ===== */

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  const handleMouseMove = (e) => {
    mouseX.set(e.clientX - 200);
    mouseY.set(e.clientY - 200);
  };

  /* ===== SIMULATE UPLOAD ===== */

  const simulateUpload = () => {

    let value = 0;

    const interval = setInterval(() => {

      value += 5;
      setProgress(value);

      if (value >= 100) {
        clearInterval(interval);
        setTimeout(() => navigate("/processing"), 800);
      }

    }, 120);

  };

  const handleFile = (file) => {
    if (!file) return;
    simulateUpload();
  };

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

      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10"></div>

      <div className="relative w-full max-w-3xl">

        {/* HEADER */}
        <motion.div
          initial={{ opacity:0, y:20 }}
          animate={{ opacity:1, y:0 }}
          className="mb-14 text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight">
            Upload your video
          </h1>

          <p className="text-gray-400 mt-3 text-lg">
            Convert lectures into AI quizzes instantly
          </p>
        </motion.div>

        {/* UPLOAD CARD */}
        <motion.div
          whileHover={{ scale:1.02 }}
          onDragEnter={()=>setDragActive(true)}
          onDragLeave={()=>setDragActive(false)}
          onDragOver={(e)=>e.preventDefault()}
          onDrop={(e)=>{
            e.preventDefault();
            setDragActive(false);
            handleFile(e.dataTransfer.files[0]);
          }}
          onClick={()=> inputRef.current.click()}
          className={`
            relative border rounded-2xl p-16 text-center cursor-pointer
            backdrop-blur-xl transition-all duration-300
            shadow-xl hover:shadow-cyan-500/10
            ${dragActive
              ? "border-cyan-400 bg-white/10"
              : "border-white/10 bg-white/[0.04] hover:bg-white/[0.06]"}
          `}
        >

          {/* subtle glow border */}
          <div className="absolute inset-0 rounded-2xl pointer-events-none
           bg-gradient-to-r from-cyan-400/10 via-transparent to-blue-400/10" />

          <UploadCloud
            size={56}
            className="mx-auto text-cyan-400 mb-6"
          />

          <h2 className="text-xl font-semibold">
            Drag & Drop Video
          </h2>

          <p className="text-gray-400 mt-2">
            or click to browse files
          </p>

          <input
            ref={inputRef}
            type="file"
            accept="video/*"
            hidden
            onChange={(e)=> handleFile(e.target.files[0])}
          />

        </motion.div>

        {/* PROGRESS BAR */}
        {progress > 0 && (

          <motion.div
            initial={{opacity:0}}
            animate={{opacity:1}}
            className="mt-10"
          >

            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Uploading & Processing...</span>
              <span>{progress}%</span>
            </div>

            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">

              <motion.div
                className="bg-cyan-400 h-full"
                animate={{ width:`${progress}%` }}
              />

            </div>

          </motion.div>

        )}

      </div>

    </div>

  );

}
