import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import DailyExercises from '../components/DailyExercises';
import { Exercise } from '../models/exercise';

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

interface DayExercises {
  date: string
  exercises: Exercise[]
}


// This is mock data. In a real app, you'd fetch this from your backend
const mockExercises: DayExercises[] = [
  {
    date: '2023-06-01',
    exercises: [
      {
        id: 1, title: 'Running', type: 'Cardio', category: 'Cardio', weight: 0, sets: 1, reps: 1,time: 0,date: ''
      },
      { id: 2, title: 'Bench Press', type: 'Strength', category: 'Chest', weight: 60, sets: 3, reps: 10, time: 0,date: ''},
    ]
  },
  {
    date: '2023-06-02',
    exercises: [
      { id: 3, title: 'Yoga', type: 'Flexibility', category: 'Core', weight: 0, sets: 1, reps: 1, time: 0,date: ''},
      { id: 4, title: 'Squats', type: 'Strength', category: 'Legs', weight: 80, sets: 4, reps: 12, time: 0,date: '' },
    ]
  },
]


function HomeComponent() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">My Exercises</h1>
        {mockExercises.map((day) => (
          <DailyExercises key={day.date} date={day.date} exercises={day.exercises} />
        ))}
      </main>
    </div>

  )
}
