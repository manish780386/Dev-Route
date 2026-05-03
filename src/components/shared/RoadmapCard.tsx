import { Link } from "react-router-dom";
import { Clock, Layers, ArrowRight } from "lucide-react";
import type { Roadmap } from "../../types";

interface RoadmapCardProps {
  roadmap:  Roadmap;
  compact?: boolean;
}

export function RoadmapCard({ roadmap, compact = false }: RoadmapCardProps) {
  if (compact) {
    return (
      <Link
        to={`/roadmaps/${roadmap.id}`}
        className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
      >
        <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${roadmap.color} flex items-center justify-center text-lg shrink-0`}>
          {roadmap.icon}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-gray-800 group-hover:text-brand-600 transition-colors truncate">
            {roadmap.title}
          </p>
          <p className="text-xs text-gray-400">{roadmap.totalDuration}</p>
        </div>
        <ArrowRight size={13} className="text-gray-300 group-hover:text-brand-500 shrink-0 transition-colors" />
      </Link>
    );
  }

  const required = roadmap.steps.filter((s) => s.status === "required").length;

  return (
    <Link
      to={`/roadmaps/${roadmap.id}`}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 p-6 flex flex-col group"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${roadmap.color} flex items-center justify-center text-2xl shadow-sm shrink-0`}>
          {roadmap.icon}
        </div>
        <div>
          <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full">
            {roadmap.level}
          </span>
          <h3 className="font-display font-bold text-gray-900 mt-1 group-hover:text-brand-600 transition-colors">
            {roadmap.title} Roadmap
          </h3>
        </div>
      </div>

      <p className="text-sm text-gray-500 mb-5 line-clamp-2 leading-relaxed">
        {roadmap.description}
      </p>

      <div className="mt-auto flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-50">
        <span className="flex items-center gap-1">
          <Clock size={11} /> {roadmap.totalDuration}
        </span>
        <span className="flex items-center gap-1">
          <Layers size={11} /> {roadmap.steps.length} steps ({required} required)
        </span>
      </div>
    </Link>
  );
}