import { type ReactNode } from "react";

interface Tab {
  id:       string;
  label:    string;
  icon?:    ReactNode;
  count?:   number;
}

interface TabsProps {
  tabs:      Tab[];
  active:    string;
  onChange:  (id: string) => void;
  variant?:  "pill" | "underline";
}

export function Tabs({ tabs, active, onChange, variant = "pill" }: TabsProps) {
  if (variant === "underline") {
    return (
      <div className="flex gap-1 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`
              flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors
              ${active === tab.id
                ? "border-brand-600 text-brand-700"
                : "border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300"
              }
            `}
          >
            {tab.icon}
            {tab.label}
            {tab.count !== undefined && (
              <span className={`text-xs rounded-full px-1.5 py-0.5 font-semibold ${
                active === tab.id ? "bg-brand-100 text-brand-700" : "bg-gray-100 text-gray-500"
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`
            flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl transition-colors
            ${active === tab.id
              ? "bg-brand-600 text-white shadow-sm"
              : "bg-white border border-gray-200 text-gray-600 hover:border-brand-300 hover:text-brand-600"
            }
          `}
        >
          {tab.icon}
          {tab.label}
          {tab.count !== undefined && (
            <span className={`text-xs rounded-full px-1.5 font-semibold ${
              active === tab.id ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
            }`}>
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}