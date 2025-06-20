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
    price: "", // Changed to string
  })

  useEffect(() => {
    if (food) {
      setFormData({
        name: food.name || "",
        rating: food.rating?.toString() || "",
        image: food.image || "",
        restaurant: food.restaurant || "",
        logo: food.logo || "",
        status: food.status || "Open Now",
        price: food.price?.toString() || "", // Ensure price is set as a string
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
          price: formData.price, // Keep price as a string
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

  if (!food) return null // Ensure modal doesn't render if food is null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-white rounded-2xl p-8">
        <DialogHeader className="text-center mb-6">
          <DialogTitle className="text-2xl font-bold text-orange-500">Edit Meal</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              id="food_name"
              name="food_name"
              placeholder="Food name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-gray-100 border-0 rounded-lg py-4 px-4 text-gray-700 placeholder-gray-500"
            />
            {errors.food_name && <p id="food-name-error" className="text-red-500 text-sm">{errors.food_name}</p>}
          </div>

          <div>
            <Input
              id="food_rating"
              name="food_rating"
              type="number"
              placeholder="Food rating"
              min="0"
              max="5"
              step="0.1"
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
              className="bg-gray-100 border-0 rounded-lg py-4 px-4 text-gray-700 placeholder-gray-500"
            />
            {errors.food_rating && <p id="food-rating-error" className="text-red-500 text-sm">{errors.food_rating}</p>}
          </div>

          <div>
            <Input
              id="food_image"
              name="food_image"
              placeholder="Food image (link)"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="bg-gray-100 border-0 rounded-lg py-4 px-4 text-gray-700 placeholder-gray-500"
            />
            {errors.food_image && <p id="food-image-error" className="text-red-500 text-sm">{errors.food_image}</p>}
          </div>

          <div>
            <Input
              id="restaurant_name"
              name="restaurant_name"
              placeholder="Restaurant name"
              value={formData.restaurant}
              onChange={(e) => setFormData({ ...formData, restaurant: e.target.value })}
              className="bg-gray-100 border-0 rounded-lg py-4 px-4 text-gray-700 placeholder-gray-500"
            />
            {errors.restaurant_name && <p id="restaurant-name-error" className="text-red-500 text-sm">{errors.restaurant_name}</p>}
          </div>

          <div>
            <Input
              id="restaurant_logo"
              name="restaurant_logo"
              placeholder="Restaurant logo (link)"
              value={formData.logo}
              onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
              className="bg-gray-100 border-0 rounded-lg py-4 px-4 text-gray-700 placeholder-gray-500"
            />
            {errors.restaurant_logo && <p id="restaurant-logo-error" className="text-red-500 text-sm">{errors.restaurant_logo}</p>}
          </div>

          <div>
            <Select
              name="restaurant_status"
              value={formData.status}
              onValueChange={(value: "Open Now" | "Closed") => setFormData({ ...formData, status: value })}
            >
              <SelectTrigger className="bg-gray-100 border-0 rounded-lg py-4 px-4 text-gray-500">
                <SelectValue placeholder="Restaurant status (open/close)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Open Now">Open Now</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Input
              id="price"
              name="price"
              type="text"
              placeholder="Enter price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="bg-gray-100 border-0 rounded-lg py-4 px-4 text-gray-700 placeholder-gray-500"
            />
            {errors.price && <p id="price-error" className="text-red-500 text-sm">{errors.price}</p>}
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
