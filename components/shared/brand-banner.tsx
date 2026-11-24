import { cn } from "@/lib/utils"
import { MusicallyLogo } from "./brand-logo"
import { StageScene } from "./stage-scene"

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
 * The stage banner: lights down, closed with a primary hairline.
 *
 * The scene is drawn, not photographed -- it stays crisp at any size, weighs
 * nothing, and recolours with the theme.
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

  return (
    <div
      className={cn(
        "bg-hero relative isolate w-full overflow-hidden rounded-2xl shadow-premium",
        large ? "min-h-72 p-7 sm:p-10" : "min-h-44 p-5",
        className,
      )}
    >
      {/* The stage behind the words. */}
      <StageScene className="absolute inset-0 -z-10" />

      <div className={cn("relative flex h-full flex-col", large ? "gap-6" : "gap-4")}>
        {showLogo && <MusicallyLogo size={large ? "md" : "sm"} inverse />}

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
