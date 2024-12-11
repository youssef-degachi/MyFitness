import React, { useState } from 'react'
import { Exercise } from '../models/exercise'

interface DailyExercisesProps {
  date: string
  exercises: Exercise[]
}
// get the data from index.tsx and show it like mini popup
function DailyExercises({ date, exercises }: DailyExercisesProps) {
  // if is open show all the detail of exercise
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left bg-gray-900 p-5 rounded-xl "
      >
        <h2 className="text-xl font-bold text-white">{date}</h2>
      </button>
      {/* show the detail of exercise */}
      {isOpen && (
        <div className="mt-2 bg-gray-700 p-4 rounded-lg">
          {exercises.map((exercise) => (
            <div key={exercise.id} className="mb-2 last:mb-0">
              <h3 className="font-semibold text-white">{exercise.title}</h3>
              <p className="text-white">
                {exercise.category}
                {exercise.weight > 0 && ` - ${exercise.weight}kg`} 
                {exercise.time > 0 && ` - ${exercise.time} minutes`}
              </p>
              <p className="text-white">
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