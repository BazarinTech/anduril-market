
export function useCurrency(amount: number | string) {
  const num = typeof amount === "string" ? parseFloat(amount) : amount

  if (isNaN(num)) return "KES 0.00"

  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num)
}