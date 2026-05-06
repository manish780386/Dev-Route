import { Link } from "react-router-dom";
import { X, GitCompare, Plus } from "lucide-react";
import type { MPInstitute } from "./MPCollegeCard";

interface CollegeCompareBarProps {
  selected:  MPInstitute[];
  onRemove:  (id: string) => void;
  onClear:   () => void;
}

export default function CollegeCompareBar({
  selected,
  onRemove,
  onClear,
}: CollegeCompareBarProps) {
  if (selected.length === 0) return null;

  const canCompare = selected.length >= 2;

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-2xl">
      <div className="container-app py-3 flex items-center gap-4">
        {/* Label */}
        <div className="flex items-center gap-2 shrink-0">
          <GitCompare size={16} className="text-brand-600" />
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 hidden sm:block">
            Compare ({selected.length}/3)
          </span>
        </div>

        {/* Selected cards */}
        <div className="flex gap-2 flex-1 overflow-x-auto scrollbar-thin">
          {selected.map((inst) => (
            <div
              key={inst.id}
              className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-1.5 shrink-0"
            >
              <span className="text-sm">{inst.icon}</span>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300 max-w-[100px] truncate">
                {inst.shortName}
              </span>
              <button
                onClick={() => onRemove(inst.id)}
                className="text-gray-400 hover:text-red-500 transition-colors ml-1"
              >
                <X size={12} />
              </button>
            </div>
          ))}

          {/* Empty slot */}
          {selected.length < 3 && (
            <div className="flex items-center gap-1.5 border border-dashed border-gray-300 dark:border-gray-600 rounded-xl px-3 py-1.5 text-xs text-gray-400 shrink-0">
              <Plus size={12} /> Add more
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onClear}
            className="text-xs text-gray-400 hover:text-red-500 transition-colors hidden sm:block"
          >
            Clear
          </button>
          <Link
            to={`/mp-colleges/compare?ids=${selected.map((s) => s.id).join(",")}`}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              canCompare
                ? "bg-brand-600 text-white hover:bg-brand-700 shadow-sm shadow-brand-500/25"
                : "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
            }`}
            onClick={(e) => { if (!canCompare) e.preventDefault(); }}
          >
            <GitCompare size={14} />
            Compare {selected.length >= 2 ? `(${selected.length})` : "— Select 2+"}
          </Link>
        </div>
      </div>
    </div>
  );
}