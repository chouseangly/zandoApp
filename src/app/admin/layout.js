import React from 'react';
import Link from 'next/link';

// A simple layout for the admin section. You can expand this later.
const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <main>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;