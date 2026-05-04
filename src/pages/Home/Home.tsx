import { Link } from "react-router-dom";
import {
  ArrowRight, BookOpen, Map, Brain, Calculator,
  Zap, Award, TrendingUp, ChevronRight, GraduationCap, Trophy
} from "lucide-react";
import coursesData  from "../../data/courses.json";
import roadmapsData from "../../data/roadmaps.json";
import collegesData from "../../data/colleges.json";
import type { Institute } from "../../types";

const features = [
  {
    icon: BookOpen,
    title: "9 In-Depth Courses",
    description: "From Full Stack to AI/ML — complete syllabi with resources for every topic.",
    color: "bg-blue-50 text-blue-600",
    to: "/courses",
  },
  {
    icon: Map,
    title: "Visual Roadmaps",
    description: "Step-by-step career paths with time estimates and curated resources.",
    color: "bg-emerald-50 text-emerald-600",
    to: "/roadmaps",
  },
  {
    icon: Brain,
    title: "CS Fundamentals",
    description: "DSA, OS, DBMS, Networks, OOP — all the core subjects with Q&A.",
    color: "bg-purple-50 text-purple-600",
    to: "/cs-subjects",
  },
  {
    icon: Calculator,
    title: "Aptitude Practice",
    description: "Quant, Logical, Verbal & Programming MCQs with detailed explanations.",
    color: "bg-orange-50 text-orange-600",
    to: "/aptitude",
  },
  {
    icon: GraduationCap,
    title: "Find Colleges 🆕",
    description: "Engineering colleges, bootcamps, coaching institutes near you.",
    color: "bg-teal-50 text-teal-600",
    to: "/colleges",
  },
  {
    icon: Trophy,
    title: "Mock Quiz 🆕",
    description: "Timed placement tests — just like real company aptitude rounds.",
    color: "bg-rose-50 text-rose-600",
    to: "/quiz",
  },
];

const stats = [
  { value: "9+",   label: "Courses",          icon: BookOpen      },
  { value: "4+",   label: "Roadmaps",          icon: Map           },
  { value: "60+",  label: "CS Q&A",           icon: Brain         },
  { value: "13+",  label: "Institutes Listed", icon: GraduationCap },
];

const quickLinks = [
  { to: "/roadmaps/frontend-dev",         label: "Frontend Dev Roadmap",   emoji: "🖥️" },
  { to: "/roadmaps/data-science-roadmap", label: "Data Science Roadmap",   emoji: "📊" },
  { to: "/cs-subjects/dsa",               label: "DSA Interview Prep",     emoji: "🧠" },
  { to: "/aptitude/quantitative",         label: "Quant Practice",         emoji: "🔢" },
  { to: "/quiz",                          label: "Mock Quiz",              emoji: "🎯" },
  { to: "/courses/machine-learning",      label: "ML/AI Course",           emoji: "🤖" },
  { to: "/placement",                     label: "Placement Guide",        emoji: "💼" },
];

export default function Home() {
  const featuredCourses = coursesData.courses.slice(0, 6);
  const featuredRoadmaps = roadmapsData.roadmaps.slice(0, 4);

  return (
    <div>
      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="relative bg-grid bg-noise overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container-app py-24 md:py-36 text-center relative">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 badge-animated mb-6 animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
            Your complete career prep platform
          </div>

          {/* Headline */}
          <h1 className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl text-gray-900 leading-[1.08] tracking-tight mb-6 animate-fade-up">
            Land your dream
            <br />
            <span className="text-gradient">tech job</span> — faster.
          </h1>

          <p className="text-gray-500 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up delay-100">
            Courses, roadmaps, CS fundamentals, aptitude practice, and placement guides —
            everything you need to go from student to hired.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 animate-fade-up delay-200">
            <Link to="/courses" className="btn-primary text-base px-7 py-3.5 shadow-lg shadow-brand-500/25">
              Explore Courses <ArrowRight size={16} />
            </Link>
            <Link to="/roadmaps" className="btn-ghost text-base px-7 py-3.5 border border-gray-200 bg-white">
              View Roadmaps
            </Link>
          </div>

          {/* Quick links */}
          <div className="mt-14 flex flex-wrap justify-center gap-2 animate-fade-up delay-300">
            {quickLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center gap-1.5 text-sm text-gray-600 bg-white border border-gray-200 hover:border-brand-300 hover:text-brand-600 rounded-full px-3.5 py-1.5 transition-colors shadow-sm"
              >
                <span>{link.emoji}</span>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ───────────────────────────────────────────────────── */}
      <section className="border-y border-gray-100 bg-white">
        <div className="container-app py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(({ value, label, icon: Icon }) => (
              <div key={label} className="text-center">
                <div className="text-3xl sm:text-4xl font-display font-extrabold text-gray-900">{value}</div>
                <div className="text-gray-500 text-sm mt-1 flex items-center justify-center gap-1.5">
                  <Icon size={13} />
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ────────────────────────────────────────────────── */}
      <section className="container-app py-20">
        <div className="text-center mb-14">
          <div className="badge-animated mb-4">Everything you need</div>
          <h2 className="section-title mb-4">One platform, complete prep</h2>
          <p className="section-subtitle max-w-xl mx-auto">
            Stop hopping between 10 different websites. DevRoute brings everything together.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map(({ icon: Icon, title, description, color, to }) => (
            <Link
              key={to}
              to={to}
              className="card p-6 group cursor-pointer hover:-translate-y-1 transition-transform"
            >
              <div className={`w-11 h-11 rounded-xl ${color} flex items-center justify-center mb-4`}>
                <Icon size={20} strokeWidth={2} />
              </div>
              <h3 className="font-display font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
              <div className="flex items-center gap-1 text-xs font-medium text-brand-600 mt-4 group-hover:gap-2 transition-all">
                Explore <ChevronRight size={13} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Featured Courses ────────────────────────────────────────── */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="container-app py-20">
          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="badge-animated mb-3">Courses</div>
              <h2 className="section-title">Popular learning paths</h2>
            </div>
            <Link to="/courses" className="btn-ghost border border-gray-200 bg-white hidden sm:flex">
              All courses <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredCourses.map((course) => (
              <Link
                key={course.id}
                to={`/courses/${course.id}`}
                className="card p-6 flex flex-col group hover:-translate-y-1 transition-transform"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${course.color} flex items-center justify-center text-2xl shadow-sm`}>
                    {course.icon}
                  </div>
                  <span className="badge bg-gray-100 text-gray-600 text-xs">{course.difficulty}</span>
                </div>
                {/* Content */}
                <h3 className="font-display font-semibold text-gray-900 mb-1.5 group-hover:text-brand-600 transition-colors">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{course.tagline}</p>
                {/* Meta */}
                <div className="mt-auto flex items-center justify-between text-xs text-gray-400">
                  <span>⏱ {course.duration}</span>
                  <span className="text-emerald-600 font-medium">💰 {course.avgSalary}</span>
                </div>
                {/* Skills */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {course.popularSkills.slice(0, 3).map((skill) => (
                    <span key={skill} className="code-inline">{skill}</span>
                  ))}
                  {course.popularSkills.length > 3 && (
                    <span className="text-xs text-gray-400">+{course.popularSkills.length - 3}</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8 sm:hidden">
            <Link to="/courses" className="btn-primary">View all courses</Link>
          </div>
        </div>
      </section>

      {/* ── Roadmaps preview ────────────────────────────────────────── */}
      <section className="container-app py-20">
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="badge-animated mb-3">Roadmaps</div>
            <h2 className="section-title">Know exactly what to learn</h2>
          </div>
          <Link to="/roadmaps" className="btn-ghost border border-gray-200 hidden sm:flex">
            All roadmaps <ArrowRight size={15} />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          {featuredRoadmaps.map((rm) => (
            <Link
              key={rm.id}
              to={`/roadmaps/${rm.id}`}
              className="card p-6 flex items-start gap-4 group hover:-translate-y-1 transition-transform"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${rm.color} flex items-center justify-center text-2xl shadow-sm shrink-0`}>
                {rm.icon}
              </div>
              <div className="min-w-0">
                <h3 className="font-display font-semibold text-gray-900 group-hover:text-brand-600 transition-colors">
                  {rm.title} Roadmap
                </h3>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{rm.description}</p>
                <div className="flex items-center gap-3 mt-3 text-xs text-gray-400">
                  <span>⏱ {rm.totalDuration}</span>
                  <span>📊 {rm.level}</span>
                  <span>📍 {rm.steps.length} steps</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Colleges Preview ─────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border-y border-emerald-100 dark:border-emerald-900">
        <div className="container-app py-20">
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 rounded-full px-3 py-1 text-xs font-semibold mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                🆕 New — Find Institutes
              </div>
              <h2 className="section-title mb-2">Find the right college</h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-md">
                Engineering colleges, coding bootcamps, coaching institutes — filter by your state and city.
              </p>
            </div>
            <Link to="/colleges" className="hidden sm:flex items-center gap-2 btn-ghost border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              Browse all <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {(collegesData.institutes as Institute[]).slice(0, 4).map((inst) => (
              <Link
                key={inst.id}
                to={`/colleges/${inst.id}`}
                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 flex flex-col group hover:-translate-y-1 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${inst.color} flex items-center justify-center text-xl shadow-sm`}>
                    {inst.icon}
                  </div>
                  {inst.ranking.nirf && (
                    <span className="text-xs text-amber-600 font-semibold bg-amber-50 dark:bg-amber-950 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
                      NIRF #{inst.ranking.nirf}
                    </span>
                  )}
                </div>
                <h3 className="font-display font-bold text-gray-900 dark:text-white text-sm mb-0.5 group-hover:text-emerald-600 transition-colors leading-snug">
                  {inst.name}
                </h3>
                <p className="text-xs text-gray-400 flex items-center gap-1 mb-3">
                  📍 {inst.city}, {inst.state}
                </p>
                <div className="mt-auto flex items-center justify-between text-xs">
                  <span className="text-emerald-600 font-semibold">{inst.avgPackage}</span>
                  <span className="text-gray-400">⭐ {inst.rating}</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {collegesData.types.filter((t) => t.id !== "all").map((t) => (
              <Link
                key={t.id}
                to="/colleges"
                className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-emerald-300 hover:text-emerald-600 rounded-full px-4 py-2 transition-colors shadow-sm"
              >
                {t.icon} {t.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ──────────────────────────────────────────────── */}
      <section className="container-app pb-20">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-brand-600 to-brand-800 p-10 md:p-14 text-white text-center">
          <div className="absolute inset-0 bg-grid opacity-10" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1 text-xs font-medium mb-6">
              <Award size={12} />
              Free for everyone — always
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl mb-4 leading-tight">
              Start your journey today
            </h2>
            <p className="text-brand-200 text-lg max-w-lg mx-auto mb-8">
              Join thousands of students who use DevRoute to crack placements and build their careers.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/roadmaps" className="bg-white text-brand-700 font-semibold px-7 py-3.5 rounded-xl hover:bg-brand-50 transition-colors inline-flex items-center gap-2">
                Find your roadmap <ArrowRight size={16} />
              </Link>
              <Link to="/placement" className="bg-white/10 border border-white/30 text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-white/20 transition-colors">
                Placement Guide
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}