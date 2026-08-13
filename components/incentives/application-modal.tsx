"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckmarkCircle02Icon, Clock01Icon } from "hugeicons-react"
import { toast } from "sonner"
import { applyIncentives } from "@/lib/backend/actions"
import { useMainStore } from "@/lib/stores/use-main-store"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  tierName: string
  reward: string
  tierID: ID
}

export function ApplicationModal({ open, onOpenChange, tierName, reward, tierID }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const token = useMainStore((state) => state.token)
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    idNumber: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    try {
      const response = await applyIncentives({
        userID: token,
        name: formData.fullName,
        phone: formData.phoneNumber,
        idNumber: formData.idNumber,
        incentiveID: tierID,
      })
      if (response.status === "Success") {
        toast.success("Application submitted successfully")
        setIsSubmitted(true)
      } else {
        toast.error(response.message)
        setIsSubmitted(false)
      }
    } catch (error) {
      console.error("Error submitting application:", error)
      toast.error("An error occurred while submitting your application. Please try again.")
    }finally{
      setIsSubmitting(false)
      
    }
    
  }

  const handleClose = () => {
    onOpenChange(false)
    // Reset form after modal closes
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ fullName: "", phoneNumber: "", idNumber: "" })
    }, 300)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md mx-4 rounded-2xl">
        {!isSubmitted ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-primary">Agent Application</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Apply for <span className="font-semibold text-foreground">{tierName}</span> with weekly reward of{" "}
                <span className="font-semibold text-primary">{reward}</span>
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-medium">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                  className="rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="text-sm font-medium">
                  Phone Number
                </Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="e.g. 0712345678"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  required
                  className="rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="idNumber" className="text-sm font-medium">
                  ID Number
                </Label>
                <Input
                  id="idNumber"
                  placeholder="Enter your national ID number"
                  value={formData.idNumber}
                  onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                  required
                  className="rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
                />
              </div>

              <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-lg text-amber-800 text-sm">
                <Clock01Icon size={18} className="shrink-0" />
                <span>Applications are reviewed within 12 hours</span>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl py-6 font-semibold"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckmarkCircle02Icon size={40} className="text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Application Submitted!</h3>
            <p className="text-muted-foreground mb-1">
              Your application for <span className="font-semibold">{tierName}</span> has been received.
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              We will review and respond within <span className="font-semibold text-primary">12 hours</span>.
            </p>
            <Button onClick={handleClose} className="bg-primary hover:bg-primary/90 text-white rounded-xl px-8">
              Done
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
