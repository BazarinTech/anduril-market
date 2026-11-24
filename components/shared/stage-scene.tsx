import { cn } from "@/lib/utils"

/**
 * The drawn stage used behind hero surfaces.
 *
 * A stage light, two sound waves rolling across and an equaliser along the
 * floor. Drawn rather than photographed so it stays crisp at any size, weighs
 * nothing and recolours with the theme.
 */
export function StageScene({ className }: { className?: string }) {
  // Bar heights for the equaliser: a loose peak in the middle, like a track
  // caught mid-chorus.
  const bars = [10, 18, 26, 16, 32, 44, 30, 52, 40, 28, 46, 34, 22, 38, 24, 14, 20, 12]

  return (
    <svg
      aria-hidden
      className={cn("pointer-events-none h-full w-full", className)}
      viewBox="0 0 360 200"
      preserveAspectRatio="xMidYMax slice"
    >
      <defs>
        {/* A stage light reads as a glow, not a sticker: feathered to nothing at the rim. */}
        <radialGradient id="stage-glow">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.8" />
          <stop offset="0.45" stopColor="currentColor" stopOpacity="0.3" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g className="text-glow">
        <circle cx="298" cy="46" r="56" fill="url(#stage-glow)" />
        <circle cx="298" cy="46" r="12" fill="currentColor" opacity="0.45" />
      </g>

      {/* two sound waves, the far one fainter */}
      <path
        d="M0 112c20-18 40-18 60 0s40 18 60 0 40-18 60 0 40 18 60 0 40-18 60 0 40 18 60 0"
        className="text-wave"
        stroke="currentColor"
        strokeWidth="1.4"
        fill="none"
        opacity="0.28"
      />
      <path
        d="M0 132c30-26 60-26 90 0s60 26 90 0 60-26 90 0 60 26 90 0"
        className="text-wave"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
        opacity="0.4"
      />

      {/* the equaliser along the floor */}
      <g className="text-wave" fill="currentColor" opacity="0.32">
        {bars.map((h, i) => (
          <rect key={i} x={6 + i * 20} y={200 - h} width="10" height={h} rx="3" />
        ))}
      </g>
    </svg>
  )
}

/**
 * A vinyl record, in silhouette.
 *
 * Stands in for the photograph at public/hero.jpg until that file exists, so
 * the home display never renders empty.
 */
export function VinylSilhouette({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 120 120" className={cn("h-full w-auto", className)}>
      {/* One path, evenodd: the grooves and spindle hole are cut out of the
          disc, so it reads at any size and against any backdrop. */}
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M60 4a56 56 0 1 1 0 112A56 56 0 0 1 60 4Zm0 10a46 46 0 1 0 0 92 46 46 0 0 0 0-92Zm0 4a42 42 0 1 1 0 84 42 42 0 0 1 0-84Zm0 8a34 34 0 1 0 0 68 34 34 0 0 0 0-68Zm0 4a30 30 0 1 1 0 60 30 30 0 0 1 0-60Zm0 26a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"
      />
      {/* tone arm */}
      <path d="M112 8l-4 4-30 34" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
    </svg>
  )
}

/**
 * Portrait artwork for the story cards.
 *
 * Four moments of one rental, drawn from the same light and waves so the row
 * reads as a sequence rather than four stock photographs. Each is replaced by
 * a real photograph the moment one is dropped at the matching path in /public.
 */
export type VignetteVariant = "discover" | "rent" | "play" | "payout"

export function StoryVignette({ variant, className }: { variant: VignetteVariant; className?: string }) {
  const lightX = variant === "discover" ? 140 : 56

  return (
    <svg
      aria-hidden
      className={cn("pointer-events-none h-full w-full", className)}
      viewBox="0 0 200 280"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id={`vig-glow-${variant}`}>
          <stop offset="0" stopColor="currentColor" stopOpacity="0.85" />
          <stop offset="0.5" stopColor="currentColor" stopOpacity="0.3" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g className="text-glow">
        <circle cx={lightX} cy="54" r={variant === "discover" ? 50 : 40} fill={`url(#vig-glow-${variant})`} />
        <circle cx={lightX} cy="54" r="10" fill="currentColor" opacity="0.5" />
      </g>

      <path
        d="M0 200c25-20 50-20 75 0s50 20 75 0 50-20 75 0"
        className="text-wave"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
        opacity="0.35"
      />

      {variant === "discover" && (
        // A row of album covers, the nearest one picked out.
        <g className="text-ink-foreground">
          <rect x="22" y="150" width="44" height="44" rx="6" fill="currentColor" opacity="0.35" />
          <rect x="134" y="150" width="44" height="44" rx="6" fill="currentColor" opacity="0.35" />
          <rect x="68" y="136" width="64" height="64" rx="8" fill="currentColor" opacity="0.75" />
          <circle cx="100" cy="168" r="14" className="text-ink" fill="currentColor" opacity="0.5" />
        </g>
      )}

      {variant === "rent" && (
        // A key on a ring: this one is yours for its term.
        <g className="text-ink-foreground" stroke="currentColor" fill="none" opacity="0.75" strokeWidth="6" strokeLinecap="round">
          <circle cx="78" cy="168" r="20" />
          <path d="M98 168h56M138 168v16M152 168v12" />
        </g>
      )}

      {variant === "play" && (
        // Headphones over an equaliser that is moving.
        <g className="text-brand-bright" opacity="0.85">
          <path d="M56 176v-14a44 44 0 0 1 88 0v14" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" />
          <rect x="46" y="166" width="20" height="34" rx="8" fill="currentColor" />
          <rect x="134" y="166" width="20" height="34" rx="8" fill="currentColor" />
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x={76 + i * 10} y={200 - [14, 26, 36, 22, 16][i]} width="6" height={[14, 26, 36, 22, 16][i]} rx="2" fill="currentColor" />
          ))}
        </g>
      )}

      {variant === "payout" && (
        // A phone with a coin dropping in.
        <g className="text-ink-foreground" opacity="0.7">
          <rect x="72" y="132" width="56" height="92" rx="10" fill="currentColor" />
          <rect x="80" y="144" width="40" height="64" rx="4" className="text-ink" fill="currentColor" opacity="0.55" />
          <g className="text-glow" fill="currentColor">
            <circle cx="100" cy="116" r="12" />
            <circle cx="100" cy="116" r="6" className="text-ink" fill="currentColor" opacity="0.35" />
          </g>
        </g>
      )}

      <g className="text-wave" fill="currentColor" opacity="0.25">
        {[18, 30, 22, 40, 28, 34, 20, 26, 16].map((h, i) => (
          <rect key={i} x={6 + i * 22} y={280 - h} width="12" height={h} rx="3" />
        ))}
      </g>
    </svg>
  )
}
