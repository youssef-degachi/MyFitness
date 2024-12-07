/*
 * this file for add new exercise
 * will add the exercise detail (title[name of exercise], category, weight, time, reps, and sets and date[default value is today])
 * will add this exercise for database with api request for =>url/api/add_exercises
 */

import * as React from 'react'
import { useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/exercise')({
  component: AboutComponent,
})


// the category exist 
const categories = ['Core', 'Back', 'Chest', 'Shoulders', 'Legs','Cardio']

function AboutComponent() {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [weight, setWeight] = useState('')
  const [time, setTime] = useState('')
  const [reps, setReps] = useState('')
  const [sets, setSets] = useState('')
  const [date, setDate] = useState(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // call api on this endpoint with post method
      const response = await fetch('http://localhost:5000/api/add_exercises', {
        method: 'POST',
        body: JSON.stringify({  date, title, category, weight, time, reps, sets }),
      })
      // this for what will happen after response is work success
      if (response.ok) {
        // show the result
        const newExercise = await response.json()
        console.log('Exercise added:', newExercise)
        // return all the code for nothing
        setTitle('')
        setCategory('')
        setWeight('')
        setTime('')
        setReps('')
        setSets('')
        setDate(null)
      } else {
        // in cas => "response not work" //! Show error message
        console.error('Failed to add exercise')
      }
    } catch (error) {
      console.error('Error:', error)
      // Show error message
    }
  }

  return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Add Exercise</h1>
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
          <div className="mb-4">
            <label className="block text-black-300 font-bold mb-2">Title</label>
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
            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Category</label>
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
              <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Weight (kg)</label>
              <input
                type="number"
                id="weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Time (minutes)</label>
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
              <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Sets</label>
              <input
                type="number"
                id="sets"
                value={sets}
                onChange={(e) => setSets(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Reps</label>
              <input
                type="number"
                id="reps"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
          
          <div className='flex'>
            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2 mt-2">Date:</label>
            <input
                type="date"
                id='date'
                onChange={() => setDate(date)} // This will give us the date in the format YYYY-MM-DD
                className="mx-5 px-4 py-2  dark:bg-gray-700 border rounded-md"
              />
          </div>
          <button type="submit" className="w-full bg-secondary text-white font-bold py-2 px-4 rounded-lg hover:bg-tertiary transition-colors">
            Add Exercise
          </button>
        </form>
      </div>
  )
}
