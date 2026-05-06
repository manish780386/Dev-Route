import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft, MapPin, Filter, List,
  TrendingUp, Home, Star, X
} from "lucide-react";
import mpData from "../../data/mp-colleges.json";
import type { MPInstitute } from "../../components/colleges/MPCollegeCard";

// ── MP cities approximate positions for SVG map ───────────────────────────────

const MP_CITIES: Record<string, { x: number; y: number; label: string }> = {
  "Bhopal":   { x: 48, y: 42, label: "Bhopal"   },
  "Indore":   { x: 28, y: 55, label: "Indore"   },
  "Gwalior":  { x: 60, y: 22, label: "Gwalior"  },
  "Jabalpur": { x: 68, y: 48, label: "Jabalpur" },
  "Ujjain":   { x: 30, y: 48, label: "Ujjain"   },
  "Sagar":    { x: 58, y: 50, label: "Sagar"    },
  "Rewa":     { x: 76, y: 38, label: "Rewa"     },
  "Satna":    { x: 72, y: 44, label: "Satna"    },
  "Dewas":    { x: 33, y: 50, label: "Dewas"    },
  "Khandwa":  { x: 35, y: 62, label: "Khandwa"  },
};

const TYPE_COLORS_MAP: Record<string, string> = {
  "engineering-college": "#0062f5",
  "coding-bootcamp":     "#10b981",
  "coaching-institute":  "#f59e0b",
  "spoken-english":      "#8b5cf6",
};

const TIER_SIZES: Record<string, number> = {
  "government-top": 14,
  "government":     11,
  "private":        9,
  "bootcamp":       9,
  "coaching":       9,
  "language":       8,
};

// ── Marker component ──────────────────────────────────────────────────────────

function MapMarker({
  institute,
  position,
  isSelected,
  onClick,
}: {
  institute:  MPInstitute;
  position:   { x: number; y: number };
  isSelected: boolean;
  onClick:    () => void;
}) {
  const color = TYPE_COLORS_MAP[institute.type] ?? "#6b7280";
  const size  = TIER_SIZES[institute.tier] ?? 9;

  return (
    <g
      transform={`translate(${position.x}, ${position.y})`}
      className="cursor-pointer"
      onClick={onClick}
    >
      {/* Pulse ring for selected */}
      {isSelected && (
        <circle r={size + 6} fill={color} opacity={0.2}>
          <animate attributeName="r" values={`${size + 4};${size + 10};${size + 4}`} dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;0.1;0.3" dur="2s" repeatCount="indefinite" />
        </circle>
      )}

      {/* Pin shadow */}
      <ellipse cx={0} cy={size + 2} rx={size * 0.6} ry={3} fill="rgba(0,0,0,0.15)" />

      {/* Pin body */}
      <circle
        r={size}
        fill={isSelected ? color : color + "dd"}
        stroke="white"
        strokeWidth={isSelected ? 3 : 2}
        style={{ filter: isSelected ? `drop-shadow(0 0 6px ${color})` : "none" }}
      />

      {/* Institute icon text */}
      <text
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={size * 0.9}
        fill="white"
        fontWeight="bold"
        style={{ pointerEvents: "none", userSelect: "none" }}
      >
        {institute.type === "engineering-college" ? "🎓" :
         institute.type === "coding-bootcamp"     ? "💻" :
         institute.type === "coaching-institute"  ? "📚" : "🗣️"}
      </text>

      {/* Label */}
      <text
        y={size + 10}
        textAnchor="middle"
        fontSize={6}
        fill={isSelected ? "#111827" : "#374151"}
        fontWeight={isSelected ? "700" : "500"}
        stroke="white"
        strokeWidth={2}
        paintOrder="stroke"
        style={{ pointerEvents: "none", userSelect: "none" }}
      >
        {institute.shortName}
      </text>
    </g>
  );
}

// ── Info panel ────────────────────────────────────────────────────────────────

