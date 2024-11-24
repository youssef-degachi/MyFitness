import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomeComponent,
})
interface Exercise {
  id: number;
  type: string;
  details: string;
}

interface DayExercises {
  date: string;
  exercises: Exercise[];
}

const mockExercises: DayExercises[] = [
  {
    date: '2023-06-01',
    exercises: [
      { id: 1, type: 'Cardio', details: 'Running for 30 minutes' },
      { id: 2, type: 'Strength', details: 'Bench press 3x10' },
    ]
  },
  {
    date: '2023-06-02',
    exercises: [
      { id: 3, type: 'Flexibility', details: 'Yoga for 45 minutes' },
      { id: 4, type: 'Strength', details: 'Squats 4x12' },
      { id: 5, type: 'cold shower', details: '20 min in Cold water -20' },
    ]
  },
]
function HomeComponent() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">My Exercises</h1>
      {mockExercises.map((day) => (
        <div key={day.date} className="mb-6 bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">{day.date}</h2>
          <ul className="space-y-2">
            {day.exercises.map((exercise) => (
              <li key={exercise.id} className="flex justify-between items-center">
                <span className="font-medium text-gray-800 dark:text-white">{exercise.type}</span>
                <span className="text-gray-600 dark:text-gray-300">{exercise.details}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </main>
  </div>
  )
}
