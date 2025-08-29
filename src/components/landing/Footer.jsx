"use client";

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

const Footer = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 py-8">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; 2025 Zando. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="#" className="hover:text-black dark:hover:text-white">{t.aboutUs}</a>
          <a href="#" className="hover:text-black dark:hover:text-white">{t.contact}</a>
          <a href="#" className="hover:text-black dark:hover:text-white">{t.careers}</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer;