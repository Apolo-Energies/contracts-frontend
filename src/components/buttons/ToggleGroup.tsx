import React from "react";
import { Button } from "./button";

interface ToggleGroupProps<T extends string> {
  value: T;
  onValueChange: (value: T) => void;
  options: Array<{
    value: T;
    label: string;
  }>;
  className?: string;
}

export const ToggleGroup = <T extends string>({
  value,
  onValueChange,
  options,
  className = "",
}: ToggleGroupProps<T>) => {
  return (
    <div
      className={`flex rounded-lg border border-input bg-background p-1 ${className}`}
    >
      {options.map((option) => {
        const isActive = value === option.value;

        return (
          <Button
            key={option.value}
            variant={isActive ? "default" : "ghost"}
            size="sm"
            onClick={() => onValueChange(option.value)}
            className={`flex-1 rounded-md cursor-pointer transition-all ${
              isActive
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {option.label}
          </Button>
        );
      })}
    </div>
  );
};
