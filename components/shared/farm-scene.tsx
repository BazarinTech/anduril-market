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
