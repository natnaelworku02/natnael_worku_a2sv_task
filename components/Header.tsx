"use client"

import { Button } from "@/components/ui/button"

interface HeaderProps {
  onAddMeal: () => void
}

export default function Header({ onAddMeal }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm px-4 py-4 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img src="/images/logo.png" alt="FoodWagen Logo" className="w-8 h-8" />
          <span className="text-xl font-bold text-gray-900">FoodWagen</span>
        </div>

        <Button
          onClick={onAddMeal}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium"
        >
          Add Meal
        </Button>
      </div>
    </header>
  )
}
