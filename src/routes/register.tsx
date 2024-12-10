import React, { useState } from 'react'
import axios from 'axios'
import { createFileRoute,Link,useNavigate } from '@tanstack/react-router'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const Route = createFileRoute('/register')({
  component: RegisterComponent,
})

function RegisterComponent() {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const chgeUrl = useNavigate(); 
  const navigator = useNavigate();
  const goToLogin = () => {
    chgeUrl("/login")

  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    if (!fullname || !email || !password) {
      alert('All fields are required');
      return;
    }
    
    try {
      const response = await axios.post('http://localhost:5000/api/register', {
        fullname,
        email,
        password,
      });
      alert("user Created")
      chgeUrl("/login")
    } catch (error) {
      console.error('Error:', error);
      
        alert('Failed to register');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Register</h1>
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Full Name</label>
          <input
            type="text"
            id="fullname"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary dark:bg-gray-700 dark:text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary dark:bg-gray-700 dark:text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary dark:bg-gray-700 dark:text-white"
            required
          />
        </div>
        <button onClick={goToLogin} type="submit" className="w-full bg-secondary text-white font-bold py-2 px-4 rounded-lg hover:bg-tertiary transition-colors">
            Register
        </button>
      </form>
    </div>
  );
}