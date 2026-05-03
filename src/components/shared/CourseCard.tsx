import { Link } from "react-router-dom";
import { Clock, TrendingUp, ArrowRight } from "lucide-react";
import type { Course } from "../../types";

interface CourseCardProps {
  course:    Course;
  compact?:  boolean;
}

export function CourseCard({ course, compact = false }: CourseCardProps) {
  if (compact) {
    return (
      <Link
        to={`/courses/${course.id}`}
        className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
      >
        <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center text-lg shrink-0`}>
          {course.icon}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-gray-800 group-hover:text-brand-600 transition-colors truncate">
            {course.title}
          </p>
          <p className="text-xs text-gray-400">{course.duration}</p>
        </div>
        <ArrowRight size={13} className="text-gray-300 group-hover:text-brand-500 shrink-0 transition-colors" />
      </Link>
    );
  }

  return (
    <Link
      to={`/courses/${course.id}`}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 p-6 flex flex-col group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${course.color} flex items-center justify-center text-2xl shadow-sm`}>
          {course.icon}
        </div>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
          {course.difficulty}
        </span>
      </div>

      {/* Content */}
      <h3 className="font-display font-bold text-gray-900 mb-1.5 group-hover:text-brand-600 transition-colors">
        {course.title}
      </h3>
      <p className="text-sm text-gray-500 mb-4 line-clamp-2 leading-relaxed">{course.tagline}</p>

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {course.popularSkills.slice(0, 3).map((skill) => (
          <span key={skill} className="font-mono text-xs bg-gray-100 text-brand-700 px-1.5 py-0.5 rounded">
            {skill}
          </span>
        ))}
        {course.popularSkills.length > 3 && (
          <span className="text-xs text-gray-400">+{course.popularSkills.length - 3}</span>
        )}
      </div>

      {/* Footer */}
      <div className="mt-auto flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-50">
        <span className="flex items-center gap-1">
          <Clock size={11} /> {course.duration}
        </span>
        <span className="flex items-center gap-1 text-emerald-600 font-semibold">
          <TrendingUp size={11} /> {course.avgSalary}
        </span>
      </div>
    </Link>
  );
}