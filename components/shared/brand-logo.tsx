import { useId } from "react"
import { cn } from "@/lib/utils"

type MarkProps = {
  /** Rendered width and height in pixels. */
  size?: number
  className?: string
  /** Accessible name. Omit when a visible wordmark sits beside the mark. */
  title?: string
}

/** One gladius, drawn once and mirrored to form the crossed pair. */
function Gladius({ fill }: { fill: string }) {
  return (
    <g fill={fill}>
      <circle cx="24" cy="8.6" r="3" />
      <rect x="22.3" y="10.8" width="3.4" height="4.4" />
      <rect x="16.4" y="14.8" width="15.2" height="3.1" rx="1.55" />
      <path d="M20.2 18.6h7.6l-1.6 14.2L24 37.4l-2.2-4.6Z" />
    </g>
  )
}

/**
 * The Spatakas mark: crossed gladii in antique gold on a crimson tile.
 *
 * Inline SVG rather than an image so it stays sharp at every size. A single
 * sword read as a cross at favicon sizes; crossing them keeps the meaning
 * unmistakable. app/icon.svg is generated from these same shapes.
 */
export function SpatakasMark({ size = 32, className, title }: MarkProps) {
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
          <stop offset="0" stopColor="#C0203A" />
          <stop offset="1" stopColor="#7C0F20" />
        </linearGradient>
        <linearGradient id={`gold-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E7CE8C" />
          <stop offset="1" stopColor="#B8963E" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="11" fill={`url(#tile-${uid})`} />
      <path d="M0 0H48V18L0 30Z" fill="#FFFFFF" opacity="0.06" />
      <g transform="rotate(43 24 24)">
        <Gladius fill={`url(#gold-${uid})`} />
      </g>
      <g transform="rotate(-43 24 24)">
        <Gladius fill={`url(#gold-${uid})`} />
      </g>
    </svg>
  )
}

type LogoProps = {
  size?: "sm" | "md" | "lg"
  /** Light text for use on ink/arena surfaces. */
  inverse?: boolean
  className?: string
}

const LOGO_SIZES = {
  sm: { mark: 24, text: "text-xs" },
  md: { mark: 30, text: "text-sm" },
  lg: { mark: 40, text: "text-lg" },
} as const

/** Mark plus the inscription-spaced wordmark. */
export function SpatakasLogo({ size = "md", inverse = false, className }: LogoProps) {
  const { mark, text } = LOGO_SIZES[size]

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <SpatakasMark size={mark} />
      <span
        className={cn(
          "font-semibold uppercase tracking-[0.22em]",
          text,
          inverse ? "text-ink-foreground" : "text-foreground",
        )}
      >
        Spatakas
      </span>
    </span>
  )
}
