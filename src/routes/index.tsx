import * as React from 'react';
import { useState, useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import DailyExercises from '../components/DailyExercises';
import { Exercise } from '../models/exercise';
import axios from 'axios';

export const Route = createFileRoute('/')({
  component: HomeComponent,
});

interface DayExercises {
  date: string;
  exercises: Exercise[];
}

function HomeComponent() {
  const [exercises, setExercises] = useState<DayExercises[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExercises = async () => {
      setIsLoading(true);
      setError(null);
      const userId = localStorage.getItem('userId');
      if (!userId) {
        throw new Error('User ID not found in local storage.');
      }
      
      try {
        const response = await axios.get('http://localhost:5000/api/get-exercise', {
          params: { userId: userId },
        });
        setExercises(response.data);
      } catch (err) {
        console.log("err: "+ err)
        setError('Failed to fetch exercises. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchExercises();
  }, []);

  // Helper function to format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Sort exercises by date in descending order (latest first)
  const sortedExercises = [...exercises].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime(); // Compare the dates in descending order
  });

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">My Exercises</h1>

        {isLoading && <p className="text-gray-600 dark:text-gray-300">Loading exercises...</p>}
        {error && <p className="text-red-600 dark:text-red-400">{error}</p>}

        {!isLoading && !error && exercises.length === 0 && (
          <p className="text-gray-600 dark:text-gray-300">No exercises available.</p>
        )}

        {sortedExercises.map((day) => (
          <DailyExercises 
            key={day.date} 
            date={formatDate(day.date)} 
            exercises={day.exercises} 
          />
        ))}
      </main>
    </div>
  );
}

export default HomeComponent;
