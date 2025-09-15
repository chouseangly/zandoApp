"use client";

import React from 'react';
import ProductClient from '../dashboard/ProductClient';

const ProductsPage = ({ searchQuery, selectedCategory }) => {
    return (
        <div>
            <ProductClient 
                searchQuery={searchQuery} 
                selectedCategory={selectedCategory} 
            />
        </div>
    );
};

export default ProductsPage;