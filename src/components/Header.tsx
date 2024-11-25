import React from 'react'
// import { Link } from '@tanstack/react-router'
import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'


export const Route = createRootRoute({
  component: Header,
})

function Header() {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          <span className="text-primary dark:text-primary">My</span>
          <span className="text-secondary dark:text-secondary">Fitness</span>
        </Link>
        <nav className="flex items-center space-x-4">
          <ul className="flex space-x-4">
            <li><Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-secondary dark:hover:text-primary">Home</Link></li>
            <li><Link href="/exercise" className="text-gray-600 dark:text-gray-300 hover:text-secondary dark:hover:text-primary">Exercise</Link></li>
            <li><Link href="/home" className="text-gray-600 dark:text-gray-300 hover:text-secondary dark:hover:text-primary">Login</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header