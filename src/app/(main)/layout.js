import React from 'react'
import AuthNavbar from "@/components/navbar/AuthNavbar"
import Footer from '@/components/landing/Footer'
import { LanguageProvider } from '@/context/LanguageContext'; // ✅ IMPORT
import { ThemeProvider } from '@/context/ThemeContext'; // ✅ IMPORT

const MainLayout = ({children}) => {
  return (
    // ✅ WRAP WITH PROVIDERS
    <ThemeProvider>
      <LanguageProvider>
        <AuthNavbar />
       <main className="pt-[2px] md:pt-[7px] lg:pt-0 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200"> 
          {children}
        </main>
        <Footer />
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default MainLayout