import { useParams, Link, Navigate } from "react-router-dom";
import { useState } from "react";
import {
  ArrowLeft, Clock, TrendingUp, Briefcase, ChevronDown,
  ChevronUp, ExternalLink, CheckCircle, BookOpen, Users, Star, ArrowRight
} from "lucide-react";
import coursesData from "../../data/courses.json";
import type { Course, SyllabusPhase } from "../../types";

const difficultyColor: Record<string, string> = {
  "Beginner":             "bg-green-50 text-green-700 border-green-200",
  "Intermediate":         "bg-amber-50 text-amber-700 border-amber-200",
  "Advanced":             "bg-red-50 text-red-700 border-red-200",
  "Beginner to Advanced": "bg-blue-50 text-blue-700 border-blue-200",
};

const resourceTypeIcon: Record<string, string> = {
  video:    "🎬",
  article:  "📄",
  docs:     "📚",
  book:     "📖",
  practice: "💻",
};

function PhaseCard({ phase, index }: { phase: SyllabusPhase; index: number }) {
  const [open, setOpen] = useState(index === 0);

  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden bg-white">
      {/* Phase header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors text-left"
      >
        <div className="flex items-center gap-4">
          <span className="w-8 h-8 rounded-full bg-brand-600 text-white text-sm font-bold font-display flex items-center justify-center shrink-0">
            {phase.phase}
          </span>
          <div>
            <h3 className="font-display font-semibold text-gray-900">{phase.title}</h3>
            <p className="text-xs text-gray-500 mt-0.5">
              {phase.topics.length} topics · {phase.duration}
            </p>
          </div>
        </div>
        {open ? (
          <ChevronUp size={18} className="text-gray-400 shrink-0" />
        ) : (
          <ChevronDown size={18} className="text-gray-400 shrink-0" />
        )}
      </button>

      {open && (
        <div className="border-t border-gray-100 divide-y divide-gray-50">
          {phase.topics.map((topic) => (
            <div key={topic.id} className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <CheckCircle
                    size={15}
                    className={topic.isCore ? "text-brand-500" : "text-gray-300"}
                  />
                  <span className="font-medium text-gray-900 text-sm">{topic.title}</span>
                  {topic.isCore && (
                    <span className="badge bg-brand-50 text-brand-700 text-xs">Core</span>
                  )}
                </div>
              </div>

              {/* Subtopics */}
              <div className="flex flex-wrap gap-1.5 mb-3 pl-5">
                {topic.subtopics.map((sub) => (
                  <span
                    key={sub}
                    className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full"
                  >
                    {sub}
                  </span>
                ))}
              </div>

              {/* Resources */}
              {topic.resources.length > 0 && (
                <div className="pl-5 flex flex-wrap gap-2 mt-2">
                  {topic.resources.map((res) => (
                    <a
                      key={res.title}
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-brand-600 bg-brand-50 hover:bg-brand-100 border border-brand-100 rounded-lg px-3 py-1.5 transition-colors"
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
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function CourseDetail() {
  const { courseId } = useParams<{ courseId: string }>();
  const course = coursesData.courses.find((c) => c.id === courseId) as Course | undefined;

  if (!course) return <Navigate to="/courses" replace />;

  const totalTopics = course.syllabus.reduce((acc, p) => acc + p.topics.length, 0);

  return (
    <div>
      {/* Hero banner */}
      <div className={`bg-gradient-to-br ${course.color} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="container-app py-14 relative">
          <Link
            to="/courses"
            className="inline-flex items-center gap-1.5 text-white/80 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft size={15} /> All Courses
          </Link>

          <div className="flex items-start gap-5">
            <div className="text-5xl w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm shrink-0">
              {course.icon}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className={`badge border text-xs ${difficultyColor[course.difficulty]}`}>
                  {course.difficulty}
                </span>
                <span className="badge bg-white/20 text-white border border-white/30 text-xs">
                  {course.category}
                </span>
              </div>
              <h1 className="font-display font-extrabold text-white text-3xl sm:text-4xl leading-tight mb-2">
                {course.title}
              </h1>
              <p className="text-white/80 text-lg">{course.tagline}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-app py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Syllabus */}
            <section>
              <h2 className="font-display font-bold text-2xl text-gray-900 mb-5 flex items-center gap-2">
                <BookOpen size={22} className="text-brand-600" />
                Complete Syllabus
                <span className="text-base font-normal text-gray-400">
                  ({course.syllabus.length} phases · {totalTopics} topics)
                </span>
              </h2>
              <div className="space-y-3">
                {course.syllabus.map((phase, i) => (
                  <PhaseCard key={phase.phase} phase={phase} index={i} />
                ))}
              </div>
            </section>

            {/* Future Scope */}
            <section className="card p-6">
              <h2 className="font-display font-bold text-xl text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp size={20} className="text-emerald-600" />
                Future Scope & Career Outlook
              </h2>
              <p className="text-gray-600 leading-relaxed">{course.futureScope}</p>
            </section>

            {/* Job Roles */}
            <section className="card p-6">
              <h2 className="font-display font-bold text-xl text-gray-900 mb-4 flex items-center gap-2">
                <Briefcase size={20} className="text-purple-600" />
                Job Roles You Can Apply For
              </h2>
              <div className="flex flex-wrap gap-2">
                {course.jobRoles.map((role) => (
                  <span
                    key={role}
                    className="px-3.5 py-2 bg-purple-50 border border-purple-100 text-purple-700 text-sm font-medium rounded-xl"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Quick stats */}
            <div className="card p-5 space-y-4">
              <h3 className="font-display font-semibold text-gray-900">Course Overview</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500 flex items-center gap-1.5">
                    <Clock size={13} /> Duration
                  </span>
                  <span className="font-medium text-gray-900">{course.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 flex items-center gap-1.5">
                    <TrendingUp size={13} /> Avg Salary
                  </span>
                  <span className="font-semibold text-emerald-600">{course.avgSalary}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 flex items-center gap-1.5">
                    <Star size={13} /> Difficulty
                  </span>
                  <span className="font-medium text-gray-900">{course.difficulty}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 flex items-center gap-1.5">
                    <BookOpen size={13} /> Phases
                  </span>
                  <span className="font-medium text-gray-900">{course.syllabus.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 flex items-center gap-1.5">
                    <Users size={13} /> Topics
                  </span>
                  <span className="font-medium text-gray-900">{totalTopics}</span>
                </div>
              </div>
            </div>

            {/* Key Skills */}
            <div className="card p-5">
              <h3 className="font-display font-semibold text-gray-900 mb-3">Key Skills You'll Learn</h3>
              <div className="flex flex-wrap gap-1.5">
                {course.popularSkills.map((skill) => (
                  <span key={skill} className="code-inline">{skill}</span>
                ))}
              </div>
            </div>

            {/* Top Companies */}
            <div className="card p-5">
              <h3 className="font-display font-semibold text-gray-900 mb-3">Top Hiring Companies</h3>
              <div className="flex flex-wrap gap-2">
                {course.companies.map((co) => (
                  <span
                    key={co}
                    className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full font-medium"
                  >
                    {co}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className={`rounded-2xl bg-gradient-to-br ${course.color} p-5 text-white`}>
              <h3 className="font-display font-bold mb-2">Ready to start?</h3>
              <p className="text-sm text-white/80 mb-4">
                Check out the full roadmap and get a structured learning plan.
              </p>
              <Link
                to="/roadmaps"
                className="inline-flex items-center gap-1.5 text-sm font-semibold bg-white/20 hover:bg-white/30 border border-white/30 rounded-xl px-4 py-2.5 transition-colors"
              >
                View Roadmaps <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}