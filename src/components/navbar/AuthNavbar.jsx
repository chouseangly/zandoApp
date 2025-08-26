"use client"; // Add this directive for hooks
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Bell, Heart, ShoppingBag } from "lucide-react";
import { fetchCategories } from '@/services/category.service';
import MegaMenu from './MegaMenu';

const AuthNavbar = () => {
  const [categories, setCategories] = useState([]);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  useEffect(() => {
    const getCategories = async () => {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
    };
    getCategories();
  }, []);

  return (
    <div className="w-full sticky top-0 z-[200] bg-white shadow-sm" onMouseLeave={() => setHoveredCategory(null)}>
      <div className="px-4 sm:px-6 lg:px-10 py-3 border-b border-gray-100">
        <div className="flex items-center justify-between">
          {/* Left: Categories */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-10">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="relative"
                onMouseEnter={() => setHoveredCategory(cat)}
              >
                <Link
                  href="/"
                  className="text-lg lg:text-lg font-bold text-gray-800 transition-colors py-4"
                >
                  {cat.name}
                </Link>
                {hoveredCategory && hoveredCategory.id === cat.id && (
                  <MegaMenu category={cat} />
                )}
              </div>
            ))}
          </nav>

          {/* Center: Logo */}
          <div className="flex-shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="Zando Logo"
                width={120}
                height={60}
                className="h-6 sm:h-8 w-auto"
              />
            </Link>
          </div>

          {/* Right: Search + Icons + Auth */}
          <div className="flex items-center space-x-10">
            {/* Search */}
            <div className="hidden sm:flex items-center w-[120px] md:w-[100px] lg:w-[130px] border border-gray-300 rounded-md px-2 py-1">
              <Search className="h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-transparent px-2 text-sm outline-none"
              />
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-5">
              <Bell className="h-5 w-5 text-gray-600 hover:text-black cursor-pointer" />
              <Heart className="h-5 w-5 text-gray-600 hover:text-black cursor-pointer" />
              <div className="relative cursor-pointer">
                <ShoppingBag className="h-5 w-5 text-gray-600 hover:text-black" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  0
                </span>
              </div>
            </div>

            {/* Auth Links */}
            <div className="hidden sm:flex items-center space-x-5 font-bold">
              <Link href="/login" className="text-gray-800 hover:text-black">LOGIN</Link>
              <Link href="/register" className="text-gray-800 hover:text-black">REGISTER</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthNavbar;