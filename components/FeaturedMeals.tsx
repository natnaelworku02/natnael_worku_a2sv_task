"use client"

import { useState } from "react"
import { useGetFoodsQuery, useSearchFoodsQuery, type Food } from "@/store/api/foodApi"
import FoodCard from "./FoodCard"
import { Button } from "@/components/ui/button"

interface FeaturedMealsProps {
  searchQuery: string
  onEditFood: (food: Food) => void
  onDeleteFood: (food: Food) => void
}

export default function FeaturedMeals({ searchQuery, onEditFood, onDeleteFood }: FeaturedMealsProps) {
  const [displayedItems, setDisplayedItems] = useState(8)
  const { data: allFoods, isLoading: isLoadingAll } = useGetFoodsQuery()
  const { data: searchResults, isLoading: isSearching } = useSearchFoodsQuery(searchQuery, {
    skip: !searchQuery.trim(),
  })

  const foods = searchQuery.trim() ? searchResults : allFoods
  const isLoading = searchQuery.trim() ? isSearching : isLoadingAll

  const handleLoadMore = () => {
    setDisplayedItems((prev) => prev + 4)
  }

  if (isLoading) {
    return (
      <section className="px-4 py-16 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Featured Meals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-80"></div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (!foods || foods.length === 0) {
    return (
      <section className="px-4 py-16 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Featured Meals</h2>
          <div className="empty-state-message text-center py-12">
            <p className="text-gray-500 text-lg">No items available</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="px-4 py-16 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Featured Meals</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {foods.slice(0, displayedItems).map((food) => (
            <FoodCard key={food.id} food={food} onEdit={() => onEditFood(food)} onDelete={() => onDeleteFood(food)} />
          ))}
        </div>

        {foods.length > displayedItems && (
          <div className="text-center">
            <Button
              onClick={handleLoadMore}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-medium"
            >
              Load more →
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
