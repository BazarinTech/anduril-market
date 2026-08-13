import React from 'react'
import { Card } from '../ui/card'

type Props = {
    className?: string
}

function WalletCard({ className }: Props) {
  return (
    <Card className={`p-4 bg-primary text-secondary ${className}`}>
        <div className="w-full border-b-2 border-accent border-dotted pb-4">
            <h2 className="text-lg font-semibold mb-2">Wallet Balance</h2>
            <p className="text-2xl font-bold">Kes 1,250.00</p>
        </div>

        <div className="flex justify-between">
            <div className="w-[50%] border-r-2 border-accent border-dotted">
                <h3 className="text-md font-medium">Total Income</h3>
                <p className="text-xl font-bold">Kes 2,500.00</p>
            </div>
            <div className="w-[50%] px-2">
                <h3 className="text-md font-medium">Total Order</h3>
                <p className="text-xl font-bold">Kes 1,250.00</p>
            </div>
        </div>
      
    </Card>
  )
}

export default WalletCard