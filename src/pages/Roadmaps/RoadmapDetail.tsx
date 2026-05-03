import { useParams, Link, Navigate } from "react-router-dom";
import { useState } from "react";
import {
  ArrowLeft, Clock, CheckCircle2, ChevronDown,
  ChevronUp, ExternalLink, ArrowRight, RotateCcw, GitBranch
} from "lucide-react";
import roadmapsData from "../../data/roadmaps.json";
import { useStore } from "../../store";
import { ProgressBar } from "../../components/ui/ProgressBar";
import type { RoadmapStep } from "../../types";

const statusConfig = {
  required:    { label: "Required",    class: "status-required",    dot: "bg-brand-500"   },
  recommended: { label: "Recommended", class: "status-recommended", dot: "bg-emerald-500" },
  optional:    { label: "Optional",    class: "status-optional",    dot: "bg-gray-400"    },
};

const resourceTypeIcon: Record<string, string> = {
  video: "🎬", article: "📄", docs: "📚", book: "📖", practice: "💻",
};

function StepCard({
  step,
  index,
  isLast,
  roadmapId,
}: {
  step: RoadmapStep;
  index: number;
  isLast: boolean;
  roadmapId: string;
}) {
  const [open, setOpen]      = useState(index < 2);
  const toggleStepComplete   = useStore((s) => s.toggleStepComplete);
  const isStepComplete       = useStore((s) => s.isStepComplete);
  const completed            = isStepComplete(roadmapId, step.id);
  const cfg                  = statusConfig[step.status];

  return (
    <div className="relative flex gap-5">
      {/* Connector line */}
      {!isLast && (
        <div className="absolute left-[19px] top-12 bottom-0 w-px bg-gray-200 -z-0" />
      )}

      {/* Step indicator — click to mark complete */}
      <div className="shrink-0 z-10">
        <button
          onClick={() => toggleStepComplete(roadmapId, step.id)}
          title={completed ? "Mark incomplete" : "Mark complete"}
          className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-display font-bold text-sm shadow-sm transition-all
            ${completed
              ? "bg-emerald-500 border-emerald-500 text-white"
              : "bg-white border-gray-200 text-gray-600 hover:border-emerald-400"
            }`}
        >
          {completed ? <CheckCircle2 size={18} /> : index + 1}
        </button>
      </div>

      {/* Card */}
      <div className={`flex-1 mb-4 transition-opacity ${completed ? "opacity-60" : ""}`}>
        <div className="card overflow-hidden">
          {/* Header */}
          <button
            onClick={() => setOpen(!open)}
            className="w-full p-5 flex items-start justify-between gap-3 hover:bg-gray-50 transition-colors text-left"
          >
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className={cfg.class}>{cfg.label}</span>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Clock size={11} /> {step.estimatedTime}
                </span>
                {completed && (
                  <span className="badge bg-emerald-50 text-emerald-600 border border-emerald-200 text-xs">
                    ✓ Done
                  </span>
                )}
              </div>
              <h3 className={`font-display font-semibold text-base leading-snug ${completed ? "line-through text-gray-400" : "text-gray-900"}`}>
                {step.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1 line-clamp-1">{step.description}</p>
            </div>
            {open ? (
              <ChevronUp size={16} className="text-gray-400 shrink-0 mt-1" />
            ) : (
              <ChevronDown size={16} className="text-gray-400 shrink-0 mt-1" />
            )}
          </button>

          {open && (
            <div className="border-t border-gray-100 p-5 space-y-5">
              <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>

              {/* Subtopics */}
              {step.subtopics.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3">
                    What you'll learn
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {step.subtopics.map((sub) => (
                      <div key={sub.title} className="flex items-start gap-2">
                        <CheckCircle2 size={14} className="text-brand-500 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-gray-800">{sub.title}</p>
                          <p className="text-xs text-gray-500">{sub.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Resources */}
              {step.resources.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3">
                    Resources
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {step.resources.map((res) => (
                      <a
                        key={res.title}
                        href={res.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-brand-600 bg-brand-50 hover:bg-brand-100 border border-brand-100 rounded-lg px-3 py-2 transition-colors"
                      >
                        <span>{resourceTypeIcon[res.type]}</span>
                        {res.title}
                        {res.isFree && (
                          <span className="text-emerald-500 font-semibold">FREE</span>
                        )}
                        <ExternalLink size={10} />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Mark complete button inside card */}
              <button
                onClick={() => toggleStepComplete(roadmapId, step.id)}
                className={`text-xs font-medium px-4 py-2 rounded-lg transition-colors ${
                  completed
                    ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {completed ? "✓ Mark as Incomplete" : "Mark as Complete"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function RoadmapDetail() {
  const { roadmapId }      = useParams<{ roadmapId: string }>();
  const roadmap            = roadmapsData.roadmaps.find((r) => r.id === roadmapId);
  const getProgressPercent = useStore((s) => s.getProgressPercent);
  const resetRoadmap       = useStore((s) => s.resetRoadmap);

  if (!roadmap) return <Navigate to="/roadmaps" replace />;

  const requiredSteps = roadmap.steps.filter((s) => s.status === "required");
  const progress      = getProgressPercent(roadmap.id, roadmap.steps.length);

  return (
    <div>
      {/* Hero */}
      <div className={`bg-gradient-to-br ${roadmap.color} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="container-app py-14 relative">
          <Link
            to="/roadmaps"
            className="inline-flex items-center gap-1.5 text-white/80 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft size={15} /> All Roadmaps
          </Link>

          <div className="flex items-start gap-5">
            <div className="text-5xl w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm shrink-0">
              {roadmap.icon}
            </div>
            <div className="flex-1">
              <span className="inline-block bg-white/20 border border-white/30 text-white text-xs font-medium rounded-full px-3 py-1 mb-3">
                {roadmap.level}
              </span>
              <h1 className="font-display font-extrabold text-white text-3xl sm:text-4xl leading-tight mb-2">
                {roadmap.title} Roadmap
              </h1>
              <p className="text-white/80 text-lg mb-5">{roadmap.description}</p>

              {/* Stat pills */}
              <div className="flex flex-wrap gap-3 mb-5">
                {[
                  { label: roadmap.totalDuration,              icon: "⏱" },
                  { label: `${roadmap.steps.length} steps`,    icon: "📍" },
                  { label: `${requiredSteps.length} required`, icon: "✅" },
                ].map(({ label, icon }) => (
                  <span key={label} className="bg-white/15 border border-white/25 text-white text-sm rounded-full px-3 py-1.5">
                    {icon} {label}
                  </span>
                ))}
              </div>

              {/* Progress bar */}
              {progress > 0 && (
                <div className="max-w-sm">
                  <div className="flex justify-between text-xs text-white/70 mb-1.5">
                    <span>Your progress</span>
                    <span className="font-semibold">{progress}%</span>
                  </div>
                  <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-2 bg-white rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container-app py-10">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Roadmap steps */}
          <div className="lg:col-span-3">
            {roadmap.steps.map((step, i) => (
              <StepCard
                key={step.id}
                step={step as any}
                index={i}
                isLast={i === roadmap.steps.length - 1}
                roadmapId={roadmap.id}
              />
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Progress card */}
            <div className="card p-5">
              <h3 className="font-display font-semibold text-gray-900 mb-4">Your Progress</h3>
              <ProgressBar value={progress} showValue color="brand" size="md" />
              <p className="text-xs text-gray-400 mt-2">
                Click the step number to mark complete
              </p>
              {progress > 0 && (
                <button
                  onClick={() => resetRoadmap(roadmap.id)}
                  className="mt-3 flex items-center gap-1.5 text-xs text-gray-400 hover:text-red-500 transition-colors"
                >
                  <RotateCcw size={11} /> Reset progress
                </button>
              )}
            </div>

            {/* Graph view button */}
            <Link
              to={`/roadmaps/${roadmap.id}/graph`}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-400 hover:border-brand-300 hover:text-brand-600 transition-colors"
            >
              <GitBranch size={14} /> Visual Graph View
            </Link>

            {/* Legend */}
            <div className="card p-5">
              <h3 className="font-display font-semibold text-gray-900 mb-4">Step Types</h3>
              <div className="space-y-3">
                {Object.entries(statusConfig).map(([key, cfg]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
                      <span className="text-sm text-gray-700">{cfg.label}</span>
                    </div>
                    <span className="text-xs text-gray-400">
                      {roadmap.steps.filter((s) => s.status === key).length} steps
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Steps overview */}
            <div className="card p-5">
              <h3 className="font-display font-semibold text-gray-900 mb-4">Steps Overview</h3>
              <div className="space-y-2">
                {roadmap.steps.map((step, i) => (
                  <div key={step.id} className="flex items-center gap-2 text-sm">
                    <span className="w-5 h-5 rounded-full bg-gray-100 text-gray-500 text-xs flex items-center justify-center font-mono shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-gray-600 text-xs leading-snug">{step.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-brand-50 border border-brand-100 rounded-2xl p-5">
              <h3 className="font-display font-semibold text-gray-900 mb-2">
                Need a full course?
              </h3>
              <p className="text-xs text-gray-500 mb-4">
                Explore detailed syllabi, resources, and salary insights for each path.
              </p>
              <Link
                to="/courses"
                className="btn-primary text-xs py-2 px-4 w-full justify-center"
              >
                Browse Courses <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}