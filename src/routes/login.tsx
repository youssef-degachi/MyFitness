import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import axios from 'axios'

export const Route = createFileRoute('/login')({
  component: LoginComponent,
})

function LoginComponent() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const chgeUrl = useNavigate();
  const goToIndex = () => {
    chgeUrl("/")
  }
  
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()


    if (!email || !password) {
      alert('All fields are required');
      return;
    }
    
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      })
      if (response.status === 200) {
        const { userId, message } = response.data
        localStorage.setItem('userId', userId)
        localStorage.setItem('fullName', response.data.fullname)
        alert(message)
      } else {
        alert(response.data.message)
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to log in')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        Login
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6"
      >
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
            Email
          </label>
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
          <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary dark:bg-gray-700 dark:text-white"
            required
          />
        </div>
        <div className="text-center mt-4">
            <p className="text-sm text-gray">
              Don&apos;t have an account?{' '}
              <a
                href="/register"
                className="text-white"
              >
                Sign up
              </a>
            </p>
          </div>

        <button
          type="submit"
          onClick={goToIndex}
          className="w-full bg-secondary text-white font-bold py-2 px-4 rounded-lg hover:bg-tertiary transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  )
}
