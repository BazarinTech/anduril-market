import { cn } from "@/lib/utils"

/**
 * The drawn pasture used behind field surfaces.
 *
 * Rolling hills, furrows running to the horizon and a low sun. Drawn rather
 * than photographed so it stays crisp at any size, weighs nothing and
 * recolours with the theme.
 */
export function FarmScene({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={cn("pointer-events-none h-full w-full", className)}
      viewBox="0 0 360 200"
      preserveAspectRatio="xMidYMax slice"
    >
      <defs>
        {/* A low sun reads as a glow, not a sticker: feathered to nothing at the rim. */}
        <radialGradient id="farm-sun">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.85" />
          <stop offset="0.45" stopColor="currentColor" stopOpacity="0.35" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g className="text-sun">
        <circle cx="298" cy="46" r="52" fill="url(#farm-sun)" />
        <circle cx="298" cy="46" r="13" fill="currentColor" opacity="0.5" />
      </g>

      {/* far hills */}
      <path
        d="M0 128c42-26 78-26 118-6s74 22 118 4 76-18 124 6v68H0Z"
        className="text-leaf"
        fill="currentColor"
        opacity="0.16"
      />
      {/* near hill */}
      <path
        d="M0 152c54-22 96-20 148 2s96 24 150 6 62-16 62-16v56H0Z"
        className="text-leaf"
        fill="currentColor"
        opacity="0.26"
      />

      {/* furrows, converging towards the horizon */}
      <g className="text-leaf" stroke="currentColor" fill="none" opacity="0.3">
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <path key={i} d={`M${-40 + i * 70} 200 L${110 + i * 24} 150`} strokeWidth="1.2" />
        ))}
      </g>
    </svg>
  )
}

/**
 * A cow, in silhouette.
 *
 * Stands in for the photograph at public/cow.jpg until that file exists, so
 * the home display never renders empty.
 */
export function CowSilhouette({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 160 110" className={cn("h-full w-auto", className)}>
      {/* One path, evenodd: the markings are holes in the silhouette, so she
          reads at any size and against any backdrop. */}
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M36 44c0-9 8-15 20-15h40c13 0 22 6 22 16v24c0 5-4 8-9 8H45c-5 0-9-3-9-8Zm82-6c7-5 14-4 18 2 4 5 3 12-2 16l-9 6-10-8ZM30 40c-6-6-13-6-16-1-3 4-1 10 4 13l7 4 7-7Zm16 34h8v30h-8Zm18 0h8v30h-8Zm30 0h8v30h-8Zm16 0h8v30h-8ZM36 50c-6 4-8 14-5 24l5-2c-2-8-1-15 4-19ZM66 41c6.6 0 12 4 12 9s-5.4 9-12 9-12-4-12-9 5.4-9 12-9Zm28 12c5 0 9 3.1 9 7s-4 7-9 7-9-3.1-9-7 4-7 9-7Z"
      />
    </svg>
  )
}

/**
 * Portrait artwork for the story cards.
 *
 * Four moments of one day, drawn from the same hills and sun so the row reads
 * as a sequence rather than four stock photographs. Each is replaced by a real
 * photograph the moment one is dropped at the matching path in /public.
 */
export type VignetteVariant = "dawn" | "herd" | "harvest" | "market"

export function FarmVignette({ variant, className }: { variant: VignetteVariant; className?: string }) {
  return (
    <svg
      aria-hidden
      className={cn("pointer-events-none h-full w-full", className)}
      viewBox="0 0 200 280"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id={`vig-sun-${variant}`}>
          <stop offset="0" stopColor="currentColor" stopOpacity="0.9" />
          <stop offset="0.5" stopColor="currentColor" stopOpacity="0.3" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* The sun sits where the hour puts it: high at dawn, low by market day. */}
      <g className="text-sun">
        <circle
          cx={variant === "dawn" ? 140 : 56}
          cy={variant === "harvest" ? 70 : 54}
          r={variant === "dawn" ? 50 : 40}
          fill={`url(#vig-sun-${variant})`}
        />
        <circle cx={variant === "dawn" ? 140 : 56} cy={variant === "harvest" ? 70 : 54} r="11" fill="currentColor" opacity="0.55" />
      </g>

      <path d="M0 168c30-20 56-18 86 0s58 18 114-6v118H0Z" className="text-leaf" fill="currentColor" opacity="0.18" />
      <path d="M0 198c38-18 70-14 108 6s66 14 92 0v76H0Z" className="text-leaf" fill="currentColor" opacity="0.3" />

      {variant === "dawn" && (
        <g className="text-ink-foreground" stroke="currentColor" fill="none" opacity="0.35" strokeWidth="1.4">
          <path d="M40 76c6-6 10-6 16 0" />
          <path d="M62 60c5-5 9-5 14 0" />
        </g>
      )}

      {variant === "herd" && (
        <g className="text-ink-foreground" opacity="0.72">
          {/* Grazing shapes, smaller the further back they stand. */}
          <ellipse cx="78" cy="176" rx="34" ry="18" fill="currentColor" />
          <rect x="56" y="186" width="7" height="20" rx="2" fill="currentColor" />
          <rect x="92" y="186" width="7" height="20" rx="2" fill="currentColor" />
          <circle cx="116" cy="162" r="12" fill="currentColor" />
          <path d="M124 150c6-4 10 0 7 6" fill="currentColor" />
          <ellipse cx="150" cy="196" rx="20" ry="11" fill="currentColor" opacity="0.6" />
          <rect x="137" y="202" width="5" height="13" rx="2" fill="currentColor" opacity="0.6" />
          <rect x="159" y="202" width="5" height="13" rx="2" fill="currentColor" opacity="0.6" />
          <circle cx="172" cy="187" r="7" fill="currentColor" opacity="0.6" />
        </g>
      )}

      {variant === "harvest" && (
        <g className="text-brand-bright" stroke="currentColor" fill="none" opacity="0.85" strokeWidth="2.4" strokeLinecap="round">
          {[22, 62, 102, 142, 178].map((x, i) => (
            <g key={x} transform={`translate(${x} ${206 - (i % 2) * 12})`}>
              <path d="M0 0V-44" />
              <path d="M0-26c-11-3-16-12-16-12s11-2 16 6" />
              <path d="M0-38c11-3 16-12 16-12s-11-2-16 6" />
            </g>
          ))}
        </g>
      )}

      {variant === "market" && (
        <g className="text-ink-foreground" opacity="0.68">
          {/* Crates set down at the end of the day, produce heaped on top. */}
          <path d="M34 182h62l-9 30H43Z" fill="currentColor" />
          <path d="M106 192h58l-8 22h-42Z" fill="currentColor" opacity="0.7" />
          <g className="text-sun" fill="currentColor">
            <circle cx="52" cy="176" r="9" />
            <circle cx="70" cy="171" r="10" />
            <circle cx="88" cy="176" r="8" />
            <circle cx="128" cy="186" r="7" opacity="0.8" />
            <circle cx="145" cy="184" r="8" opacity="0.8" />
          </g>
        </g>
      )}

      <g className="text-leaf" stroke="currentColor" fill="none" opacity="0.28">
        {[0, 1, 2, 3, 4].map((i) => (
          <path key={i} d={`M${-30 + i * 60} 280 L${70 + i * 18} 214`} strokeWidth="1.2" />
        ))}
      </g>
    </svg>
  )
}
