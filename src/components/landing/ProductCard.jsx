"use client"
import React from 'react';
import Image from 'next/image';
const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
    viewBox="0 0 24 24" fill="none" stroke="currentColor" 
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
    className="text-gray-400 group-hover:text-red-500 transition-colors">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 
      0L12 5.67l-1.06-1.06a5.5 5.5 
      0 0 0-7.78 7.78l1.06 1.06L12 
      21.23l7.78-7.78 1.06-1.06a5.5 
      5.5 0 0 0 0-7.78z"></path>
  </svg>
);

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 group">
      <div className="relative">
       <Image
            src={product.imageUrl}
            alt={product.name}
            width={300}
            height={400}
            className="w-full h-auto object-cover aspect-[4/5]"
            onError={(e) => {
                e.currentTarget.src = "https://placehold.co/400x500/cccccc/ffffff?text=Error";
            }}
            />
        {product.discount && (
          <div className="absolute top-0 left-0 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-br-lg">
            -{product.discount}%
          </div>
        )}
      </div>
      <div className="p-3 md:p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-gray-700 text-sm md:text-base mb-1 pr-2">{product.name}</h3>
          <button className="flex-shrink-0">
            <HeartIcon />
          </button>
        </div>
        <div className="flex items-baseline">
          <p className="font-bold text-gray-800 text-sm md:text-base">${product.price.toFixed(2)}</p>
          {product.originalPrice && (
            <p className="text-xs text-gray-500 line-through ml-2">${product.originalPrice.toFixed(2)}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard; // ✅ add this line
