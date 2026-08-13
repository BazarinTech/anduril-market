import { Suspense } from "react"
import RecordPage, { TransactionListSkeleton } from "./record-page"

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="px-4 pt-4">
          <div className="w-full h-12 bg-primary rounded-full p-1 mb-4" />
          <TransactionListSkeleton />
        </div>
      }
    >
      <RecordPage />
    </Suspense>
  )
}
