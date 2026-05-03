import { type InputHTMLAttributes, type ReactNode, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?:      string;
  error?:      string;
  leftIcon?:   ReactNode;
  rightIcon?:  ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, leftIcon, rightIcon, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            {...props}
            className={`
              w-full py-2.5 text-sm bg-white border rounded-xl
              focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400
              placeholder:text-gray-400 transition-all
              ${error ? "border-red-300 focus:ring-red-400/20 focus:border-red-400" : "border-gray-200"}
              ${leftIcon  ? "pl-10" : "pl-4"}
              ${rightIcon ? "pr-10" : "pr-4"}
              ${className}
            `}
          />
          {rightIcon && (
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1.5 text-xs text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";