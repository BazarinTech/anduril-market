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
 * The Cloud Farmer mark: a sprout rising into a cloud.
 *
 * Two halves of the name in one shape -- the cloud above, new growth reaching
 * it from the soil line below. Inline SVG rather than an image so it stays
 * sharp at every size; app/icon.svg is generated from these same paths.
 */
export function CloudFarmerMark({ size = 32, className, title }: MarkProps) {
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
          <stop offset="0" stopColor="#2A9A52" />
          <stop offset="1" stopColor="#0F5428" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="11" fill={`url(#tile-${uid})`} />

      {/* cloud */}
      <path
        fill="#FFFFFF"
        d="M16.4 22.6a6.1 6.1 0 0 1 11.6-2.4 5 5 0 0 1 6.9 4.6 4.6 4.6 0 0 1-4.6 4.6H16.6a5 5 0 0 1-.2-6.8Z"
      />
      {/* sprout: stem with two leaves, rooted on the soil line */}
      <path fill="#FFFFFF" d="M23.2 40V29.8h1.9V40Z" />
      <path
        fill="#BFEFCD"
        d="M23.2 31.6c-3.9.5-6.4-1.1-7.4-4.8 3.9-.5 6.4 1.1 7.4 4.8Zm1.9-1.4c1-3.7 3.5-5.3 7.4-4.8-1 3.7-3.5 5.3-7.4 4.8Z"
      />
      {/* soil line */}
      <rect x="13" y="39.4" width="22" height="2.2" rx="1.1" fill="#BFEFCD" opacity=".85" />
    </svg>
  )
}

type LogoProps = {
  size?: "sm" | "md" | "lg"
  /** Light text for use on the dark field surfaces. */
  inverse?: boolean
  className?: string
}

const LOGO_SIZES = {
  sm: { mark: 24, text: "text-xs" },
  md: { mark: 30, text: "text-sm" },
  lg: { mark: 40, text: "text-lg" },
} as const

/** Mark plus the wordmark. */
export function CloudFarmerLogo({ size = "md", inverse = false, className }: LogoProps) {
  const { mark, text } = LOGO_SIZES[size]

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <CloudFarmerMark size={mark} />
      <span
        className={cn(
          "font-semibold tracking-[0.16em] uppercase",
          text,
          inverse ? "text-ink-foreground" : "text-foreground",
        )}
      >
        Cloud Farmer
      </span>
    </span>
  )
}
