import { type ReactNode } from "react";

interface EmptyStateProps {
  emoji?:       string;
  title:        string;
  description?: string;
  action?:      ReactNode;
}

export function EmptyState({ emoji = "🔍", title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="text-5xl mb-4">{emoji}</div>
      <h3 className="font-display font-semibold text-gray-700 text-lg">{title}</h3>
      {description && (
        <p className="text-gray-400 text-sm mt-1.5 max-w-xs">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}