"use client"; // This is required to use hooks like useState and useEffect

import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { fetchAllProducts } from '@/services/allProduct.service';

const ProductGrid = () => {
  // State to hold the products fetched from the backend
  const [products, setProducts] = useState([]);

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    const getProducts = async () => {
      const fetchedProducts = await fetchAllProducts();
      setProducts(fetchedProducts);
    };
    getProducts();
  }, []); // The empty dependency array means this runs once on mount

  return (
    <div className="w-full mx-auto py-8 px-4 md:px-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 ">Explore Our Collection</h1>
      {products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">Loading products...</p>
      )}
    </div>
  );
};

export default ProductGrid;