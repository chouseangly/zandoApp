import React from 'react'
import AuthNavbar from "@/components/navbar/AuthNavbar"
import Footer from '@/components/landing/Footer'

const MainLayout = ({children}) => {
  return (
    <>
      <AuthNavbar />
      {/* Remove the conflicting background, text, and transition classes from here */}
      <main className="pt-[2px] md:pt-[7px] lg:pt-0"> 
        {children}
      </main>
      <Footer />
    </>
  )
}

export default MainLayout