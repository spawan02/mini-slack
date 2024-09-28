import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={
        // @ts-expect-error: The library has a type mismatch that is known.

        cn("animate-pulse rounded-md bg-primary/10", className)}
      {...props}
    />
  )
}

export { Skeleton }
