import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, BookOpen, Map, Brain, Zap } from "lucide-react";
import { useGlobalSearch } from "../../hooks/useSearch";
import type { SearchResultType } from "../../types";

const typeConfig: Record<SearchResultType, { label: string; icon: typeof BookOpen; color: string }> = {
  course:  { label: "Course",   icon: BookOpen, color: "text-blue-500 bg-blue-50"    },
  roadmap: { label: "Roadmap",  icon: Map,      color: "text-emerald-500 bg-emerald-50" },
  subject: { label: "Subject",  icon: Brain,    color: "text-purple-500 bg-purple-50"  },
  skill:   { label: "Skill",    icon: Zap,      color: "text-orange-500 bg-orange-50"  },
};

interface SearchBarProps {
  placeholder?: string;
  className?:   string;
  autoFocus?:   boolean;
}

export function SearchBar({
  placeholder = "Search courses, topics, skills...",
  className   = "",
  autoFocus   = false,
}: SearchBarProps) {
  const [query,  setQuery]  = useState("");
  const [open,   setOpen]   = useState(false);
  const inputRef            = useRef<HTMLInputElement>(null);
  const containerRef        = useRef<HTMLDivElement>(null);
  const navigate            = useNavigate();
  const results             = useGlobalSearch(query, 8);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Global ⌘K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      }
      if (e.key === "Escape") {
        setOpen(false);
        inputRef.current?.blur();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const handleSelect = (url: string) => {
    navigate(url);
    setQuery("");
    setOpen(false);
    inputRef.current?.blur();
  };

  const handleClear = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Input */}
      <div className="relative">
        <Search
          size={15}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        />
        <input
          ref={inputRef}
          autoFocus={autoFocus}
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-3 text-sm bg-white border border-gray-200 rounded-xl
            focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400
            transition-all shadow-sm"
        />
        {query ? (
          <button
            onClick={handleClear}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={14} />
          </button>
        ) : (
          <kbd className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-gray-300 font-mono bg-gray-50 border border-gray-100 rounded px-1 hidden sm:block">
            ⌘K
          </kbd>
        )}
      </div>

      {/* Dropdown */}
      {open && query.length >= 2 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 overflow-hidden">
          {results.length > 0 ? (
            <>
              <div className="px-4 pt-3 pb-1.5">
                <p className="text-xs text-gray-400 font-medium">
                  {results.length} results for "{query}"
                </p>
              </div>
              <ul className="max-h-80 overflow-y-auto scrollbar-thin pb-2">
                {results.map((result) => {
                  const cfg    = typeConfig[result.type];
                  const Icon   = cfg.icon;
                  return (
                    <li key={result.id}>
                      <button
                        onMouseDown={() => handleSelect(result.url)}
                        className="w-full flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                      >
                        <span className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${cfg.color}`}>
                          <Icon size={13} />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-800 truncate leading-snug">
                            {result.title}
                          </p>
                          <p className="text-xs text-gray-400 truncate mt-0.5 leading-snug">
                            {result.description}
                          </p>
                        </div>
                        <span className="text-xs text-gray-300 shrink-0 mt-0.5 capitalize">
                          {cfg.label}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
              <div className="border-t border-gray-50 px-4 py-2.5">
                <button
                  onMouseDown={() => { navigate(`/search?q=${encodeURIComponent(query)}`); setOpen(false); }}
                  className="text-xs text-brand-600 hover:underline font-medium"
                >
                  View all results for "{query}" →
                </button>
              </div>
            </>
          ) : (
            <div className="px-4 py-8 text-center">
              <p className="text-sm text-gray-500">No results found for "{query}"</p>
              <p className="text-xs text-gray-400 mt-1">Try different keywords</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}