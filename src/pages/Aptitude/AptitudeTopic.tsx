import { useParams, Link, Navigate } from "react-router-dom";
import { useState } from "react";
import {
  ArrowLeft, ChevronDown, ChevronUp, CheckCircle2,
  XCircle, Lightbulb, BookOpen, Target
} from "lucide-react";
import aptitudeData from "../../data/aptitude.json";

const difficultyClass: Record<string, string> = {
  easy:   "diff-easy",
  medium: "diff-medium",
  hard:   "diff-hard",
};

export default function AptitudeTopic() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = aptitudeData.categories.find((c) => c.id === categoryId);

  if (!category) return <Navigate to="/aptitude" replace />;

  const totalQuestions = (category.topics as any[]).reduce((acc: number, t: any) => acc + t.questions.length, 0);

  return (
    <div>
      {/* Hero */}
      <div className={`bg-gradient-to-br ${category.color} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="container-app py-14 relative">
          <Link
            to="/aptitude"
            className="inline-flex items-center gap-1.5 text-white/80 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft size={15} /> Aptitude Hub
          </Link>
          <div className="flex items-start gap-5">
            <div className="text-5xl w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm shrink-0">
              {category.icon}
            </div>
            <div>
              <h1 className="font-display font-extrabold text-white text-3xl sm:text-4xl mb-2">
                {category.title}
              </h1>
              <p className="text-white/80 text-lg mb-4">{category.description}</p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-white/15 border border-white/25 text-white text-sm rounded-full px-3 py-1.5">
                  📚 {category.topics.length} topics
                </span>
                <span className="bg-white/15 border border-white/25 text-white text-sm rounded-full px-3 py-1.5">
                  ❓ {totalQuestions} questions
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-app py-10">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main content */}
          <div className="lg:col-span-3 space-y-8">
            {(category.topics as any[]).map((topic: any) => (
              <TopicSection key={topic.id} topic={topic} />
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Topic navigator */}
            <div className="card p-5">
              <h3 className="font-display font-semibold text-gray-900 mb-4 text-sm">Topics</h3>
              <div className="space-y-2">
                {category.topics.map((t) => (
                  <div key={t.id} className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 text-xs">{t.title}</span>
                    <span className="text-brand-600 font-medium text-xs">
                      {t.questions.length} Q
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Other categories */}
            <div className="card p-5">
              <h3 className="font-display font-semibold text-gray-900 mb-3 text-sm">Other categories</h3>
              <div className="space-y-2">
                {aptitudeData.categories
                  .filter((c) => c.id !== categoryId)
                  .map((c) => (
                    <Link
                      key={c.id}
                      to={`/aptitude/${c.id}`}
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-brand-600 transition-colors"
                    >
                      <span>{c.icon}</span> {c.title}
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Topic section ─────────────────────────────────────────────────────────────

function TopicSection({ topic }: { topic: (typeof aptitudeData.categories)[0]["topics"][0] }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="card overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-5 flex items-start justify-between hover:bg-gray-50 transition-colors text-left"
      >
        <div className="flex items-start gap-3">
          <Target size={18} className="text-brand-600 mt-0.5 shrink-0" />
          <div>
            <h2 className="font-display font-bold text-gray-900">{topic.title}</h2>
            {'formula' in topic && topic.formula && (
              <code className="text-xs text-brand-700 bg-brand-50 px-2 py-0.5 rounded mt-1 inline-block font-mono">
                {'formula' in topic ? (topic as any).formula : ''}
              </code>
            )}
          </div>
        </div>
        {open ? (
          <ChevronUp size={16} className="text-gray-400 shrink-0 mt-1" />
        ) : (
          <ChevronDown size={16} className="text-gray-400 shrink-0 mt-1" />
        )}
      </button>

      {open && (
        <div className="border-t border-gray-100">
          {/* Tips */}
          {topic.tips.length > 0 && (
            <div className="p-5 border-b border-gray-50 bg-amber-50/50">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-1.5">
                <Lightbulb size={12} className="text-amber-500" /> Quick Tips
              </h3>
              <ul className="space-y-1.5">
                {topic.tips.map((tip, i) => (
                  <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Questions */}
          {topic.questions.length > 0 && (
            <div className="p-5 space-y-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-1.5">
                <BookOpen size={12} /> Practice Questions ({topic.questions.length})
              </h3>
              {topic.questions.map((q) => (
                <QuizCard key={q.id} question={q} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Quiz card with interactive answer reveal ──────────────────────────────────

function QuizCard({
  question,
}: {
  question: (typeof aptitudeData.categories)[0]["topics"][0]["questions"][0];
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const isAnswered = selected !== null;

  const handleSelect = (idx: number) => {
    if (!isAnswered) {
      setSelected(idx);
      setShowExplanation(true);
    }
  };

  const handleReset = () => {
    setSelected(null);
    setShowExplanation(false);
  };

  return (
    <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
      {/* Question header */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-3 mb-4">
          <p className="text-sm font-medium text-gray-800 leading-snug flex-1">
            {question.question}
          </p>
          <span className={`${difficultyClass[question.difficulty]} shrink-0`}>
            {question.difficulty}
          </span>
        </div>

        {/* Options */}
        <div className="grid sm:grid-cols-2 gap-2">
          {question.options.map((opt, idx) => {
            let optClass =
              "w-full text-left text-sm px-4 py-2.5 rounded-xl border transition-all ";

            if (!isAnswered) {
              optClass += "bg-white border-gray-200 hover:border-brand-400 hover:bg-brand-50 cursor-pointer text-gray-700";
            } else if (idx === question.correctAnswer) {
              optClass += "bg-emerald-50 border-emerald-300 text-emerald-800 font-medium";
            } else if (idx === selected && idx !== question.correctAnswer) {
              optClass += "bg-red-50 border-red-300 text-red-700";
            } else {
              optClass += "bg-white border-gray-100 text-gray-400 cursor-default";
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={isAnswered}
                className={optClass}
              >
                <span className="flex items-center gap-2">
                  {isAnswered && idx === question.correctAnswer && (
                    <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                  )}
                  {isAnswered && idx === selected && idx !== question.correctAnswer && (
                    <XCircle size={14} className="text-red-500 shrink-0" />
                  )}
                  <span className="font-mono text-xs text-gray-400 shrink-0">
                    {String.fromCharCode(65 + idx)}.
                  </span>
                  {opt}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Explanation */}
      {showExplanation && (
        <div className="border-t border-gray-100 bg-white px-4 pb-4 pt-3">
          <div className="flex items-start gap-2 mb-3">
            <Lightbulb size={14} className="text-amber-500 mt-0.5 shrink-0" />
            <p className="text-sm text-gray-700 leading-relaxed">{question.explanation}</p>
          </div>
          <button
            onClick={handleReset}
            className="text-xs text-brand-600 hover:underline font-medium"
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
}