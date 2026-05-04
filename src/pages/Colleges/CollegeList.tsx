import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Search, MapPin,  ArrowRight, Filter,
  GraduationCap, TrendingUp, Building2, Users
} from "lucide-react";
import collegesData from "../../data/colleges.json";
import type { Institute } from "../../types";

const TYPE_COLORS: Record<string, string> = {
  "engineering-college": "bg-blue-50 text-blue-700 border-blue-200",
  "coding-bootcamp":     "bg-emerald-50 text-emerald-700 border-emerald-200",
  "coaching-institute":  "bg-amber-50 text-amber-700 border-amber-200",
  "spoken-english":      "bg-purple-50 text-purple-700 border-purple-200",
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-3 h-3 ${star <= Math.round(rating) ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"}`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-xs text-gray-500 ml-0.5">{rating}</span>
    </div>
  );
}

function InstituteCard({ institute }: { institute: Institute }) {
  const typeLabel = collegesData.types.find((t) => t.id === institute.type)?.label ?? institute.type;

  return (
    <Link
      to={`/colleges/${institute.id}`}
      className="card p-5 flex flex-col group hover:-translate-y-1 transition-all duration-200"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${institute.color} flex items-center justify-center text-2xl shadow-sm shrink-0`}>
          {institute.icon}
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${TYPE_COLORS[institute.type]}`}>
            {typeLabel}
          </span>
          {institute.ranking.nirf && (
            <span className="text-xs text-amber-600 font-semibold bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
              NIRF #{institute.ranking.nirf}
            </span>
          )}
        </div>
      </div>

      {/* Name */}
      <h2 className="font-display font-bold text-gray-900 dark:text-white text-base mb-0.5 group-hover:text-brand-600 transition-colors leading-snug">
        {institute.name}
      </h2>
      <p className="text-xs text-gray-400 mb-2 font-medium">{institute.shortName}</p>

      {/* Location */}
      <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mb-3">
        <MapPin size={11} className="text-brand-500 shrink-0" />
        {institute.city}, {institute.state}
      </div>

      {/* Rating */}
      <div className="flex items-center justify-between mb-4">
        <StarRating rating={institute.rating} />
        <span className="text-xs text-gray-400">({institute.reviewCount.toLocaleString()} reviews)</span>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-2.5 text-center">
          <p className="text-xs text-gray-400 mb-0.5">Fees</p>
          <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 leading-snug">{institute.fees}</p>
        </div>
        <div className="bg-emerald-50 dark:bg-emerald-950 rounded-xl p-2.5 text-center">
          <p className="text-xs text-gray-400 mb-0.5">Avg Package</p>
          <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 leading-snug">{institute.avgPackage}</p>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {institute.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-full">
            {tag}
          </span>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-auto flex items-center justify-between">
        <span className="text-xs text-gray-400">{institute.courses.length} programs</span>
        <span className="flex items-center gap-1 text-xs font-semibold text-brand-600 group-hover:gap-2 transition-all">
          View details <ArrowRight size={12} />
        </span>
      </div>
    </Link>
  );
}

