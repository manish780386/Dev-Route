import { Link } from "react-router-dom";
import { Code2, Heart, ExternalLink } from "lucide-react";

const footerLinks = {
  Learn: [
    { to: "/courses",     label: "All Courses"  },
    { to: "/roadmaps",    label: "Roadmaps"     },
    { to: "/cs-subjects", label: "CS Subjects"  },
    { to: "/skills",      label: "Skills"       },
  ],
  Prepare: [
    { to: "/aptitude",         label: "Aptitude Practice" },
    { to: "/placement",        label: "Placement Guide"   },
    { to: "/aptitude/quantitative", label: "Quant Practice"   },
    { to: "/cs-subjects/dsa",  label: "DSA Prep"          },
  ],
  Roadmaps: [
    { to: "/roadmaps/frontend-dev",          label: "Frontend Dev"  },
    { to: "/roadmaps/data-science-roadmap",  label: "Data Science"  },
    { to: "/roadmaps/backend-dev",           label: "Backend Dev"   },
    { to: "/roadmaps/devops-roadmap",        label: "DevOps"        },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-24">
      <div className="container-app py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl text-gray-900 mb-4">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-600 to-cyan-500 flex items-center justify-center shadow-sm">
                <Code2 size={16} className="text-white" strokeWidth={2.5} />
              </span>
              Dev<span className="text-brand-600">Route</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Your complete career &amp; placement preparation platform. From beginner to job-ready — everything in one place.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="GitHub"
              >
                <ExternalLink size={18} />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="font-display font-semibold text-gray-900 mb-4 text-sm tracking-wide uppercase">
                {section}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-gray-500 hover:text-brand-600 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="h-px bg-gray-100 mt-14 mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <p>© {new Date().getFullYear()} DevRoute. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Made with <Heart size={13} className="text-red-400 fill-red-400" /> for every student
          </p>
        </div>
      </div>
    </footer>
  );
}