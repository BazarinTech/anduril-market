import { Suspense } from "react"
import RegisterPage from "./register-page"

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <RegisterPage />
    </Suspense>
  )
}
