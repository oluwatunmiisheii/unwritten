'use client'

import React from 'react'

export const Nav = () => {
  function formatDate(date = new Date()) {
    const weekday = date.toLocaleDateString('en-GB', { weekday: 'long' })
    const month = date.toLocaleDateString('en-GB', { month: 'short' })
    const year = date.getFullYear()

    return `${weekday}, ${month} ${year}`
  }

  return (
    <header>
      <nav className="py-20 px-8 md:px-0 max-w-5xl mx-auto">
        <ul className="flex flex-col sm:flex-row justify-between items-center">
          <li>
            <h5 className="font-pacifico font-bold text-2xl">PhotoSearch.</h5>
          </li>
          <li>
            <p>{formatDate()}</p>
          </li>
        </ul>
      </nav>
    </header>
  )
}
