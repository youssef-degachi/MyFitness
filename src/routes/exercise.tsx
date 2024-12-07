import React, { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import axios from "axios"
const categories = ['Core', 'Back', 'Chest', 'Shoulders', 'Legs', 'Cardio'];
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const Route = createFileRoute('/exercise')({
  component: AboutComponent,
});

function AboutComponent() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [weight, setWeight] = useState('');
  const [time, setTime] = useState('');
  const [reps, setReps] = useState('');
  const [sets, setSets] = useState('');
  const [date, setDate] = useState<string | null>(null);


  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    setTitle('');
    setCategory('');
    setWeight('');
    setTime('');
    setReps('');
    setSets('');
    setDate(null);
    try {
      const response = await axios.post('http://localhost:5000/api/add-exercise', {
        date,
        title,
        category,
        weight,
        sets,
        reps,
        time,
      });
      alert('Exercise added successfully!');
      console.log('Exercise added:', response.data);
      
      
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add exercise');
    }
  };

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
        <div className="flex">
          <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2 mt-2">Date:</label>
          <input
            type="date"
            id="date"
            value={date || ''}
            onChange={(e) => setDate(e.target.value)} // Update the date value here
            className="mx-5 px-4 py-2 dark:bg-gray-700 border rounded-md"
          />
        </div>
        <button type="submit" className="w-full bg-secondary text-white font-bold py-2 px-4 rounded-lg hover:bg-tertiary transition-colors">
          Add Exercise
        </button>
      </form>
    </div>
  );
}

export default AboutComponent;
