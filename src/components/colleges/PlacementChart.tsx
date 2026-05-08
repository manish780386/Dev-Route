import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, BarChart, Bar
} from "recharts";
import { TrendingUp } from "lucide-react";

interface PlacementStat {
  year:            string;
  avgPackage:      number;
  highestPackage:  number;
  placementRate:   number;
  studentsPlaced:  number;
}

interface PlacementChartProps {
  stats:       PlacementStat[];
  collegeName: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-3 shadow-xl text-xs">
      <p className="font-bold text-gray-700 dark:text-gray-300 mb-2">Year {label}</p>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-gray-500">{p.name}:</span>
          <span className="font-semibold text-gray-800 dark:text-gray-200">
            {p.dataKey === "placementRate" ? `${p.value}%` :
             p.dataKey === "studentsPlaced" ? p.value :
             `₹${p.value} LPA`}
          </span>
        </div>
      ))}
    </div>
  );
};

export default function PlacementChart({ stats }: PlacementChartProps) {
  if (!stats || stats.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-400">
        <TrendingUp size={32} className="mb-3 opacity-30" />
        <p className="text-sm">No placement data available</p>
      </div>
    );
  }

  // Trend indicators
  const latest   = stats[stats.length - 1];
  const previous = stats[stats.length - 2];
  const pkgTrend = previous ? ((latest.avgPackage - previous.avgPackage) / previous.avgPackage * 100).toFixed(1) : null;
  const rateTrend= previous ? (latest.placementRate - previous.placementRate).toFixed(1) : null;

  return (
    <div className="space-y-6">
      {/* Trend cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-brand-50 dark:bg-brand-950 rounded-xl p-3 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">Avg Package ({latest.year})</p>
          <p className="font-display font-bold text-lg text-brand-600 dark:text-brand-400">
            ₹{latest.avgPackage} LPA
          </p>
          {pkgTrend && (
            <p className={`text-xs font-medium mt-0.5 ${Number(pkgTrend) >= 0 ? "text-emerald-600" : "text-red-500"}`}>
              {Number(pkgTrend) >= 0 ? "↑" : "↓"} {Math.abs(Number(pkgTrend))}% YoY
            </p>
          )}
        </div>
        <div className="bg-emerald-50 dark:bg-emerald-950 rounded-xl p-3 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">Placement Rate</p>
          <p className="font-display font-bold text-lg text-emerald-600 dark:text-emerald-400">
            {latest.placementRate}%
          </p>
          {rateTrend && (
            <p className={`text-xs font-medium mt-0.5 ${Number(rateTrend) >= 0 ? "text-emerald-600" : "text-red-500"}`}>
              {Number(rateTrend) >= 0 ? "↑" : "↓"} {Math.abs(Number(rateTrend))}% YoY
            </p>
          )}
        </div>
        <div className="bg-purple-50 dark:bg-purple-950 rounded-xl p-3 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">Highest Package</p>
          <p className="font-display font-bold text-lg text-purple-600 dark:text-purple-400">
            ₹{latest.highestPackage} LPA
          </p>
        </div>
      </div>

      {/* Package trend chart */}
      <div>
        <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">
          Package Trend (LPA)
        </h4>
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={stats} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="avgGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#0062f5" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#0062f5" stopOpacity={0}    />
              </linearGradient>
              <linearGradient id="highGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#8b5cf6" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}    />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="year" tick={{ fontSize: 11, fill: "#9ca3af" }} />
            <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Area
              type="monotone" dataKey="avgPackage" name="Avg Package"
              stroke="#0062f5" strokeWidth={2}
              fill="url(#avgGrad)" dot={{ r: 3, fill: "#0062f5" }}
            />
            <Area
              type="monotone" dataKey="highestPackage" name="Highest Package"
              stroke="#8b5cf6" strokeWidth={2}
              fill="url(#highGrad)" dot={{ r: 3, fill: "#8b5cf6" }} strokeDasharray="4 2"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Placement rate + students chart */}
      <div>
        <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">
          Students Placed & Rate
        </h4>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={stats} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="year" tick={{ fontSize: 11, fill: "#9ca3af" }} />
            <YAxis yAxisId="left"  tick={{ fontSize: 11, fill: "#9ca3af" }} />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: "#9ca3af" }} domain={[0, 100]} unit="%" />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar yAxisId="left"  dataKey="studentsPlaced" name="Students Placed" fill="#10b981" radius={[4,4,0,0]} opacity={0.85} />
            <Bar yAxisId="right" dataKey="placementRate"  name="Rate"            fill="#f59e0b" radius={[4,4,0,0]} opacity={0.85} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}