"use client"

import { useState } from "react"
import { Search, Truck, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface HeroSectionProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
}

export default function HeroSection({ searchQuery, setSearchQuery }: HeroSectionProps) {
  const [activeTab, setActiveTab] = useState<"delivery" | "pickup">("delivery")

  const handleSearch = () => {
    // Search functionality is handled in FeaturedMeals component
  }

  return (
    <section className="bg-gradient-to-r from-orange-400 to-orange-500 px-4 py-16 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="text-white">
            <h1 className="text-4xl lg:text-6xl font-bold mb-4">Are you starving?</h1>
            <p className="text-lg lg:text-xl mb-8 opacity-90">
              Within a few clicks, find meals that are accessible near you
            </p>

            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="flex mb-4">
                <button
                  onClick={() => setActiveTab("delivery")}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === "delivery" ? "bg-orange-100 text-orange-600" : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Truck className="w-4 h-4" />
                  <span>Delivery</span>
                </button>
                <button
                  onClick={() => setActiveTab("pickup")}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === "pickup" ? "bg-orange-100 text-orange-600" : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  <span>Pickup</span>
                </button>
              </div>

              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="search-bar"
                    type="text"
                    placeholder="What do you like to eat today?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 py-3 border-gray-300 focus:border-orange-500 focus:ring-orange-500 text-black"
                  />
                </div>
                <Button
                  onClick={handleSearch}
                  className="px-6 py-3 font-medium text-white rounded-lg"
                  style={{
                    background: "linear-gradient(95.71deg, #FF7A7A -39.64%, #F75900 135.31%)",
                  }}
                >
                  Find Meal
                </Button>
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <img
              src="/images/hero-food.png"
              alt="Delicious food options"
              className="w-full h-auto max-w-md mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
