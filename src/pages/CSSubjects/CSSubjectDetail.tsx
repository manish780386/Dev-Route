import { useParams, Link, Navigate } from "react-router-dom";
import { useState } from "react";
import {
  ArrowLeft, ChevronDown, ChevronUp, BookOpen,
  CheckCircle2, HelpCircle, Lightbulb
} from "lucide-react";
import csData from "../../data/cs-subjects.json";

const difficultyClass: Record<string, string> = {
  easy:   "diff-easy",
  medium: "diff-medium",
  hard:   "diff-hard",
};

export default function CSSubjectDetail() {
  const { subjectId } = useParams<{ subjectId: string }>();
  const subject = csData.subjects.find((s) => s.id === subjectId);

  if (!subject) return <Navigate to="/cs-subjects" replace />;

  const totalQuestions = subject.chapters.reduce((acc, ch) => acc + ch.questions.length, 0);

  return (
    <div>
      {/* Hero */}
      <div className={`bg-gradient-to-br ${subject.color} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="container-app py-14 relative">
          <Link
            to="/cs-subjects"
            className="inline-flex items-center gap-1.5 text-white/80 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft size={15} /> CS Subjects
          </Link>
          <div className="flex items-start gap-5">
            <div className="text-5xl w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm shrink-0">
              {subject.icon}
            </div>
            <div>
              <h1 className="font-display font-extrabold text-white text-3xl sm:text-4xl mb-2">
                {subject.title}
              </h1>
              <p className="text-white/80 text-lg mb-4">{subject.tagline}</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: `${subject.chapters.length} chapters`, icon: "📖" },
                  { label: `${totalQuestions} Q&A`, icon: "❓" },
                ].map(({ label, icon }) => (
                  <span key={label} className="bg-white/15 border border-white/25 text-white text-sm rounded-full px-3 py-1.5">
                    {icon} {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-app py-10">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main */}
          <div className="lg:col-span-3 space-y-6">
            {subject.chapters.map((chapter) => (
              <ChapterSection key={chapter.id} chapter={chapter} />
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Importance */}
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb size={16} className="text-amber-600" />
                <h3 className="font-semibold text-gray-900 text-sm">Why this matters</h3>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">{subject.importance}</p>
            </div>

            {/* Chapter navigator */}
            <div className="card p-5">
              <h3 className="font-display font-semibold text-gray-900 mb-4 text-sm">Chapters</h3>
              <div className="space-y-2">
                {subject.chapters.map((ch) => (
                  <div key={ch.id} className="flex items-center justify-between">
                    <span className="text-xs text-gray-600 leading-snug">{ch.title}</span>
                    <span className="text-xs text-brand-600 font-medium shrink-0 ml-2">
                      {ch.questions.length} Q
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Related */}
            <div className="card p-5">
              <h3 className="font-display font-semibold text-gray-900 mb-3 text-sm">Also study</h3>
              <div className="space-y-2">
                {csData.subjects
                  .filter((s) => s.id !== subject.id)
                  .slice(0, 4)
                  .map((s) => (
                    <Link
                      key={s.id}
                      to={`/cs-subjects/${s.id}`}
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-brand-600 transition-colors"
                    >
                      <span>{s.icon}</span> {s.title}
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

// ── Chapter Section ──────────────────────────────────────────────────────────

function ChapterSection({ chapter }: { chapter: (typeof csData.subjects)[0]["chapters"][0] }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="card overflow-hidden">
      {/* Chapter header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-5 flex items-start justify-between hover:bg-gray-50 transition-colors text-left"
      >
        <div className="flex items-start gap-3">
          <BookOpen size={18} className="text-brand-600 mt-0.5 shrink-0" />
          <div>
            <h2 className="font-display font-bold text-gray-900">{chapter.title}</h2>
            <p className="text-sm text-gray-500 mt-0.5">{chapter.description}</p>
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
          {/* Topics */}
          <div className="p-5 border-b border-gray-50">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Topics Covered
            </h3>
            <div className="flex flex-wrap gap-2">
              {chapter.topics.map((topic) => (
                <span
                  key={topic}
                  className="flex items-center gap-1.5 text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full"
                >
                  <CheckCircle2 size={11} className="text-brand-500" />
                  {topic}
                </span>
              ))}
            </div>
          </div>

          {/* Q&A */}
          {chapter.questions.length > 0 && (
            <div className="p-5 space-y-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-1.5">
                <HelpCircle size={13} /> Interview Questions ({chapter.questions.length})
              </h3>
              {chapter.questions.map((q) => (
                <QACard key={q.id} question={q} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Q&A Card ─────────────────────────────────────────────────────────────────

function QACard({ question }: { question: (typeof csData.subjects)[0]["chapters"][0]["questions"][0] }) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
      {/* Question */}
      <button
        onClick={() => setShowAnswer(!showAnswer)}
        className="w-full p-4 flex items-start justify-between gap-3 text-left hover:bg-gray-100 transition-colors"
      >
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <HelpCircle size={15} className="text-brand-500 mt-0.5 shrink-0" />
          <p className="text-sm font-medium text-gray-800 leading-snug">{question.question}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className={difficultyClass[question.difficulty]}>{question.difficulty}</span>
          {showAnswer ? (
            <ChevronUp size={14} className="text-gray-400" />
          ) : (
            <ChevronDown size={14} className="text-gray-400" />
          )}
        </div>
      </button>

      {/* Answer */}
      {showAnswer && (
        <div className="px-4 pb-4 pt-1 border-t border-gray-100 bg-white">
          <div className="flex items-start gap-2 mt-3">
            <Lightbulb size={14} className="text-amber-500 mt-0.5 shrink-0" />
            <p className="text-sm text-gray-700 leading-relaxed">{question.answer}</p>
          </div>
          {/* Tags */}
          {question.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3 pl-5">
              {question.tags.map((tag) => (
                <span key={tag} className="text-xs bg-brand-50 text-brand-600 px-2 py-0.5 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}