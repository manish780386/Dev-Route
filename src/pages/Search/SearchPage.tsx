import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { BookOpen, Map, Brain, Zap, ArrowRight } from "lucide-react";
import { useSearch } from "../../hooks/useSearch";
import { SearchBar } from "../../components/shared/SearchBar";
import type { SearchResultType } from "../../types";

const typeConfig: Record<SearchResultType, {
  label: string;
  icon:  typeof BookOpen;
  color: string;
  bg:    string;
}> = {
  course:  { label: "Course",   icon: BookOpen, color: "text-blue-600",   bg: "bg-blue-50 border-blue-100"    },
  roadmap: { label: "Roadmap",  icon: Map,      color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-100" },
  subject: { label: "CS Subject", icon: Brain,  color: "text-purple-600", bg: "bg-purple-50 border-purple-100"  },
  skill:   { label: "Skill",    icon: Zap,      color: "text-orange-600",  bg: "bg-orange-50 border-orange-100"  },
};

const TYPE_FILTERS: { id: string; label: string }[] = [
  { id: "all",     label: "All"        },
  { id: "course",  label: "Courses"    },
  { id: "roadmap", label: "Roadmaps"   },
  { id: "subject", label: "CS Subjects"},
  { id: "skill",   label: "Skills"     },
];

const POPULAR = [
  { label: "React",          q: "React"         },
  { label: "DSA",            q: "Data Structures"},
  { label: "System Design",  q: "System Design" },
  { label: "Python",         q: "Python"        },
  { label: "Docker",         q: "Docker"        },
  { label: "ML Roadmap",     q: "Machine Learning Roadmap" },
  { label: "SQL",            q: "SQL"           },
  { label: "TypeScript",     q: "TypeScript"    },
];

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQ                         = searchParams.get("q") ?? "";
  const [query,  setQuery]               = useState(initialQ);
  const [filter, setFilter]              = useState("all");
  const allResults                        = useSearch(query);

  // Sync URL param → local state
  useEffect(() => {
    const q = searchParams.get("q") ?? "";
    setQuery(q);
  }, [searchParams]);

  const filtered =
    filter === "all"
      ? allResults
      : allResults.filter((r) => r.type === filter);

  const handleSearch = (q: string) => {
    setQuery(q);
    if (q) setSearchParams({ q });
    else setSearchParams({});
  };

  return (
    <div className="container-app py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="badge-animated mb-4">Search</div>
        <h1 className="section-title mb-6">Find anything on DevRoute</h1>

        {/* Big search bar */}
        <SearchBar
          placeholder="Search courses, roadmaps, topics, skills, Q&A..."
          className="max-w-2xl"
          autoFocus={!initialQ}
        />
      </div>

      {query ? (
        <>
          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {TYPE_FILTERS.map((f) => {
              const count =
                f.id === "all"
                  ? allResults.length
                  : allResults.filter((r) => r.type === f.id).length;
              return (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    filter === f.id
                      ? "bg-brand-600 text-white shadow-sm"
                      : "bg-white border border-gray-200 text-gray-600 hover:border-brand-300 hover:text-brand-600"
                  }`}
                >
                  {f.label}
                  <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${
                    filter === f.id ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Result count */}
          <p className="text-sm text-gray-500 mb-6">
            {filtered.length > 0
              ? <>Found <span className="font-semibold text-gray-800">{filtered.length}</span> results for "<span className="text-brand-600">{query}</span>"</>
              : <>No results for "<span className="text-brand-600">{query}</span>"</>
            }
          </p>

          {/* Results */}
          {filtered.length > 0 ? (
            <div className="space-y-3">
              {filtered.map((result) => {
                const cfg  = typeConfig[result.type];
                const Icon = cfg.icon;
                return (
                  <Link
                    key={result.id}
                    to={result.url}
                    className="flex items-start gap-4 p-4 bg-white border border-gray-100 rounded-2xl hover:border-brand-200 hover:shadow-sm transition-all group"
                  >
                    <span className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${cfg.bg}`}>
                      <Icon size={16} className={cfg.color} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="font-medium text-gray-800 group-hover:text-brand-600 transition-colors leading-snug">
                          {result.title}
                        </p>
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${cfg.bg} ${cfg.color} shrink-0`}>
                          {cfg.label}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">
                        {result.description}
                      </p>
                    </div>
                    <ArrowRight
                      size={15}
                      className="text-gray-300 group-hover:text-brand-500 shrink-0 mt-1 transition-colors"
                    />
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">🔍</div>
              <p className="font-medium text-gray-600 mb-1">No results found</p>
              <p className="text-sm text-gray-400">Try broader terms — e.g. "React" instead of "React hooks tutorial"</p>
            </div>
          )}
        </>
      ) : (
        /* Empty state — popular searches */
        <div>
          <h2 className="font-display font-semibold text-gray-700 text-sm uppercase tracking-wide mb-4">
            Popular searches
          </h2>
          <div className="flex flex-wrap gap-2 mb-12">
            {POPULAR.map(({ label, q }) => (
              <button
                key={label}
                onClick={() => handleSearch(q)}
                className="px-4 py-2 text-sm bg-white border border-gray-200 text-gray-700 rounded-xl hover:border-brand-300 hover:text-brand-600 transition-colors"
              >
                {label}
              </button>
            ))}
          </div>

          {/* Browse sections */}
          <h2 className="font-display font-semibold text-gray-700 text-sm uppercase tracking-wide mb-4">
            Browse by section
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(typeConfig).map(([type, cfg]) => {
              const Icon  = cfg.icon;
              const paths: Record<string, string> = {
                course:  "/courses",
                roadmap: "/roadmaps",
                subject: "/cs-subjects",
                skill:   "/skills",
              };
              return (
                <Link
                  key={type}
                  to={paths[type]}
                  className={`flex items-center gap-3 p-4 rounded-2xl border transition-all hover:-translate-y-0.5 hover:shadow-sm ${cfg.bg}`}
                >
                  <Icon size={20} className={cfg.color} />
                  <span className={`font-medium text-sm ${cfg.color}`}>{cfg.label}s</span>
                  <ArrowRight size={13} className={`ml-auto ${cfg.color} opacity-60`} />
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}