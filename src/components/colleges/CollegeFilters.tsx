import { useState } from "react";
import {
  SlidersHorizontal, MapPin, Filter, X,
  ChevronDown, ChevronUp, Search
} from "lucide-react";
import mpData from "../../data/mp-colleges.json";

export interface FilterState {
  query:       string;
  type:        string;
  tier:        string;
  city:        string;
  district:    string;
  feesMin:     number;
  feesMax:     number;
  hostel:      boolean | null;
  minRating:   number;
  sortBy:      string;
}

interface CollegeFiltersProps {
  filters:   FilterState;
  onChange:  (f: FilterState) => void;
  totalCount: number;
  shownCount: number;
}

const FEE_PRESETS = [
  { label: "Any",          min: 0,       max: 9999999 },
  { label: "Under ₹1L",   min: 0,       max: 100000  },
  { label: "₹1L - ₹2L",  min: 100000,  max: 200000  },
  { label: "₹2L - ₹5L",  min: 200000,  max: 500000  },
  { label: "Above ₹5L",   min: 500000,  max: 9999999 },
];

const SORT_OPTIONS = [
  { value: "rating",      label: "⭐ Rating"            },
  { value: "fees-asc",    label: "💰 Fees: Low to High" },
  { value: "fees-desc",   label: "💰 Fees: High to Low" },
  { value: "package",     label: "📈 Avg Package"        },
  { value: "nirf",        label: "🏆 NIRF Rank"          },
  { value: "established", label: "📅 Established (Old)"  },
];

export const DEFAULT_FILTERS: FilterState = {
  query:     "",
  type:      "all",
  tier:      "all",
  city:      "All Cities",
  district:  "All Districts",
  feesMin:   0,
  feesMax:   9999999,
  hostel:    null,
  minRating: 0,
  sortBy:    "rating",
};

