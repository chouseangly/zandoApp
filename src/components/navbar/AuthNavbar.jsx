"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Bell, Heart, ShoppingBag, User } from "lucide-react";
import { useSession } from "next-auth/react";
import { fetchCategories } from '@/services/category.service';
import MegaMenu from './MegaMenu';
import ProfileMenu from './ProfileMenu'; // ✅ IMPORT the new component

const AuthNavbar = () => {
  const [categories, setCategories] = useState([]);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false); // ✅ ADD state for profile menu
  const { data: session, status } = useSession();
  const profileMenuRef = useRef(null);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
    };
    getCategories();
  }, []);

  const handleCloseMenu = () => {
    setHoveredCategory(null);
  };

  return (
    <div
      className="w-full sticky top-0 z-50 bg-white shadow-sm isolate"
      onMouseLeave={() => setHoveredCategory(null)}
    >
      <div className="relative px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between py-3 border-b border-gray-100">
          {/* Left: Categories */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-10">
            {categories.map((cat) => (
              <div
                key={cat.id}
                onMouseEnter={() => setHoveredCategory(cat)}
                className="py-4"
              >
                <Link
                  href="/"
                  className="text-lg lg:text-lg font-bold text-gray-800 transition-colors"
                >
                  {cat.name}
                </Link>
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
            <div className="hidden sm:flex items-center w-[120px] md:w-[100px] lg:w-[130px] border border-gray-300 rounded-md px-2 py-1">
              <Search className="h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-transparent px-2 text-sm outline-none"
              />
            </div>

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
            
            <div className="hidden sm:flex items-center space-x-5 font-bold">
              {status === "authenticated" ? (
                // ✅ MODIFIED: Use a relative container for the profile menu
                <div className="relative" ref={profileMenuRef}>
                  <button 
                    onClick={() => setProfileMenuOpen(prev => !prev)} 
                    className="flex items-center gap-2 text-gray-800 hover:text-black"
                  >
                     <User className="h-5 w-5" />
                     {session.user.name || 'Profile'}
                  </button>
                  {isProfileMenuOpen && <ProfileMenu onClose={() => setProfileMenuOpen(false)} />}
                </div>
              ) : (
                <>
                  <Link href="/login" className="text-gray-800 hover:text-black">LOGIN</Link>
                  <Link href="/register" className="text-gray-800 hover:text-black">REGISTER</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {hoveredCategory && <MegaMenu category={hoveredCategory} onClose={handleCloseMenu} />}
    </div>
  );
}

export default AuthNavbar;