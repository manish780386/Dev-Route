interface TopicChipProps {
  label:      string;
  isCore?:    boolean;
  onClick?:   () => void;
  active?:    boolean;
}

export function TopicChip({ label, isCore = false, onClick, active = false }: TopicChipProps) {
  const base = "inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium transition-colors";

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={`${base} cursor-pointer ${
          active
            ? "bg-brand-600 text-white"
            : "bg-gray-100 text-gray-600 hover:bg-brand-50 hover:text-brand-700"
        }`}
      >
        {isCore && <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />}
        {label}
      </button>
    );
  }

  return (
    <span className={`${base} ${isCore ? "bg-brand-50 text-brand-700" : "bg-gray-100 text-gray-600"}`}>
      {isCore && <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />}
      {label}
    </span>
  );
}