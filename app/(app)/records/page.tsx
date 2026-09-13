import { Suspense } from "react"
import RecordPage, { TransactionListSkeleton } from "./record-page"

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="px-4 pt-4">
          <div className="w-full h-11 bg-muted rounded-lg p-1 mb-4" />
          <TransactionListSkeleton />
        </div>
      }
    >
      <RecordPage />
    </Suspense>
  )
}
