import { Card } from "@/components/ui/card"

const events = [
  {
    title: "Weekly Influencer Fund",
    image: "/colorful-event-promotion-banner.jpg",
  },
  {
    title: "Offline Meeting",
    image: "/business-meeting-with-people.jpg",
  },
]

export function EventsSection() {
  return (
    <section className="px-4 w-full mb-20 mt-10">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1 h-5 bg-accent rounded-full" />
        <h2 className="text-lg font-semibold text-foreground">Events</h2>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {events.map((event) => (
          <Card key={event.title} className="shrink-0 w-44 overflow-hidden bg-card border-border">
            <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-24 object-cover" />
            <div className="p-3">
              <p className="text-sm font-medium text-foreground text-center">{event.title}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
