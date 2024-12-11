import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useForm } from '@tanstack/react-form';
import axios from "axios"
import { QueryClient, useMutation } from '@tanstack/react-query';

const categories = ['Core', 'Back', 'Chest', 'Shoulders', 'Legs', 'Cardio'];

export const Route = createFileRoute('/exercise')({
  component: ExerciseComponent,
});

function ExerciseComponent() {
  // useMutatoin to do my requst with react-query
  // call the function to add exercise to database using axios 
  const addExerciseMutation = useMutation({
    mutationFn: async (exerciseData) => {
      // check if user is exist (logged in)
      const userId = localStorage.getItem('userId');
      if (!userId) {
        throw new Error('Login First');
      }
      // call api of add exercise
      const response = await axios.post('http://localhost:5000/api/add-exercise', {
        ...exerciseData,
        userId,
      });
      return response.data;
    },//if is successful return alert show that is added
    onSuccess: () => {    
      alert('Exercise added successfully!');
      form.reset();
    },// if is failed show alert 
    onError: (error) => {
      console.error('Error:', error);
      alert(error.message || 'Failed to add exercise');
    }
  });
  // read the exercise data using 'tanstack form'
  const form = useForm({
    defaultValues: {
      title: '',
      category: '',
      weight: '',
      time: '',
      reps: '',
      sets: '',
      date: null as string | null,
    },// in submit the data get from useForm will send to the api
    onSubmit: async ({ value }) => {
      addExerciseMutation.mutate(value);
    },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-white">Add Exercise</h1>
      {/* create form */}
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }} 
        className="bg-gray-900 shadow-2xl rounded-xl p-6"
      >
        <div className="mb-4">
          <label className="block text-white font-bold mb-2">Title</label>
          {/*  input the name of exercise with useForm*/}
          <form.Field
            name="title"
            validators={{
              onBlur: ({ value }) => {
                if (!value) return "you let title empty";},
            }}
            children={(field) => (
              <input
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl focus:outline-none bg-gray-700 text-white"
                required
              />
            )}
          />
        </div>

        <div className="mb-4">
          {/*  input the category of exercise with useForm*/}
          <label className="block text-white font-bold mb-2">Category</label>
          <form.Field
            name="category"
            validators={{
              onBlur: ({ value }) => {
                if (!value) return "Category is required";
              },
            }}
            children={(field) => (
              <select
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl focus:outline-none bg-gray-700 text-white"
                required
              >
                <option value="">Select category</option>
                {categories.map((catg) => (
                  <option key={catg} value={catg}>{catg}</option>
                ))}
              </select>
            )}
          />
        </div>
          {/* split the wight , time , sets and reps in 2 in same line  */}
        <div className="mb-4 flex space-x-4">
          <div className="flex-1">
        {/*  input the Weight of exercise with useForm*/}
            <label className="block text-white font-bold mb-2">Weight (kg)</label>
            <form.Field
              name="weight"
              children={(field) => (
                <input
                  type="number"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl focus:outline-none bg-gray-700 text-white"
                />
              )}
            />
          </div>
          <div className="flex-1">
        {/*  input the time of exercise with useForm*/}
            <label className="block text-white font-bold mb-2">Time (min)</label>
            <form.Field
              name="time"
              children={(field) => (
                <input
                  type="number"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl focus:outline-none bg-gray-700 text-white"
                />
              )}
            />
          </div>
        </div>

        <div className="mb-4 flex space-x-4">
          <div className="flex-1">
        {/*  input the Sets of exercise with useForm*/}
            <label className="block text-white font-bold mb-2">Sets</label>
            <form.Field
              name="sets"
              children={(field) => (
                <input
                  type="number"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl focus:outline-none bg-gray-700 text-white"
                />
              )}
            />
          </div>
          <div className="flex-1">
        {/*  input the Reps of exercise with useForm*/}
            <label className="block text-white font-bold mb-2">Reps</label>
            <form.Field
              name="reps"
              children={(field) => (
                <input
                  type="number"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl focus:outline-none bg-gray-700 text-white"
                />
              )}
            />
          </div>
        </div>

        <div className="flex">
        {/*  input the date of exercise with useForm*/}

          <label className="block text-white font-bold mb-2 mt-2">Date:</label>
          <form.Field
            name="date"
            children={(field) => (
              <input
                type="date"
                value={field.state.value || ''}
                onChange={(e) => field.handleChange(e.target.value)}
                className="mx-5 px-4 py-2 bg-gray-700 border rounded-md"
              />
            )}
          />
        </div>
            {/* submit the form  */}
        <div className='flex justify-center'>
          <button 
            type="submit" 
            disabled={addExerciseMutation.isPending}
            className="bg-gray-800 text-white font-bold py-2 px-4 rounded-full hover:bg-slate-900"
          >
            {/* if exericse is adding show  'Adding...' else show 'Add Exercise' */}
            {addExerciseMutation.isPending ? 'Adding...' : 'Add Exercise'}
          </button> 
        </div>
      </form>
    </div>
  );
}

export default ExerciseComponent;