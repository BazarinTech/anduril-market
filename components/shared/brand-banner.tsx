import { cn } from "@/lib/utils"
import { SpatakasLogo } from "./brand-logo"

type Props = {
  eyebrow?: string
  title: string
  subtitle?: string
  size?: "sm" | "lg"
  /** Show the logo in the top-left corner. */
  showLogo?: boolean
  className?: string
  children?: React.ReactNode
}

/**
 * The arena banner: torch-lit stone, a colonnade of arches, a gilded edge.
 *
 * The arcade is drawn, not photographed -- it stays crisp at any size, weighs
 * nothing, and recolours with the theme. Arches are generated rather than
 * hand-written so the run always fills the width evenly.
 */
export function BrandBanner({
  eyebrow,
  title,
  subtitle,
  size = "sm",
  showLogo = true,
  className,
  children,
}: Props) {
  const large = size === "lg"
  const arches = Array.from({ length: 9 }, (_, i) => i)

  return (
    <div
      className={cn(
        "bg-hero relative isolate w-full overflow-hidden rounded-2xl shadow-premium",
        large ? "min-h-72 p-7 sm:p-10" : "min-h-44 p-5",
        className,
      )}
    >
      {/* Colonnade: two receding tiers of arches along the back wall. */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-full w-full"
        viewBox="0 0 360 200"
        preserveAspectRatio="xMidYMax slice"
      >
        <g stroke="currentColor" fill="none" className="text-gold">
          <g opacity="0.16">
            {arches.map((i) => (
              <path key={i} d={`M${8 + i * 40} 200v-46a16 16 0 0 1 32 0v46`} strokeWidth="1.5" />
            ))}
            <path d="M0 154h360" strokeWidth="1.5" />
          </g>
          <g opacity="0.09">
            {arches.map((i) => (
              <path key={i} d={`M${28 + i * 40} 150v-30a11 11 0 0 1 22 0v30`} strokeWidth="1.2" />
            ))}
            <path d="M0 120h360" strokeWidth="1.2" />
          </g>
        </g>
      </svg>

      <div className={cn("relative flex h-full flex-col", large ? "gap-6" : "gap-4")}>
        {showLogo && <SpatakasLogo size={large ? "md" : "sm"} inverse />}

        <div className={cn("max-w-md", large ? "mt-auto pt-10" : "mt-auto pt-4")}>
          {eyebrow && <p className="text-eyebrow text-brand-bright">{eyebrow}</p>}
          <h2
            className={cn(
              "mt-1.5 font-semibold text-balance text-ink-foreground",
              large ? "text-3xl sm:text-4xl" : "text-xl",
            )}
          >
            {title}
          </h2>
          {subtitle && (
            <p className={cn("mt-2 text-ink-foreground/70 text-pretty", large ? "text-base" : "text-sm")}>
              {subtitle}
            </p>
          )}
          {children}
        </div>
      </div>

      <div className="brand-hairline absolute inset-x-0 bottom-0" />
    </div>
  )
}
