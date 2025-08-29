"use client";
import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from "next-auth/react";
import { User, ChevronRight, FileText, Gift, LogOut, LayoutDashboard } from "lucide-react";

const ProfileMenu = ({ onClose }) => {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <div 
      className="absolute top-full right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
      onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside
    >
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
            <User className="w-6 h-6 text-gray-500" />
          </div>
          <div>
            <p className="font-semibold text-gray-800">{session.user.name}</p>
            <p className="text-sm text-gray-500">{session.user.email}</p>
          </div>
        </div>
      </div>
      
      <div className="py-2">
        <Link href="/profile" onClick={onClose} className="flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-gray-100">
          <div className="flex items-center gap-3">
            <User className="w-5 h-5" />
            <span>My Profile</span>
          </div>
          <ChevronRight className="w-4 h-4" />
        </Link>

        {session.user.role === 'ADMIN' && (
          <Link href="/admin/dashboard" onClick={onClose} className="flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-gray-100">
            <div className="flex items-center gap-3">
              <LayoutDashboard className="w-5 h-5" />
              <span>Admin Dashboard</span>
            </div>
            <ChevronRight className="w-4 h-4" />
          </Link>
        )}

        <Link href="/orders" onClick={onClose} className="flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-gray-100">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5" />
            <span>My Orders</span>
          </div>
          <ChevronRight className="w-4 h-4" />
        </Link>
        
        <Link href="/gift-cards" onClick={onClose} className="flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-gray-100">
          <div className="flex items-center gap-3">
            <Gift className="w-5 h-5" />
            <span>Gift Cards</span>
          </div>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="p-2 border-t">
        <button 
          onClick={() => signOut({ callbackUrl: '/' })} 
          className="w-full flex items-center gap-3 px-4 py-2 text-left text-red-600 hover:bg-red-50 rounded-md"
        >
          <LogOut className="w-5 h-5" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileMenu;