import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, ArrowRight, Clock, TrendingUp, Briefcase } from "lucide-react";
import coursesData from "../../data/courses.json";

const DIFFICULTIES = ["All", "Beginner to Advanced", "Intermediate", "Advanced", "Beginner"];
const CATEGORIES   = ["All", "Web", "Data", "AI/ML", "Mobile", "Infrastructure", "Security", "Design", "Web3"];

export default function CourseList() {
  const [query,      setQuery]      = useState("");
  const [difficulty, setDifficulty] = useState("All");
  const [category,   setCategory]   = useState("All");

  const filtered = useMemo(() => {
    return coursesData.courses.filter((c) => {
      const matchQuery =
        c.title.toLowerCase().includes(query.toLowerCase()) ||
        c.tagline.toLowerCase().includes(query.toLowerCase()) ||
        c.popularSkills.some((s) => s.toLowerCase().includes(query.toLowerCase()));
      const matchDiff = difficulty === "All" || c.difficulty === difficulty;
      const matchCat  = category   === "All" || c.category   === category;
      return matchQuery && matchDiff && matchCat;
    });
  }, [query, difficulty, category]);

  return (
    <div className="container-app py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="badge-animated mb-4">Learning Paths</div>
        <h1 className="section-title mb-3">All Courses</h1>
        <p className="section-subtitle max-w-2xl">
          Detailed syllabi, future scope, salary insights, and curated resources for every major tech career path.
        </p>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        {/* Search */}
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search courses, skills..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400 transition-all"
          />
        </div>

        {/* Category filter */}
        <div className="relative">
          <Filter size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="pl-8 pr-8 py-2.5 text-sm bg-white border border-gray-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-brand-500/30 cursor-pointer"
          >
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>

        {/* Difficulty filter */}
        <div className="relative">
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-brand-500/30 cursor-pointer"
          >
            {DIFFICULTIES.map((d) => <option key={d}>{d}</option>)}
          </select>
        </div>
      </div>

      {/* Result count */}
      <p className="text-sm text-gray-500 mb-6">
        Showing <span className="font-semibold text-gray-800">{filtered.length}</span> courses
        {query && <> for "<span className="text-brand-600">{query}</span>"</>}
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((course) => (
            <Link
              key={course.id}
              to={`/courses/${course.id}`}
              className="card p-6 flex flex-col group hover:-translate-y-1 transition-transform"
            >
              {/* Top bar */}
              <div className="flex items-start justify-between mb-5">
                <div className={`w-13 h-13 w-12 h-12 rounded-2xl bg-gradient-to-br ${course.color} flex items-center justify-center text-2xl shadow-sm`}>
                  {course.icon}
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <span className="badge bg-gray-100 text-gray-600 text-xs">{course.category}</span>
                  <span className="badge bg-blue-50 text-blue-700 text-xs">{course.difficulty}</span>
                </div>
              </div>

              {/* Title + tagline */}
              <h2 className="font-display font-bold text-gray-900 text-lg mb-1.5 group-hover:text-brand-600 transition-colors">
                {course.title}
              </h2>
              <p className="text-sm text-gray-500 mb-5 line-clamp-2 leading-relaxed">{course.tagline}</p>

              {/* Skills */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {course.popularSkills.slice(0, 4).map((skill) => (
                  <span key={skill} className="code-inline">{skill}</span>
                ))}
                {course.popularSkills.length > 4 && (
                  <span className="text-xs text-gray-400 self-center">+{course.popularSkills.length - 4}</span>
                )}
              </div>

              {/* Stats row */}
              <div className="mt-auto border-t border-gray-50 pt-4 grid grid-cols-3 gap-2 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock size={11} /> {course.duration}
                </span>
                <span className="flex items-center gap-1 text-emerald-600 font-medium">
                  <TrendingUp size={11} /> {course.avgSalary}
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase size={11} /> {course.jobRoles.length} roles
                </span>
              </div>

              <div className="flex items-center gap-1 text-xs font-medium text-brand-600 mt-3 group-hover:gap-2 transition-all">
                View syllabus <ArrowRight size={12} />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-400">
          <div className="text-5xl mb-4">🔍</div>
          <p className="font-medium text-gray-600">No courses found</p>
          <p className="text-sm mt-1">Try a different search or filter</p>
        </div>
      )}
    </div>
  );
}