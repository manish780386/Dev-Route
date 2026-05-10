import { Link } from "react-router-dom";
import {
  MapPin, ArrowRight, GitCompare,
  Home, TrendingUp
} from "lucide-react";

export interface MPInstitute {
  id:                string;
  name:              string;
  shortName:         string;
  type:              string;
  tier:              string;
  icon:              string;
  city:              string;
  district:          string;
  state:             string;
  address:           string;
  lat:               number;
  lng:               number;
  established:       number;
  rating:            number;
  ratingBreakdown:   Record<string, number>;
  reviewCount:       number;
  fees:              string;
  feesPerYear:       number;
  hostelAvailable:   boolean;
  hostelFees:        string;
  avgPackage:        string;
  highestPackage:    string;
  medianPackage:     string;
  placementRate:     number;
  website:           string;
  phone:             string;
  email:             string;
  color:             string;
  affiliation:       string;
  approvedBy:        string[];
  ranking:           Record<string, number | null>;
  admissionProcess:  string;
  jeeMainCutoff:     Record<string, string>;
  courses:           Array<{ name: string; duration: string; seats: number; fees: string; cutoff: string }>;
  placementStats:    Array<{ year: string; avgPackage: number; highestPackage: number; placementRate: number; studentsPlaced: number }>;
  topRecruiters:     string[];
  facilities:        string[];
  scholarships:      Array<{ name: string; amount: string; criteria: string }>;
  highlights:        string[];
  admissionCalendar: Array<{ event: string; date: string; important: boolean }>;
  tags:              string[];
  description:       string;
  nearbyMetro:       string;
  mapLink:           string;
}

const TIER_BADGE: Record<string, { label: string; class: string }> = {
  "government-top": { label: "IIT/NIT",    class: "bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800" },
  "government":     { label: "Government", class: "bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800"             },
  "private":        { label: "Private",    class: "bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800" },
  "bootcamp":       { label: "Bootcamp",   class: "bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800" },
  "coaching":       { label: "Coaching",   class: "bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800"       },
  "language":       { label: "Language",   class: "bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-400 border-teal-200 dark:border-teal-800"             },
};

interface MPCollegeCardProps {
  institute:    MPInstitute;
  isComparing:  boolean;
  onCompare:    (inst: MPInstitute) => void;
  compareCount: number;
}

export default function MPCollegeCard({
  institute,
  isComparing,
  onCompare,
  compareCount,
}: MPCollegeCardProps) {
  const tier       = TIER_BADGE[institute.tier] ?? { label: institute.tier, class: "bg-gray-100 text-gray-600 border-gray-200" };
  const canAddMore = compareCount < 3;

  return (
    <div className={`bg-white dark:bg-gray-900 rounded-2xl border-2 transition-all duration-200 flex flex-col overflow-hidden
      ${isComparing
        ? "border-brand-500 shadow-lg shadow-brand-500/10"
        : "border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md hover:-translate-y-1"
      }`}
    >
      {/* Top gradient stripe */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${institute.color}`} />

      <div className="p-5 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${institute.color} flex items-center justify-center text-2xl shadow-sm shrink-0`}>
            {institute.icon}
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${tier.class}`}>
              {tier.label}
            </span>
            {institute.ranking.nirf && (
              <span className="text-xs text-amber-600 dark:text-amber-400 font-bold bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 px-2 py-0.5 rounded-full">
                NIRF #{institute.ranking.nirf}
              </span>
            )}
            {institute.ranking.mpRank === 0 && (
              <span className="text-xs text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 px-2 py-0.5 rounded-full">
                🥇 MP's Best
              </span>
            )}
          </div>
        </div>

        {/* Name */}
        <Link to={`/mp-colleges/${institute.id}`}>
          <h2 className="font-display font-bold text-gray-900 dark:text-white text-base mb-0.5 hover:text-brand-600 dark:hover:text-brand-400 transition-colors leading-snug">
            {institute.name}
          </h2>
        </Link>
        <p className="text-xs text-gray-400 dark:text-gray-500 font-mono mb-1">{institute.shortName}</p>

        {/* Location */}
        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mb-3">
          <MapPin size={11} className="text-brand-500 shrink-0" />
          {institute.city}, {institute.district}
        </div>

        {/* Rating */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5">
              {[1,2,3,4,5].map((s) => (
                <svg key={s} className={`w-3 h-3 ${s <= Math.round(institute.rating) ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"}`} viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{institute.rating}</span>
          </div>
          <span className="text-xs text-gray-400">({institute.reviewCount.toLocaleString()})</span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-2.5">
            <p className="text-xs text-gray-400 mb-0.5">Fees/Year</p>
            <p className="text-xs font-bold text-gray-800 dark:text-gray-200 leading-snug">{institute.fees}</p>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-950 rounded-xl p-2.5">
            <p className="text-xs text-gray-400 mb-0.5">Avg Package</p>
            <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400 leading-snug">{institute.avgPackage}</p>
          </div>
        </div>

        {/* Hostel + placement */}
        <div className="flex items-center gap-3 mb-4">
          <div className={`flex items-center gap-1 text-xs font-medium ${institute.hostelAvailable ? "text-emerald-600 dark:text-emerald-400" : "text-gray-400"}`}>
            <Home size={11} />
            {institute.hostelAvailable ? "Hostel ✓" : "No Hostel"}
          </div>
          {institute.placementRate > 0 && (
            <div className="flex items-center gap-1 text-xs font-medium text-brand-600 dark:text-brand-400">
              <TrendingUp size={11} />
              {institute.placementRate}% placed
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {institute.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-auto flex items-center gap-2">
          <button
            onClick={() => onCompare(institute)}
            disabled={!isComparing && !canAddMore}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all flex-1 justify-center ${
              isComparing
                ? "bg-brand-600 text-white border-brand-600"
                : canAddMore
                ? "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-brand-300 hover:text-brand-600"
                : "bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-gray-300 dark:text-gray-600 cursor-not-allowed"
            }`}
          >
            <GitCompare size={12} />
            {isComparing ? "✓ Added" : "Compare"}
          </button>
          <Link
            to={`/mp-colleges/${institute.id}`}
            className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold bg-brand-600 text-white hover:bg-brand-700 transition-colors"
          >
            View <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}