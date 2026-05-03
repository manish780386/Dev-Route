import { type ReactNode, type ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "ghost" | "outline" | "danger";
type ButtonSize    = "sm" | "md" | "lg";

const variantClass: Record<ButtonVariant, string> = {
  primary: "bg-brand-600 text-white hover:bg-brand-700 shadow-sm shadow-brand-500/20",
  ghost:   "text-gray-700 hover:bg-gray-100",
  outline: "border border-gray-200 text-gray-700 hover:border-brand-300 hover:text-brand-600 bg-white",
  danger:  "bg-red-600 text-white hover:bg-red-700",
};

const sizeClass: Record<ButtonSize, string> = {
  sm: "px-3.5 py-1.5 text-xs rounded-lg",
  md: "px-5 py-2.5 text-sm rounded-xl",
  lg: "px-7 py-3.5 text-base rounded-xl",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children:  ReactNode;
  variant?:  ButtonVariant;
  size?:     ButtonSize;
  loading?:  boolean;
  icon?:     ReactNode;
}

export function Button({
  children,
  variant = "primary",
  size    = "md",
  loading = false,
  icon,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2 font-semibold
        active:scale-95 transition-all duration-150 select-none
        disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
        ${variantClass[variant]}
        ${sizeClass[size]}
        ${className}
      `}
    >
      {loading ? (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : icon}
      {children}
    </button>
  );
}