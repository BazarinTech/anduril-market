export function VideoHero() {
  return (
    <div className="relative w-full overflow-hidden rounded-xl">
      <img
        src="/sanderson-hero.jpg"
        alt="Sanderson Farms"
        className="w-full h-auto object-cover max-h-75"
      />
      <div className="absolute inset-0 bg-linear-to-t from-foreground/60 via-transparent to-transparent" />
    </div>
  )
}
