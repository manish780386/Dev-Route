import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Timer,  RotateCcw, ChevronRight, CheckCircle2,
  XCircle, AlertCircle, Play, BookOpen, Brain, Calculator, Code2
} from "lucide-react";
import aptitudeData from "../../data/aptitude.json";


// ── Types ─────────────────────────────────────────────────────────────────────

interface QuizQuestion {
  id:            string;
  question:      string;
  options:       string[];
  correctAnswer: number;
  explanation:   string;
  difficulty:    "easy" | "medium" | "hard";
  topic:         string;
  source:        string;
}

type QuizState = "select" | "playing" | "result";

// ── Build question bank from all data ────────────────────────────────────────

function buildQuestionBank(): QuizQuestion[] {
  const questions: QuizQuestion[] = [];

  // From aptitude categories
  aptitudeData.categories.forEach((cat) => {
    (cat.topics as any[]).forEach((topic) => {
      (topic.questions as any[]).forEach((q) => {
        questions.push({
          id:            `apt-${cat.id}-${q.id}`,
          question:      q.question,
          options:       q.options,
          correctAnswer: q.correctAnswer,
          explanation:   q.explanation,
          difficulty:    q.difficulty,
          topic:         topic.title,
          source:        cat.title,
        });
      });
    });
  });

  return questions;
}

const ALL_QUESTIONS = buildQuestionBank();

// ── Config ───────────────────────────────────────────────────────────────────

const QUIZ_CONFIGS = [
  {
    id:          "quick",
    label:       "Quick Test",
    icon:        "⚡",
    questions:   10,
    timePerQ:    30,
    description: "10 questions · 30 sec each · Mixed topics",
    color:       "from-blue-500 to-cyan-500",
    bgColor:     "bg-blue-50 border-blue-200",
    textColor:   "text-blue-700",
  },
  {
    id:          "standard",
    label:       "Standard Test",
    icon:        "📝",
    questions:   20,
    timePerQ:    45,
    description: "20 questions · 45 sec each · Placement level",
    color:       "from-purple-500 to-violet-500",
    bgColor:     "bg-purple-50 border-purple-200",
    textColor:   "text-purple-700",
  },
  {
    id:          "challenge",
    label:       "Full Challenge",
    icon:        "🏆",
    questions:   30,
    timePerQ:    60,
    description: "30 questions · 60 sec each · All difficulties",
    color:       "from-orange-500 to-red-500",
    bgColor:     "bg-orange-50 border-orange-200",
    textColor:   "text-orange-700",
  },
];

const CATEGORY_FILTERS = [
  { id: "all",          label: "All Topics",          icon: Brain      },
  { id: "quantitative", label: "Quantitative",         icon: Calculator },
  { id: "logical",      label: "Logical Reasoning",    icon: Brain      },
  { id: "verbal",       label: "Verbal Ability",       icon: BookOpen   },
  { id: "programming-mcq", label: "Programming MCQ",  icon: Code2      },
];

// ── Utility ───────────────────────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getScoreLabel(pct: number) {
  if (pct >= 90) return { label: "Excellent! 🏆", color: "text-emerald-600" };
  if (pct >= 75) return { label: "Good Job! 👍",  color: "text-blue-600"    };
  if (pct >= 50) return { label: "Keep Practicing 💪", color: "text-amber-600" };
  return { label: "Need More Practice 📚", color: "text-red-600" };
}

// ── Select Screen ─────────────────────────────────────────────────────────────

