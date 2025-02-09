import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext/authContext";

const GENDER_OPTIONS = ["Male", "Female", "Other"];

const calculatePersonalityType = (answers) => {
  let scores = {
    E: 0,
    I: 0,
    S: 0,
    N: 0,
    T: 0,
    F: 0,
    J: 0,
    P: 0,
  };

  answers.forEach((answer, index) => {
    const value = answer.value;
    // Use specific question indexes for the four traits
    switch (index) {
      case 0:
      case 5:
        scores[value > 0 ? "E" : "I"] += Math.abs(value);
        break;
      case 1:
      case 6:
        scores[value > 0 ? "N" : "S"] += Math.abs(value);
        break;
      case 2:
      case 7:
        scores[value > 0 ? "F" : "T"] += Math.abs(value);
        break;
      case 3:
      case 8:
        scores[value > 0 ? "J" : "P"] += Math.abs(value);
        break;
      default:
        break;
    }
  });

  const type = [
    scores.E > scores.I ? "E" : "I",
    scores.N > scores.S ? "N" : "S",
    scores.T > scores.F ? "T" : "F",
    scores.J > scores.P ? "J" : "P",
  ].join("");

  return {
    type,
    scores: {
      extraversion:
        scores.E + scores.I > 0
          ? Math.round((scores.E / (scores.E + scores.I)) * 100)
          : 50,
      intuition:
        scores.N + scores.S > 0
          ? Math.round((scores.N / (scores.N + scores.S)) * 100)
          : 50,
      thinking:
        scores.T + scores.F > 0
          ? Math.round((scores.T / (scores.T + scores.F)) * 100)
          : 50,
      judging:
        scores.J + scores.P > 0
          ? Math.round((scores.J / (scores.J + scores.P)) * 100)
          : 50,
    },
  };
};

const FALLBACK_QUESTIONS = [
  {
    id: "q1",
    text: "You regularly make new friends.",
    options: [
      { value: -3, text: "Strongly Disagree" },
      { value: -2, text: "Disagree" },
      { value: -1, text: "Slightly Disagree" },
      { value: 0, text: "Neutral" },
      { value: 1, text: "Slightly Agree" },
      { value: 2, text: "Agree" },
      { value: 3, text: "Strongly Agree" },
    ],
  },
  {
    id: "q2",
    text: "You spend a lot of free time exploring various random topics that pique your interest.",
    options: [
      { value: -3, text: "Strongly Disagree" },
      { value: -2, text: "Disagree" },
      { value: -1, text: "Slightly Disagree" },
      { value: 0, text: "Neutral" },
      { value: 1, text: "Slightly Agree" },
      { value: 2, text: "Agree" },
      { value: 3, text: "Strongly Agree" },
    ],
  },
  {
    id: "q3",
    text: "Seeing other people cry can easily make you feel like you want to cry too.",
    options: [
      { value: -3, text: "Strongly Disagree" },
      { value: -2, text: "Disagree" },
      { value: -1, text: "Slightly Disagree" },
      { value: 0, text: "Neutral" },
      { value: 1, text: "Slightly Agree" },
      { value: 2, text: "Agree" },
      { value: 3, text: "Strongly Agree" },
    ],
  },
  {
    id: "q4",
    text: "You often make a backup plan for a backup plan.",
    options: [
      { value: -3, text: "Strongly Disagree" },
      { value: -2, text: "Disagree" },
      { value: -1, text: "Slightly Disagree" },
      { value: 0, text: "Neutral" },
      { value: 1, text: "Slightly Agree" },
      { value: 2, text: "Agree" },
      { value: 3, text: "Strongly Agree" },
    ],
  },
  {
    id: "q5",
    text: "You usually stay calm, even under a lot of pressure.",
    options: [
      { value: -3, text: "Strongly Disagree" },
      { value: -2, text: "Disagree" },
      { value: -1, text: "Slightly Disagree" },
      { value: 0, text: "Neutral" },
      { value: 1, text: "Slightly Agree" },
      { value: 2, text: "Agree" },
      { value: 3, text: "Strongly Agree" },
    ],
  },
  {
    id: "q6",
    text: "At social events, you rarely try to introduce yourself to new people and mostly talk to the ones you already know.",
    options: [
      { value: -3, text: "Strongly Disagree" },
      { value: -2, text: "Disagree" },
      { value: -1, text: "Slightly Disagree" },
      { value: 0, text: "Neutral" },
      { value: 1, text: "Slightly Agree" },
      { value: 2, text: "Agree" },
      { value: 3, text: "Strongly Agree" },
    ],
  },
  {
    id: "q7",
    text: "You prefer to completely finish one project before starting another.",
    options: [
      { value: -3, text: "Strongly Disagree" },
      { value: -2, text: "Disagree" },
      { value: -1, text: "Slightly Disagree" },
      { value: 0, text: "Neutral" },
      { value: 1, text: "Slightly Agree" },
      { value: 2, text: "Agree" },
      { value: 3, text: "Strongly Agree" },
    ],
  },
  {
    id: "q8",
    text: "You are very sentimental.",
    options: [
      { value: -3, text: "Strongly Disagree" },
      { value: -2, text: "Disagree" },
      { value: -1, text: "Slightly Disagree" },
      { value: 0, text: "Neutral" },
      { value: 1, text: "Slightly Agree" },
      { value: 2, text: "Agree" },
      { value: 3, text: "Strongly Agree" },
    ],
  },
  {
    id: "q9",
    text: "You like to use organizing tools like schedules and lists.",
    options: [
      { value: -3, text: "Strongly Disagree" },
      { value: -2, text: "Disagree" },
      { value: -1, text: "Slightly Disagree" },
      { value: 0, text: "Neutral" },
      { value: 1, text: "Slightly Agree" },
      { value: 2, text: "Agree" },
      { value: 3, text: "Strongly Agree" },
    ],
  },
  {
    id: "q10",
    text: "Even a small mistake can cause you to doubt your overall abilities and knowledge.",
    options: [
      { value: -3, text: "Strongly Disagree" },
      { value: -2, text: "Disagree" },
      { value: -1, text: "Slightly Disagree" },
      { value: 0, text: "Neutral" },
      { value: 1, text: "Slightly Agree" },
      { value: 2, text: "Agree" },
      { value: 3, text: "Strongly Agree" },
    ],
  },
];

