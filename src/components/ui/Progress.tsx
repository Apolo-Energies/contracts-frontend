"use client"

import React from "react"

interface ProgressProps {
  value: number
  className?: string
}

export const Progress = ({ value, className = "" }: ProgressProps) => {
  return (
    <div
      className={`relative w-full h-2 rounded-full bg-secondary overflow-hidden ${className}`}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full bg-primary transition-all duration-300 ease-in-out"
        style={{ width: `${value}%` }}
      />
    </div>
  )
}
