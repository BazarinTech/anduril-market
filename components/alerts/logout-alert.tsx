'use client'

import React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useMainStore } from '@/lib/stores/use-main-store'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

type Props = {
    isOpen: boolean
    onClose: () => void
}

function LogoutAlert({isOpen, onClose}: Props) {
    const logout = useMainStore.getState().logout
    const router = useRouter()

    const handleLogout = async() => {
        await logout()

        // Read the result *after* awaiting, straight from the store.
        //
        // This used to check a `useMainStore(state => state.isLogin)`
        // subscription, but that value is captured when the render creating
        // this closure ran -- i.e. while still signed in. It stayed `true`
        // after a successful logout, so every attempt fell into the error
        // branch and never redirected; only a second click (post re-render)
        // worked. getState() always reads the current value.
        if (useMainStore.getState().isLogin) {
            toast.error('Seems an error occured and logout operation did not complete!')
            return
        }

        // replace, not push: the signed-in page must not sit in history behind
        // /login, where the back button would restore its shell.
        router.replace('/login')
    }
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
                You will be automatically logged out of your account
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className='bg-red-400 text-white' onClick={handleLogout}>Logout</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  )
}

export default LogoutAlert