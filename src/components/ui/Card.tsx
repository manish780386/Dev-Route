import { type ReactNode } from "react";

interface CardProps {
  children:  ReactNode;
  className?: string;
  hover?:     boolean;
  padding?:   "none" | "sm" | "md" | "lg";
}

const paddingClass = {
  none: "",
  sm:   "p-4",
  md:   "p-6",
  lg:   "p-8",
};

export function Card({ children, className = "", hover = false, padding = "md" }: CardProps) {
  return (
    <div
      className={`
        bg-white rounded-2xl border border-gray-100 shadow-sm
        ${hover ? "hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer" : ""}
        ${paddingClass[padding]}
        ${className}
      `}
    >
      {children}
    </div>
  );
}