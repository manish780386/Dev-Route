import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, TrendingUp, ExternalLink, ArrowRight, Building2, Briefcase } from "lucide-react";
import skillsData from "../../data/skills.json";

const demandClass: Record<string, string> = {
  "High":      "bg-blue-50 text-blue-700 border border-blue-200",
  "Very High": "bg-purple-50 text-purple-700 border border-purple-200",
  "Extreme":   "bg-orange-50 text-orange-700 border border-orange-200",
};

const demandEmoji: Record<string, string> = {
  "High":      "📈",
  "Very High": "🔥",
  "Extreme":   "⚡",
};

const ALL_CATS = ["All", ...skillsData.categories.map((c) => c.title)];

export default function SkillsPage() {
  const [query,  setQuery]  = useState("");
  const [catTab, setCatTab] = useState("All");

  const allSkills = useMemo(
    () => skillsData.categories.flatMap((c) => c.skills),
    []
  );

  const filtered = useMemo(() => {
    let list = catTab === "All"
      ? allSkills
      : skillsData.categories.find((c) => c.title === catTab)?.skills ?? [];

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.useCases.some((u) => u.toLowerCase().includes(q)) ||
          s.relatedSkills.some((r) => r.toLowerCase().includes(q))
      );
    }
    return list;
  }, [allSkills, catTab, query]);

  return (
    <div className="container-app py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="badge-animated mb-4">Tech Skills</div>
        <h1 className="section-title mb-3">Popular Skills & Technologies</h1>
        <p className="section-subtitle max-w-2xl">
          Explore the most in-demand programming languages, frameworks, databases, and tools —
          with salary data, job listings, top companies, and learning paths.
        </p>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Skills Tracked",    value: allSkills.length + "+",   color: "text-brand-600" },
          { label: "Extreme Demand",    value: allSkills.filter(s => s.demandLevel === "Extreme").length, color: "text-orange-600" },
          { label: "Categories",        value: skillsData.categories.length, color: "text-purple-600" },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white border border-gray-100 rounded-2xl p-4 text-center shadow-sm">
            <p className={`font-display font-extrabold text-2xl ${color}`}>{value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search skills, use cases, related technologies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full max-w-lg pl-10 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl
            focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400 transition-all shadow-sm"
        />
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {ALL_CATS.map((cat) => {
          const count = cat === "All" ? allSkills.length
            : skillsData.categories.find((c) => c.title === cat)?.skills.length ?? 0;
          return (
            <button
              key={cat}
              onClick={() => setCatTab(cat)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                catTab === cat
                  ? "bg-brand-600 text-white shadow-sm"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-brand-300 hover:text-brand-600"
              }`}
            >
              {cat}
              <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${
                catTab === cat ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Result count */}
      <p className="text-sm text-gray-500 mb-6">
        Showing <span className="font-semibold text-gray-800">{filtered.length}</span> skills
        {query && <> for "<span className="text-brand-600">{query}</span>"</>}
      </p>

      {/* Skills grid */}
      {filtered.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((skill) => (
            <div key={skill.id} className="card p-6 flex flex-col hover:-translate-y-1 transition-transform">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${skill.color} flex items-center justify-center text-2xl shadow-sm`}>
                  {skill.icon}
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${demandClass[skill.demandLevel]}`}>
                    {demandEmoji[skill.demandLevel]} {skill.demandLevel}
                  </span>
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{skill.category}</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="font-display font-bold text-gray-900 text-lg mb-1.5">{skill.title}</h2>
              <p className="text-sm text-gray-500 mb-4 leading-relaxed line-clamp-2">{skill.description}</p>

              {/* Salary */}
              <div className="flex items-center gap-1.5 text-sm text-emerald-600 font-semibold mb-3">
                <TrendingUp size={13} /> {skill.avgSalary}
              </div>

              {/* Job listings */}
              {"jobListings" in skill && (
                <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-4">
                  <Briefcase size={11} />
                  <span>{(skill as any).jobListings} active listings</span>
                </div>
              )}

              {/* Use cases */}
              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Use Cases</p>
                <div className="flex flex-wrap gap-1.5">
                  {skill.useCases.slice(0, 3).map((u) => (
                    <span key={u} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                      {u}
                    </span>
                  ))}
                  {skill.useCases.length > 3 && (
                    <span className="text-xs text-gray-400 self-center">+{skill.useCases.length - 3}</span>
                  )}
                </div>
              </div>

              {/* Learning path */}
              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Learning Path</p>
                <div className="flex flex-wrap gap-1.5">
                  {skill.learningPath.slice(0, 4).map((step, i) => (
                    <span key={step} className="flex items-center gap-1 text-xs bg-brand-50 text-brand-700 px-2.5 py-1 rounded-full">
                      <span className="w-3.5 h-3.5 rounded-full bg-brand-600 text-white text-[9px] flex items-center justify-center font-bold shrink-0">
                        {i + 1}
                      </span>
                      {step}
                    </span>
                  ))}
                </div>
              </div>

              {/* Related skills */}
              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Related</p>
                <div className="flex flex-wrap gap-1.5">
                  {skill.relatedSkills.slice(0, 4).map((r) => (
                    <span key={r} className="font-mono text-xs bg-gray-100 text-brand-700 px-1.5 py-0.5 rounded">
                      {r}
                    </span>
                  ))}
                </div>
              </div>

              {/* Top companies */}
              {"topCompanies" in skill && (
                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1">
                    <Building2 size={10} /> Top Companies
                  </p>
                  <p className="text-xs text-gray-500">
                    {(skill as any).topCompanies.slice(0, 4).join(", ")}
                    {(skill as any).topCompanies.length > 4 && ` +${(skill as any).topCompanies.length - 4} more`}
                  </p>
                </div>
              )}

              {/* Resources */}
              {skill.resources.length > 0 && (
                <div className="mt-auto border-t border-gray-50 pt-4 flex flex-wrap gap-2">
                  {skill.resources.map((res) => (
                    <a
                      key={res.title}
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-brand-600 hover:underline font-medium"
                    >
                      {res.title} <ExternalLink size={10} />
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-400">
          <div className="text-5xl mb-4">🔍</div>
          <p className="font-medium text-gray-600">No skills found</p>
          <p className="text-sm mt-1">Try a different search term or category</p>
        </div>
      )}

      {/* Bottom CTA */}
      <div className="mt-14 bg-brand-50 border border-brand-100 rounded-2xl p-7 text-center">
        <h2 className="font-display font-bold text-gray-900 text-xl mb-2">
          Not sure which skill to learn first?
        </h2>
        <p className="text-gray-500 text-sm mb-5 max-w-md mx-auto">
          Follow a structured roadmap that tells you exactly what to learn and in what order.
        </p>
        <Link to="/roadmaps" className="btn-primary">
          Explore Roadmaps <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}