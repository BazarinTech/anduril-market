/**
 * Platform highlights.
 *
 * This band used to show "5K+ Active Workers", "KSH 2M+ Paid Out", "50+
 * Cities" and "24hrs payouts, guaranteed". None of those numbers came from
 * anywhere. What is listed now is taken from what the product actually does.
 */
export function StatsSection() {
  const highlights = [
    { value: "M-Pesa", label: "Top up & withdraw", description: "STK push deposits" },
    { value: "3", label: "Team levels", description: "Referral rewards" },
    { value: "PIN", label: "Secured cash-outs", description: "Resettable by SMS" },
    { value: "KES", label: "Local currency", description: "No conversion" },
  ]

  return (
    <section className="bg-hero relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <dl className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {highlights.map((item) => (
            <div key={item.label} className="text-center md:text-left">
              <dd className="text-3xl font-semibold text-ink-foreground sm:text-4xl">{item.value}</dd>
              <dt className="mt-2 text-sm font-medium text-ink-foreground">{item.label}</dt>
              <p className="text-sm text-ink-foreground/60">{item.description}</p>
            </div>
          ))}
        </dl>
      </div>
      <div className="brand-hairline absolute inset-x-0 bottom-0" />
    </section>
  )
}
