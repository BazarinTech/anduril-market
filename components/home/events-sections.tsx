import { Megaphone01Icon, UserGroupIcon } from "hugeicons-react"

const events = [
  {
    title: "Weekly Influencer Fund",
    caption: "Reward tiers",
    icon: Megaphone01Icon,
  },
  {
    title: "Offline Meeting",
    caption: "Community",
    icon: UserGroupIcon,
  },
]

export function EventsSection() {
  return (
    <section className="w-full">
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="text-base font-semibold text-foreground">Events</h2>
        <span className="text-eyebrow text-muted-foreground">Bima</span>
      </div>
      <div className="scrollbar-hide flex gap-3 overflow-x-auto pb-2">
        {events.map((event) => {
          const Icon = event.icon
          return (
            <article
              key={event.title}
              className="w-44 shrink-0 overflow-hidden rounded-xl bg-card ring-1 ring-border/70"
            >
              <div className="bg-hero relative flex h-24 items-end p-3">
                <Icon className="absolute top-3 right-3 size-6 text-brand-bright" strokeWidth={1.5} />
                <span className="text-eyebrow text-ink-foreground/70">{event.caption}</span>
                <div className="brand-hairline absolute inset-x-0 bottom-0" />
              </div>
              <p className="p-3 text-sm font-medium text-foreground">{event.title}</p>
            </article>
          )
        })}
      </div>
    </section>
  )
}
