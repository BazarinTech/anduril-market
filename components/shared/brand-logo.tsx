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
 * The Bima mark: a forward-leaning monogram "B" on a blue tile.
 *
 * Drawn as inline SVG rather than an image so it stays sharp at every size --
 * the old logo was a 48px .ico stretched into an 80px avatar, which blurred on
 * any 2x or 3x phone screen. app/icon.svg is generated from these same paths.
 *
 * The slant (skewX -8deg) is the whole idea: it reads as motion without
 * borrowing anything from an existing car badge.
 */
export function BimaMark({ size = 32, className, title }: MarkProps) {
  // SVG gradient ids are document-global, so two marks on one page would
  // otherwise share (and fight over) a single definition. useId yields
  // ":r1:"-style ids, and colons are not safe inside url(#...).
  const gradientId = `bima-tile-${useId().replace(/:/g, "")}`

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
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3D86EC" />
          <stop offset="1" stopColor="#0B4CA8" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="11" fill={`url(#${gradientId})`} />
      <path d="M0 0H48V20L0 32Z" fill="#FFFFFF" opacity="0.07" />
      <path
        transform="translate(3.4 0) skewX(-8)"
        fillRule="evenodd"
        fill="#FFFFFF"
        d="M14 11H27.5C32.5 11 35.5 13.9 35.5 17.9C35.5 20.6 34 22.7 31.6 23.7C34.8 24.6 37 27.2 37 30.6C37 34.9 33.6 37 28.4 37H14ZM20 16.2V21.6H26.8C28.7 21.6 29.7 20.6 29.7 18.9C29.7 17.2 28.7 16.2 26.8 16.2ZM20 26.4V31.8H27.6C29.9 31.8 31.1 30.8 31.1 29.1C31.1 27.4 29.9 26.4 27.6 26.4Z"
      />
    </svg>
  )
}

type LogoProps = {
  size?: "sm" | "md" | "lg"
  /** Light text for use on ink/hero surfaces. */
  inverse?: boolean
  className?: string
}

const LOGO_SIZES = {
  sm: { mark: 24, text: "text-sm" },
  md: { mark: 30, text: "text-base" },
  lg: { mark: 40, text: "text-xl" },
} as const

/** Mark plus the spaced "BIMA" wordmark. */
export function BimaLogo({ size = "md", inverse = false, className }: LogoProps) {
  const { mark, text } = LOGO_SIZES[size]

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <BimaMark size={mark} />
      <span
        className={cn(
          "font-semibold uppercase tracking-[0.24em]",
          text,
          inverse ? "text-ink-foreground" : "text-foreground",
        )}
      >
        Bima
      </span>
    </span>
  )
}
