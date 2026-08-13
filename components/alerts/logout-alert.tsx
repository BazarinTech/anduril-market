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
    const loginState = useMainStore(state => state.loginState)
    const islogin = useMainStore((state) => state.isLogin)
    const router = useRouter()

    const handleLogout = async() => {
        await logout()
        loginState()
        
        if (!islogin) {
            router.push('/login')
        }else{
            toast.error('Seems an error occured and logout operation did not complete!')
        }
        
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