function SelectScreen({
  onStart,
}: {
  onStart: (questions: QuizQuestion[], timePerQ: number, label: string) => void;
}) {
  const [selectedConfig,   setSelectedConfig]   = useState(QUIZ_CONFIGS[0]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleStart = () => {
    let pool = ALL_QUESTIONS;

    if (selectedCategory !== "all") {
      pool = ALL_QUESTIONS.filter((q) =>
        q.source.toLowerCase().replace(/\s+/g, "-").includes(selectedCategory) ||
        q.id.includes(selectedCategory)
      );
    }

    if (pool.length === 0) pool = ALL_QUESTIONS;

    const picked = shuffle(pool).slice(0, selectedConfig.questions);
    onStart(picked, selectedConfig.timePerQ, selectedConfig.label);
  };

  return (
    <div className="container-app py-12 max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="badge-animated mb-4">Mock Quiz</div>
        <h1 className="section-title mb-3">Test Your Knowledge</h1>
        <p className="section-subtitle">
          Timed aptitude quiz — just like real placement tests. Pick a mode and start!
        </p>
      </div>

      {/* Quiz mode selection */}
      <div className="mb-8">
        <h2 className="font-display font-semibold text-gray-700 text-sm uppercase tracking-wide mb-4">
          Select Mode
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {QUIZ_CONFIGS.map((config) => (
            <button
              key={config.id}
              onClick={() => setSelectedConfig(config)}
              className={`p-5 rounded-2xl border-2 text-left transition-all ${
                selectedConfig.id === config.id
                  ? `border-brand-500 bg-brand-50 dark:bg-brand-950`
                  : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-gray-300"
              }`}
            >
              <div className="text-3xl mb-3">{config.icon}</div>
              <h3 className={`font-display font-bold text-base mb-1 ${
                selectedConfig.id === config.id ? "text-brand-700 dark:text-brand-400" : "text-gray-900 dark:text-white"
              }`}>
                {config.label}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                {config.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Category filter */}
      <div className="mb-10">
        <h2 className="font-display font-semibold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide mb-4">
          Topic Filter
        </h2>
        <div className="flex flex-wrap gap-2">
          {CATEGORY_FILTERS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setSelectedCategory(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${
                selectedCategory === id
                  ? "bg-brand-600 text-white border-brand-600 shadow-sm"
                  : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-brand-300"
              }`}
            >
              <Icon size={13} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Summary card */}
      <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 mb-8">
        <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-3">Quiz Summary</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="font-display font-bold text-2xl text-brand-600">{selectedConfig.questions}</p>
            <p className="text-xs text-gray-500">Questions</p>
          </div>
          <div>
            <p className="font-display font-bold text-2xl text-purple-600">{selectedConfig.timePerQ}s</p>
            <p className="text-xs text-gray-500">Per Question</p>
          </div>
          <div>
            <p className="font-display font-bold text-2xl text-emerald-600">
              {Math.round((selectedConfig.questions * selectedConfig.timePerQ) / 60)}m
            </p>
            <p className="text-xs text-gray-500">Total Time</p>
          </div>
        </div>
      </div>

      {/* Start button */}
      <button
        onClick={handleStart}
        className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-gradient-to-r from-brand-600 to-brand-700 text-white font-display font-bold text-lg shadow-lg shadow-brand-500/25 hover:from-brand-700 hover:to-brand-800 active:scale-[0.99] transition-all"
      >
        <Play size={20} />
        Start {selectedConfig.label}
      </button>

      {/* Tips */}
      <div className="mt-8 grid sm:grid-cols-2 gap-3">
        {[
          "Read questions carefully — watch for 'NOT' and 'EXCEPT'",
          "If unsure, eliminate obviously wrong options first",
          "Timer shows urgency — don't overthink easy questions",
          "Review explanations after — learn from every mistake",
        ].map((tip, i) => (
          <div key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
            <span className="w-5 h-5 rounded-full bg-brand-50 dark:bg-brand-950 text-brand-600 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
              {i + 1}
            </span>
            {tip}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Playing Screen ────────────────────────────────────────────────────────────

function PlayingScreen({
  questions,
  timePerQ,
  onFinish,
}: {
  questions:  QuizQuestion[];
  timePerQ:   number;
  onFinish:   (answers: (number | null)[]) => void;
}) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected,   setSelected]   = useState<(number | null)[]>(
    Array(questions.length).fill(null)
  );
  const [timeLeft,   setTimeLeft]   = useState(timePerQ);
  const [showAns,    setShowAns]    = useState(false);

  const current = questions[currentIdx];
  const isLast  = currentIdx === questions.length - 1;

  // Timer
  useEffect(() => {
    if (showAns) return;
    if (timeLeft <= 0) {
      handleNext();
      return;
    }
    const t = setTimeout(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, showAns]);

  const handleSelect = (idx: number) => {
    if (showAns) return;
    const next = [...selected];
    next[currentIdx] = idx;
    setSelected(next);
    setShowAns(true);
  };

  const handleNext = useCallback(() => {
    if (isLast) {
      onFinish(selected);
    } else {
      setCurrentIdx((p) => p + 1);
      setTimeLeft(timePerQ);
      setShowAns(false);
    }
  }, [isLast, selected, onFinish, timePerQ]);

  const pct       = (timeLeft / timePerQ) * 100;
  const timerColor = pct > 50 ? "bg-emerald-500" : pct > 25 ? "bg-amber-500" : "bg-red-500";
  const answered  = selected.filter((s) => s !== null).length;

  return (
    <div className="container-app py-10 max-w-2xl mx-auto">
      {/* Progress bar + meta */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Question {currentIdx + 1} / {questions.length}
          </span>
          <div className="flex items-center gap-1.5 font-mono font-bold text-sm">
            <Timer size={14} className={pct <= 25 ? "text-red-500 animate-pulse" : "text-gray-400"} />
            <span className={pct <= 25 ? "text-red-500" : "text-gray-700 dark:text-gray-300"}>
              {timeLeft}s
            </span>
          </div>
        </div>

        {/* Question progress */}
        <div className="flex gap-1 mb-3">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                i < currentIdx
                  ? selected[i] !== null ? "bg-brand-500" : "bg-gray-300"
                  : i === currentIdx
                  ? "bg-brand-300"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
            />
          ))}
        </div>

        {/* Timer bar */}
        <div className="h-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
          <div
            className={`h-1 ${timerColor} rounded-full transition-all duration-1000 ease-linear`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Question card */}
      <div className="card p-7 mb-5">
        {/* Topic + difficulty */}
        <div className="flex items-center gap-2 mb-5">
          <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2.5 py-1 rounded-full">
            {current.source}
          </span>
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
            current.difficulty === "easy"   ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400" :
            current.difficulty === "medium" ? "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400" :
                                              "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400"
          }`}>
            {current.difficulty}
          </span>
        </div>

        <p className="font-display font-semibold text-gray-900 dark:text-white text-lg leading-snug mb-6 whitespace-pre-line">
          {current.question}
        </p>

        {/* Options */}
        <div className="space-y-3">
          {current.options.map((opt, idx) => {
            const userSelected = selected[currentIdx] === idx;
            const isCorrect    = idx === current.correctAnswer;

            let cls =
              "w-full text-left px-4 py-3.5 rounded-xl border-2 text-sm font-medium transition-all flex items-start gap-3 ";

            if (!showAns) {
              cls += "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:border-brand-400 hover:bg-brand-50 dark:hover:bg-brand-950 cursor-pointer";
            } else if (isCorrect) {
              cls += "border-emerald-400 bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300";
            } else if (userSelected && !isCorrect) {
              cls += "border-red-400 bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-400";
            } else {
              cls += "border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-400 cursor-default";
            }

            return (
              <button key={idx} onClick={() => handleSelect(idx)} disabled={showAns} className={cls}>
                <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                  showAns && isCorrect    ? "border-emerald-500 bg-emerald-500 text-white" :
                  showAns && userSelected ? "border-red-500 bg-red-500 text-white" :
                                           "border-gray-300 dark:border-gray-600 text-gray-500"
                }`}>
                  {showAns && isCorrect    ? <CheckCircle2 size={12} /> :
                   showAns && userSelected ? <XCircle      size={12} /> :
                   String.fromCharCode(65 + idx)}
                </span>
                <span>{opt}</span>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showAns && (
          <div className="mt-5 p-4 bg-blue-50 dark:bg-blue-950 border border-blue-100 dark:border-blue-900 rounded-xl">
            <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 mb-1.5 flex items-center gap-1.5">
              <AlertCircle size={12} /> Explanation
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {current.explanation}
            </p>
          </div>
        )}
      </div>

      {/* Bottom bar */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-400">
          {answered} answered · {questions.length - answered} remaining
        </p>
        {showAns && (
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-2.5 bg-brand-600 text-white text-sm font-semibold rounded-xl hover:bg-brand-700 active:scale-95 transition-all shadow-sm"
          >
            {isLast ? "See Results" : "Next"} <ChevronRight size={15} />
          </button>
        )}
      </div>
    </div>
  );
}

// ── Result Screen ─────────────────────────────────────────────────────────────

function ResultScreen({
  questions,
  answers,
  quizLabel,
  onRestart,
}: {
  questions:  QuizQuestion[];
  answers:    (number | null)[];
  quizLabel:  string;
  onRestart:  () => void;
}) {
  const [showReview, setShowReview] = useState(false);

  const correct  = answers.filter((a, i) => a === questions[i].correctAnswer).length;
  const skipped  = answers.filter((a)    => a === null).length;
  const wrong    = questions.length - correct - skipped;
  const pct      = Math.round((correct / questions.length) * 100);
  const { label: scoreLabel, color: scoreColor } = getScoreLabel(pct);

  const byDifficulty = {
    easy:   { total: 0, correct: 0 },
    medium: { total: 0, correct: 0 },
    hard:   { total: 0, correct: 0 },
  };
  questions.forEach((q, i) => {
    const d = q.difficulty as keyof typeof byDifficulty;
    byDifficulty[d].total++;
    if (answers[i] === q.correctAnswer) byDifficulty[d].correct++;
  });

  return (
    <div className="container-app py-12 max-w-2xl mx-auto">
      {/* Score card */}
      <div className="card p-8 text-center mb-6">
        <div className="text-5xl mb-4">
          {pct >= 90 ? "🏆" : pct >= 75 ? "🎉" : pct >= 50 ? "💪" : "📚"}
        </div>
        <h1 className={`font-display font-extrabold text-4xl mb-1 ${scoreColor}`}>
          {pct}%
        </h1>
        <p className={`font-semibold text-lg mb-1 ${scoreColor}`}>{scoreLabel}</p>
        <p className="text-gray-500 text-sm">{quizLabel} completed</p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-7">
          <div className="bg-emerald-50 dark:bg-emerald-950 rounded-xl p-4">
            <p className="font-display font-extrabold text-2xl text-emerald-600">{correct}</p>
            <p className="text-xs text-gray-500 mt-0.5">Correct</p>
          </div>
          <div className="bg-red-50 dark:bg-red-950 rounded-xl p-4">
            <p className="font-display font-extrabold text-2xl text-red-500">{wrong}</p>
            <p className="text-xs text-gray-500 mt-0.5">Wrong</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
            <p className="font-display font-extrabold text-2xl text-gray-400">{skipped}</p>
            <p className="text-xs text-gray-500 mt-0.5">Skipped</p>
          </div>
        </div>
      </div>

      {/* Difficulty breakdown */}
      <div className="card p-5 mb-6">
        <h3 className="font-display font-semibold text-gray-900 dark:text-white mb-4 text-sm">
          Performance by Difficulty
        </h3>
        <div className="space-y-3">
          {(["easy", "medium", "hard"] as const).map((d) => {
            const { total, correct: c } = byDifficulty[d];
            if (total === 0) return null;
            const p = Math.round((c / total) * 100);
            return (
              <div key={d} className="flex items-center gap-3">
                <span className={`w-14 text-xs font-medium capitalize ${
                  d === "easy" ? "text-green-600" : d === "medium" ? "text-amber-600" : "text-red-600"
                }`}>
                  {d}
                </span>
                <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className={`h-2 rounded-full ${
                      d === "easy" ? "bg-green-500" : d === "medium" ? "bg-amber-500" : "bg-red-500"
                    }`}
                    style={{ width: `${p}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500 w-16 text-right">
                  {c}/{total} ({p}%)
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 mb-8">
        <button
          onClick={onRestart}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold text-sm hover:border-brand-300 hover:text-brand-600 transition-colors"
        >
          <RotateCcw size={15} /> Try Again
        </button>
        <button
          onClick={() => setShowReview(!showReview)}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-600 text-white font-semibold text-sm hover:bg-brand-700 transition-colors"
        >
          <BookOpen size={15} /> {showReview ? "Hide" : "Review"} Answers
        </button>
      </div>

      {/* Review section */}
      {showReview && (
        <div className="space-y-4 mb-8">
          <h3 className="font-display font-semibold text-gray-900 dark:text-white">
            Answer Review
          </h3>
          {questions.map((q, i) => {
            const userAns   = answers[i];
            const isCorrect = userAns === q.correctAnswer;
            const isSkipped = userAns === null;

            return (
              <div key={q.id} className="card p-5">
                <div className="flex items-start gap-3 mb-3">
                  {isSkipped  ? <AlertCircle size={16} className="text-gray-400 mt-0.5 shrink-0" /> :
                   isCorrect  ? <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" /> :
                                <XCircle size={16} className="text-red-500 mt-0.5 shrink-0" />}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200 leading-snug mb-3">
                      {i + 1}. {q.question}
                    </p>
                    <div className="space-y-1.5">
                      {q.options.map((opt, idx) => (
                        <div key={idx} className={`text-xs px-3 py-2 rounded-lg ${
                          idx === q.correctAnswer   ? "bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-medium" :
                          idx === userAns && !isCorrect ? "bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400" :
                                                    "text-gray-500 dark:text-gray-500"
                        }`}>
                          {String.fromCharCode(65 + idx)}. {opt}
                          {idx === q.correctAnswer && " ✓"}
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 text-xs text-gray-600 dark:text-gray-400 bg-blue-50 dark:bg-blue-950 p-3 rounded-lg">
                      <span className="font-semibold text-blue-700 dark:text-blue-400">Explanation: </span>
                      {q.explanation}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* More practice links */}
      <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
        <h3 className="font-display font-semibold text-gray-900 dark:text-white mb-4 text-sm">
          Continue Practicing
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <Link to="/aptitude"    className="text-sm text-center py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 hover:border-brand-300 hover:text-brand-600 transition-colors font-medium">
            Aptitude Hub
          </Link>
          <Link to="/cs-subjects" className="text-sm text-center py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 hover:border-brand-300 hover:text-brand-600 transition-colors font-medium">
            CS Subjects
          </Link>
          <Link to="/placement"   className="text-sm text-center py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 hover:border-brand-300 hover:text-brand-600 transition-colors font-medium">
            Placement Guide
          </Link>
          <Link to="/roadmaps"    className="text-sm text-center py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 hover:border-brand-300 hover:text-brand-600 transition-colors font-medium">
            Roadmaps
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Main Quiz Page ────────────────────────────────────────────────────────────

export default function QuizPage() {
  const [state,      setState]      = useState<QuizState>("select");
  const [questions,  setQuestions]  = useState<QuizQuestion[]>([]);
  const [answers,    setAnswers]    = useState<(number | null)[]>([]);
  const [timePerQ,   setTimePerQ]   = useState(30);
  const [quizLabel,  setQuizLabel]  = useState("");

  const handleStart = (qs: QuizQuestion[], tpq: number, label: string) => {
    setQuestions(qs);
    setTimePerQ(tpq);
    setQuizLabel(label);
    setAnswers(Array(qs.length).fill(null));
    setState("playing");
  };

  const handleFinish = (ans: (number | null)[]) => {
    setAnswers(ans);
    setState("result");
  };

  const handleRestart = () => {
    setState("select");
    setQuestions([]);
    setAnswers([]);
  };

  if (state === "playing") {
    return (
      <PlayingScreen
        questions={questions}
        timePerQ={timePerQ}
        onFinish={handleFinish}
      />
    );
  }

  if (state === "result") {
    return (
      <ResultScreen
        questions={questions}
        answers={answers}
        quizLabel={quizLabel}
        onRestart={handleRestart}
      />
    );
  }

  return <SelectScreen onStart={handleStart} />;
}