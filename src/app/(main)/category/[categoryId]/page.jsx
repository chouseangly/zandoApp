"use client";

import React, { useState, useEffect } from 'react';
// ✅ FIX: Import useParams from next/navigation
import { useParams } from 'next/navigation';
import { fetchProductsByCategoryId } from '@/services/getCategoryById.service';
import ProductCard from '@/components/landing/ProductCard';

const CategoryPage = () => {
  // ✅ FIX: Use the useParams hook to get the categoryId
  const params = useParams();
  const { categoryId } = params;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (categoryId) {
      const getProducts = async () => {
        setLoading(true);
        const fetchedProducts = await fetchProductsByCategoryId(categoryId);
        setProducts(fetchedProducts);
        setLoading(false);
      };
      getProducts();
    }
  }, [categoryId]);

  return (
    <div className="w-full mx-auto py-8 px-4 md:px-8">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
        Category Products
      </h1>
      
      {loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No products found in this category.</p>
      )}
    </div>
  );
};

export default CategoryPage;