export default function CollegeFilters({
  filters,
  onChange,
  totalCount,
  shownCount,
}: CollegeFiltersProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const set = (partial: Partial<FilterState>) =>
    onChange({ ...filters, ...partial });

  const activeCount = [
    filters.type      !== "all",
    filters.tier      !== "all",
    filters.city      !== "All Cities",
    filters.district  !== "All Districts",
    filters.feesMax   !== 9999999,
    filters.hostel    !== null,
    filters.minRating > 0,
  ].filter(Boolean).length;

  const reset = () => onChange(DEFAULT_FILTERS);

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden mb-6">
      {/* Top search bar */}
      <div className="p-4 border-b border-gray-100 dark:border-gray-800">
        <div className="relative">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search college name, city, course, tag..."
            value={filters.query}
            onChange={(e) => set({ query: e.target.value })}
            className="w-full pl-10 pr-10 py-3 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl
              focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400 transition-all"
          />
          {filters.query && (
            <button
              onClick={() => set({ query: "" })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Type pills */}
      <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800 flex gap-2 flex-wrap">
        {mpData.types.map((t) => (
          <button
            key={t.id}
            onClick={() => set({ type: t.id })}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              filters.type === t.id
                ? "bg-brand-600 text-white border-brand-600 shadow-sm"
                : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-brand-300 hover:text-brand-600"
            }`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* Main filters row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 border-b border-gray-100 dark:border-gray-800">
        {/* City */}
        <div>
          <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 flex items-center gap-1">
            <MapPin size={10} /> City
          </label>
          <select
            value={filters.city}
            onChange={(e) => set({ city: e.target.value })}
            className="w-full px-3 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl
              focus:outline-none focus:ring-2 focus:ring-brand-500/30 cursor-pointer appearance-none"
          >
            {mpData.cities.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>

        {/* District */}
        <div>
          <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 block">District</label>
          <select
            value={filters.district}
            onChange={(e) => set({ district: e.target.value })}
            className="w-full px-3 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl
              focus:outline-none focus:ring-2 focus:ring-brand-500/30 cursor-pointer appearance-none"
          >
            {mpData.districts.map((d) => <option key={d}>{d}</option>)}
          </select>
        </div>

        {/* Tier */}
        <div>
          <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 flex items-center gap-1">
            <Filter size={10} /> Tier
          </label>
          <select
            value={filters.tier}
            onChange={(e) => set({ tier: e.target.value })}
            className="w-full px-3 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl
              focus:outline-none focus:ring-2 focus:ring-brand-500/30 cursor-pointer appearance-none"
          >
            {mpData.tiers.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
          </select>
        </div>

        {/* Sort */}
        <div>
          <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 block">Sort By</label>
          <select
            value={filters.sortBy}
            onChange={(e) => set({ sortBy: e.target.value })}
            className="w-full px-3 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl
              focus:outline-none focus:ring-2 focus:ring-brand-500/30 cursor-pointer appearance-none"
          >
            {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      </div>

      {/* Advanced toggle */}
      <button
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      >
        <span className="flex items-center gap-2 font-medium">
          <SlidersHorizontal size={14} />
          Advanced Filters
          {activeCount > 0 && (
            <span className="bg-brand-600 text-white text-xs px-1.5 py-0.5 rounded-full">
              {activeCount}
            </span>
          )}
        </span>
        {showAdvanced ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>

      {/* Advanced filters panel */}
      {showAdvanced && (
        <div className="border-t border-gray-100 dark:border-gray-800 p-4 space-y-5">
          {/* Fees range */}
          <div>
            <label className="text-xs font-semibold text-gray-600 dark:text-gray-300 mb-3 block">
              Fees per Year
            </label>
            <div className="flex flex-wrap gap-2">
              {FEE_PRESETS.map((p) => (
                <button
                  key={p.label}
                  onClick={() => set({ feesMin: p.min, feesMax: p.max })}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${
                    filters.feesMin === p.min && filters.feesMax === p.max
                      ? "bg-emerald-600 text-white border-emerald-600"
                      : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-emerald-300"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Hostel */}
          <div>
            <label className="text-xs font-semibold text-gray-600 dark:text-gray-300 mb-3 block">
              Hostel Facility
            </label>
            <div className="flex gap-2">
              {[
                { value: null,  label: "Any"      },
                { value: true,  label: "✅ Required" },
                { value: false, label: "Not needed" },
              ].map((opt) => (
                <button
                  key={String(opt.value)}
                  onClick={() => set({ hostel: opt.value })}
                  className={`px-4 py-2 rounded-xl text-xs font-medium border transition-all ${
                    filters.hostel === opt.value
                      ? "bg-brand-600 text-white border-brand-600"
                      : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-brand-300"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Min rating */}
          <div>
            <label className="text-xs font-semibold text-gray-600 dark:text-gray-300 mb-3 block">
              Minimum Rating: <span className="text-brand-600">{filters.minRating > 0 ? `${filters.minRating}+` : "Any"}</span>
            </label>
            <div className="flex gap-2 flex-wrap">
              {[0, 3.5, 4.0, 4.2, 4.5].map((r) => (
                <button
                  key={r}
                  onClick={() => set({ minRating: r })}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${
                    filters.minRating === r
                      ? "bg-amber-500 text-white border-amber-500"
                      : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-amber-300"
                  }`}
                >
                  {r === 0 ? "Any" : `⭐ ${r}+`}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Showing <span className="font-bold text-gray-800 dark:text-gray-200">{shownCount}</span> of{" "}
          <span className="font-semibold">{totalCount}</span> institutes in Madhya Pradesh
        </p>
        {activeCount > 0 && (
          <button
            onClick={reset}
            className="flex items-center gap-1.5 text-xs font-medium text-red-500 hover:text-red-600 transition-colors"
          >
            <X size={12} /> Clear all
          </button>
        )}
      </div>
    </div>
  );
}