import { useParams, Link, Navigate } from "react-router-dom";
import { useState } from "react";
import {
  ArrowLeft, MapPin, Globe, Phone, Mail, Home,
  TrendingUp, CheckCircle2, Award, GraduationCap,
  ChevronDown, ChevronUp, GitCompare, Map as MapIcon,
  BookOpen, Star, Layers
} from "lucide-react";
import mpData            from "../../data/mp-colleges.json";
import PlacementChart    from "../../components/colleges/PlacementChart.tsx";
import AdmissionTimeline from "../../components/colleges/AdmissionTimeline.tsx";
import RatingBreakdown   from "../../components/colleges/RatingBreakdown.tsx";
import type { MPInstitute } from "../../components/colleges/MPCollegeCard";

// ── Tab type ──────────────────────────────────────────────────────────────────

type Tab = "overview" | "placements" | "courses" | "admission" | "ratings";

const TABS: { id: Tab; label: string; icon: typeof Star }[] = [
  { id: "overview",   label: "Overview",   icon: BookOpen       },
  { id: "placements", label: "Placements", icon: TrendingUp     },
  { id: "courses",    label: "Courses",    icon: GraduationCap  },
  { id: "admission",  label: "Admission",  icon: CheckCircle2   },
  { id: "ratings",    label: "Ratings",    icon: Star           },
];

const TIER_GRADIENT: Record<string, string> = {
  "government-top": "from-indigo-700 to-blue-600",
  "government":     "from-blue-600  to-teal-600",
  "private":        "from-purple-600 to-violet-600",
  "bootcamp":       "from-emerald-600 to-teal-600",
  "coaching":       "from-amber-600  to-orange-500",
  "language":       "from-teal-600   to-cyan-600",
};

// ── Component ─────────────────────────────────────────────────────────────────

