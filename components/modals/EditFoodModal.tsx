"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useUpdateFoodMutation, type Food } from "@/store/api/foodApi"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface EditFoodModalProps {
  isOpen: boolean
  onClose: () => void
  food: Food | null
  onSuccess: () => void // Callback to reload data
}

export default function EditFoodModal({ isOpen, onClose, food, onSuccess }: EditFoodModalProps) {
  const [updateFood, { isLoading }] = useUpdateFoodMutation()
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [formData, setFormData] = useState({
    name: "",
    rating: "",
    image: "",
    restaurant: "",
    logo: "",
    status: "Open Now" as "Open Now" | "Closed",
    price: "",
  })

  useEffect(() => {
    if (food) {
      setFormData({
        name: food.name,
        rating: food.rating.toString(),
        image: food.image,
        restaurant: food.restaurant,
        logo: food.logo,
        status: food.status,
        price: food.price.toString(),
      })
    }
  }, [food])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.food_name = "Food Name is required"
    }

    if (!formData.rating || isNaN(Number(formData.rating))) {
      newErrors.food_rating = "Food Rating must be a number"
    }

    if (!formData.image.trim()) {
      newErrors.food_image = "Food Image URL is required"
    }

    if (!formData.restaurant.trim()) {
      newErrors.restaurant_name = "Restaurant Name is required"
    }

    if (!formData.logo.trim()) {
      newErrors.restaurant_logo = "Restaurant Logo URL is required"
    }

    if (!["Open Now", "Closed"].includes(formData.status)) {
      newErrors.restaurant_status = "Restaurant Status must be 'Open Now' or 'Closed'"
    }

    if (!formData.price.trim() || isNaN(Number(formData.price))) {
      newErrors.price = "Price must be a number"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!food || !validateForm()) return

    try {
      await updateFood({
        id: food.id,
        food: {
          ...formData,
          rating: Number(formData.rating),
          price: Number(formData.price),
        },
      }).unwrap()

      setErrors({})
      onClose() // Close the modal
      onSuccess() // Trigger data reload
    } catch (error) {
      console.error("Failed to update food:", error)
    }
  }

  const handleCancel = () => {
    setErrors({})
    onClose()
  }

  if (!food) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-white rounded-2xl p-8">
        <DialogHeader className="text-center mb-6">
          <DialogTitle className="text-2xl font-bold text-orange-500">Edit Meal</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <p className="text-sm text-gray-500 mb-2">Food name</p>
            <Input
              id="food_name"
              name="food_name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-gray-100 border-0 rounded-lg py-4 px-4 text-gray-800 font-medium"
            />
            {errors.food_name && (
              <p id="food-name-error" className="text-red-500 text-sm mt-1">
                {errors.food_name}
              </p>
            )}
            <p className="text-sm text-red-400 mt-2">Food name is required</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-2">Food rating</p>
            <Input
              id="food_rating"
              name="food_rating"
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
              className="bg-gray-100 border-0 rounded-lg py-4 px-4 text-gray-800 font-medium"
            />
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-2">Food image (link)</p>
            <Input
              id="food_image"
              name="food_image"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="bg-gray-100 border-0 rounded-lg py-4 px-4 text-gray-800 font-medium"
            />
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-2">Restaurant name</p>
            <Input
              id="restaurant_name"
              name="restaurant_name"
              value={formData.restaurant}
              onChange={(e) => setFormData({ ...formData, restaurant: e.target.value })}
              className="bg-gray-100 border-0 rounded-lg py-4 px-4 text-gray-800 font-medium"
            />
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-2">Restaurant logo (link)</p>
            <Input
              id="restaurant_logo"
              name="restaurant_logo"
              value={formData.logo}
              onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
              className="bg-gray-100 border-0 rounded-lg py-4 px-4 text-gray-800 font-medium"
            />
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-2">Restaurant status (open/close)</p>
            <Select
              name="restaurant_status"
              value={formData.status}
              onValueChange={(value: "Open Now" | "Closed") => setFormData({ ...formData, status: value })}
            >
              <SelectTrigger className="bg-gray-100 border-0 rounded-lg py-4 px-4 text-gray-800 font-medium">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Open Now">open</SelectItem>
                <SelectItem value="Closed">close</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-2">Price</p>
            <Input
              id="price"
              name="price"
              type="number"
              placeholder="Enter price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="bg-gray-100 border-0 rounded-lg py-4 px-4 text-gray-800 font-medium"
            />
            {errors.price && (
              <p id="price-error" className="text-red-500 text-sm mt-1">
                {errors.price}
              </p>
            )}
          </div>

          <div className="flex space-x-4 pt-6">
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-semibold text-lg border-0"
            >
              {isLoading ? "Saving..." : "Save"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="flex-1 bg-white border-2 border-orange-500 text-orange-500 hover:bg-orange-50 py-4 rounded-xl font-semibold text-lg"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
