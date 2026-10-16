import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

/**
 * LoadingSpinner - Lightweight, theme-aware animated spinner icon
 * Suitable for inline buttons, table cells, and compact elements.
 */
export const LoadingSpinner = ({
  size = "md",
  color = "orange",
  className = "",
}) => {
  const sizeMap = {
    xs: "w-3.5 h-3.5 border-2",
    sm: "w-4 h-4 border-2",
    md: "w-6 h-6 border-[2.5px]",
    lg: "w-10 h-10 border-3",
    xl: "w-14 h-14 border-4",
  };

  const colorMap = {
    orange: "border-orange-500/20 border-t-orange-500",
    white: "border-white/30 border-t-white",
    gray: "border-gray-200 border-t-gray-600",
    dark: "border-neutral-700 border-t-white",
  };

  return (
    <div
      className={cn(
        "inline-block rounded-full animate-spin",
        sizeMap[size] || sizeMap.md,
        colorMap[color] || colorMap.orange,
        className
      )}
      role="status"
      aria-label="Loading"
    />
  );
};

/**
 * ClothifyLogoLoader - Premium branded dual-ring pulse loader
 * Features a glowing dual orbit and subtle breathing pulse.
 */
export const ClothifyLogoLoader = ({ size = "md", className = "" }) => {
  const containerSize = size === "sm" ? "w-12 h-12" : size === "lg" ? "w-24 h-24" : "w-16 h-16";
  const innerDot = size === "sm" ? "w-2 h-2" : size === "lg" ? "w-4 h-4" : "w-3 h-3";

  return (
    <div className={cn("relative flex items-center justify-center", containerSize, className)}>
      {/* Outer spinning gradient ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full border-2 border-transparent border-t-orange-500 border-r-orange-400"
      />
      {/* Inner counter-spinning dashed ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
        className="absolute inset-2 rounded-full border border-dashed border-orange-500/40"
      />
      {/* Central pulsing ember */}
      <motion.div
        animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        className={cn("rounded-full bg-gradient-to-tr from-orange-600 to-amber-400 shadow-[0_0_12px_#ea580c]", innerDot)}
      />
    </div>
  );
};

/**
 * LoadingState - Card / section-level loading state with icon and status text
 */
export const LoadingState = ({
  text = "Loading...",
  subtext,
  minHeight = "min-h-[260px]",
  className = "",
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 text-center",
        minHeight,
        className
      )}
    >
      <ClothifyLogoLoader size="md" className="mb-4" />
      <p className="text-sm font-semibold text-gray-800 tracking-wide">{text}</p>
      {subtext && <p className="text-xs text-gray-400 mt-1">{subtext}</p>}
    </div>
  );
};

export default LoadingSpinner;
