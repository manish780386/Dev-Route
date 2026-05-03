import { Link } from "react-router-dom";
import { ArrowRight, Clock, BarChart2, Layers, GitBranch } from "lucide-react";
import roadmapsData from "../../data/roadmaps.json";

export default function RoadmapList() {
  return (
    <div className="container-app py-12">
      {/* Header */}
      <div className="mb-12">
        <div className="badge-animated mb-4">Career Roadmaps</div>
        <h1 className="section-title mb-3">Know exactly what to learn</h1>
        <p className="section-subtitle max-w-2xl">
          Step-by-step, opinionated career paths built by engineers. Every step tells you what to learn, how long it takes, and which resources to use.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {roadmapsData.roadmaps.map((rm) => {
          const requiredCount    = rm.steps.filter((s) => s.status === "required").length;
          const recommendedCount = rm.steps.filter((s) => s.status === "recommended").length;

          return (
            <Link
              key={rm.id}
              to={`/roadmaps/${rm.id}`}
              className="card p-7 group hover:-translate-y-1 transition-transform flex flex-col"
            >
              {/* Icon + meta */}
              <div className="flex items-start justify-between mb-5">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${rm.color} flex items-center justify-center text-2xl shadow-sm`}>
                  {rm.icon}
                </div>
                <span className="badge bg-gray-100 text-gray-600 text-xs">{rm.level}</span>
              </div>

              {/* Title & description */}
              <h2 className="font-display font-bold text-xl text-gray-900 mb-2 group-hover:text-brand-600 transition-colors">
                {rm.title} Roadmap
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">{rm.description}</p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <p className="font-display font-bold text-gray-900 text-lg">{rm.steps.length}</p>
                  <p className="text-xs text-gray-500 flex items-center justify-center gap-1 mt-0.5">
                    <Layers size={10} /> Steps
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <p className="font-display font-bold text-brand-600 text-lg">{requiredCount}</p>
                  <p className="text-xs text-gray-500 mt-0.5">Required</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <p className="font-display font-bold text-emerald-600 text-lg">{recommendedCount}</p>
                  <p className="text-xs text-gray-500 mt-0.5">Suggested</p>
                </div>
              </div>

              {/* Duration + CTA */}
              <div className="mt-auto flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-sm text-gray-500">
                  <Clock size={13} /> {rm.totalDuration}
                </span>
                <div className="flex items-center gap-2">
                  <Link
                    to={`/roadmaps/${rm.id}/graph`}
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-brand-600 border border-gray-200 hover:border-brand-300 rounded-lg px-2.5 py-1.5 transition-colors"
                  >
                    <GitBranch size={11} /> Graph
                  </Link>
                  <span className="flex items-center gap-1 text-sm font-semibold text-brand-600 group-hover:gap-2 transition-all">
                    View <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Info box */}
      <div className="mt-12 bg-brand-50 border border-brand-100 rounded-2xl p-6 flex gap-4">
        <BarChart2 size={22} className="text-brand-600 shrink-0 mt-0.5" />
        <div>
          <h3 className="font-display font-semibold text-gray-900 mb-1">How to use roadmaps</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Each roadmap is a guided path with required, recommended, and optional steps. Start from the top and work your way down. Don't skip required steps — they're foundational. Recommended steps will make you a stronger candidate. Optional steps help you specialize.
          </p>
        </div>
      </div>
    </div>
  );
}