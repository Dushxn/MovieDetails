"use client"

import { useEffect } from "react"
import Navbar from "../Shared/Navbar"
import { ThemeProvider } from "../context/theme-context"

const Layout = ({ children }) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <ThemeProvider>
      <div className="min-h-screen transition-colors duration-300 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
        <Navbar />
        <main>{children}</main>
      </div>
    </ThemeProvider>
  )
}

export default Layout
