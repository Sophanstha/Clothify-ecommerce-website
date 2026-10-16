import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";

/**
 * Skiper15 - 3D Box Loading Preloader
 * Inspired by @skiper-ui/skiper15 (PreLoader_006)
 * Features:
 * - 3D Isometric Rotating Cube with multi-faceted glassmorphism
 * - Internal counter-rotating glowing energy core
 * - 3D orbital particle rings & floating embers
 * - Dynamic percentage progression with Clothify brand styling
 * - Smooth curtain-slide exit animation
 */
export const Skiper15 = ({
  onComplete,
  duration = 2400,
  className,
}) => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const nextProgress = Math.min(Math.round((elapsed / duration) * 100), 100);
      setProgress(nextProgress);

      if (nextProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsFinished(true);
          if (onComplete) onComplete();
        }, 300);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [duration, onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="skiper15-preloader"
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: {
              duration: 0.85,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
          className={cn(
            "fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-[#0c0d0e] text-white selection:bg-orange-500",
            className
          )}
        >
          {/* Ambient Background Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-600/15 rounded-full blur-[130px] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-amber-500/10 rounded-full blur-[80px] pointer-events-none" />

          {/* Subtle Grid Backdrop */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(#ea580c 1px, transparent 1px), linear-gradient(90deg, #ea580c 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Floating Embers / Particle Field */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(16)].map((_, i) => (
              <motion.span
                key={i}
                initial={{
                  x: `${(i * 6.25) % 100}%`,
                  y: "110%",
                  opacity: 0,
                  scale: 0.5,
                }}
                animate={{
                  y: "-10%",
                  opacity: [0, 0.7, 0.9, 0],
                  scale: [0.5, 1.2, 0.8],
                }}
                transition={{
                  duration: 2.2 + (i % 5) * 0.4,
                  repeat: Infinity,
                  delay: (i % 7) * 0.25,
                  ease: "easeInOut",
                }}
                className="absolute w-1.5 h-1.5 rounded-full bg-orange-400 shadow-[0_0_10px_#f97316]"
              />
            ))}
          </div>

          {/* Center 3D Perspective Box System */}
          <div className="relative z-10 flex flex-col items-center">
            {/* 3D Perspective Stage */}
            <div
              className="relative w-44 h-44 mb-8 flex items-center justify-center"
              style={{ perspective: "1000px" }}
            >
              {/* Outer 3D Gyro Ring */}
              <motion.div
                animate={{
                  rotateX: [65, 65, 65],
                  rotateZ: [0, 360],
                }}
                transition={{
                  rotateZ: { duration: 6, repeat: Infinity, ease: "linear" },
                }}
                className="absolute w-40 h-40 rounded-full border border-orange-500/30 border-dashed"
                style={{
                  transformStyle: "preserve-3d",
                }}
              />

              {/* Second Elliptical Ring */}
              <motion.div
                animate={{
                  rotateY: [70, 70, 70],
                  rotateZ: [360, 0],
                }}
                transition={{
                  rotateZ: { duration: 5, repeat: Infinity, ease: "linear" },
                }}
                className="absolute w-36 h-36 rounded-full border border-amber-400/20"
                style={{
                  transformStyle: "preserve-3d",
                }}
              />

              {/* 3D Rotating Isometric Box (Cube) */}
              <motion.div
                animate={{
                  rotateX: [0, 360],
                  rotateY: [0, 360],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="relative w-20 h-20"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {/* 6 Cube Faces */}
                {/* Front Face */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-orange-500/25 to-orange-700/10 border border-orange-500/60 backdrop-blur-sm shadow-[0_0_20px_rgba(249,115,22,0.25)] flex items-center justify-center"
                  style={{ transform: "translateZ(40px)" }}
                >
                  <span className="w-2 h-2 rounded-full bg-orange-400 shadow-[0_0_8px_#ea580c]" />
                  <div className="absolute top-1 left-1 w-1.5 h-1.5 border-t border-l border-orange-400" />
                  <div className="absolute bottom-1 right-1 w-1.5 h-1.5 border-b border-r border-orange-400" />
                </div>

                {/* Back Face */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-neutral-900/40 border border-orange-500/40 backdrop-blur-sm flex items-center justify-center"
                  style={{ transform: "rotateY(180deg) translateZ(40px)" }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500/70" />
                </div>

                {/* Left Face */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-amber-700/15 border border-orange-500/50 backdrop-blur-sm flex items-center justify-center"
                  style={{ transform: "rotateY(-90deg) translateZ(40px)" }}
                >
                  <div className="w-6 h-6 border border-orange-400/30 rounded-sm" />
                </div>

                {/* Right Face */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-orange-500/25 to-neutral-950/40 border border-orange-500/60 backdrop-blur-sm flex items-center justify-center"
                  style={{ transform: "rotateY(90deg) translateZ(40px)" }}
                >
                  <div className="w-3 h-3 bg-orange-500/20 rounded-full" />
                </div>

                {/* Top Face */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-amber-400/30 to-orange-600/20 border border-orange-400/70 backdrop-blur-sm flex items-center justify-center"
                  style={{ transform: "rotateX(90deg) translateZ(40px)" }}
                >
                  <span className="text-[9px] font-mono tracking-widest text-orange-300">CLTF</span>
                </div>

                {/* Bottom Face */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-neutral-950/60 to-orange-950/40 border border-orange-600/40 backdrop-blur-sm"
                  style={{ transform: "rotateX(-90deg) translateZ(40px)" }}
                />

                {/* Inner Floating Energy Core */}
                <motion.div
                  animate={{
                    rotateX: [360, 0],
                    rotateY: [360, 0],
                    scale: [0.75, 1, 0.75],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-2 bg-gradient-to-tr from-orange-500 to-amber-400 rounded-sm opacity-80 blur-[2px] shadow-[0_0_25px_#f97316]"
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                />
              </motion.div>
            </div>

            {/* Brand Title & Presentation */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-[0.28em] uppercase text-white font-serif">
                  Clothify
                </h1>
              </div>
              <p className="text-xs uppercase tracking-[0.3em] text-orange-400/80 font-medium mb-6">
                Curating Modern Essentials
              </p>
            </motion.div>

            {/* Progress Bar & Numeric Indicator */}
            <div className="w-64 sm:w-80 flex flex-col items-center">
              {/* Numeric Percentage */}
              <div className="w-full flex justify-between items-center text-xs font-mono mb-2 text-neutral-400">
                <span className="flex items-center gap-1.5 text-orange-400">
                  <span className="inline-block w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
                  LOADING EXPERIENCE
                </span>
                <span className="text-orange-400 font-bold text-sm tracking-wider">
                  {progress}%
                </span>
              </div>

              {/* Progress Track */}
              <div className="w-full h-1.5 bg-neutral-800/80 rounded-full overflow-hidden border border-neutral-700/50 p-[1px]">
                <motion.div
                  className="h-full bg-gradient-to-r from-orange-600 via-orange-500 to-amber-400 rounded-full shadow-[0_0_12px_#ea580c]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>

              {/* Minimal Footer Tag */}
              <div className="mt-5 flex items-center gap-3 text-[10px] text-neutral-500 tracking-widest uppercase">
                <span>Tailored Aesthetics</span>
                <span>•</span>
                <span>Autumn / Winter 2026</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Skiper15;
