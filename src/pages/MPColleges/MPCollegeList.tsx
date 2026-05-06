import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  MapPin, GraduationCap, TrendingUp, Building2,
  Users, GitCompare, Map, List, LayoutGrid
} from "lucide-react";
import mpData from "../../data/mp-colleges.json";
import CollegeFilters, {
  type FilterState,
  DEFAULT_FILTERS,
} from "../../components/colleges/CollegeFilters.tsx";
import MPCollegeCard, {
  type MPInstitute,
} from "../../components/colleges/MPCollegeCard.tsx";
import CollegeCompareBar from "../../components/colleges/CollegeCompareBar";
import { useCollegeFilters } from "../../hooks/useCollegeFilters";

type ViewMode = "grid" | "list";

// ── List row view ─────────────────────────────────────────────────────────────

function InstituteRow({
  institute,
  isComparing,
  onCompare,
  compareCount,
}: {
  institute:    MPInstitute;
  isComparing:  boolean;
  onCompare:    (i: MPInstitute) => void;
  compareCount: number;
}) {
  const canAddMore = compareCount < 3;
  return (
    <div className={`bg-white dark:bg-gray-900 rounded-2xl border-2 transition-all p-4 flex items-center gap-4 ${
      isComparing
        ? "border-brand-500 shadow-md"
        : "border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md"
    }`}>
      {/* Icon */}
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${institute.color} flex items-center justify-center text-2xl shadow-sm shrink-0`}>
        {institute.icon}
      </div>

      {/* Main info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-2 flex-wrap">
          <Link
            to={`/mp-colleges/${institute.id}`}
            className="font-display font-bold text-gray-900 dark:text-white text-sm hover:text-brand-600 transition-colors"
          >
            {institute.name}
          </Link>
          {institute.ranking.nirf && (
            <span className="text-xs text-amber-600 font-bold bg-amber-50 dark:bg-amber-950 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800 shrink-0">
              NIRF #{institute.ranking.nirf}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 mt-1 flex-wrap text-xs text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <MapPin size={10} /> {institute.city}
          </span>
          <span>⭐ {institute.rating}</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-medium">{institute.avgPackage}</span>
          <span>{institute.fees}</span>
          {institute.hostelAvailable && <span className="text-brand-600 dark:text-brand-400">🏠 Hostel</span>}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => onCompare(institute)}
          disabled={!isComparing && !canAddMore}
          className={`p-2 rounded-xl border transition-colors ${
            isComparing
              ? "bg-brand-600 text-white border-brand-600"
              : canAddMore
              ? "border-gray-200 dark:border-gray-700 text-gray-500 hover:border-brand-300 hover:text-brand-600"
              : "border-gray-100 dark:border-gray-700 text-gray-300 cursor-not-allowed"
          }`}
          title={isComparing ? "Remove from compare" : "Add to compare"}
        >
          <GitCompare size={14} />
        </button>
        <Link
          to={`/mp-colleges/${institute.id}`}
          className="px-4 py-2 bg-brand-600 text-white text-xs font-semibold rounded-xl hover:bg-brand-700 transition-colors"
        >
          View →
        </Link>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function MPCollegeList() {
  const [filters,       setFilters]       = useState<FilterState>(DEFAULT_FILTERS);
  const [compareList,   setCompareList]   = useState<MPInstitute[]>([]);
  const [viewMode,      setViewMode]      = useState<ViewMode>("grid");

  const allInstitutes = useMemo(
    () => mpData.institutes as unknown as MPInstitute[],
    []
  );

  const filtered = useCollegeFilters(allInstitutes, filters);

  // Stats for header
  const stats = useMemo(() => ({
    total:    allInstitutes.length,
    govtTop:  allInstitutes.filter((i) => i.tier === "government-top").length,
    govt:     allInstitutes.filter((i) => i.tier === "government").length,
    private:  allInstitutes.filter((i) => i.tier === "private").length,
    bootcamp: allInstitutes.filter((i) => i.tier === "bootcamp").length,
    coaching: allInstitutes.filter((i) => i.tier === "coaching" || i.tier === "language").length,
  }), [allInstitutes]);

  // Compare handlers
  const handleCompare = (inst: MPInstitute) => {
    setCompareList((prev) => {
      if (prev.some((p) => p.id === inst.id)) {
        return prev.filter((p) => p.id !== inst.id);
      }
      if (prev.length >= 3) return prev;
      return [...prev, inst];
    });
  };

  const isComparing = (id: string) => compareList.some((c) => c.id === id);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* ── Hero ── */}
      <div className="bg-gradient-to-br from-emerald-600 to-teal-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute inset-0 bg-black/20" />

        <div className="container-app py-14 relative">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-emerald-300 text-xs mb-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/colleges" className="hover:text-white transition-colors">Institutes</Link>
            <span>/</span>
            <span className="text-white font-medium">Madhya Pradesh</span>
          </div>

          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 text-white text-xs font-semibold rounded-full px-3 py-1.5 mb-4">
                <MapPin size={12} /> Madhya Pradesh, India
              </div>
              <h1 className="font-display font-extrabold text-white text-4xl sm:text-5xl leading-tight mb-3">
                Find Your College
                <br />
                <span className="text-emerald-200">in MP</span>
              </h1>
              <p className="text-emerald-100 text-lg max-w-xl leading-relaxed">
                Compare engineering colleges, coding bootcamps, coaching centers, and spoken English institutes across Madhya Pradesh.
              </p>
            </div>

            {/* Map link CTA */}
            <Link
              to="/mp-colleges/map"
              className="flex items-center gap-2 bg-white text-emerald-700 font-bold text-sm px-6 py-3.5 rounded-2xl hover:bg-emerald-50 transition-colors shadow-lg shrink-0"
            >
              <Map size={18} /> Map View
            </Link>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mt-10">
            {[
              { label: "Total",     value: stats.total,    icon: "🏫" },
              { label: "IIT/NIT",   value: stats.govtTop,  icon: "🏛️" },
              { label: "Govt",      value: stats.govt,     icon: "🎓" },
              { label: "Private",   value: stats.private,  icon: "🏢" },
              { label: "Bootcamps", value: stats.bootcamp, icon: "💻" },
              { label: "Coaching",  value: stats.coaching, icon: "📚" },
            ].map(({ label, value, icon }) => (
              <div key={label} className="bg-white/15 backdrop-blur-sm border border-white/25 rounded-xl p-3 text-center">
                <p className="text-lg">{icon}</p>
                <p className="font-display font-extrabold text-white text-xl leading-none">{value}</p>
                <p className="text-emerald-200 text-xs mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="container-app py-8">
        {/* Filters */}
        <CollegeFilters
          filters={filters}
          onChange={setFilters}
          totalCount={allInstitutes.length}
          shownCount={filtered.length}
        />

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <span className="font-bold text-gray-800 dark:text-gray-200">{filtered.length}</span> institutes found
            {compareList.length > 0 && (
              <span className="ml-3 text-brand-600 font-medium">
                · {compareList.length} selected for comparison
              </span>
            )}
          </p>

          {/* View toggle */}
          <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "grid"
                  ? "bg-white dark:bg-gray-700 shadow-sm text-brand-600"
                  : "text-gray-400 hover:text-gray-600"
              }`}
              title="Grid view"
            >
              <LayoutGrid size={15} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "list"
                  ? "bg-white dark:bg-gray-700 shadow-sm text-brand-600"
                  : "text-gray-400 hover:text-gray-600"
              }`}
              title="List view"
            >
              <List size={15} />
            </button>
          </div>
        </div>

        {/* Results */}
        {filtered.length > 0 ? (
          viewMode === "grid" ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((inst) => (
                <MPCollegeCard
                  key={inst.id}
                  institute={inst}
                  isComparing={isComparing(inst.id)}
                  onCompare={handleCompare}
                  compareCount={compareList.length}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((inst) => (
                <InstituteRow
                  key={inst.id}
                  institute={inst}
                  isComparing={isComparing(inst.id)}
                  onCompare={handleCompare}
                  compareCount={compareList.length}
                />
              ))}
            </div>
          )
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🏫</div>
            <p className="font-display font-bold text-gray-700 dark:text-gray-300 text-xl mb-1">
              No institutes found
            </p>
            <p className="text-gray-400 mb-6">Try adjusting your filters</p>
            <button
              onClick={() => setFilters(DEFAULT_FILTERS)}
              className="btn-primary"
            >
              Reset all filters
            </button>
          </div>
        )}

        {/* Bottom padding for compare bar */}
        {compareList.length > 0 && <div className="h-20" />}
      </div>

      {/* Compare sticky bar */}
      <CollegeCompareBar
        selected={compareList}
        onRemove={(id) => setCompareList((p) => p.filter((c) => c.id !== id))}
        onClear={() => setCompareList([])}
      />
    </div>
  );
}