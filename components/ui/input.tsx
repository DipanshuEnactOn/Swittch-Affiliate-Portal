"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    return (
      <>
        <input
          type={type === "password" && showPassword ? "text" : type}
          className={cn(
            "dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800",
            className
          )}
          ref={ref}
          {...props}
        />
        {type === "password" && (
          <Button
            variant="outline"
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none text-gray-500 hover:text-gray-900 hover:bg-transparent focus:outline-none focus:ring-0"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <EyeOffIcon className="h-5 w-5" />
            ) : (
              <EyeIcon className="h-5 w-5" />
            )}
          </Button>
        )}
      </>
    );
  }
);
Input.displayName = "Input";

export { Input };
