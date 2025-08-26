import React from 'react';
import ProductCard from './ProductCard';
// --- Product Card Component ---
// I've moved this component into the same file to resolve the import error.

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
    viewBox="0 0 24" fill="none" stroke="currentColor" 
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
    className="text-gray-400 group-hover:text-red-500 transition-colors">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);
// --- Product Grid Component ---

const products = [
    {
        id: 1,
        name: 'Regular Fit Shirt',
        price: 7.18,
        originalPrice: 23.95,
        discount: 70,
        imageUrl: 'https://images.unsplash.com/photo-1596755094514-7e724d082a99?q=80&w=300&h=400&fit=crop',
    },
    {
        id: 2,
        name: 'Oversized Hoodie With Print',
        price: 5.92,
        originalPrice: 29.59,
        discount: 80,
        imageUrl: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=300&h=400&fit=crop',
    },
    {
        id: 3,
        name: 'Unisex T-Shirt With Printed',
        price: 10.55,
        originalPrice: 17.59,
        discount: 40,
        imageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=300&h=400&fit=crop',
    },
    {
        id: 4,
        name: 'Sport Life Windbreaker',
        price: 11.39,
        originalPrice: 56.95,
        discount: 80,
        imageUrl: 'https://images.unsplash.com/photo-1591047139829-d916b67ea74f?q=80&w=300&h=400&fit=crop',
    },
];


const ProductGrid = () => {
  return (
    <div className="w-full  mx-auto py-8 px-4 md:px-8">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">Explore Our Collection</h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
