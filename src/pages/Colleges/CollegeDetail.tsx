import { useParams, Link, Navigate } from "react-router-dom";
import { useState } from "react";
import {
  ArrowLeft, MapPin, Star, ExternalLink, Phone, Mail,
  GraduationCap, TrendingUp, CheckCircle2, Award, Calendar,
  Users, Building2, ChevronDown, ChevronUp, Globe
} from "lucide-react";
import collegesData from "../../data/colleges.json";
import type { Institute } from "../../types";

const TYPE_COLORS: Record<string, string> = {
  "engineering-college": "from-blue-600 to-indigo-600",
  "coding-bootcamp":     "from-emerald-600 to-teal-600",
  "coaching-institute":  "from-amber-600 to-orange-500",
  "spoken-english":      "from-purple-600 to-violet-600",
};

function StarRating({ rating, size = "md" }: { rating: number; size?: "sm" | "md" | "lg" }) {
  const sz = size === "sm" ? "w-3 h-3" : size === "lg" ? "w-5 h-5" : "w-4 h-4";
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`${sz} ${star <= Math.round(rating) ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"}`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function CollegeDetail() {
  const { collegeId } = useParams<{ collegeId: string }>();
  const institute     = collegesData.institutes.find((i) => i.id === collegeId) as Institute | undefined;
  const [openCourses, setOpenCourses] = useState(true);

  if (!institute) return <Navigate to="/colleges" replace />;

  const typeLabel = collegesData.types.find((t) => t.id === institute.type)?.label ?? institute.type;
  const heroGradient = TYPE_COLORS[institute.type] ?? "from-brand-600 to-brand-800";

  return (
    <div>
      {/* Hero */}
      <div className={`bg-gradient-to-br ${heroGradient} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 bg-grid opacity-20" />

        <div className="container-app py-14 relative">
          <Link
            to="/colleges"
            className="inline-flex items-center gap-1.5 text-white/80 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft size={15} /> All Institutes
          </Link>

          <div className="flex flex-col sm:flex-row items-start gap-5">
            {/* Icon */}
            <div className="text-5xl w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm shrink-0">
              {institute.icon}
            </div>

            <div className="flex-1">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="bg-white/20 border border-white/30 text-white text-xs font-medium rounded-full px-3 py-1">
                  {typeLabel}
                </span>
                {institute.ranking.nirf && (
                  <span className="bg-amber-400/30 border border-amber-300/40 text-white text-xs font-semibold rounded-full px-3 py-1">
                    🏆 NIRF Rank #{institute.ranking.nirf}
                  </span>
                )}
                <span className="bg-white/15 border border-white/25 text-white text-xs rounded-full px-3 py-1">
                  Est. {institute.established}
                </span>
              </div>

              {/* Name */}
              <h1 className="font-display font-extrabold text-white text-3xl sm:text-4xl leading-tight mb-1">
                {institute.name}
              </h1>
              <p className="text-white/70 font-medium mb-3">{institute.affiliation}</p>

              {/* Location + rating row */}
              <div className="flex flex-wrap items-center gap-4">
                <span className="flex items-center gap-1.5 text-white/80 text-sm">
                  <MapPin size={13} /> {institute.city}, {institute.state}
                </span>
                <span className="flex items-center gap-2">
                  <StarRating rating={institute.rating} />
                  <span className="text-white/80 text-sm">
                    {institute.rating} ({institute.reviewCount.toLocaleString()} reviews)
                  </span>
                </span>
              </div>
            </div>

            {/* Quick action */}
            <div className="flex flex-col gap-2 shrink-0">
              <a
                href={institute.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white text-gray-900 font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <Globe size={14} /> Visit Website
              </a>
              <a
                href={institute.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white/20 border border-white/30 text-white font-medium text-sm px-5 py-2.5 rounded-xl hover:bg-white/30 transition-colors"
              >
                <MapPin size={14} /> View on Map
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container-app py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT — main content */}
          <div className="lg:col-span-2 space-y-7">

            {/* Description */}
            <section className="card p-6">
              <h2 className="font-display font-bold text-gray-900 dark:text-white text-xl mb-3 flex items-center gap-2">
                <Building2 size={20} className="text-brand-600" /> About {institute.shortName}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{institute.description}</p>
            </section>

            {/* Key highlights */}
            <section className="card p-6">
              <h2 className="font-display font-bold text-gray-900 dark:text-white text-xl mb-4 flex items-center gap-2">
                <Award size={20} className="text-amber-500" /> Key Highlights
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {institute.highlights.map((h) => (
                  <div key={h} className="flex items-start gap-2.5">
                    <CheckCircle2 size={15} className="text-emerald-500 mt-0.5 shrink-0" />
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-snug">{h}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Courses */}
            <section className="card overflow-hidden">
              <button
                onClick={() => setOpenCourses(!openCourses)}
                className="w-full p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left"
              >
                <h2 className="font-display font-bold text-gray-900 dark:text-white text-xl flex items-center gap-2">
                  <GraduationCap size={20} className="text-purple-600" />
                  Programs Offered
                  <span className="text-sm font-normal text-gray-400">({institute.courses.length})</span>
                </h2>
                {openCourses ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
              </button>

              {openCourses && (
                <div className="border-t border-gray-100 dark:border-gray-700">
                  <div className="divide-y divide-gray-50 dark:divide-gray-800">
                    {institute.courses.map((course, i) => (
                      <div key={i} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm">{course.name}</p>
                          <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-3">
                            <span className="flex items-center gap-1">
                              <Calendar size={10} /> {course.duration}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users size={10} /> {course.seats} seats
                            </span>
                          </p>
                        </div>
                        <span className="shrink-0 text-sm font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-3 py-1.5 rounded-lg">
                          {course.fees}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* Admission Process */}
            <section className="card p-6">
              <h2 className="font-display font-bold text-gray-900 dark:text-white text-xl mb-3 flex items-center gap-2">
                <CheckCircle2 size={20} className="text-brand-600" /> Admission Process
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {institute.admissionProcess}
              </p>
            </section>

            {/* Facilities */}
            <section className="card p-6">
              <h2 className="font-display font-bold text-gray-900 dark:text-white text-xl mb-4 flex items-center gap-2">
                <Building2 size={20} className="text-teal-600" /> Facilities
              </h2>
              <div className="flex flex-wrap gap-2">
                {institute.facilities.map((f) => (
                  <span key={f} className="text-sm bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-400 border border-teal-100 dark:border-teal-900 px-3.5 py-2 rounded-xl">
                    {f}
                  </span>
                ))}
              </div>
            </section>

            {/* Top Recruiters */}
            {institute.topRecruiters[0] !== "N/A — language skill institute" && (
              <section className="card p-6">
                <h2 className="font-display font-bold text-gray-900 dark:text-white text-xl mb-4 flex items-center gap-2">
                  <TrendingUp size={20} className="text-emerald-600" /> Top Recruiters
                </h2>
                <div className="flex flex-wrap gap-2">
                  {institute.topRecruiters.map((r) => (
                    <span key={r} className="text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3.5 py-2 rounded-xl font-medium">
                      {r}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* RIGHT — sidebar */}
          <div className="space-y-5">
            {/* Quick stats */}
            <div className="card p-5">
              <h3 className="font-display font-semibold text-gray-900 dark:text-white mb-4">Quick Info</h3>
              <div className="space-y-3 text-sm">
                {[
                  { label: "Fees Range",      value: institute.fees,           icon: "💰" },
                  { label: "Avg Package",     value: institute.avgPackage,     icon: "📈" },
                  { label: "Highest Package", value: institute.highestPackage, icon: "🏆" },
                  { label: "Established",     value: String(institute.established), icon: "📅" },
                  { label: "Affiliation",     value: institute.affiliation,    icon: "🏛️" },
                  { label: "Nearby Metro",    value: institute.nearbyMetro,    icon: "🚇" },
                ].map(({ label, value, icon }) => (
                  <div key={label} className="flex justify-between gap-2">
                    <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                      <span>{icon}</span> {label}
                    </span>
                    <span className="font-medium text-gray-800 dark:text-gray-200 text-right text-xs leading-snug max-w-[140px]">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rankings */}
            {(institute.ranking.nirf || institute.ranking.qs) && (
              <div className="card p-5">
                <h3 className="font-display font-semibold text-gray-900 dark:text-white mb-4">Rankings</h3>
                <div className="space-y-3">
                  {institute.ranking.nirf && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">NIRF 2024</span>
                      <span className="font-display font-bold text-amber-600 text-lg">#{institute.ranking.nirf}</span>
                    </div>
                  )}
                  {institute.ranking.qs && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">QS World</span>
                      <span className="font-display font-bold text-brand-600 text-lg">#{institute.ranking.qs}</span>
                    </div>
                  )}
                  {institute.ranking.india && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">India Rank</span>
                      <span className="font-display font-bold text-purple-600 text-lg">#{institute.ranking.india}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Approvals */}
            <div className="card p-5">
              <h3 className="font-display font-semibold text-gray-900 dark:text-white mb-3">Approved By</h3>
              <div className="flex flex-wrap gap-1.5">
                {institute.approvedBy.map((a) => (
                  <span key={a} className="text-xs bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-400 border border-brand-100 dark:border-brand-900 px-2.5 py-1 rounded-full font-medium">
                    {a}
                  </span>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="card p-5">
              <h3 className="font-display font-semibold text-gray-900 dark:text-white mb-3">Tags</h3>
              <div className="flex flex-wrap gap-1.5">
                {institute.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2.5 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="card p-5">
              <h3 className="font-display font-semibold text-gray-900 dark:text-white mb-4">Contact</h3>
              <div className="space-y-2.5">
                <a
                  href={`tel:${institute.phone}`}
                  className="flex items-center gap-2.5 text-sm text-gray-600 dark:text-gray-400 hover:text-brand-600 transition-colors"
                >
                  <Phone size={14} className="text-brand-500 shrink-0" />
                  <span className="truncate">{institute.phone}</span>
                </a>
                <a
                  href={`mailto:${institute.email}`}
                  className="flex items-center gap-2.5 text-sm text-gray-600 dark:text-gray-400 hover:text-brand-600 transition-colors"
                >
                  <Mail size={14} className="text-brand-500 shrink-0" />
                  <span className="truncate">{institute.email}</span>
                </a>
                <div className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400">
                  <MapPin size={14} className="text-brand-500 shrink-0 mt-0.5" />
                  <span className="leading-snug">{institute.address}</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className={`rounded-2xl bg-gradient-to-br ${heroGradient} p-5 text-white`}>
              <h3 className="font-display font-bold mb-2">Prepare for placements 🎯</h3>
              <p className="text-sm text-white/80 mb-4 leading-snug">
                Alongside college, build strong DSA and aptitude skills.
              </p>
              <Link
                to="/placement"
                className="flex items-center justify-center gap-2 bg-white/20 border border-white/30 text-white font-semibold text-sm px-4 py-2.5 rounded-xl hover:bg-white/30 transition-colors"
              >
                Placement Guide →
              </Link>
            </div>

            {/* Similar institutes */}
            <div className="card p-5">
              <h3 className="font-display font-semibold text-gray-900 dark:text-white mb-4 text-sm">
                Similar Institutes
              </h3>
              <div className="space-y-2">
                {(collegesData.institutes as Institute[])
                  .filter((i) => i.id !== institute.id && i.type === institute.type)
                  .slice(0, 4)
                  .map((similar) => (
                    <Link
                      key={similar.id}
                      to={`/colleges/${similar.id}`}
                      className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                    >
                      <span className="text-lg shrink-0">{similar.icon}</span>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-800 dark:text-gray-200 group-hover:text-brand-600 truncate transition-colors">
                          {similar.name}
                        </p>
                        <p className="text-xs text-gray-400">{similar.city}</p>
                      </div>
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