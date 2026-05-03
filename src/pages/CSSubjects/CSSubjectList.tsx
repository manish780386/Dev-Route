import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Star } from "lucide-react";
import csData from "../../data/cs-subjects.json";

export default function CSSubjectList() {
  return (
    <div className="container-app py-12">
      {/* Header */}
      <div className="mb-12">
        <div className="badge-animated mb-4">Core CS</div>
        <h1 className="section-title mb-3">CS Fundamentals</h1>
        <p className="section-subtitle max-w-2xl">
          Master the computer science concepts that every tech company tests. DSA, OS, DBMS, Networks, OOP, and System Design — with curated Q&A for interview prep.
        </p>
      </div>

      {/* Important callout */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex gap-4 mb-10">
        <Star size={20} className="text-amber-500 shrink-0 mt-0.5" />
        <div>
          <h3 className="font-semibold text-gray-900 mb-1">Interview importance order</h3>
          <p className="text-sm text-gray-600">
            DSA → OOP → OS → DBMS → Computer Networks → System Design. Start with DSA — it's asked everywhere. Build up to System Design for senior roles.
          </p>
        </div>
      </div>

      {/* Subjects grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {csData.subjects.map((subject) => {
          const totalTopics    = subject.chapters.reduce((acc, ch) => acc + ch.topics.length, 0);
          const totalQuestions = subject.chapters.reduce((acc, ch) => acc + ch.questions.length, 0);

          return (
            <Link
              key={subject.id}
              to={`/cs-subjects/${subject.id}`}
              className="card p-6 group hover:-translate-y-1 transition-transform flex flex-col"
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${subject.color} flex items-center justify-center text-2xl shadow-sm mb-5`}>
                {subject.icon}
              </div>

              {/* Title & tagline */}
              <h2 className="font-display font-bold text-gray-900 text-lg mb-1.5 group-hover:text-brand-600 transition-colors">
                {subject.title}
              </h2>
              <p className="text-sm text-gray-500 mb-4 leading-relaxed">{subject.tagline}</p>

              {/* Importance badge */}
              <p className="text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 mb-5 leading-relaxed">
                💡 {subject.importance}
              </p>

              {/* Stats */}
              <div className="mt-auto flex items-center justify-between text-xs text-gray-400 border-t border-gray-50 pt-4">
                <span className="flex items-center gap-1">
                  <BookOpen size={11} /> {subject.chapters.length} chapters
                </span>
                <span>{totalTopics} topics</span>
                <span className="text-brand-600 font-medium">{totalQuestions} Q&A</span>
              </div>

              <div className="flex items-center gap-1 text-xs font-medium text-brand-600 mt-3 group-hover:gap-2 transition-all">
                Start studying <ArrowRight size={12} />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Bottom tip */}
      <div className="mt-12 text-center text-sm text-gray-500">
        <p>
          All Q&A includes detailed explanations — not just answers.{" "}
          <Link to="/aptitude" className="text-brand-600 hover:underline font-medium">
            Practice aptitude questions →
          </Link>
        </p>
      </div>
    </div>
  );
}