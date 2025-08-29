import React from 'react';
import Link from 'next/link';

// A simple layout for the admin section. You can expand this later.
const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <nav className="container mx-auto px-4 py-4">
          <Link href="/" className="text-xl font-bold text-gray-800">
            Zando Admin
          </Link>
        </nav>
      </header>
      <main>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;