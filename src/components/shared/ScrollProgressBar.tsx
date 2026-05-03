import { useScrollProgress } from "../../hooks/useScrollProgress";

export function ScrollProgressBar() {
  const progress = useScrollProgress();

  return (
    <div
      className="fixed top-0 left-0 z-[100] h-0.5 bg-gradient-to-r from-brand-500 to-cyan-400 transition-all duration-100 ease-out"
      style={{ width: `${progress}%` }}
    />
  );
}