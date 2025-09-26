"use client";

import React from 'react';
import { X } from 'lucide-react';

const CartItem = ({ item }) => {
    // Basic check to prevent rendering if product data is missing
    if (!item || !item.product) {
        return null; 
    }
    
    // Safely access properties with optional chaining and provide fallbacks
    const color = item.product.gallery?.find(g => g.color)?.color || 'N/A';
    const size = item.product.gallery
        ?.flatMap(g => g.sizes)
        .find(s => s)?.name || 'N/A';
    
    const imageUrl = item.product.gallery?.[0]?.images?.[0] || "https://placehold.co/100x120/cccccc/ffffff?text=No+Image";

    return (
        <div className="flex items-center gap-4 p-4 border rounded-lg">
            <img src={imageUrl} alt={item.product.name} className="w-24 h-32 object-cover rounded-md" />
            <div className="flex-grow">
                <h3 className="font-semibold">{item.product.name}</h3>
                <p className="text-sm text-gray-500">Color: {color}</p>
                <p className="text-sm text-gray-500">Size: {size}</p>
                <div className="flex items-center gap-2 mt-2">
                    <span className="font-semibold">${item.product.price.toFixed(2)}</span>
                    <span className="text-sm text-gray-400">x {item.quantity}</span>
                </div>
            </div>
            <div className="flex flex-col items-end justify-between h-full">
                <button className="text-gray-400 hover:text-red-500">
                    <X size={20} />
                </button>
                <span className="font-bold text-lg">${(item.product.price * item.quantity).toFixed(2)}</span>
            </div>
        </div>
    );
};

export default CartItem;