"use client"

import { useDeleteFoodMutation, type Food } from "@/store/api/foodApi"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface DeleteFoodModalProps {
  isOpen: boolean
  onClose: () => void
  food: Food | null
  onSuccess: () => void // Callback to reload data
}

export default function DeleteFoodModal({ isOpen, onClose, food, onSuccess }: DeleteFoodModalProps) {
  const [deleteFood, { isLoading }] = useDeleteFoodMutation()

  const handleDelete = async () => {
    if (!food) return

    try {
      await deleteFood(food.id).unwrap()
      onClose() // Close the modal
      onSuccess() // Trigger data reload
    } catch (error) {
      console.error("Failed to delete food:", error)
    }
  }

  if (!food) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white rounded-2xl p-8">
        <DialogHeader className="text-center mb-6">
          <DialogTitle className="text-2xl font-bold text-orange-500">Delete Meal</DialogTitle>
        </DialogHeader>

        <div className="text-center mb-8">
          <p className="text-gray-600 text-lg">
            Are you sure you want to delete this meal? Actions cannot be reversed.
          </p>
        </div>

        <div className="flex space-x-4">
          <Button
            id="delete-food-button"
            onClick={handleDelete}
            disabled={isLoading}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-semibold text-lg border-0"
          >
            {isLoading ? "Deleting..." : "Yes"}
          </Button>
          <Button
            id="cancel-delete-button"
            variant="outline"
            onClick={onClose}
            className="flex-1 bg-white border-2 border-orange-500 text-orange-500 hover:bg-orange-50 py-4 rounded-xl font-semibold text-lg"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
