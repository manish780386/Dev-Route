import { type ReactNode } from "react";

interface PageHeaderProps {
  badge?:       string;
  title:        string;
  subtitle?:    string;
  actions?:     ReactNode;
  className?:   string;
}

export function PageHeader({ badge, title, subtitle, actions, className = "" }: PageHeaderProps) {
  return (
    <div className={`mb-10 ${className}`}>
      <div className="flex items-start justify-between gap-6 flex-wrap">
        <div>
          {badge && (
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-50 to-cyan-50 border border-brand-200 text-brand-700 rounded-full px-3 py-1 text-xs font-semibold tracking-wide mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
              {badge}
            </div>
          )}
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-gray-900 mb-3 leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-gray-500 text-lg leading-relaxed max-w-2xl">{subtitle}</p>
          )}
        </div>
        {actions && (
          <div className="flex items-center gap-2 shrink-0">{actions}</div>
        )}
      </div>
    </div>
  );
}