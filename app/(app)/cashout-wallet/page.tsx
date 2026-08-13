"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "@/components/auth/password-input"
import {
  SmartPhone01Icon,
  UserIcon,
  Wallet01Icon,
  CheckmarkCircle01Icon,
  InformationCircleIcon,
  Edit01Icon,
  LockPasswordIcon,
} from "hugeicons-react"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import Topbar from "@/components/shared/topbar"
import { useMainStore } from "@/lib/stores/use-main-store"
import { toast } from "sonner"
import { cashoutWalletSetup } from "@/lib/backend/actions"

type ViewMode = "display" | "setup" | "edit" | "change-pin"

export default function CashoutWalletPage() {
  const [mpesaPhone, setMpesaPhone] = useState("")
  const [accountName, setAccountName] = useState("")
  const [currentPin, setCurrentPin] = useState("")
  const [newPin, setNewPin] = useState("")
  const [confirmPin, setConfirmPin] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [hasExistingWallet, setHasExistingWallet] = useState(false)
  const [viewMode, setViewMode] = useState<ViewMode>("display")
  const loginState = useMainStore((state) => state.loginState)
  const mainDetails = useMainStore((state) => state.mainDetails)
  const fetchMainDetails = useMainStore((state) => state.fetchMainDetails)
  const token = useMainStore((state) => state.token)

    useEffect(() => {
      loginState()
    }, [loginState])


  useEffect(() => {

    let userHasWallet = false 
    if(mainDetails){
      if(mainDetails.wallet.withdrawal_account == ""){
        userHasWallet = false
      }else{
        userHasWallet = true
      }

      if (userHasWallet) {
        const existingData = {
          mpesaPhone: mainDetails.wallet.withdrawal_account,
          accountName: mainDetails.wallet.withdrawal_name,
        }
        setMpesaPhone(existingData.mpesaPhone)
        setAccountName(existingData.accountName)
        setHasExistingWallet(true)
        setViewMode("display")
      } else {
        setHasExistingWallet(false)
        setViewMode("setup")
      }
    }
    
  }, [mainDetails])

  const resetForm = () => {
    setCurrentPin("")
    setNewPin("")
    setConfirmPin("")
    setError("")
  }

  const handleSetupSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!mpesaPhone || !accountName) {
      setError("Please fill in all required fields")
      return
    }

    if (!/^0\d{9}$/.test(mpesaPhone) && !/^254\d{9}$/.test(mpesaPhone)) {
      setError("Please enter a valid M-Pesa phone number")
      return
    }

    if (!newPin) {
      setError("Please set a withdrawal PIN")
      return
    }

    if (newPin.length < 4) {
      setError("PIN must be at least 4 digits")
      return
    }

    if (newPin !== confirmPin) {
      setError("PINs do not match")
      return
    }

    setIsLoading(true)
    try {
      const response = await cashoutWalletSetup({
        userID: token,
        phone: mpesaPhone,
        accountName,
        pin: newPin,
        type: "create",
      })
      if (response.status == 'Success') {
        fetchMainDetails(token)
        setHasExistingWallet(true)
        setViewMode("display")
        setSuccessMessage("Your withdrawal wallet has been set up successfully.")
        setShowSuccess(true)
        setTimeout(() => setShowSuccess(false), 2000)
        toast.success(response.message)
      }else{
        toast.error(response.message)
      }
    } catch (error) {
      console.error("Error setting up wallet:", error)
      toast.error("Failed to set up wallet. Please try again.")
    }finally {
      setIsLoading(false)
      resetForm()
      
    }
    
  }

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!mpesaPhone || !accountName) {
      setError("Please fill in all required fields")
      return
    }

    if (!/^0\d{9}$/.test(mpesaPhone) && !/^254\d{9}$/.test(mpesaPhone)) {
      setError("Please enter a valid M-Pesa phone number")
      return
    }

    if (!currentPin) {
      setError("Please enter your current withdrawal PIN to confirm changes")
      return
    }

    if (currentPin.length < 4) {
      setError("Invalid PIN")
      return
    }

    // // Mock PIN verification - in real app, verify against backend
    // const correctPin = mainDetails?.wallet.withdrawal_pin || "1234"
    // if (currentPin !== correctPin) {
    //   setError("Incorrect withdrawal PIN")
    //   return
    // }

    setIsLoading(true)
    try {
      const response = await cashoutWalletSetup({
        userID: token,
        phone: mpesaPhone,
        accountName,
        pin: currentPin,
        type: "update",
      })
      if (response.status == 'Success') {
        fetchMainDetails(token)
        toast.success(response.message)
        setViewMode("display")

        setSuccessMessage("Your wallet details have been updated successfully.")
        setShowSuccess(true)
        setTimeout(() => setShowSuccess(false), 2000)
      }else{
        toast.error(response.message)
      }
    } catch (error) {
      console.error("Error updating wallet:", error)
      toast.error("Failed to update wallet. Please try again.")
      
    }finally {
      setIsLoading(false)
      resetForm()
    }
    
  }

  const handleChangePinSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!currentPin) {
      setError("Please enter your current PIN")
      return
    }

    // // Mock PIN verification
    // const correctPin = mainDetails?.wallet.withdrawal_pin || "1234"
    // if (currentPin !== correctPin) {
    //   setError("Incorrect withdrawal PIN")
    //   return
    // }

    if (!newPin) {
      setError("Please enter a new PIN")
      return
    }

    if (newPin.length < 4) {
      setError("New PIN must be at least 4 digits")
      return
    }

    if (newPin === currentPin) {
      setError("New PIN must be different from current PIN")
      return
    }

    if (newPin !== confirmPin) {
      setError("New PINs do not match")
      return
    }

    setIsLoading(true)
    try {
      const response = await cashoutWalletSetup({
        userID: token,
        phone: mpesaPhone,
        accountName,
        pin: newPin,
        type: "update_pin",
      })
      if (response.status == 'Success') {
        fetchMainDetails(token)
        toast.success(response.message)
        setViewMode("display")

        setSuccessMessage("Your wallet details have been updated successfully.")
        setShowSuccess(true)
        setTimeout(() => setShowSuccess(false), 2000)
      }else{
        toast.error(response.message)
      }
    } catch (error) {
      console.error("Error updating wallet:", error)
      toast.error("Failed to update wallet. Please try again.")
      
    }finally {
      setIsLoading(false)
      resetForm()
    }
  }

  return (
    <div>
      <Topbar title="Withdrawal Wallet" backBtn />

      <div className="flex-1 px-6 py-6">
        {/* Info Card */}
        <div className="bg-primary/10 rounded-xl p-4 mb-6 flex gap-3">
          <InformationCircleIcon size={24} className="text-primary shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-sm text-primary">Important Notice</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {hasExistingWallet
                ? "Your withdrawals will be sent to the number below. Keep your PIN secure."
                : "Set up your M-Pesa withdrawal details to start receiving payments."}
            </p>
          </div>
        </div>

        {/* Current Wallet Display */}
        {hasExistingWallet && viewMode === "display" && (
          <div className="bg-card border border-border rounded-xl p-5 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Wallet01Icon size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">M-Pesa Wallet</h3>
                  <p className="text-sm text-muted-foreground">Withdrawal Account</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  resetForm()
                  setViewMode("edit")
                }}
                className="gap-2"
              >
                <Edit01Icon size={16} />
                Edit
              </Button>
            </div>

            <div className="space-y-3 pt-3 border-t border-border">
              <div className="flex justify-between">
                <span className="text-muted-foreground text-sm">Phone Number</span>
                <span className="font-medium">{mpesaPhone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground text-sm">Account Name</span>
                <span className="font-medium">{accountName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground text-sm">Withdrawal PIN</span>
                <span className="font-medium text-green-600">Set</span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full mt-4 gap-2 bg-transparent"
              onClick={() => {
                resetForm()
                setViewMode("change-pin")
              }}
            >
              <LockPasswordIcon size={18} />
              Change Withdrawal PIN
            </Button>
          </div>
        )}

        {/* Setup Form - for new users without wallet */}
        {viewMode === "setup" && (
          <form onSubmit={handleSetupSubmit} className="space-y-5">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-3 flex items-center justify-center">
                <Wallet01Icon size={32} className="text-primary" />
              </div>
              <h2 className="text-lg font-semibold">Set Up Withdrawal Wallet</h2>
              <p className="text-muted-foreground text-sm mt-1">
                Configure your M-Pesa withdrawal account to receive payments
              </p>
            </div>

            {error && (
              <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg text-center">{error}</div>
            )}

            <div className="space-y-2">
              <Label htmlFor="mpesaPhone">M-Pesa Phone Number *</Label>
              <div className="relative">
                <SmartPhone01Icon
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  id="mpesaPhone"
                  type="tel"
                  value={mpesaPhone}
                  onChange={(e) => setMpesaPhone(e.target.value)}
                  placeholder="0712345678"
                  className="pl-10 h-12"
                />
              </div>
              <p className="text-xs text-muted-foreground">The number registered with M-Pesa</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="accountName">Account Name *</Label>
              <div className="relative">
                <UserIcon size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="accountName"
                  type="text"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  placeholder="Enter your full name"
                  className="pl-10 h-12"
                />
              </div>
              <p className="text-xs text-muted-foreground">Must match your M-Pesa registered name</p>
            </div>

            <div className="h-px bg-border my-4" />

            <div className="space-y-2">
              <Label htmlFor="newPin">Withdrawal PIN *</Label>
              <PasswordInput
                id="newPin"
                name="newPin"
                value={newPin}
                onChange={setNewPin}
                placeholder="Enter 4-6 digit PIN"
              />
              <p className="text-xs text-muted-foreground">This PIN will be required when making withdrawals</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPin">Confirm PIN *</Label>
              <PasswordInput
                id="confirmPin"
                name="confirmPin"
                value={confirmPin}
                onChange={setConfirmPin}
                placeholder="Confirm your PIN"
              />
            </div>

            <Button type="submit" className="w-full h-12 text-lg font-semibold" disabled={isLoading}>
              {isLoading ? "Saving..." : "Set Up Wallet"}
            </Button>
          </form>
        )}

        {/* Edit Form - requires current PIN for security */}
        {viewMode === "edit" && (
          <form onSubmit={handleUpdateSubmit} className="space-y-5">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-3 flex items-center justify-center">
                <Edit01Icon size={32} className="text-primary" />
              </div>
              <h2 className="text-lg font-semibold">Update Wallet Details</h2>
              <p className="text-muted-foreground text-sm mt-1">Modify your withdrawal information</p>
            </div>

            {error && (
              <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg text-center">{error}</div>
            )}

            <div className="space-y-2">
              <Label htmlFor="mpesaPhoneEdit">M-Pesa Phone Number *</Label>
              <div className="relative">
                <SmartPhone01Icon
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  id="mpesaPhoneEdit"
                  type="tel"
                  value={mpesaPhone}
                  onChange={(e) => setMpesaPhone(e.target.value)}
                  placeholder="0712345678"
                  className="pl-10 h-12"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="accountNameEdit">Account Name *</Label>
              <div className="relative">
                <UserIcon size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="accountNameEdit"
                  type="text"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  placeholder="Enter your full name"
                  className="pl-10 h-12"
                />
              </div>
            </div>

            <div className="h-px bg-border my-4" />

            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-2">
              <p className="text-sm text-orange-700 font-medium">Security Verification</p>
              <p className="text-xs text-orange-600 mt-1">Enter your current withdrawal PIN to confirm these changes</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentPinEdit">Current Withdrawal PIN *</Label>
              <PasswordInput
                id="currentPinEdit"
                name="currentPinEdit"
                value={currentPin}
                onChange={setCurrentPin}
                placeholder="Enter your current PIN"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1 h-12 bg-transparent"
                onClick={() => setViewMode("display")}
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1 h-12 text-lg font-semibold" disabled={isLoading}>
                {isLoading ? "Updating..." : "Update Wallet"}
              </Button>
            </div>
          </form>
        )}

        {/* Change PIN Form - separate form for PIN updates */}
        {viewMode === "change-pin" && (
          <form onSubmit={handleChangePinSubmit} className="space-y-5">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-3 flex items-center justify-center">
                <LockPasswordIcon size={32} className="text-primary" />
              </div>
              <h2 className="text-lg font-semibold">Change Withdrawal PIN</h2>
              <p className="text-muted-foreground text-sm mt-1">Update your withdrawal security PIN</p>
            </div>

            {error && (
              <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg text-center">{error}</div>
            )}

            <div className="space-y-2">
              <Label htmlFor="oldPin">Current PIN *</Label>
              <PasswordInput
                id="oldPin"
                name="oldPin"
                value={currentPin}
                onChange={setCurrentPin}
                placeholder="Enter your current PIN"
              />
            </div>

            <div className="h-px bg-border my-4" />

            <div className="space-y-2">
              <Label htmlFor="newPinChange">New PIN *</Label>
              <PasswordInput
                id="newPinChange"
                name="newPinChange"
                value={newPin}
                onChange={setNewPin}
                placeholder="Enter new 4-6 digit PIN"
              />
              <p className="text-xs text-muted-foreground">Must be different from your current PIN</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmNewPin">Confirm New PIN *</Label>
              <PasswordInput
                id="confirmNewPin"
                name="confirmNewPin"
                value={confirmPin}
                onChange={setConfirmPin}
                placeholder="Confirm your new PIN"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1 h-12 bg-transparent"
                onClick={() => setViewMode("display")}
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1 h-12 text-lg font-semibold" disabled={isLoading}>
                {isLoading ? "Changing..." : "Change PIN"}
              </Button>
            </div>
          </form>
        )}

        {/* Security Notice */}
        <div className="mt-8 p-4 bg-orange-50 border border-orange-200 rounded-xl">
          <h3 className="font-semibold text-sm text-orange-700 mb-2">Security Tips:</h3>
          <ul className="text-sm text-orange-600 space-y-1">
            <li>• Never share your withdrawal PIN with anyone</li>
            <li>• Use a unique PIN different from other accounts</li>
            <li>• Contact support if you suspect unauthorized access</li>
          </ul>
        </div>
      </div>

      {/* Success Dialog */}
      <AlertDialog open={showSuccess}>
        <AlertDialogContent className="max-w-sm mx-auto rounded-2xl">
          <AlertDialogHeader className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <CheckmarkCircle01Icon size={32} className="text-green-600" />
            </div>
            <AlertDialogTitle className="text-center">Success!</AlertDialogTitle>
            <AlertDialogDescription className="text-center">{successMessage}</AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
