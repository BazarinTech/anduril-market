import { useId } from "react"
import { cn } from "@/lib/utils"

type MarkProps = {
  /** Rendered width and height in pixels. */
  size?: number
  className?: string
  /** Accessible name. Omit when a visible wordmark sits beside the mark. */
  title?: string
}

/**
 * The Musically mark: a note rising out of a sound wave.
 *
 * The wave along the bottom is the track playing; the note above it is the
 * one you hold. Inline SVG rather than an image so it stays sharp at every
 * size; app/icon.svg is drawn from these same paths. The tile is painted
 * with the theme's own variables, so it follows the shadcn primary wherever
 * it changes. (app/icon.svg is a static file and cannot; it carries the
 * current preset's values and has to be updated by hand.)
 */
export function MusicallyMark({ size = 32, className, title }: MarkProps) {
  // SVG gradient ids are document-global, so two marks on one page would
  // otherwise share a single definition. useId yields ":r1:"-style ids, and
  // colons are not safe inside url(#...).
  const uid = useId().replace(/:/g, "")

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      className={cn("shrink-0", className)}
    >
      <defs>
        <linearGradient id={`tile-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: "var(--wave)" }} />
          <stop offset="1" style={{ stopColor: "var(--brand-deep)" }} />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="11" fill={`url(#tile-${uid})`} />

      {/* note: stem, flag and head */}
      <path fill="#FFFFFF" d="M26.2 10.5h2.4v19.8h-2.4Z" />
      <path fill="#FFFFFF" d="M28.6 10.5c3.4 1.3 6.4 3.8 6.4 8-1.5-2.2-3.9-3.2-6.4-3.4Z" />
      <ellipse cx="22.6" cy="30.4" rx="5.2" ry="3.9" transform="rotate(-20 22.6 30.4)" fill="#FFFFFF" />

      {/* sound wave */}
      <g style={{ fill: "var(--glow)" }}>
        <rect x="12.4" y="38.2" width="2.4" height="3" rx="1.2" />
        <rect x="17.6" y="36.6" width="2.4" height="4.6" rx="1.2" opacity=".9" />
        <rect x="22.8" y="35" width="2.4" height="6.2" rx="1.2" />
        <rect x="28" y="36.6" width="2.4" height="4.6" rx="1.2" opacity=".9" />
        <rect x="33.2" y="38.2" width="2.4" height="3" rx="1.2" />
      </g>
    </svg>
  )
}

type LogoProps = {
  size?: "sm" | "md" | "lg"
  /** Light text for use on the dark stage surfaces. */
  inverse?: boolean
  className?: string
}

const LOGO_SIZES = {
  sm: { mark: 24, text: "text-xs" },
  md: { mark: 30, text: "text-sm" },
  lg: { mark: 40, text: "text-lg" },
} as const

/** Mark plus the wordmark. */
export function MusicallyLogo({ size = "md", inverse = false, className }: LogoProps) {
  const { mark, text } = LOGO_SIZES[size]

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <MusicallyMark size={mark} />
      <span
        className={cn(
          "font-semibold tracking-[0.16em] uppercase",
          text,
          inverse ? "text-ink-foreground" : "text-foreground",
        )}
      >
        Musically
      </span>
    </span>
  )
}
