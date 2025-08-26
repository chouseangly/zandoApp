import React from 'react';
import Link from 'next/link';

const MegaMenu = ({ category }) => {
  if (!category || !category.children) {
    return null;
  }

  // Filter out any children that don't have their own children to display
  const subCategoriesWithItems = category.children.filter(
    (subCat) => subCat.children && subCat.children.length > 0
  );

  return (
    // FIX: Added z-index of 50 to ensure it's above other content
    <div className="absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-200 py-6 px-10 z-50">
      <div className="grid grid-cols-6 gap-x-8">
        {subCategoriesWithItems.map((subCategory) => (
          <div key={subCategory.id}>
            <h3 className="font-bold text-red-600 uppercase text-sm mb-3 tracking-wider">
              <Link href="/" className="hover:underline">{subCategory.name}</Link>
            </h3>
            <ul className="space-y-2">
              {subCategory.children.map((child) => (
                <li key={child.id}>
                  <Link href="/" className="text-gray-700 hover:text-black text-sm">
                    {child.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MegaMenu;