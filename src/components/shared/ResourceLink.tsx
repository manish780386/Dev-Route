import { ExternalLink } from "lucide-react";
import type { Resource } from "../../types";

const typeConfig: Record<Resource["type"], { emoji: string; label: string }> = {
  video:    { emoji: "🎬", label: "Video"    },
  article:  { emoji: "📄", label: "Article"  },
  docs:     { emoji: "📚", label: "Docs"     },
  book:     { emoji: "📖", label: "Book"     },
  practice: { emoji: "💻", label: "Practice" },
};

interface ResourceLinkProps {
  resource: Resource;
  size?:    "sm" | "md";
}

export function ResourceLink({ resource, size = "md" }: ResourceLinkProps) {
  const cfg = typeConfig[resource.type];

  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 font-medium border rounded-lg transition-colors
        text-brand-600 bg-brand-50 hover:bg-brand-100 border-brand-100
        ${size === "sm" ? "text-xs px-2.5 py-1.5" : "text-xs px-3 py-2"}
      `}
    >
      <span>{cfg.emoji}</span>
      <span>{resource.title}</span>
      {resource.isFree && (
        <span className="text-emerald-500 font-semibold text-xs">FREE</span>
      )}
      <ExternalLink size={9} className="opacity-60" />
    </a>
  );
}