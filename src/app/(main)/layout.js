import React from 'react'
import AuthNavbar from "@/components/navbar/AuthNavbar"
import Footer from '@/components/landing/Footer'
const MainLayout = ({children}) => {
  return (
    <>
        <AuthNavbar  />
        <main className="pt-[2px] md:pt-[7px] lg:pt-0"> 
          {children}
        </main>
        <Footer  />
    </>
     
  )
}

export default MainLayout
