import React from 'react'
import ProductCard from './ProductCard';
const products = [
    {
        id: 1,
        name: 'Regular Fit Shirt',
        price: 7.18,
        originalPrice: 23.95,
        discount: 70,
        imageUrl: 'https://zandokh.com/image/cache/catalog/products/2024-09/2122406643%20Replace/Regular%20Fit%20Shirts%20(3)-cr-450x672.jpg'
    },
    {
        id: 2,
        name: 'Oversized Hoodie With Print',
        price: 5.92,
        originalPrice: 29.59,
        discount: 80,
        imageUrl: 'https://zandokh.com/image/cache/catalog/products/2024-09/2122406643%20Replace/Regular%20Fit%20Shirts%20(3)-cr-450x672.jpg'
    },
    {
        id: 3,
        name: 'Unisex T-Shirt With Printed',
        price: 10.55,
        originalPrice: 17.59,
        discount: 40,
        imageUrl: 'https://zandokh.com/image/cache/catalog/products/2024-09/2122406643%20Replace/Regular%20Fit%20Shirts%20(3)-cr-450x672.jpg'
    },
    {
        id: 4,
        name: 'Sport Life Windbreaker',
        price: 11.39,
        originalPrice: 56.95,
        discount: 80,
        imageUrl: 'https://zandokh.com/image/cache/catalog/products/2024-09/2122406643%20Replace/Regular%20Fit%20Shirts%20(3)-cr-450x672.jpg'
    },
    {
        id: 5,
        name: 'Classic Crewneck Sweater',
        price: 19.99,
        // No discount or originalPrice for this item
        imageUrl: 'https://zandokh.com/image/cache/catalog/products/2024-09/2122406643%20Replace/Regular%20Fit%20Shirts%20(3)-cr-450x672.jpg'
    },
    {
        id: 6,
        name: 'Slim-Fit Chino Pants',
        price: 24.50,
        originalPrice: 49.00,
        discount: 50,
        imageUrl: 'https://zandokh.com/image/cache/catalog/products/2024-09/2122406643%20Replace/Regular%20Fit%20Shirts%20(3)-cr-450x672.jpg'
    },
    {
        id: 7,
        name: 'Leather Ankle Boots',
        price: 45.00,
        // No discount for this item
        imageUrl: 'https://zandokh.com/image/cache/catalog/products/2024-09/2122406643%20Replace/Regular%20Fit%20Shirts%20(3)-cr-450x672.jpg'
    },
    {
        id: 8,
        name: 'Graphic Print Backpack',
        price: 22.10,
        originalPrice: 31.50,
        discount: 30,
        imageUrl: 'https://zandokh.com/image/cache/catalog/products/2024-09/2122406643%20Replace/Regular%20Fit%20Shirts%20(3)-cr-450x672.jpg'
    }
];

const ProductGrid = () => {
  return (
    <div className="w-full mx-auto mt-5 px-4 md:px-8 ">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};


export default ProductGrid