function InfoPanel({
  institute,
  onClose,
}: {
  institute: MPInstitute;
  onClose:   () => void;
}) {
  return (
    <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden z-20">
      {/* Color stripe */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${institute.color}`} />

      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${institute.color} flex items-center justify-center text-xl shadow-sm shrink-0`}>
              {institute.icon}
            </div>
            <div>
              <h3 className="font-display font-bold text-gray-900 dark:text-white text-sm leading-snug">
                {institute.name}
              </h3>
              <p className="text-xs text-gray-400 font-mono">{institute.shortName}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1">
            <X size={16} />
          </button>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-4">
          <MapPin size={11} className="text-brand-500" />
          {institute.address}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-2.5 text-center">
            <p className="text-xs text-gray-400 mb-0.5">Fees/Year</p>
            <p className="text-xs font-bold text-gray-800 dark:text-gray-200 leading-snug">{institute.fees}</p>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-950 rounded-xl p-2.5 text-center">
            <p className="text-xs text-gray-400 mb-0.5">Avg Package</p>
            <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400 leading-snug">{institute.avgPackage}</p>
          </div>
        </div>

        {/* Rating + hostel */}
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
          <span className={`text-xs font-medium ${institute.hostelAvailable ? "text-emerald-600 dark:text-emerald-400" : "text-gray-400"}`}>
            {institute.hostelAvailable ? "🏠 Hostel ✓" : "No Hostel"}
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {institute.tags.slice(0, 3).map((t) => (
            <span key={t} className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded-full">{t}</span>
          ))}
        </div>

        {/* View button */}
        <Link
          to={`/mp-colleges/${institute.id}`}
          className="block w-full text-center bg-brand-600 text-white font-semibold text-sm py-2.5 rounded-xl hover:bg-brand-700 transition-colors"
        >
          View Full Profile →
        </Link>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function MPCollegeMap() {
  const [selectedId,   setSelectedId]   = useState<string | null>(null);
  const [filterType,   setFilterType]   = useState("all");
  const [showList,     setShowList]     = useState(false);

  const allInstitutes = useMemo(
    () => mpData.institutes as unknown as MPInstitute[],
    []
  );

  const filtered = useMemo(() =>
    filterType === "all"
      ? allInstitutes
      : allInstitutes.filter((i) => i.type === filterType),
    [allInstitutes, filterType]
  );

  const selectedInst = filtered.find((i) => i.id === selectedId) ?? null;

  // Group institutes by city
  const byCity = useMemo(() => {
    const map: Record<string, MPInstitute[]> = {};
    filtered.forEach((inst) => {
      if (!map[inst.city]) map[inst.city] = [];
      map[inst.city].push(inst);
    });
    return map;
  }, [filtered]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 flex flex-col">
      {/* Header bar */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 shadow-sm px-4 sm:px-6 py-3 flex items-center gap-3 flex-wrap z-30 relative">
        <Link
          to="/mp-colleges"
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition-colors shrink-0"
        >
          <ArrowLeft size={15} /> MP Colleges
        </Link>

        <div className="h-5 w-px bg-gray-200 dark:bg-gray-700" />

        <div className="flex items-center gap-2 shrink-0">
          <MapPin size={16} className="text-emerald-600" />
          <span className="font-display font-bold text-gray-900 dark:text-white text-sm">
            MP College Map
          </span>
        </div>

        {/* Type filter pills */}
        <div className="flex gap-2 flex-1 overflow-x-auto scrollbar-thin">
          {mpData.types.map((t) => (
            <button
              key={t.id}
              onClick={() => setFilterType(t.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border whitespace-nowrap transition-all ${
                filterType === t.id
                  ? "bg-brand-600 text-white border-brand-600"
                  : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-brand-300"
              }`}
            >
              {t.icon} {t.label}
              <span className={`text-xs ${filterType === t.id ? "text-white/70" : "text-gray-400"}`}>
                ({t.id === "all" ? allInstitutes.length : allInstitutes.filter((i) => i.type === t.id).length})
              </span>
            </button>
          ))}
        </div>

        {/* List toggle */}
        <button
          onClick={() => setShowList(!showList)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400 hover:border-brand-300 hover:text-brand-600 transition-colors shrink-0"
        >
          <List size={14} />
          <span className="hidden sm:inline">{showList ? "Hide" : "Show"} List</span>
        </button>
      </div>

      <div className="flex flex-1 relative overflow-hidden">
        {/* ── SVG Map ── */}
        <div className="flex-1 relative bg-gradient-to-br from-sky-100 to-emerald-50 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
          {/* MP state boundary SVG */}
          <svg
            viewBox="0 0 100 80"
            className="w-full h-full"
            style={{ minHeight: "400px" }}
            onClick={() => setSelectedId(null)}
          >
            {/* MP state shape (simplified polygon) */}
            <defs>
              <filter id="shadow">
                <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.15" />
              </filter>
            </defs>

            {/* State background */}
            <path
              d="M 15 20 L 22 12 L 35 10 L 50 8 L 65 10 L 78 15 L 88 25 L 90 40 L 88 55 L 80 65 L 70 72 L 55 75 L 40 74 L 25 68 L 15 55 L 10 40 Z"
              fill="#dcfce7"
              stroke="#16a34a"
              strokeWidth="0.5"
              opacity="0.6"
              style={{ filter: "url(#shadow)" }}
            />

            {/* District grid lines (decorative) */}
            {[20, 35, 50, 65, 80].map((x) => (
              <line key={`v${x}`} x1={x} y1={10} x2={x} y2={75} stroke="#16a34a" strokeWidth="0.2" opacity="0.3" strokeDasharray="2,3" />
            ))}
            {[20, 30, 40, 55, 65].map((y) => (
              <line key={`h${y}`} x1={12} y1={y} x2={90} y2={y} stroke="#16a34a" strokeWidth="0.2" opacity="0.3" strokeDasharray="2,3" />
            ))}

            {/* City labels (background cities) */}
            {Object.entries(MP_CITIES).map(([city, pos]) => (
              <text
                key={city}
                x={pos.x}
                y={pos.y - 8}
                textAnchor="middle"
                fontSize="4.5"
                fill="#6b7280"
                opacity="0.5"
                style={{ pointerEvents: "none", userSelect: "none" }}
              >
                {pos.label}
              </text>
            ))}

            {/* State label */}
            <text x="50" y="40" textAnchor="middle" fontSize="8" fill="#16a34a" opacity="0.15" fontWeight="900" style={{ userSelect: "none" }}>
              MADHYA PRADESH
            </text>

            {/* Markers — offset same-city institutes */}
            {Object.entries(byCity).map(([city, insts]) => {
              const cityPos = MP_CITIES[city];
              if (!cityPos) return null;

              return insts.map((inst, idx) => {
                // Spread markers within same city
                const spread = insts.length > 1 ? (idx - (insts.length - 1) / 2) * 6 : 0;
                const pos = {
                  x: cityPos.x + spread,
                  y: cityPos.y + (idx % 2 === 0 ? 0 : 3),
                };

                return (
                  <MapMarker
                    key={inst.id}
                    institute={inst}
                    position={pos}
                    isSelected={inst.id === selectedId}
                    onClick={(e: any) => {
                      e?.stopPropagation?.();
                      setSelectedId(inst.id === selectedId ? null : inst.id);
                    }}
                  />
                );
              });
            })}
          </svg>

          {/* Legend */}
          <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-xl p-3 border border-gray-100 dark:border-gray-800 shadow-sm">
            <p className="text-xs font-bold text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wide">Legend</p>
            <div className="space-y-1.5">
              {mpData.types.filter((t) => t.id !== "all").map((t) => (
                <div key={t.id} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                  <span
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ background: TYPE_COLORS_MAP[t.id] ?? "#6b7280" }}
                  />
                  {t.label}
                </div>
              ))}
            </div>
            <div className="h-px bg-gray-100 dark:bg-gray-800 my-2" />
            <div className="space-y-1 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-brand-600 inline-block" />
                Larger = Higher tier
              </div>
            </div>
          </div>

          {/* Showing count */}
          <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-xl px-3 py-2 border border-gray-100 dark:border-gray-800 shadow-sm">
            <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">
              📍 {filtered.length} institutes shown
            </p>
          </div>

          {/* Info panel */}
          {selectedInst && (
            <InfoPanel
              institute={selectedInst}
              onClose={() => setSelectedId(null)}
            />
          )}

          {/* Click hint */}
          {!selectedId && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-gray-900/70 text-white text-xs px-4 py-2 rounded-full backdrop-blur-sm">
              Click any marker to see details
            </div>
          )}
        </div>

        {/* ── List Panel ── */}
        {showList && (
          <div className="w-80 bg-white dark:bg-gray-900 border-l border-gray-100 dark:border-gray-800 overflow-y-auto shrink-0">
            <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-4 py-3 z-10">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                {filtered.length} institutes
              </p>
            </div>
            <div className="divide-y divide-gray-50 dark:divide-gray-800">
              {filtered.map((inst) => (
                <button
                  key={inst.id}
                  onClick={() => setSelectedId(inst.id === selectedId ? null : inst.id)}
                  className={`w-full flex items-start gap-3 p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                    inst.id === selectedId ? "bg-brand-50 dark:bg-brand-950" : ""
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${inst.color} flex items-center justify-center text-lg shadow-sm shrink-0`}>
                    {inst.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold leading-snug truncate ${
                      inst.id === selectedId ? "text-brand-700 dark:text-brand-400" : "text-gray-800 dark:text-gray-200"
                    }`}>
                      {inst.name}
                    </p>
                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                      <MapPin size={9} /> {inst.city}
                      <span className="mx-1">·</span>
                      ⭐ {inst.rating}
                    </p>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">
                      {inst.avgPackage}
                    </p>
                  </div>
                  {inst.id === selectedId && (
                    <div className="w-2 h-2 rounded-full bg-brand-600 mt-1.5 shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}