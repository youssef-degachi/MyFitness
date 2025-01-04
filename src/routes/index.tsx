import * as React from "react";
import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import DailyExercises from "../components/DailyExercises";
import { Exercise } from "../models/exercise";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

interface DayExercises {
  date: string;
  exercises: Exercise[];
}

function HomeComponent() {
  /* This is the normal why with axios
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

  */

  // see if userId exist localStorage => to show the data or say login first
  const userId = localStorage.getItem("userId");
  // get exercise from database
  const {
    data: exercises = [],
    isLoading,
    error,
  } = useQuery<DayExercises[]>({
    queryKey: ["exercises"],
    queryFn: async () => {
      // check if user is exist (logged in) or stop
      const userId = localStorage.getItem("userId");
      if (!userId) {
        throw new Error("User ID not found in local storage.");
      }
      // call all exercises
      const response = await axios.get(
        "http://localhost:5000/api/get-exercise",
        {
          params: { userId: userId },
        },
      );
      return response.data;
    },
  });

  // get true format of date (year-month-day)
  // in databse is saved in database with timezoon
  // result
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1); // Months are zero-indexed
    const day = String(date.getDate());
    return `${year}-${month}-${day}`;
  };

  // sort the list of exercise
  const sortedExercises = [...exercises].sort((a, b) => {
    const d1 = new Date(a.date);
    const d2 = new Date(b.date);
    return d2.getTime() - d1.getTime();
  });

  return (
    <div className="bg-gray-800 container mx-auto px-4 py-8 mt-12 ">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-white">My Exercises</h1>
        {/* if user not exist in local storage show that he need to sign in first */}
        {userId === null ? (
          <p className="text-red-600">Sign in first</p>
        ) : (
          <>
            {/* show loading exercises */}
            {isLoading && <p className="text-white ">Loading exercises...</p>}
            {error && <p className="text-red-600 ">Sign in first</p>}
            {!isLoading && !error && exercises.length === 0 && (
              <p className="text-white">No exercises available.</p>
            )}
          </>
        )}
        {/* show all exercise after sort them */}
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