export default function MPCollegeDetail() {
  const { collegeId } = useParams<{ collegeId: string }>();
  const [activeTab,    setActiveTab]    = useState<Tab>("overview");
  const [openCourses,  setOpenCourses]  = useState(true);

  const institute = mpData.institutes.find(
    (i) => i.id === collegeId
  ) as unknown as MPInstitute | undefined;

  if (!institute) return <Navigate to="/mp-colleges" replace />;

  const gradient = TIER_GRADIENT[institute.tier] ?? "from-brand-600 to-brand-800";
  const typeLabel = mpData.types.find((t) => t.id === institute.type)?.label ?? institute.type;
  const tierLabel = mpData.tiers.find((t) => t.id === institute.tier)?.label ?? institute.tier;

  // Similar colleges (same type, different id)
  const similar = (mpData.institutes as unknown as MPInstitute[])
    .filter((i) => i.type === institute.type && i.id !== institute.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* ── Hero ── */}
      <div className={`bg-gradient-to-br ${gradient} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-grid opacity-20" />

        <div className="container-app py-14 relative">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/60 text-xs mb-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/mp-colleges" className="hover:text-white transition-colors">MP Colleges</Link>
            <span>/</span>
            <span className="text-white">{institute.shortName}</span>
          </div>

          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* Left */}
            <div className="flex-1">
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-white/20 border border-white/30 text-white text-xs font-semibold rounded-full px-3 py-1">
                  {typeLabel}
                </span>
                <span className="bg-white/15 border border-white/25 text-white text-xs rounded-full px-3 py-1">
                  {tierLabel}
                </span>
                {institute.ranking.nirf && (
                  <span className="bg-amber-400/30 border border-amber-300/40 text-white text-xs font-bold rounded-full px-3 py-1">
                    🏆 NIRF Rank #{institute.ranking.nirf}
                  </span>
                )}
                {institute.ranking.mpRank === 0 && (
                  <span className="bg-white/20 border border-white/30 text-white text-xs font-bold rounded-full px-3 py-1">
                    🥇 MP's #1 Institute
                  </span>
                )}
                <span className="bg-white/10 border border-white/20 text-white/80 text-xs rounded-full px-3 py-1">
                  Est. {institute.established}
                </span>
              </div>

              <h1 className="font-display font-extrabold text-white text-3xl sm:text-4xl leading-tight mb-2">
                {institute.name}
              </h1>
              <p className="text-white/70 font-mono text-sm mb-4">{institute.affiliation}</p>

              {/* Location + rating */}
              <div className="flex flex-wrap items-center gap-5">
                <span className="flex items-center gap-1.5 text-white/80 text-sm">
                  <MapPin size={14} /> {institute.address}
                </span>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {[1,2,3,4,5].map((s) => (
                      <svg key={s} className={`w-4 h-4 ${s <= Math.round(institute.rating) ? "text-amber-400 fill-amber-400" : "text-white/20 fill-white/20"}`} viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-white/80 text-sm font-semibold">{institute.rating}</span>
                  <span className="text-white/50 text-xs">({institute.reviewCount.toLocaleString()} reviews)</span>
                </div>
              </div>

              {/* Quick stats row */}
              <div className="flex flex-wrap gap-3 mt-6">
                {[
                  { label: "Fees/Year",      value: institute.fees          },
                  { label: "Avg Package",    value: institute.avgPackage    },
                  { label: "Highest Pkg",    value: institute.highestPackage },
                  ...(institute.placementRate > 0 ? [{ label: "Placement", value: `${institute.placementRate}%` }] : []),
                ].map(({ label, value }) => (
                  <div key={label} className="bg-white/15 border border-white/25 rounded-xl px-4 py-2.5 text-center">
                    <p className="text-white/60 text-xs">{label}</p>
                    <p className="text-white font-bold text-sm">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right actions */}
            <div className="flex flex-col gap-2 shrink-0 sm:min-w-[160px]">
              <a
                href={institute.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-white text-gray-900 font-semibold text-sm px-5 py-3 rounded-xl hover:bg-gray-50 transition-colors shadow-sm"
              >
                <Globe size={14} /> Visit Website
              </a>
              <a
                href={institute.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-white/20 border border-white/30 text-white font-medium text-sm px-5 py-3 rounded-xl hover:bg-white/30 transition-colors"
              >
                <MapIcon size={14} /> View on Map
              </a>
              <Link
                to="/mp-colleges"
                className="flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white/80 text-sm px-5 py-2.5 rounded-xl hover:bg-white/15 transition-colors"
              >
                <ArrowLeft size={14} /> Back to List
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Tab Bar ── */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 sticky top-16 z-30 shadow-sm">
        <div className="container-app">
          <div className="flex gap-0 overflow-x-auto scrollbar-thin">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-5 py-4 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
                  activeTab === id
                    ? "border-brand-600 text-brand-700 dark:text-brand-400"
                    : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                }`}
              >
                <Icon size={14} />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="container-app py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">

            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Description */}
                <div className="card p-6">
                  <h2 className="font-display font-bold text-gray-900 dark:text-white text-xl mb-4 flex items-center gap-2">
                    <BookOpen size={20} className="text-brand-600" /> About {institute.shortName}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{institute.description}</p>
                </div>

                {/* Key highlights */}
                <div className="card p-6">
                  <h2 className="font-display font-bold text-gray-900 dark:text-white text-xl mb-4 flex items-center gap-2">
                    <Award size={20} className="text-amber-500" /> Key Highlights
                  </h2>
                  <div className="space-y-3">
                    {institute.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle2 size={15} className="text-emerald-500 mt-0.5 shrink-0" />
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-snug">{h}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Facilities */}
                <div className="card p-6">
                  <h2 className="font-display font-bold text-gray-900 dark:text-white text-xl mb-4 flex items-center gap-2">
                    <Layers size={20} className="text-teal-600" /> Facilities
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {institute.facilities.map((f) => (
                      <span key={f} className="text-sm bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-400 border border-teal-100 dark:border-teal-900 px-3.5 py-2 rounded-xl">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Top recruiters */}
                {institute.topRecruiters[0] !== "N/A — entrance coaching for IIT/NEET" &&
                 institute.topRecruiters[0] !== "N/A — language skill building" &&
                 institute.topRecruiters[0] !== "N/A" && (
                  <div className="card p-6">
                    <h2 className="font-display font-bold text-gray-900 dark:text-white text-xl mb-4 flex items-center gap-2">
                      <TrendingUp size={20} className="text-emerald-600" /> Top Recruiters
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {institute.topRecruiters.map((r) => (
                        <span key={r} className="text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium px-3.5 py-2 rounded-xl">
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Scholarships */}
                {institute.scholarships.length > 0 && (
                  <div className="card p-6">
                    <h2 className="font-display font-bold text-gray-900 dark:text-white text-xl mb-4 flex items-center gap-2">
                      <Award size={20} className="text-purple-600" /> Scholarships Available
                    </h2>
                    <div className="space-y-3">
                      {institute.scholarships.map((s, i) => (
                        <div key={i} className="flex items-start gap-4 p-4 bg-purple-50 dark:bg-purple-950 rounded-xl border border-purple-100 dark:border-purple-900">
                          <div className="flex-1">
                            <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm">{s.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{s.criteria}</p>
                          </div>
                          <span className="text-sm font-bold text-purple-700 dark:text-purple-400 shrink-0">{s.amount}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Placements Tab */}
            {activeTab === "placements" && (
              <div className="card p-6">
                <h2 className="font-display font-bold text-gray-900 dark:text-white text-xl mb-6 flex items-center gap-2">
                  <TrendingUp size={20} className="text-emerald-600" /> Placement Statistics
                </h2>
                <PlacementChart
                  stats={institute.placementStats as any}
                  collegeName={institute.shortName}
                />
              </div>
            )}

            {/* Courses Tab */}
            {activeTab === "courses" && (
              <div className="card overflow-hidden">
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
                  <div className="border-t border-gray-100 dark:border-gray-800">
                    {/* Header row */}
                    <div className="grid grid-cols-5 gap-2 px-6 py-3 bg-gray-50 dark:bg-gray-800 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      <span className="col-span-2">Course</span>
                      <span>Duration</span>
                      <span>Seats</span>
                      <span>Fees</span>
                    </div>
                    <div className="divide-y divide-gray-50 dark:divide-gray-800">
                      {institute.courses.map((course, i) => (
                        <div key={i} className="grid grid-cols-5 gap-2 px-6 py-4 items-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                          <div className="col-span-2">
                            <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm">{course.name}</p>
                            <p className="text-xs text-gray-400 mt-0.5 leading-snug">{course.cutoff}</p>
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">{course.duration}</span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">{course.seats}</span>
                          <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">{course.fees}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Admission Tab */}
            {activeTab === "admission" && (
              <div className="card p-6">
                <h2 className="font-display font-bold text-gray-900 dark:text-white text-xl mb-6 flex items-center gap-2">
                  <CheckCircle2 size={20} className="text-brand-600" /> Admission Process & Timeline
                </h2>
                <AdmissionTimeline
                  events={institute.admissionCalendar as any}
                  admissionProcess={institute.admissionProcess}
                />

                {/* JEE Cutoffs if available */}
                {Object.keys(institute.jeeMainCutoff).length > 0 &&
                 !Object.values(institute.jeeMainCutoff).every((v) => v === "N/A") && (
                  <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
                    <h3 className="font-display font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                      <Award size={16} className="text-amber-500" /> Branch-wise Cutoffs
                    </h3>
                    <div className="space-y-3">
                      {Object.entries(institute.jeeMainCutoff).map(([branch, cutoff]) => (
                        <div key={branch} className="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-950 border border-amber-100 dark:border-amber-900 rounded-xl">
                          <span className="font-semibold text-gray-800 dark:text-gray-200 text-sm">{branch}</span>
                          <span className="text-xs text-amber-700 dark:text-amber-400 font-medium">{cutoff}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Ratings Tab */}
            {activeTab === "ratings" && (
              <div className="card p-6">
                <h2 className="font-display font-bold text-gray-900 dark:text-white text-xl mb-6 flex items-center gap-2">
                  <Star size={20} className="text-amber-500" /> Ratings & Reviews
                </h2>
                <RatingBreakdown
                  overall={institute.rating}
                  breakdown={institute.ratingBreakdown as any}
                  reviewCount={institute.reviewCount}
                />
              </div>
            )}
          </div>

          {/* ── Sidebar ── */}
          <div className="space-y-5">
            {/* Quick Info */}
            <div className="card p-5">
              <h3 className="font-display font-semibold text-gray-900 dark:text-white mb-4">Quick Info</h3>
              <div className="space-y-3 text-sm">
                {[
                  { label: "Fees/Year",       value: institute.fees,          icon: "💰" },
                  { label: "Avg Package",     value: institute.avgPackage,    icon: "📈" },
                  { label: "Highest Package", value: institute.highestPackage, icon: "🏆" },
                  { label: "Median Package",  value: institute.medianPackage, icon: "📊" },
                  { label: "Established",     value: String(institute.established), icon: "📅" },
                  { label: "Hostel",          value: institute.hostelAvailable ? `✅ ${institute.hostelFees}` : "❌ Not available", icon: "🏠" },
                  { label: "Metro/Station",   value: institute.nearbyMetro,   icon: "🚇" },
                ].map(({ label, value, icon }) => (
                  <div key={label} className="flex justify-between gap-2 pb-2 border-b border-gray-50 dark:border-gray-800 last:border-0 last:pb-0">
                    <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                      <span>{icon}</span> {label}
                    </span>
                    <span className="font-medium text-gray-800 dark:text-gray-200 text-right text-xs leading-snug max-w-[150px]">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rankings */}
            {(institute.ranking.nirf || institute.ranking.mpRank !== null) && (
              <div className="card p-5">
                <h3 className="font-display font-semibold text-gray-900 dark:text-white mb-4">Rankings</h3>
                <div className="space-y-3">
                  {institute.ranking.nirf && (
                    <div className="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-950 rounded-xl">
                      <span className="text-sm text-gray-600 dark:text-gray-400">NIRF 2024</span>
                      <span className="font-display font-extrabold text-amber-600 dark:text-amber-400 text-xl">#{institute.ranking.nirf}</span>
                    </div>
                  )}
                  {institute.ranking.qs && (
                    <div className="flex items-center justify-between p-3 bg-brand-50 dark:bg-brand-950 rounded-xl">
                      <span className="text-sm text-gray-600 dark:text-gray-400">QS World</span>
                      <span className="font-display font-extrabold text-brand-600 dark:text-brand-400 text-xl">#{institute.ranking.qs}</span>
                    </div>
                  )}
                  {institute.ranking.mpRank !== null && (
                    <div className="flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-950 rounded-xl">
                      <span className="text-sm text-gray-600 dark:text-gray-400">MP Rank</span>
                      <span className="font-display font-extrabold text-emerald-600 dark:text-emerald-400 text-xl">
                        {institute.ranking.mpRank === 0 ? "#1 (IIT)" : `#${institute.ranking.mpRank}`}
                      </span>
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
                <a href={`tel:${institute.phone}`} className="flex items-center gap-2.5 text-sm text-gray-600 dark:text-gray-400 hover:text-brand-600 transition-colors">
                  <Phone size={13} className="text-brand-500 shrink-0" />
                  <span className="truncate">{institute.phone}</span>
                </a>
                <a href={`mailto:${institute.email}`} className="flex items-center gap-2.5 text-sm text-gray-600 dark:text-gray-400 hover:text-brand-600 transition-colors">
                  <Mail size={13} className="text-brand-500 shrink-0" />
                  <span className="truncate">{institute.email}</span>
                </a>
                <div className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400">
                  <MapPin size={13} className="text-brand-500 shrink-0 mt-0.5" />
                  <span className="leading-snug text-xs">{institute.address}</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className={`rounded-2xl bg-gradient-to-br ${gradient} p-5 text-white`}>
              <h3 className="font-display font-bold mb-2">Prepare for placements 🎯</h3>
              <p className="text-sm text-white/80 mb-4 leading-snug">
                Get placement-ready with DevRoute's DSA prep, aptitude practice, and interview guides.
              </p>
              <div className="flex flex-col gap-2">
                <Link to="/placement" className="text-center bg-white/20 border border-white/30 text-white font-semibold text-sm px-4 py-2.5 rounded-xl hover:bg-white/30 transition-colors">
                  Placement Guide
                </Link>
                <Link to="/quiz" className="text-center bg-white/10 border border-white/20 text-white/80 text-sm px-4 py-2.5 rounded-xl hover:bg-white/20 transition-colors">
                  Take Mock Quiz
                </Link>
              </div>
            </div>

            {/* Similar institutes */}
            {similar.length > 0 && (
              <div className="card p-5">
                <h3 className="font-display font-semibold text-gray-900 dark:text-white mb-4 text-sm">
                  Similar Institutes
                </h3>
                <div className="space-y-2">
                  {similar.map((s) => (
                    <Link
                      key={s.id}
                      to={`/mp-colleges/${s.id}`}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                    >
                      <span className="text-xl shrink-0">{s.icon}</span>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-800 dark:text-gray-200 group-hover:text-brand-600 truncate transition-colors">
                          {s.name}
                        </p>
                        <p className="text-xs text-gray-400">{s.city} · ⭐ {s.rating}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}