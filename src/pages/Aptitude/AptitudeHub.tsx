import { Link } from "react-router-dom";
import { ArrowRight, Target,  Clock } from "lucide-react";
import aptitudeData from "../../data/aptitude.json";

const tips = [
  "Read every question twice before answering",
  "Eliminate obviously wrong options first",
  "For math: estimate before calculating exactly",
  "Time yourself — aim for 1–1.5 mins per question",
  "Review explanations even for correct answers",
];

export default function AptitudeHub() {
  return (
    <div className="container-app py-12">
      {/* Header */}
      <div className="mb-12">
        <div className="badge-animated mb-4">Aptitude Prep</div>
        <h1 className="section-title mb-3">Aptitude Practice Hub</h1>
        <p className="section-subtitle max-w-2xl">
          Quantitative, logical, verbal, and programming MCQs with step-by-step explanations. Crack every placement test with confidence.
        </p>
      </div>

      {/* Category cards */}
      <div className="grid sm:grid-cols-2 gap-6 mb-14">
        {aptitudeData.categories.map((cat) => {
          const totalQuestions = (cat.topics as any[]).reduce((acc: number, t: any) => acc + t.questions.length, 0);
          const totalTopics = cat.topics.length;

          return (
            <Link
              key={cat.id}
              to={`/aptitude/${cat.id}`}
              className="card p-7 group hover:-translate-y-1 transition-transform flex flex-col"
            >
              <div className="flex items-start justify-between mb-5">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-2xl shadow-sm`}>
                  {cat.icon}
                </div>
                <span className="badge bg-gray-100 text-gray-600 text-xs">{String(totalTopics)} topics</span>
              </div>

              <h2 className="font-display font-bold text-xl text-gray-900 mb-2 group-hover:text-brand-600 transition-colors">
                {cat.title}
              </h2>
              <p className="text-sm text-gray-500 mb-6 leading-relaxed">{cat.description}</p>

              {/* Topic pills */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {(cat.topics as any[]).slice(0, 4).map((t: any) => (
                  <span key={t.id} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                    {t.title}
                  </span>
                ))}
                {cat.topics.length > 4 && (
                  <span className="text-xs text-gray-400 self-center">+{cat.topics.length - 4} more</span>
                )}
              </div>

              <div className="mt-auto flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-sm text-gray-500">
                  <Target size={13} /> {totalQuestions} questions
                </span>
                <span className="flex items-center gap-1 text-sm font-semibold text-brand-600 group-hover:gap-2 transition-all">
                  Practice now <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Tips + Strategy */}
      <div className="grid sm:grid-cols-2 gap-6">
        {/* Quick tips */}
        <div className="card p-6">
          <h2 className="font-display font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Target size={18} className="text-brand-600" />
            Quick Exam Tips
          </h2>
          <ul className="space-y-3">
            {tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                <span className="w-5 h-5 rounded-full bg-brand-50 text-brand-600 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                {tip}
              </li>
            ))}
          </ul>
        </div>

        {/* Exam strategy */}
        <div className="card p-6">
          <h2 className="font-display font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Clock size={18} className="text-purple-600" />
            Time Management Strategy
          </h2>
          <div className="space-y-4">
            {[
              { phase: "First pass", time: "60%", desc: "Attempt all easy & medium questions you're confident about" },
              { phase: "Second pass", time: "30%", desc: "Return to harder questions you skipped" },
              { phase: "Review", time: "10%", desc: "Double-check answers and fill any blanks" },
            ].map(({ phase, time, desc }) => (
              <div key={phase} className="flex items-start gap-3">
                <span className="badge bg-purple-50 text-purple-700 border border-purple-200 shrink-0">{time}</span>
                <div>
                  <p className="text-sm font-medium text-gray-800">{phase}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-10 text-center text-sm text-gray-500">
        <p>
          Also prepare{" "}
          <Link to="/cs-subjects/dsa" className="text-brand-600 hover:underline font-medium">
            DSA interview questions
          </Link>{" "}
          and{" "}
          <Link to="/placement" className="text-brand-600 hover:underline font-medium">
            HR & behavioral questions →
          </Link>
        </p>
      </div>
    </div>
  );
}