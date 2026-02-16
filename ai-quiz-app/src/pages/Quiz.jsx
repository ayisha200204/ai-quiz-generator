import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Quiz() {

  const navigate = useNavigate();

  const questions = [
    {
      question: "What is Artificial Intelligence?",
      options: [
        "Machine learning technology",
        "Simulation of human intelligence by machines",
        "Programming language",
        "Computer hardware"
      ],
      answer: 1,
      explanation: "AI refers to machines simulating human intelligence like learning and reasoning."
    },
    {
      question: "Which process converts speech to text?",
      options: [
        "Image recognition",
        "Speech-to-text",
        "Encryption",
        "Compression"
      ],
      answer: 1,
      explanation: "Speech-to-text converts spoken language into written text."
    }
  ];

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const q = questions[current];

  const handleSelect = (index) => {

    setSelected(index);
    setShowResult(true);

    if (index === q.answer) {
      setScore(prev => prev + 10);
    }

  };

  const handleNext = () => {

    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      navigate("/result", { state: { score } });
    }

  };

  return (

    <div className="min-h-screen bg-[#020617] text-white flex justify-center items-center px-6 overflow-hidden">

      {/* background glow */}
      <div className="absolute w-[700px] h-[700px] bg-cyan-500/10 blur-[160px] rounded-full"></div>

      <div className="relative w-full max-w-2xl">

        {/* TOP BAR */}
        <div className="flex justify-between items-center mb-6">

          <p className="text-cyan-400 font-medium">
            XP Score: {score}
          </p>

          <p className="text-gray-400 text-sm">
            {current + 1} / {questions.length}
          </p>

        </div>

        {/* PROGRESS BAR */}
        <div className="w-full bg-white/10 h-2 rounded-full mb-10 overflow-hidden">

          <motion.div
            className="bg-cyan-400 h-full"
            animate={{
              width: `${(current + 1) / questions.length * 100}%`
            }}
            transition={{ duration: 0.4 }}
          />

        </div>

        {/* QUESTION CARD */}
        <motion.div
          key={current}
          initial={{ opacity:0, y:20 }}
          animate={{ opacity:1, y:0 }}
          className="relative bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl p-10 shadow-xl"
        >

          <h2 className="text-2xl font-semibold mb-8 leading-relaxed">
            {q.question}
          </h2>

          <div className="space-y-4">

            {q.options.map((opt, index) => {

              let style = "bg-white/5 border-white/10 hover:bg-white/10";

              if (showResult) {

                if (index === q.answer) {
                  style = "bg-green-400 text-black border-green-400";
                }
                else if (index === selected) {
                  style = "bg-red-400 text-black border-red-400";
                }

              }

              return (

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  key={index}
                  onClick={() => !showResult && handleSelect(index)}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${style}`}
                >
                  {opt}
                </motion.button>

              );

            })}

          </div>

          {/* AI EXPLANATION */}
          {showResult && (

            <motion.div
              initial={{ opacity:0 }}
              animate={{ opacity:1 }}
              className="mt-6 bg-cyan-400/10 border border-cyan-400/30 rounded-lg p-4"
            >
              <p className="text-sm text-cyan-200">
                🤖 AI Explanation: {q.explanation}
              </p>
            </motion.div>

          )}

          {/* NEXT BUTTON */}
          {showResult && (

            <motion.button
              whileHover={{ scale:1.02 }}
              whileTap={{ scale:0.97 }}
              onClick={handleNext}
              className="mt-8 w-full bg-cyan-400 text-black py-3 rounded-lg font-medium"
            >

              {current === questions.length - 1
                ? "Finish Quiz"
                : "Next Question"}

            </motion.button>

          )}

        </motion.div>

      </div>

    </div>

  );

}
