import { useSearchParams, Link, Navigate } from "react-router-dom";
import {
  ArrowLeft, CheckCircle2, XCircle, Minus,
  TrendingUp, Home, Star, GraduationCap
} from "lucide-react";
import mpData from "../../data/mp-colleges.json";
import type { MPInstitute } from "../../components/colleges/MPCollegeCard";

// ── Helpers ───────────────────────────────────────────────────────────────────

function Cell({ children, highlight = false }: { children: React.ReactNode; highlight?: boolean }) {
  return (
    <td className={`p-4 text-sm text-center align-top border-b border-gray-100 dark:border-gray-800 ${
      highlight ? "bg-brand-50 dark:bg-brand-950" : ""
    }`}>
      {children}
    </td>
  );
}

function RowLabel({ children }: { children: React.ReactNode }) {
  return (
    <td className="p-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide whitespace-nowrap bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 sticky left-0 z-10 min-w-[140px]">
      {children}
    </td>
  );
}

function BoolCell({ value }: { value: boolean }) {
  return value
    ? <CheckCircle2 size={16} className="text-emerald-500 mx-auto" />
    : <XCircle      size={16} className="text-gray-300 dark:text-gray-600 mx-auto" />;
}

function RatingBar({ value }: { value: number }) {
  const pct   = (value / 5) * 100;
  const color =
    value >= 4.5 ? "bg-emerald-500" :
    value >= 4.0 ? "bg-brand-500"   :
    value >= 3.5 ? "bg-amber-500"   : "bg-red-400";
  return (
    <div className="flex items-center gap-2 justify-center">
      <div className="w-20 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div className={`h-1.5 ${color} rounded-full`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{value.toFixed(1)}</span>
    </div>
  );
}

