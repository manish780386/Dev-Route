import { Link } from "react-router-dom";
import { Code2, Heart, ExternalLink, GraduationCap, MapPin } from "lucide-react";

const footerLinks = {
  Learn: [
    { to: "/courses",      label: "All Courses"   },
    { to: "/roadmaps",     label: "Roadmaps"      },
    { to: "/cs-subjects",  label: "CS Subjects"   },
    { to: "/skills",       label: "Skills"        },
  ],
  Practice: [
    { to: "/aptitude",          label: "Aptitude Practice" },
    { to: "/quiz",              label: "Mock Quiz 🎯"       },
    { to: "/placement",         label: "Placement Guide"   },
    { to: "/cs-subjects/dsa",   label: "DSA Prep"          },
  ],
  Roadmaps: [
    { to: "/roadmaps/frontend-dev",          label: "Frontend Dev"   },
    { to: "/roadmaps/data-science-roadmap",  label: "Data Science"   },
    { to: "/roadmaps/backend-dev",           label: "Backend Dev"    },
    { to: "/roadmaps/devops-roadmap",        label: "DevOps"         },
  ],
  Institutes: [
    { to: "/mp-colleges",                          label: "MP Colleges (Advanced)" },
    { to: "/mp-colleges/map",                      label: "MP College Map"         },
    { to: "/colleges",                             label: "All India Colleges"     },
    { to: "/colleges?type=coding-bootcamp",        label: "Coding Bootcamps"       },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 mt-24">
      <div className="container-app py-16">
        {/* Colleges CTA banner */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 border border-emerald-100 dark:border-emerald-900 rounded-2xl p-5 mb-14 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <GraduationCap size={24} className="text-emerald-600 shrink-0" />
            <div>
              <p className="font-display font-bold text-gray-900 dark:text-white text-sm">
                Looking for the right college or bootcamp?
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Discover 13+ engineering colleges, coding bootcamps & coaching institutes across India
              </p>
            </div>
          </div>
          <Link
            to="/colleges"
            className="shrink-0 flex items-center gap-2 bg-emerald-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-emerald-700 transition-colors shadow-sm"
          >
            <MapPin size={14} /> Find Institutes
          </Link>
        </div>

        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl text-gray-900 dark:text-white mb-4">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-600 to-cyan-500 flex items-center justify-center shadow-sm">
                <Code2 size={16} className="text-white" strokeWidth={2.5} />
              </span>
              Dev<span className="text-brand-600">Route</span>
            </Link>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-xs">
              Your complete career &amp; placement preparation platform. Courses, roadmaps, CS prep, aptitude practice, and college finder — everything in one place.
            </p>
            <div className="flex items-center gap-2 mt-5">
              <Link
                to="/quiz"
                className="flex items-center gap-1.5 text-xs font-semibold bg-brand-600 text-white px-3 py-2 rounded-lg hover:bg-brand-700 transition-colors"
              >
                🎯 Take Mock Quiz
              </Link>
              <Link
                to="/colleges"
                className="flex items-center gap-1.5 text-xs font-semibold bg-emerald-600 text-white px-3 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                🎓 Find College
              </Link>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <ExternalLink size={16} />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="font-display font-semibold text-gray-900 dark:text-white mb-4 text-sm tracking-wide">
                {section}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-gray-500 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="h-px bg-gray-100 dark:bg-gray-800 mt-12 mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <p>© {new Date().getFullYear()} DevRoute. Free for every student, always.</p>
          <p className="flex items-center gap-1.5">
            Made with <Heart size={13} className="text-red-400 fill-red-400" /> for every student in India
          </p>
        </div>
      </div>
    </footer>
  );
}