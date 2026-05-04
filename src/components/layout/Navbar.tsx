import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  Menu, X, Code2, Sun, Moon, GraduationCap,
  MapPin, ChevronDown, BookOpen, Map, Brain,
  Calculator, Zap, Trophy, Briefcase
} from "lucide-react";
import { SearchBar } from "../shared/SearchBar";
import { useDarkMode } from "../../hooks/useDarkMode";

// ── Mega menu sections ────────────────────────────────────────────────────────

const LEARN_ITEMS = [
  { to: "/courses",              icon: BookOpen,      label: "Courses",        desc: "9 career paths"          },
  { to: "/roadmaps",             icon: Map,           label: "Roadmaps",       desc: "Step-by-step guides"      },
  { to: "/cs-subjects",         icon: Brain,         label: "CS Subjects",    desc: "DSA, OS, DBMS & more"    },
  { to: "/skills",               icon: Zap,           label: "Skills",         desc: "27+ tech skills"         },
];

const PRACTICE_ITEMS = [
  { to: "/aptitude",             icon: Calculator,    label: "Aptitude",       desc: "Quant, Logical, Verbal"  },
  { to: "/quiz",                 icon: Trophy,        label: "Mock Quiz 🎯",   desc: "Timed placement test"     },
  { to: "/placement",            icon: Briefcase,     label: "Placement",      desc: "Resume & interview prep"  },
];

const navLinks = [
  { to: "/courses",     label: "Courses"     },
  { to: "/roadmaps",    label: "Roadmaps"    },
  { to: "/cs-subjects", label: "CS Subjects" },
  { to: "/aptitude",    label: "Aptitude"    },
  { to: "/skills",      label: "Skills"      },
  { to: "/quiz",        label: "Quiz 🎯"     },
  { to: "/placement",   label: "Placement"   },
];

// ── Dropdown wrapper ──────────────────────────────────────────────────────────

function NavDropdown({
  label,
  children,
}: {
  label: React.ReactNode;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref             = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400
          hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        {label}
        <ChevronDown size={13} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-xl z-50 overflow-hidden py-2">
          {children}
        </div>
      )}
    </div>
  );
}

function DropdownItem({
  to,
  icon: Icon,
  label,
  desc,
  onClick,
}: {
  to: string;
  icon: React.ElementType;
  label: string;
  desc: string;
  onClick?: () => void;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
    >
      <span className="w-8 h-8 rounded-lg bg-brand-50 dark:bg-brand-950 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-brand-100 dark:group-hover:bg-brand-900 transition-colors">
        <Icon size={15} className="text-brand-600 dark:text-brand-400" />
      </span>
      <div>
        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors leading-snug">
          {label}
        </p>
        <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
      </div>
    </Link>
  );
}

// ── Main Navbar ───────────────────────────────────────────────────────────────

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled,   setScrolled]   = useState(false);
  const location                    = useLocation();
  const { dark, toggle }            = useDarkMode();

  useEffect(() => { setMobileOpen(false); }, [location]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="container-app h-16 flex items-center gap-2">
        {/* ── Logo ── */}
        <Link
          to="/"
          className="flex items-center gap-2 font-display font-bold text-xl text-gray-900 dark:text-white shrink-0 mr-2"
        >
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-600 to-cyan-500 flex items-center justify-center shadow-sm">
            <Code2 size={16} className="text-white" strokeWidth={2.5} />
          </span>
          Dev<span className="text-brand-600">Route</span>
        </Link>

        {/* ── Desktop Nav ── */}
        <div className="hidden lg:flex items-center gap-0.5 flex-1">
          {/* Learn dropdown */}
          <NavDropdown label="Learn">
            <div className="px-3 py-1.5">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Learn</p>
            </div>
            {LEARN_ITEMS.map((item) => (
              <DropdownItem key={item.to} {...item} />
            ))}
          </NavDropdown>

          {/* Practice dropdown */}
          <NavDropdown label="Practice">
            <div className="px-3 py-1.5">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Practice</p>
            </div>
            {PRACTICE_ITEMS.map((item) => (
              <DropdownItem key={item.to} {...item} />
            ))}
          </NavDropdown>

          {/* Find Colleges — highlighted link */}
          <NavLink
            to="/colleges"
            className={({ isActive }) =>
              `flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                isActive
                  ? "bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400"
                  : "text-emerald-600 dark:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950"
              }`
            }
          >
            <GraduationCap size={15} />
            Find Colleges
          </NavLink>

          {/* Direct links */}
          {[
            { to: "/roadmaps",  label: "Roadmaps"  },
            { to: "/placement", label: "Placement"  },
          ].map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  isActive
                    ? "bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-400"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* ── Right side ── */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Search */}
          <div className="hidden md:block w-44 lg:w-56">
            <SearchBar placeholder="Search..." />
          </div>

          {/* Dark mode toggle */}
          <button
            onClick={toggle}
            className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle dark mode"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Colleges CTA — desktop */}
          <Link
            to="/colleges"
            className="hidden lg:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-colors shadow-sm"
          >
            <MapPin size={13} /> Find Near Me
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* ── Mobile menu ── */}
      {mobileOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 shadow-lg max-h-[85vh] overflow-y-auto">
          <div className="container-app py-3 flex flex-col gap-1">
            {/* Search */}
            <div className="px-1 py-2">
              <SearchBar placeholder="Search courses, topics..." autoFocus />
            </div>

            <div className="h-px bg-gray-100 dark:bg-gray-800 my-1" />

            {/* Find Colleges — highlighted */}
            <Link
              to="/colleges"
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-semibold text-sm"
            >
              <GraduationCap size={16} /> Find Colleges & Institutes
              <span className="ml-auto text-xs bg-emerald-600 text-white px-2 py-0.5 rounded-full">NEW</span>
            </Link>

            <div className="h-px bg-gray-100 dark:bg-gray-800 my-1" />

            {/* Section: Learn */}
            <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mt-1">Learn</p>
            {LEARN_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`
                }
              >
                <item.icon size={15} className="text-gray-400" />
                {item.label}
              </NavLink>
            ))}

            <div className="h-px bg-gray-100 dark:bg-gray-800 my-1" />

            {/* Section: Practice */}
            <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mt-1">Practice</p>
            {PRACTICE_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`
                }
              >
                <item.icon size={15} className="text-gray-400" />
                {item.label}
              </NavLink>
            ))}

            <div className="h-px bg-gray-100 dark:bg-gray-800 my-1" />

            {/* Roadmaps + Placement */}
            {[
              { to: "/roadmaps",  label: "Roadmaps"  },
              { to: "/placement", label: "Placement"  },
            ].map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}