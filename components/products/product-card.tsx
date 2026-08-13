"use client"

import Image from "next/image"
import { ArrowRight01Icon, Loading01Icon } from "hugeicons-react"
import { Progress } from "@/components/ui/progress"
import { useCurrency } from "@/lib/hooks/use-currency"
import { useState } from "react";
import { toast } from "sonner";
import { makeInvestment } from "@/lib/backend/actions";
import { useMainStore } from "@/lib/stores/use-main-store";

export function ProductCard({ID, name, image, max, duration, returns, order_limit }: Product) {
  const token = useMainStore((state) => state.token);
  const fetchMainDetails = useMainStore((state) => state.fetchMainDetails);
  const [isLoading, setLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const src = image
  ? `https://sanderson.xgramm.com/admin/uploads/${image}`
  : "/placeholder.svg";

  const handleBuyProduct = async () => {
    setLoading(true);
    try {
      const response = await makeInvestment({userID: token, prodID: ID, amount: String(max)});
      if(response.status === "Success") {
        toast.success(response.message || "Product purchased successfully!");
        fetchMainDetails(token);
      } else {
        toast.error(response.message || "Failed to buy product. Please try again.");
      }
    } catch (error) {
      console.error("Error buying product:", error);
      toast.error("Failed to buy product. Please try again.");
    }finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card rounded-xl p-4 shadow-sm border border-border w-full flex-col justify-center items-center">
      {/* Product Name */}
      <h3 className="text-lg font-semibold text-foreground mb-3">{name}</h3>

      {/* Product Info Row */}
      <div className="flex flex-col justify-center items-center w-full gap-4 mb-4">
        {/* Product Image */}
        <div className="w-80 overflow-hidden shrink-0 relative">
          {/* Loading skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted rounded-lg animate-pulse">
              <Loading01Icon className="w-8 h-8 text-muted-foreground animate-spin" />
            </div>
          )}
          <Image
            src={src || "/placeholder.svg"}
            alt={name}
            width={500}
            height={500}
            className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            unoptimized={src.startsWith("https://sanderson.xgramm.com")}
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 flex flex-col justify-center space-y-2 w-full">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-muted-foreground">Price :</span>
            <span className="text-sm font-bold text-primary">{useCurrency(max)}</span>
          </div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-muted-foreground">Cycle :</span>
            <span className="text-sm font-medium text-foreground">{duration} Days</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Daily Income :</span>
            <span className="text-sm font-bold text-primary">{useCurrency(returns)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Total Income :</span>
            <span className="text-sm font-bold text-primary">{useCurrency(Number(returns) * Number(duration))}</span>
          </div>
        </div>
      </div>

      {/* Progress Bar and Buy Button */}
      <div className="gap-2">
        {/* Progress Section */}
        <div className="flex-1 space-y-1 mb-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Order Limit</span>
            <span>{order_limit}</span>
          </div>
          <Progress value={100} className="h-2" />
        </div>

        {/* Buy Button */}
        <button className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors" disabled={isLoading} onClick={handleBuyProduct}>
        {isLoading ? <>Processing... <Loading01Icon className="w-5 h-5" /></> : <>Get Package <ArrowRight01Icon className="w-5 h-5" /></>}
          
        </button>
      </div>
    </div>
  )
}