export default function CollegeList() {
  const [query,        setQuery]        = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedState,setSelectedState]= useState("All States");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [sortBy,       setSortBy]       = useState("rating");

  const availableCities = useMemo(() => {
    if (selectedState === "All States") return ["All Cities"];
    const cities = (collegesData.cities as Record<string, string[]>)[selectedState] ?? [];
    return ["All Cities", ...cities];
  }, [selectedState]);

  const filtered = useMemo(() => {
    let list = collegesData.institutes as Institute[];

    if (selectedType !== "all") {
      list = list.filter((i) => i.type === selectedType);
    }
    if (selectedState !== "All States") {
      list = list.filter((i) => i.state === selectedState);
    }
    if (selectedCity !== "All Cities") {
      list = list.filter((i) => i.city === selectedCity);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.city.toLowerCase().includes(q) ||
          i.state.toLowerCase().includes(q) ||
          i.tags.some((t) => t.toLowerCase().includes(q)) ||
          i.courses.some((c) => c.name.toLowerCase().includes(q))
      );
    }

    // Sort
    return [...list].sort((a, b) => {
      if (sortBy === "rating")  return b.rating - a.rating;
      if (sortBy === "nirf")    return (a.ranking.nirf ?? 9999) - (b.ranking.nirf ?? 9999);
      if (sortBy === "fees")    return a.fees.localeCompare(b.fees);
      return 0;
    });
  }, [query, selectedType, selectedState, selectedCity, sortBy]);

  // Stats
  const stats = useMemo(() => ({
    total:      collegesData.institutes.length,
    colleges:   collegesData.institutes.filter((i) => i.type === "engineering-college").length,
    bootcamps:  collegesData.institutes.filter((i) => i.type === "coding-bootcamp").length,
    coaching:   collegesData.institutes.filter((i) => i.type === "coaching-institute" || i.type === "spoken-english").length,
  }), []);

  return (
    <div className="container-app py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="badge-animated mb-4">Find Institutes</div>
        <h1 className="section-title mb-3">Colleges & Institutes</h1>
        <p className="section-subtitle max-w-2xl">
          Discover engineering colleges, coding bootcamps, coaching institutes, and spoken English centers
          — filtered by location, type, and budget.
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {[
          { label: "Total Listed",      value: stats.total,     icon: Building2,    color: "text-brand-600"   },
          { label: "Engg Colleges",     value: stats.colleges,  icon: GraduationCap,color: "text-blue-600"    },
          { label: "Coding Bootcamps",  value: stats.bootcamps, icon: TrendingUp,   color: "text-emerald-600" },
          { label: "Coaching & Others", value: stats.coaching,  icon: Users,        color: "text-purple-600"  },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 text-center shadow-sm">
            <Icon size={18} className={`${color} mx-auto mb-1.5`} />
            <p className={`font-display font-extrabold text-xl ${color}`}>{value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Search + Filters */}
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 mb-8 shadow-sm">
        {/* Search bar */}
        <div className="relative mb-4">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, city, course, or tag..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl
              focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400 transition-all"
          />
        </div>

        {/* Filter row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* State */}
          <div>
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 block flex items-center gap-1">
              <MapPin size={10} /> State
            </label>
            <select
              value={selectedState}
              onChange={(e) => { setSelectedState(e.target.value); setSelectedCity("All Cities"); }}
              className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl
                focus:outline-none focus:ring-2 focus:ring-brand-500/30 cursor-pointer appearance-none"
            >
              {collegesData.states.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>

          {/* City */}
          <div>
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 block">City</label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl
                focus:outline-none focus:ring-2 focus:ring-brand-500/30 cursor-pointer appearance-none"
            >
              {availableCities.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>

          {/* Type */}
          <div>
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 block flex items-center gap-1">
              <Filter size={10} /> Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl
                focus:outline-none focus:ring-2 focus:ring-brand-500/30 cursor-pointer appearance-none"
            >
              {collegesData.types.map((t) => (
                <option key={t.id} value={t.id}>{t.icon} {t.label}</option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div>
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 block">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl
                focus:outline-none focus:ring-2 focus:ring-brand-500/30 cursor-pointer appearance-none"
            >
              <option value="rating">⭐ Rating</option>
              <option value="nirf">🏆 NIRF Rank</option>
              <option value="fees">💰 Fees (Low-High)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Type filter pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {collegesData.types.map((t) => (
          <button
            key={t.id}
            onClick={() => setSelectedType(t.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${
              selectedType === t.id
                ? "bg-brand-600 text-white border-brand-600 shadow-sm"
                : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-brand-300 hover:text-brand-600"
            }`}
          >
            {t.icon} {t.label}
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${
              selectedType === t.id ? "bg-white/20 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-500"
            }`}>
              {t.id === "all"
                ? collegesData.institutes.length
                : collegesData.institutes.filter((i) => i.type === t.id).length}
            </span>
          </button>
        ))}
      </div>

      {/* Result count */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Showing <span className="font-semibold text-gray-800 dark:text-gray-200">{filtered.length}</span> institutes
          {selectedState !== "All States" && <> in <span className="text-brand-600">{selectedState}</span></>}
          {query && <> for "<span className="text-brand-600">{query}</span>"</>}
        </p>
        {(query || selectedState !== "All States" || selectedType !== "all") && (
          <button
            onClick={() => { setQuery(""); setSelectedType("all"); setSelectedState("All States"); setSelectedCity("All Cities"); }}
            className="text-xs text-gray-400 hover:text-red-500 transition-colors font-medium"
          >
            Clear filters ✕
          </button>
        )}
      </div>

      {/* Institute grid */}
      {filtered.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((institute) => (
            <InstituteCard key={institute.id} institute={institute as Institute} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🏫</div>
          <p className="font-display font-semibold text-gray-600 dark:text-gray-400 text-lg">No institutes found</p>
          <p className="text-gray-400 text-sm mt-1 mb-5">Try adjusting filters or search differently</p>
          <button
            onClick={() => { setQuery(""); setSelectedType("all"); setSelectedState("All States"); setSelectedCity("All Cities"); }}
            className="btn-primary text-sm"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Bottom tip */}
      <div className="mt-12 bg-brand-50 dark:bg-brand-950 border border-brand-100 dark:border-brand-900 rounded-2xl p-6 text-center">
        <h3 className="font-display font-bold text-gray-900 dark:text-white mb-2">
          Want to get placed after college? 🎯
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 max-w-md mx-auto">
          Combine your college education with DevRoute's placement preparation — DSA, aptitude, and interview guides.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link to="/placement" className="btn-primary text-sm">Placement Guide</Link>
          <Link to="/quiz"      className="btn-ghost border border-gray-200 dark:border-gray-700 text-sm">Take Mock Quiz</Link>
        </div>
      </div>
    </div>
  );
}