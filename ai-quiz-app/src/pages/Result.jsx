import { useLocation, useNavigate } from "react-router-dom";

export default function Result() {

  const navigate = useNavigate();
  const location = useLocation();

  const score = location.state?.score || 0;

  /* ===== AI FEEDBACK ===== */

  const getFeedback = () => {

    if (score >= 20) return "🔥 Excellent understanding!";
    if (score >= 10) return "👍 Good progress. Keep learning!";
    return "💡 Try again to improve your understanding.";

  };

  return (

    <div className="min-h-screen bg-[#020617] text-white flex justify-center items-center px-6 overflow-hidden">

      {/* Glow */}
      <div className="absolute w-[700px] h-[700px] bg-cyan-500/10 blur-[160px] rounded-full"></div>

      <div className="relative w-full max-w-xl text-center">

        {/* RESULT CARD */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-12">

          <h1 className="text-4xl font-bold mb-6">
            Quiz Completed 🎉
          </h1>

          {/* SCORE */}
          <p className="text-6xl font-bold text-cyan-400 mb-4">
            {score}
          </p>

          <p className="text-gray-400 mb-8">
            Your XP Score
          </p>

          {/* AI FEEDBACK */}
          <div className="bg-cyan-400/10 border border-cyan-400/30 rounded-lg p-4 mb-10">

            <p className="text-cyan-200">
              🤖 AI Feedback: {getFeedback()}
            </p>

          </div>

          {/* BUTTONS */}
          <div className="flex gap-4 justify-center">

            <button
              onClick={() => navigate("/upload")}
              className="bg-cyan-400 text-black px-6 py-3 rounded-lg font-medium hover:scale-105 transition"
            >
              Try New Video
            </button>

            <button
              onClick={() => navigate("/")}
              className="border border-white/20 px-6 py-3 rounded-lg hover:border-cyan-400 transition"
            >
              Home
            </button>

          </div>

        </div>

      </div>

    </div>

  );

}
