import * as React from 'react'
import { useState } from 'react'

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: AboutComponent,
})

const categories = ['Core', 'Back', 'Chest', 'Shoulders', 'Legs']

function AboutComponent() {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [weight, setWeight] = useState('')
  const [reps, setReps] = useState('')
  const [sets, setSets] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ title, category, weight, reps, sets })
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
        <div className="mb-4">
          <label htmlFor="weight" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Weight (kg)</label>
          <input
            type="number"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary dark:bg-gray-700 dark:text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="reps" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Number of Repetitions</label>
          <input
            type="number"
            id="reps"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary dark:bg-gray-700 dark:text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="sets" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Number of Sets</label>
          <input
            type="number"
            id="sets"
            value={sets}
            onChange={(e) => setSets(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary dark:bg-gray-700 dark:text-white"
            required
          />
        </div>
        <button type="submit" className="w-full bg-secondary text-white font-bold py-2 px-4 rounded-lg hover:bg-tertiary transition-colors">
          Add Exercise
        </button>
      </form>
    </main>
  </div>
  )
}
