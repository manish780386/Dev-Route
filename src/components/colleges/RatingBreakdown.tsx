interface RatingBreakdownProps {
  overall:    number;
  breakdown: {
    placements:     number;
    faculty:        number;
    infrastructure: number;
    valueForMoney:  number;
    campusLife:     number;
  };
  reviewCount: number;
}

function RatingBar({ label, value }: { label: string; value: number }) {
  const pct = (value / 5) * 100;
  const color =
    value >= 4.5 ? "bg-emerald-500" :
    value >= 4.0 ? "bg-brand-500"   :
    value >= 3.5 ? "bg-amber-500"   : "bg-red-400";

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-gray-500 dark:text-gray-400 w-28 shrink-0">{label}</span>
      <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
        <div
          className={`h-2 ${color} rounded-full transition-all duration-700`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs font-bold text-gray-700 dark:text-gray-300 w-8 text-right">
        {value.toFixed(1)}
      </span>
    </div>
  );
}

function StarDisplay({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= Math.floor(rating);
        const half   = !filled && star === Math.ceil(rating) && rating % 1 >= 0.5;
        return (
          <svg key={star} className={`w-5 h-5 ${filled || half ? "text-amber-400" : "text-gray-200"} fill-current`} viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      })}
    </div>
  );
}

export default function RatingBreakdown({ overall, breakdown, reviewCount }: RatingBreakdownProps) {
  const { placements, faculty, infrastructure, valueForMoney, campusLife } = breakdown;

  // Rating distribution (mock based on overall)
  const distribution = [
    { stars: 5, pct: Math.round((overall - 3) * 40) },
    { stars: 4, pct: Math.round((5 - overall) * 25 + 15) },
    { stars: 3, pct: Math.round((5 - overall) * 12) },
    { stars: 2, pct: Math.round((5 - overall) * 5)  },
    { stars: 1, pct: Math.round((5 - overall) * 3)  },
  ];

  return (
    <div className="space-y-6">
      {/* Overall score */}
      <div className="flex items-center gap-6">
        <div className="text-center">
          <p className="font-display font-extrabold text-5xl text-gray-900 dark:text-white leading-none">
            {overall.toFixed(1)}
          </p>
          <StarDisplay rating={overall} />
          <p className="text-xs text-gray-400 mt-1">{reviewCount.toLocaleString()} reviews</p>
        </div>

        {/* Distribution bars */}
        <div className="flex-1 space-y-1.5">
          {distribution.map(({ stars, pct }) => (
            <div key={stars} className="flex items-center gap-2">
              <span className="text-xs text-gray-400 w-4">{stars}</span>
              <svg className="w-3 h-3 text-amber-400 fill-current shrink-0" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <div className="flex-1 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div className="h-1.5 bg-amber-400 rounded-full" style={{ width: `${Math.max(pct, 2)}%` }} />
              </div>
              <span className="text-xs text-gray-400 w-7 text-right">{pct}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Category breakdown */}
      <div className="space-y-3">
        <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          Category Ratings
        </h4>
        <RatingBar label="Placements"      value={placements}     />
        <RatingBar label="Faculty"         value={faculty}        />
        <RatingBar label="Infrastructure"  value={infrastructure} />
        <RatingBar label="Value for Money" value={valueForMoney}  />
        <RatingBar label="Campus Life"     value={campusLife}     />
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-gray-400 dark:text-gray-500 italic">
        * Ratings aggregated from student reviews on various platforms. Actual experience may vary.
      </p>
    </div>
  );
}