import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-base text-white",
          "placeholder:text-zinc-500 file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "outline-none focus:outline-none focus:ring-0 focus:border-zinc-600",
          "selection:bg-zinc-800 selection:text-white dark:selection:bg-zinc-300 dark:selection:text-black",
          "disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
