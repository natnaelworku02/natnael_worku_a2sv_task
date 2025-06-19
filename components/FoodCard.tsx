"use client"

import { Star, MoreVertical, Edit, Trash2 } from "lucide-react"
import type { Food } from "@/store/api/foodApi"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface FoodCardProps {
  food: Food
  onEdit: () => void
  onDelete: () => void
}

export default function FoodCard({ food, onEdit, onDelete }: FoodCardProps) {
  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ))
  }

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={food.avatar || "/placeholder.svg?height=200&width=300"}
          alt={food.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3 bg-orange-500 text-white px-2 py-1 rounded text-sm font-medium">
          <span className="restaurant-price">${food.price || "12.99"}</span>
        </div>
        <div className="absolute top-3 right-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="bg-white/80 hover:bg-white">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={onEdit}>
                <Edit className="w-4 h-4 mr-2" />
                Edit Food
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onDelete} className="text-red-600">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Food
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center space-x-2">
            <img
              src={food.logo || "/placeholder.svg?height=24&width=24"}
              alt={food.restaurant}
              className="w-6 h-6 rounded"
            />
            <span className="text-sm text-gray-600">{food.restaurant}</span>
          </div>
        </div>

        <h3 className="restaurant-name font-semibold text-gray-900 mb-2">{food.name}</h3>

        <div className="flex items-center space-x-1 mb-3">
          {renderStars(food.rating)}
          <span className="restaurant-rating text-sm text-gray-600 ml-1">{food.rating}</span>
        </div>

        <div className="restaurant-status">
          <span
            className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
              food.open ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {food.open ? "Open Now" : "Closed"}
          </span>
        </div>
      </div>
    </article>
  )
}
