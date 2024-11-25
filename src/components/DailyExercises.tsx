import React, { useState } from 'react'
import { Exercise } from '../models/exercise'

interface DailyExercisesProps {
  date: string
  exercises: Exercise[]
}

function DailyExercises({ date, exercises }: DailyExercisesProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-md transition-shadow"
      >
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{date}</h2>
      </button>
      {isOpen && (
        <div className="mt-2 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          {exercises.map((exercise) => (
            <div key={exercise.id} className="mb-2 last:mb-0">
              <h3 className="font-medium text-gray-800 dark:text-white">{exercise.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {exercise.category}
                {exercise.weight > 0 && ` - ${exercise.weight}kg`}
                {exercise.time > 0 && ` - ${exercise.time} minutes`}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                {exercise.sets > 0 && exercise.reps > 0 ? `${exercise.sets} sets x ${exercise.reps} reps` : 'No sets/reps specified'}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DailyExercises