const LoadingScreen = () => (
  <div className="fixed inset-0 bg-green-50/80 dark:bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="text-center">
      {/* A simple spinner using Tailwind CSS */}
      <div className="w-16 h-16 border-4 border-green-600 border-dashed rounded-full animate-spin mx-auto" />
      <p className="mt-4 text-green-700 dark:text-green-400 text-lg font-semibold">
        Processing your responses...
      </p>
    </div>
  </div>
);

const QuestionCard = ({ question, answer, onAnswer }) => {
  const positions = [-3, -2, -1, 0, 1, 2, 3];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-lg p-8 shadow-lg"
    >
      <h3 className="text-xl text-gray-700 dark:text-gray-200 mb-8 text-center">
        {question.text}
      </h3>
      
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between text-sm font-medium">
          <span className="text-green-600 dark:text-green-400">Agree</span>
          <span className="text-green-600 dark:text-green-400">Disagree</span>
        </div>
        
        <div className="flex justify-between items-center relative">
          <div className="absolute w-full h-0.5 bg-gray-200 dark:bg-gray-600 -z-10" />
          
          {positions.map((value) => {
            const isSelected = answer?.value === value;
            return (
              <motion.button
                key={value}
                onClick={() => onAnswer(question.id, value)}
                className="relative"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <div
                  className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                    isSelected
                      ? 'border-green-500 bg-green-500'
                      : 'border-gray-300 dark:border-gray-500 hover:border-green-400'
                  }`}
                />
                {isSelected && (
                  <motion.div
                    layoutId={`selection-${question.id}`}
                    className="absolute inset-0 bg-green-500 rounded-full"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
        
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>Strongly Agree</span>
          <span>Neutral</span>
          <span>Strongly Disagree</span>
        </div>
      </div>
    </motion.div>
  );
};


const ResultTraitCard = ({ trait }) => (
  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-lg p-6 mb-6 shadow-md">
    <div className="flex justify-between items-center mb-2">
      <div>
        <h4 className="font-semibold text-green-700 dark:text-green-400 text-lg">
          {trait.trait}
        </h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {trait.label}
        </p>
      </div>
      <span className="text-green-600 dark:text-green-400 font-bold">
        {trait.pct}%
      </span>
    </div>
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
      <div
        className="bg-green-600 h-2 rounded-full transition-all duration-1000"
        style={{ width: `${trait.pct}%` }}
      />
    </div>
    <p className="text-gray-600 dark:text-gray-400 text-sm">
      {trait.snippet}
    </p>
  </div>
);

const PersonalityQuestionnaire = () => {
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [gender, setGender] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const questionsPerPage = 5;

  useEffect(() => {
    // Use fallback questions instead of fetching from an API.
    setQuestions(FALLBACK_QUESTIONS);
    setLoading(false);
  }, []);

  const handleAnswer = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: { id: questionId, value },
    }));
  };

  const getCurrentQuestions = () => {
    const start = currentPage * questionsPerPage;
    return questions.slice(start, start + questionsPerPage);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      // Calculate personality type using sorted answers based on question order.
      const personalityResult = calculatePersonalityType(
        Object.values(answers).sort(
          (a, b) =>
            questions.findIndex((q) => q.id === a.id) -
            questions.findIndex((q) => q.id === b.id)
        )
      );

      // Save the personality type to the backend API.
      const response = await fetch("https://budtest-cgg3a5g9d7cjasf7.canadacentral-01.azurewebsites.net/api/personality", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${await user.getIdToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          personalityType: personalityResult.type,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save personality type");
      }

      // Build result object for display.
      const resultData = {
        niceName: `${personalityResult.type} Personality`,
        fullCode: `${personalityResult.type}-A`,
        avatarSrcStatic: "/api/placeholder/100/100",
        avatarAlt: "Personality Avatar",
        snippet:
          "Your unique personality type reveals your natural tendencies and preferences.",
        traits: [
          {
            trait:
              personalityResult.type[0] === "E"
                ? "Extraversion"
                : "Introversion",
            pct: personalityResult.scores.extraversion,
            label: "Energy Source",
            snippet:
              personalityResult.type[0] === "E"
                ? "You tend to be energized by social interaction and external stimulation."
                : "You prefer quiet, solitary activities and internal reflection.",
          },
          {
            trait:
              personalityResult.type[1] === "N" ? "Intuition" : "Sensing",
            pct: personalityResult.scores.intuition,
            label: "Information Processing",
            snippet:
              personalityResult.type[1] === "N"
                ? "You focus on abstract concepts and future possibilities."
                : "You prefer concrete details and practical realities.",
          },
          {
            trait:
              personalityResult.type[2] === "T" ? "Thinking" : "Feeling",
            pct: personalityResult.scores.thinking,
            label: "Decision Making",
            snippet:
              personalityResult.type[2] === "T"
                ? "You make decisions based on logic and objective analysis."
                : "You make decisions based on personal values and emotional impact.",
          },
          {
            trait:
              personalityResult.type[3] === "J" ? "Judging" : "Perceiving",
            pct: personalityResult.scores.judging,
            label: "Lifestyle",
            snippet:
              personalityResult.type[3] === "J"
                ? "You prefer structure, planning, and organization."
                : "You prefer flexibility, spontaneity, and adaptability.",
          },
        ],
      };

      setResult(resultData);
    } catch (err) {
      console.error(err);
      setError("Failed to process results. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const totalPages = Math.ceil(questions.length / questionsPerPage);
  const isPageComplete = () => {
    const currentQuestions = getCurrentQuestions();
    return currentQuestions.every((q) => answers[q.id]);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-xl shadow-xl p-8">
            <div className="flex items-center gap-6 mb-8">
              <img
                src={result.avatarSrcStatic}
                alt={result.avatarAlt}
                className="w-24 h-24 rounded-full"
              />
              <div>
                <h2 className="text-3xl font-bold text-green-700 dark:text-green-400">
                  {result.niceName}
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  {result.fullCode}
                </p>
              </div>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mb-8">
              {result.snippet}
            </p>

            <div className="space-y-6">
              {result.traits.map((trait, index) => (
                <ResultTraitCard key={index} trait={trait} />
              ))}
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => navigate("/")}
                className="px-6 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-all"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!gender) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-xl shadow-xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-6">
            Before we begin...
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Please select your gender to personalize your results:
          </p>
          <div className="grid gap-4">
            {GENDER_OPTIONS.map((option) => (
              <button
                key={option}
                onClick={() => setGender(option)}
                className="w-full px-6 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-all transform hover:scale-105"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div 
          className="space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {getCurrentQuestions().map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              answer={answers[question.id]}
              onAnswer={handleAnswer}
            />
          ))}
          
          <div className="flex justify-between mt-8">
            <motion.button
              onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
              disabled={currentPage === 0}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-lg bg-gray-200 dark:bg-gray-700 
                       hover:bg-gray-300 dark:hover:bg-gray-600 
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </motion.button>
            
            {currentPage === Math.ceil(questions.length / questionsPerPage) - 1 ? (
              <motion.button
                onClick={handleSubmit}
                disabled={!isPageComplete()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-lg bg-green-600 text-white 
                         hover:bg-green-700 disabled:opacity-50 
                         disabled:cursor-not-allowed"
              >
                Complete
              </motion.button>
            ) : (
              <motion.button
                onClick={() => setCurrentPage((prev) => prev + 1)}
                disabled={!isPageComplete()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-lg bg-green-600 text-white 
                         hover:bg-green-700 disabled:opacity-50 
                         disabled:cursor-not-allowed"
              >
                Next
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PersonalityQuestionnaire;