import { cn } from "@/utils/utils";
import * as React from "react";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-lg bg-card border border-border text-card-foreground shadow-sm", className)}
    {...props}
  />
));

Card.displayName = "Card";

export { Card };
