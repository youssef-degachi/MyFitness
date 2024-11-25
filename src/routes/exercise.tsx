import * as React from 'react'
import { useState } from 'react'

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/exercise')({
  component: AboutComponent,
})

const categories = ['Core', 'Back', 'Chest', 'Shoulders', 'Legs']

function AboutComponent() {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [weight, setWeight] = useState('')
  const [time, setTime] = useState('')
  const [reps, setReps] = useState('')
  const [sets, setSets] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:3001/api/exercises', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, category, weight, time, reps, sets }),
      })
      if (response.ok) {
        const newExercise = await response.json()
        console.log('Exercise added:', newExercise)
        // Reset form or show success message
        setTitle('')
        setCategory('')
        setWeight('')
        setTime('')
        setReps('')
        setSets('')
      } else {
        console.error('Failed to add exercise')
        // Show error message
      }
    } catch (error) {
      console.error('Error:', error)
      // Show error message
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Add Exercise</h1>
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary dark:bg-gray-700 dark:text-white"
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="mb-4 flex space-x-4">
            <div className="flex-1">
              <label htmlFor="weight" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Weight (kg)</label>
              <input
                type="number"
                id="weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="time" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Time (minutes)</label>
              <input
                type="number"
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
          <div className="mb-4 flex space-x-4">
            <div className="flex-1">
              <label htmlFor="sets" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Sets</label>
              <input
                type="number"
                id="sets"
                value={sets}
                onChange={(e) => setSets(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="reps" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Reps</label>
              <input
                type="number"
                id="reps"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
          <button type="submit" className="w-full bg-secondary text-white font-bold py-2 px-4 rounded-lg hover:bg-tertiary transition-colors">
            Add Exercise
          </button>
        </form>
      </main>
    </div>
  )
}
