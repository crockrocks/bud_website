import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Send, RefreshCw } from 'lucide-react';

const GENDER_OPTIONS = ["Male", "Female", "Other"];
const MAX_RETRIES = 2;

const calculatePersonalityType = (answers) => {
    let scores = {
        E: 0, I: 0,
        S: 0, N: 0,
        T: 0, F: 0,
        J: 0, P: 0  
    };
    
    answers.forEach((answer, index) => {
        const value = answer.value;
        
        switch(index) {
            case 0:
            case 5:
                scores[value > 0 ? 'E' : 'I'] += Math.abs(value);
                break;
            case 1:
            case 6:
                scores[value > 0 ? 'N' : 'S'] += Math.abs(value);
                break;
            case 2:
            case 7:
                scores[value > 0 ? 'F' : 'T'] += Math.abs(value);
                break;
            case 3:
            case 8:
                scores[value > 0 ? 'J' : 'P'] += Math.abs(value);
                break;
            default:
                break;
        }
    });

    const type = [
        scores.E > scores.I ? 'E' : 'I',
        scores.N > scores.S ? 'N' : 'S',
        scores.T > scores.F ? 'T' : 'F',
        scores.J > scores.P ? 'J' : 'P'
    ].join('');

    return {
        type,
        scores: {
            extraversion: Math.round((scores.E / (scores.E + scores.I)) * 100),
            intuition: Math.round((scores.N / (scores.N + scores.S)) * 100),
            thinking: Math.round((scores.T / (scores.T + scores.F)) * 100),
            judging: Math.round((scores.J / (scores.J + scores.P)) * 100)
        }
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
            { value: 3, text: "Strongly Agree" }
        ]
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
            { value: 3, text: "Strongly Agree" }
        ]
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
            { value: 3, text: "Strongly Agree" }
        ]
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
            { value: 3, text: "Strongly Agree" }
        ]
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
            { value: 3, text: "Strongly Agree" }
        ]
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
            { value: 3, text: "Strongly Agree" }
        ]
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
            { value: 3, text: "Strongly Agree" }
        ]
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
            { value: 3, text: "Strongly Agree" }
        ]
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
            { value: 3, text: "Strongly Agree" }
        ]
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
            { value: 3, text: "Strongly Agree" }
        ]
    }
];

const LoadingScreen = () => (
    <div className="fixed inset-0 bg-green-50/80 dark:bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="text-center">
            <div className="animate-spin">
                <RefreshCw className="w-16 h-16 text-green-600 dark:text-green-400" />
            </div>
            <p className="mt-4 text-green-700 dark:text-green-400 text-lg font-semibold">Processing your responses...</p>
        </div>
    </div>
);

const QuestionSet = ({ questions, answers, onAnswer, startIndex }) => {
    return (
        <div className="space-y-8">
            {questions.map((question, idx) => (
                <div
                    key={question.id}
                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-lg p-6 shadow-md"
                >
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-green-700 dark:text-green-400">
                            Question {startIndex + idx + 1}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">{question.text}</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                        {question.options.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => onAnswer(question.id, option.value)}
                                className={`p-3 rounded-lg text-center transition-all ${answers[question.id]?.value === option.value
                                        ? 'bg-green-600 text-white shadow-lg scale-105'
                                        : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                                    }`}
                            >
                                {option.text}
                            </button>
                        ))}
                    </div>
                </div>
            ))}
        </div>
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
    const [retryCount, setRetryCount] = useState(0);

    const questionsPerPage = 5;

    useEffect(() => {
        // Use fallback questions instead of fetching
        setQuestions(FALLBACK_QUESTIONS);
        setLoading(false);
    }, []);

    const handleAnswer = (questionId, value) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: { id: questionId, value }
        }));
    };

    const getCurrentQuestions = () => {
        const start = currentPage * questionsPerPage;
        return questions.slice(start, start + questionsPerPage);
    };

    const handleSubmit = async () => {
        setSubmitting(true);
        try {
            // Convert answers object to array
            const answersArray = Object.values(answers).sort((a, b) =>
                questions.findIndex(q => q.id === a.id) - questions.findIndex(q => q.id === b.id)
            );

            // Calculate personality type
            const personalityResult = calculatePersonalityType(answersArray);

            // Generate result object
            const result = {
                niceName: `${personalityResult.type} Personality`,
                fullCode: `${personalityResult.type}-A`,
                avatarSrcStatic: "/api/placeholder/100/100",
                avatarAlt: "Personality Avatar",
                snippet: "Your unique personality type reveals your natural tendencies and preferences.",
                traits: [
                    {
                        trait: personalityResult.type[0] === 'E' ? "Extraversion" : "Introversion",
                        pct: personalityResult.scores.extraversion,
                        label: personalityResult.type[0] === 'E' ? "Energy Source" : "Energy Source",
                        snippet: personalityResult.type[0] === 'E'
                            ? "You tend to be energized by social interaction and external stimulation."
                            : "You prefer quiet, solitary activities and internal reflection."
                    },
                    {
                        trait: personalityResult.type[1] === 'N' ? "Intuition" : "Sensing",
                        pct: personalityResult.scores.intuition,
                        label: "Information Processing",
                        snippet: personalityResult.type[1] === 'N'
                            ? "You focus on abstract concepts and future possibilities."
                            : "You prefer concrete details and practical realities."
                    },
                    {
                        trait: personalityResult.type[2] === 'T' ? "Thinking" : "Feeling",
                        pct: personalityResult.scores.thinking,
                        label: "Decision Making",
                        snippet: personalityResult.type[2] === 'T'
                            ? "You make decisions based on logic and objective analysis."
                            : "You make decisions based on personal values and emotional impact."
                    },
                    {
                        trait: personalityResult.type[3] === 'J' ? "Judging" : "Perceiving",
                        pct: personalityResult.scores.judging,
                        label: "Lifestyle",
                        snippet: personalityResult.type[3] === 'J'
                            ? "You prefer structure, planning, and organization."
                            : "You prefer flexibility, spontaneity, and adaptability."
                    }
                ]
            };

            setResult(result);
            setRetryCount(0);
        } catch (err) {
            console.error(err);
            setError('Failed to process results. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const totalPages = Math.ceil(questions.length / questionsPerPage);
    const isPageComplete = () => {
        const currentQuestions = getCurrentQuestions();
        return currentQuestions.every(q => answers[q.id]);
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
                                <ResultTraitCard key={index} trait={trait} index={index} />
                            ))}
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
            {submitting && <LoadingScreen />}

            <div className="container mx-auto px-4 max-w-4xl">
                {error && (
                    <div className="mb-6 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 p-4 rounded">
                        <p className="text-red-700 dark:text-red-200">{error}</p>
                    </div>
                )}

                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-xl shadow-xl p-8">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-green-700 dark:text-green-400 mb-4">
                            Personality Assessment
                        </h2>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}
                            />
                        </div>
                        <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
                            Page {currentPage + 1} of {totalPages}
                        </p>
                    </div>

                    <QuestionSet
                        questions={getCurrentQuestions()}
                        answers={answers}
                        onAnswer={handleAnswer}
                        startIndex={currentPage * questionsPerPage}
                    />

                    <div className="flex justify-between mt-8">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                            disabled={currentPage === 0}
                            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Previous
                        </button>

                        {currentPage === totalPages - 1 ? (
                            <button
                                onClick={handleSubmit}
                                disabled={!isPageComplete()}
                                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                Complete
                                <Send className="w-4 h-4" />
                            </button>
                        ) : (
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                                disabled={!isPageComplete()}
                                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                Next
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalityQuestionnaire;