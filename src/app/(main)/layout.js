import React from 'react'
import AuthNavbar from "@/components/navbar/AuthNavbar"
import Footer from '@/components/landing/Footer'

const MainLayout = ({children}) => {
  return (
    <>
      <AuthNavbar />
      <main className="pt-[2px] md:pt-[7px] lg:pt-0 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300"> 
        {children}
      </main>
      <Footer />
    </>
  )
}

export default MainLayout