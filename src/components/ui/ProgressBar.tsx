interface ProgressBarProps {
  value:      number; // 0-100
  max?:       number;
  label?:     string;
  showValue?: boolean;
  color?:     "brand" | "emerald" | "amber" | "red" | "purple";
  size?:      "sm" | "md" | "lg";
}

const colorClass = {
  brand:   "bg-brand-500",
  emerald: "bg-emerald-500",
  amber:   "bg-amber-500",
  red:     "bg-red-500",
  purple:  "bg-purple-500",
};

const sizeClass = {
  sm: "h-1",
  md: "h-2",
  lg: "h-3",
};

export function ProgressBar({
  value,
  max        = 100,
  label,
  showValue  = false,
  color      = "brand",
  size       = "md",
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1.5">
          {label    && <span className="text-xs text-gray-500">{label}</span>}
          {showValue && <span className="text-xs font-semibold text-gray-700">{Math.round(pct)}%</span>}
        </div>
      )}
      <div className={`w-full bg-gray-100 rounded-full overflow-hidden ${sizeClass[size]}`}>
        <div
          className={`${sizeClass[size]} ${colorClass[color]} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}