// Determine which is "best" in a column for numeric values
function getBest(institutes: MPInstitute[], getValue: (i: MPInstitute) => number, higher = true): string {
  if (institutes.length === 0) return "";
  let best = institutes[0];
  for (const inst of institutes) {
    const a = getValue(inst);
    const b = getValue(best);
    if (higher ? a > b : a < b) best = inst;
  }
  return best.id;
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function MPCollegeCompare() {
  const [searchParams] = useSearchParams();
  const ids = (searchParams.get("ids") ?? "").split(",").filter(Boolean);

  if (ids.length < 2) return <Navigate to="/mp-colleges" replace />;

  const institutes = ids
    .map((id) => (mpData.institutes as unknown as MPInstitute[]).find((i) => i.id === id))
    .filter(Boolean) as MPInstitute[];

  if (institutes.length < 2) return <Navigate to="/mp-colleges" replace />;

  const bestRating  = getBest(institutes, (i) => i.rating);
  const bestFees    = getBest(institutes, (i) => i.feesPerYear, false);
  const bestPackage = getBest(institutes, (i) => parseFloat(i.avgPackage.replace(/[^0-9.]/g, "")) || 0);
  const bestPlacement = getBest(institutes, (i) => i.placementRate);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-600 to-brand-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="container-app py-10 relative">
          <Link
            to="/mp-colleges"
            className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm mb-5 transition-colors"
          >
            <ArrowLeft size={14} /> Back to MP Colleges
          </Link>
          <h1 className="font-display font-extrabold text-white text-3xl mb-2">
            Side-by-Side Comparison
          </h1>
          <p className="text-brand-200">
            Comparing {institutes.length} institutes · {institutes.map((i) => i.shortName).join(" vs ")}
          </p>
        </div>
      </div>

      <div className="container-app py-8">
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr>
                  <th className="p-4 bg-gray-50 dark:bg-gray-900 sticky left-0 z-10 min-w-[140px]" />
                  {institutes.map((inst) => (
                    <th key={inst.id} className="p-4 border-b border-gray-100 dark:border-gray-800">
                      <div className="flex flex-col items-center gap-2">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${inst.color} flex items-center justify-center text-2xl shadow-sm`}>
                          {inst.icon}
                        </div>
                        <Link
                          to={`/mp-colleges/${inst.id}`}
                          className="font-display font-bold text-gray-900 dark:text-white text-sm text-center hover:text-brand-600 transition-colors leading-snug"
                        >
                          {inst.name}
                        </Link>
                        <span className="text-xs text-gray-400 font-mono">{inst.shortName}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {/* ── Basic Info ── */}
                <tr className="bg-gray-50 dark:bg-gray-900">
                  <td colSpan={institutes.length + 1} className="px-4 py-2 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                    Basic Information
                  </td>
                </tr>

                <tr>
                  <RowLabel>City</RowLabel>
                  {institutes.map((i) => <Cell key={i.id}>{i.city}</Cell>)}
                </tr>
                <tr>
                  <RowLabel>Type</RowLabel>
                  {institutes.map((i) => (
                    <Cell key={i.id}>
                      <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-full">
                        {mpData.types.find((t) => t.id === i.type)?.label ?? i.type}
                      </span>
                    </Cell>
                  ))}
                </tr>
                <tr>
                  <RowLabel>Tier</RowLabel>
                  {institutes.map((i) => (
                    <Cell key={i.id}>
                      <span className="text-xs bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400 px-2 py-0.5 rounded-full">
                        {mpData.tiers.find((t) => t.id === i.tier)?.label ?? i.tier}
                      </span>
                    </Cell>
                  ))}
                </tr>
                <tr>
                  <RowLabel>Established</RowLabel>
                  {institutes.map((i) => <Cell key={i.id}>{i.established}</Cell>)}
                </tr>
                <tr>
                  <RowLabel>Affiliation</RowLabel>
                  {institutes.map((i) => <Cell key={i.id}><span className="text-xs">{i.affiliation}</span></Cell>)}
                </tr>

                {/* ── Rankings ── */}
                <tr className="bg-gray-50 dark:bg-gray-900">
                  <td colSpan={institutes.length + 1} className="px-4 py-2 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                    Rankings
                  </td>
                </tr>

                <tr>
                  <RowLabel>NIRF Rank</RowLabel>
                  {institutes.map((i) => (
                    <Cell key={i.id}>
                      {i.ranking.nirf
                        ? <span className="font-bold text-amber-600 dark:text-amber-400">#{i.ranking.nirf}</span>
                        : <Minus size={14} className="text-gray-300 mx-auto" />
                      }
                    </Cell>
                  ))}
                </tr>
                <tr>
                  <RowLabel>MP Rank</RowLabel>
                  {institutes.map((i) => (
                    <Cell key={i.id}>
                      {i.ranking.mpRank !== null
                        ? <span className="font-bold text-emerald-600 dark:text-emerald-400">
                            {i.ranking.mpRank === 0 ? "#1 (IIT)" : `#${i.ranking.mpRank}`}
                          </span>
                        : <Minus size={14} className="text-gray-300 mx-auto" />
                      }
                    </Cell>
                  ))}
                </tr>

                {/* ── Fees ── */}
                <tr className="bg-gray-50 dark:bg-gray-900">
                  <td colSpan={institutes.length + 1} className="px-4 py-2 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                    Fees & Finance
                  </td>
                </tr>

                <tr>
                  <RowLabel>Fees/Year</RowLabel>
                  {institutes.map((i) => (
                    <Cell key={i.id} highlight={i.id === bestFees}>
                      <span className={`font-bold ${i.id === bestFees ? "text-emerald-600 dark:text-emerald-400" : "text-gray-800 dark:text-gray-200"}`}>
                        {i.fees}
                      </span>
                      {i.id === bestFees && <p className="text-xs text-emerald-500 mt-0.5">✓ Lowest</p>}
                    </Cell>
                  ))}
                </tr>
                <tr>
                  <RowLabel>Hostel</RowLabel>
                  {institutes.map((i) => (
                    <Cell key={i.id}>
                      <BoolCell value={i.hostelAvailable} />
                      {i.hostelAvailable && <p className="text-xs text-gray-400 mt-1">{i.hostelFees}</p>}
                    </Cell>
                  ))}
                </tr>
                <tr>
                  <RowLabel>Scholarships</RowLabel>
                  {institutes.map((i) => <Cell key={i.id}>{i.scholarships.length > 0 ? `${i.scholarships.length} available` : "—"}</Cell>)}
                </tr>

                {/* ── Placements ── */}
                <tr className="bg-gray-50 dark:bg-gray-900">
                  <td colSpan={institutes.length + 1} className="px-4 py-2 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                    Placements
                  </td>
                </tr>

                <tr>
                  <RowLabel>Avg Package</RowLabel>
                  {institutes.map((i) => (
                    <Cell key={i.id} highlight={i.id === bestPackage}>
                      <span className={`font-bold text-sm ${i.id === bestPackage ? "text-brand-600 dark:text-brand-400" : "text-gray-800 dark:text-gray-200"}`}>
                        {i.avgPackage}
                      </span>
                      {i.id === bestPackage && <p className="text-xs text-brand-500 mt-0.5">✓ Highest</p>}
                    </Cell>
                  ))}
                </tr>
                <tr>
                  <RowLabel>Highest Package</RowLabel>
                  {institutes.map((i) => <Cell key={i.id}><span className="font-semibold text-purple-600 dark:text-purple-400">{i.highestPackage}</span></Cell>)}
                </tr>
                <tr>
                  <RowLabel>Median Package</RowLabel>
                  {institutes.map((i) => <Cell key={i.id}>{i.medianPackage}</Cell>)}
                </tr>
                <tr>
                  <RowLabel>Placement Rate</RowLabel>
                  {institutes.map((i) => (
                    <Cell key={i.id} highlight={i.id === bestPlacement && i.placementRate > 0}>
                      {i.placementRate > 0
                        ? <>
                            <span className={`font-bold text-sm ${i.id === bestPlacement ? "text-emerald-600 dark:text-emerald-400" : "text-gray-800 dark:text-gray-200"}`}>
                              {i.placementRate}%
                            </span>
                            {i.id === bestPlacement && <p className="text-xs text-emerald-500 mt-0.5">✓ Best</p>}
                          </>
                        : <Minus size={14} className="text-gray-300 mx-auto" />
                      }
                    </Cell>
                  ))}
                </tr>

                {/* ── Ratings ── */}
                <tr className="bg-gray-50 dark:bg-gray-900">
                  <td colSpan={institutes.length + 1} className="px-4 py-2 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                    Ratings
                  </td>
                </tr>

                <tr>
                  <RowLabel>Overall</RowLabel>
                  {institutes.map((i) => (
                    <Cell key={i.id} highlight={i.id === bestRating}>
                      <RatingBar value={i.rating} />
                      {i.id === bestRating && <p className="text-xs text-amber-500 mt-0.5">✓ Highest rated</p>}
                    </Cell>
                  ))}
                </tr>
                <tr>
                  <RowLabel>Placements</RowLabel>
                  {institutes.map((i) => <Cell key={i.id}><RatingBar value={i.ratingBreakdown.placements} /></Cell>)}
                </tr>
                <tr>
                  <RowLabel>Faculty</RowLabel>
                  {institutes.map((i) => <Cell key={i.id}><RatingBar value={i.ratingBreakdown.faculty} /></Cell>)}
                </tr>
                <tr>
                  <RowLabel>Infrastructure</RowLabel>
                  {institutes.map((i) => <Cell key={i.id}><RatingBar value={i.ratingBreakdown.infrastructure} /></Cell>)}
                </tr>
                <tr>
                  <RowLabel>Value for Money</RowLabel>
                  {institutes.map((i) => <Cell key={i.id}><RatingBar value={i.ratingBreakdown.valueForMoney} /></Cell>)}
                </tr>
                <tr>
                  <RowLabel>Campus Life</RowLabel>
                  {institutes.map((i) => <Cell key={i.id}><RatingBar value={i.ratingBreakdown.campusLife} /></Cell>)}
                </tr>

                {/* ── Admission ── */}
                <tr className="bg-gray-50 dark:bg-gray-900">
                  <td colSpan={institutes.length + 1} className="px-4 py-2 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                    Admission
                  </td>
                </tr>

                <tr>
                  <RowLabel>Process</RowLabel>
                  {institutes.map((i) => <Cell key={i.id}><span className="text-xs">{i.admissionProcess}</span></Cell>)}
                </tr>
                <tr>
                  <RowLabel>Courses</RowLabel>
                  {institutes.map((i) => <Cell key={i.id}>{i.courses.length} programs</Cell>)}
                </tr>
                <tr>
                  <RowLabel>Approvals</RowLabel>
                  {institutes.map((i) => (
                    <Cell key={i.id}>
                      <div className="flex flex-wrap gap-1 justify-center">
                        {i.approvedBy.map((a) => (
                          <span key={a} className="text-xs bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 px-1.5 py-0.5 rounded">
                            {a}
                          </span>
                        ))}
                      </div>
                    </Cell>
                  ))}
                </tr>

                {/* ── CTA row ── */}
                <tr>
                  <RowLabel />
                  {institutes.map((i) => (
                    <td key={i.id} className="p-4 text-center">
                      <Link
                        to={`/mp-colleges/${i.id}`}
                        className="btn-primary text-xs py-2 px-4 inline-flex"
                      >
                        View Full Profile →
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Back button */}
        <div className="mt-8 text-center">
          <Link to="/mp-colleges" className="btn-ghost border border-gray-200 dark:border-gray-700">
            <ArrowLeft size={15} /> Back to MP Colleges
          </Link>
        </div>
      </div>
    </div>
  );
}