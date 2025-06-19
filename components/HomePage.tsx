"use client"

import { useState } from "react"
import Header from "./Header"
import HeroSection from "./HeroSection"
import FeaturedMeals from "./FeaturedMeals"
import Footer from "./Footer"
import AddFoodModal from "./modals/AddFoodModal"
import EditFoodModal from "./modals/EditFoodModal"
import DeleteFoodModal from "./modals/DeleteFoodModal"
import type { Food } from "@/store/api/foodApi"

export default function HomePage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedFood, setSelectedFood] = useState<Food | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const handleEditFood = (food: Food) => {
    setSelectedFood(food)
    setIsEditModalOpen(true)
  }

  const handleDeleteFood = (food: Food) => {
    setSelectedFood(food)
    setIsDeleteModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-white">
      <Header onAddMeal={() => setIsAddModalOpen(true)} />
      <HeroSection searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <FeaturedMeals searchQuery={searchQuery} onEditFood={handleEditFood} onDeleteFood={handleDeleteFood} />
      <Footer />

      <AddFoodModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />

      <EditFoodModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} food={selectedFood} />

      <DeleteFoodModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} food={selectedFood} />
    </div>
  )
}
