import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Code2, Sun, Moon } from "lucide-react";
import { SearchBar } from "../shared/SearchBar";
import { useDarkMode } from "../../hooks/useDarkMode";

const navLinks = [
  { to: "/courses",     label: "Courses"     },
  { to: "/roadmaps",    label: "Roadmaps"    },
  { to: "/cs-subjects", label: "CS Subjects" },
  { to: "/aptitude",    label: "Aptitude"    },
  { to: "/skills",      label: "Skills"      },
  { to: "/quiz",        label: "Quiz 🎯"     },
  { to: "/placement",   label: "Placement"   },
];

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
      <nav className="container-app h-16 flex items-center gap-3">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 font-display font-bold text-xl text-gray-900 dark:text-white shrink-0 mr-2"
        >
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-600 to-cyan-500 flex items-center justify-center shadow-sm">
            <Code2 size={16} className="text-white" strokeWidth={2.5} />
          </span>
          Dev<span className="text-brand-600">Route</span>
        </Link>

        {/* Desktop Nav links */}
        <div className="hidden lg:flex items-center gap-0.5 flex-1">
          {navLinks.map((link) => (
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

        {/* Right side */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Search — desktop */}
          <div className="hidden md:block w-48 lg:w-64">
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

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 shadow-lg">
          <div className="container-app py-3 flex flex-col gap-1">
            <div className="px-1 py-2">
              <SearchBar placeholder="Search courses, topics..." autoFocus />
            </div>
            <div className="h-px bg-gray-100 dark:bg-gray-800 my-1" />
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
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