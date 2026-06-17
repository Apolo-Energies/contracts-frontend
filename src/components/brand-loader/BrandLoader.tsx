"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { BRAND_THEMES, DEFAULT_BRAND, LoaderBrand } from "./brand-loader.config";
import styles from "./brand-loader.module.css";

interface BrandLoaderProps {
  visible?: boolean;
  fullscreen?: boolean;
  inline?: boolean;
  title?: string;
  description?: string | null;
  microcopy?: string | null;
  progress?: number | null;
  brand?: LoaderBrand;
  customLogoUrl?: string | null;
  size?: number;
  showBackdrop?: boolean;
  showLogo?: boolean;
  showWordmark?: boolean;
  showTitle?: boolean;
  showDescription?: boolean;
  showBar?: boolean;
  showPercent?: boolean;
  showMicrocopy?: boolean;
}

const CIRCUMFERENCE = 2 * Math.PI * 46;          // ≈ 289
const ARC_LENGTH    = CIRCUMFERENCE * 0.3;        // ≈ 86.7
const DASH_OFFSET   = -(CIRCUMFERENCE * 0.25);    // start arc at 12 o'clock

export const BrandLoader = ({
  visible = true,
  fullscreen = true,
  inline = false,
  title,
  description = null,
  microcopy = null,
  progress = null,
  brand,
  customLogoUrl = null,
  size = 160,
  showBackdrop = true,
  showLogo = true,
  showWordmark = true,
  showTitle = true,
  showDescription = true,
  showBar = true,
  showPercent = true,
  showMicrocopy = true,
}: BrandLoaderProps) => {
  const [simulated, setSimulated] = useState(0);

  useEffect(() => {
    if (!visible || progress !== null && progress !== undefined) {
      setSimulated(0);
      return;
    }
    const id = setInterval(() => {
      setSimulated((prev) => (prev >= 92 ? prev : prev + 1));
    }, 220);
    return () => clearInterval(id);
  }, [visible, progress]);

  const theme = useMemo(
    () => BRAND_THEMES[brand ?? DEFAULT_BRAND],
    [brand]
  );

  const displayProgress = useMemo(() => {
    const raw = progress !== null && progress !== undefined ? progress : simulated;
    return Math.min(100, Math.max(0, raw));
  }, [progress, simulated]);

  if (!visible) return null;

  const outerClassName = inline
    ? "flex items-center justify-center"
    : fullscreen
    ? "fixed inset-0 z-50 flex items-center justify-center"
    : "absolute inset-0 z-50 flex items-center justify-center";

  const logoSize = Math.round(size * 0.55);

  return (
    <div
      className={`${outerClassName} ${!inline ? styles.blOverlay : ""}`}
      style={showBackdrop && !inline ? { background: theme.backdrop } : undefined}
    >
      <div className={`flex flex-col items-center gap-5 px-6 ${styles.blContent}`}>

        {/* Logo ring */}
        {showLogo && (
          <div style={{ width: size, height: size, position: "relative" }}>
            <svg
              viewBox="0 0 100 100"
              width={size}
              height={size}
              style={{
                position: "absolute",
                inset: 0,
                filter: `drop-shadow(0 0 18px ${theme.glowColor})`,
              }}
            >
              {/* Background track */}
              <circle
                cx="50" cy="50" r="46"
                fill="none"
                stroke="rgba(255,255,255,0.07)"
                strokeWidth="1.5"
              />
              {/* Animated arc — animateTransform is the only reliable cross-browser way to spin SVG around its own center */}
              <circle
                cx="50" cy="50" r="46"
                fill="none"
                stroke={theme.ringColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={`${ARC_LENGTH} ${CIRCUMFERENCE}`}
                strokeDashoffset={DASH_OFFSET}
                className={styles.blArc}
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 50 50"
                  to="360 50 50"
                  dur="2.2s"
                  repeatCount="indefinite"
                  calcMode="linear"
                />
              </circle>
            </svg>

            {/* Logo image */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                src={customLogoUrl ?? theme.logoSrc}
                alt="logo"
                width={logoSize}
                height={logoSize}
                style={{ objectFit: "contain" }}
                unoptimized
              />
            </div>
          </div>
        )}

        {/* Wordmark */}
        {showWordmark && (
          <h1 className="text-white text-lg font-semibold tracking-wide">
            {theme.wordmark}
          </h1>
        )}

        {/* Title */}
        {showTitle && title && (
          <h2 className="text-white/80 text-sm font-medium text-center">
            {title}
          </h2>
        )}

        {/* Description */}
        {showDescription && description && (
          <p className="text-white/60 text-xs text-center max-w-xs">
            {description}
          </p>
        )}

        {/* Progress bar */}
        {showBar && (
          <div className="w-full max-w-xs">
            <div
              className="relative overflow-visible rounded-full"
              style={{ background: "rgba(255,255,255,0.10)", height: "2px" }}
            >
              {/* Fill */}
              <div
                className={styles.blBarFill}
                style={{
                  width: `${displayProgress}%`,
                  background: `linear-gradient(90deg, ${theme.ringColor}80, ${theme.ringColor}, ${theme.accentColor})`,
                  boxShadow: `0 0 12px ${theme.glowColor}`,
                }}
              />
              {/* Icon on bar */}
              <div
                className={styles.blBarIcon}
                style={{ left: `${displayProgress}%` }}
              >
                <Image
                  src={customLogoUrl ?? theme.logoSrc}
                  alt=""
                  width={22}
                  height={22}
                  className={styles.blBarIconImg}
                  style={{ objectFit: "contain" }}
                  unoptimized
                />
              </div>
            </div>
          </div>
        )}

        {/* Percent */}
        {showPercent && (
          <div
            className="text-xs font-semibold tabular-nums"
            style={{ color: theme.accentColor }}
          >
            {Math.round(displayProgress)}%
          </div>
        )}

        {/* Microcopy */}
        {showMicrocopy && microcopy && (
          <div className="flex items-center gap-1.5 text-white/40 text-xs">
            <svg
              width="14" height="14" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="1.5"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {microcopy}
          </div>
        )}

      </div>
    </div>
  );
};
