"use client";

import { scoreStyle } from "@/lib/utils";
import { motion, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

const GradientStop = ({ score }: { score: number }) => {
  if (score < 50) {
    return (
      <>
        <stop offset="0%" stopColor="#ef4444" />
        <stop offset="100%" stopColor="#dc2626" />
      </>
    );
  }
  if (score < 70) {
    return (
      <>
        <stop offset="0%" stopColor="#ef4444" />
        <stop offset="50%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#d97706" />
      </>
    );
  }
  if (score < 85) {
    return (
      <>
        <stop offset="0%" stopColor="#ef4444" />
        <stop offset="50%" stopColor="#f59e0b" />
        <stop offset="70%" stopColor="#a3e635" />
        <stop offset="100%" stopColor="#84cc16" />
      </>
    );
  }
  return (
    <>
      <stop offset="0%" stopColor="#ef4444" />
      <stop offset="50%" stopColor="#f59e0b" />
      <stop offset="70%" stopColor="#a3e635" />
      <stop offset="85%" stopColor="#10b981" />
      <stop offset="100%" stopColor="#059669" />
    </>
  );
};

type Props = {
  score: number;
};

export default function ScoreGauge({ score = 75 }: Props) {
  const [pathLength, setPathLength] = useState(0);
  const pathRef = useRef<SVGPathElement>(null);

  // Calculate percentage of completion
  const percentage = Math.min(Math.max(score, 0), 100) / 100;

  // Animated score spring
  const animatedScore = useSpring(0, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.5,
  });

  const displayScore = useTransform(animatedScore, Math.round);

  // Measure SVG path length once
  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []);

  // Animate score changes
  useEffect(() => {
    animatedScore.set(score);
  }, [score, animatedScore]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-44 h-24">
        <svg viewBox="0 0 100 50" className="w-full h-full">
          <defs>
            <linearGradient
              id="dynamicGaugeGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <GradientStop score={score} />
            </linearGradient>
          </defs>

          {/* Base track */}
          <path
            d="M10,50 A40,40 0 0,1 90,50"
            fill="none"
            stroke="currentColor"
            className="text-muted/20"
            strokeWidth="8"
            strokeLinecap="round"
          />

          {/* Animated path */}
          <motion.path
            ref={pathRef}
            d="M10,50 A40,40 0 0,1 90,50"
            fill="none"
            stroke="url(#dynamicGaugeGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={pathLength}
            initial={{ strokeDashoffset: pathLength }}
            animate={{ strokeDashoffset: pathLength * (1 - percentage) }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </svg>

        {/* Centered text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
          <motion.div
            className={`text-3xl font-bold ${scoreStyle(score).text}`}
          >
            {displayScore}
          </motion.div>
          <div className="text-xs text-muted-foreground mt-0.5">out of 100</div>
        </div>
      </div>
    </div>
  );
}
