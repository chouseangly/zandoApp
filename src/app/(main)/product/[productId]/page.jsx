"use client";

import ProductInfo from '@/components/product/ProductInfo';
import React, { useState, useEffect } from 'react';

// --- Mock Data Store ---
// In a real app, this would be an API call
const allProductsData = {
    '1': {
        id: 1,
        name: 'Regular Fit Shirt',
        price: 7.18,
        originalPrice: 23.95,
        discount: 70,
        gallery: [
            { color: 'Blue', images: ['https://images.unsplash.com/photo-1596755094514-7e724d082a99?q=80&w=600&h=750&fit=crop', 'https://images.unsplash.com/photo-1589310243345-df307a6e5883?q=80&w=600&h=750&fit=crop'] },
            { color: 'White', images: ['https://images.unsplash.com/photo-1618354691373-d-851c5c3a990?q=80&w=600&h=750&fit=crop'] }
        ],
        availableSizes: ['S', 'M', 'L', 'XL'], allSizes: ['S', 'M', 'L', 'XL', 'XXL'],
        description: "A stylish regular fit shirt made from premium, breathable cotton."
    },
    '2': {
        id: 2, name: 'Oversized Hoodie With Print', price: 5.92, originalPrice: 29.59, discount: 80,
        gallery: [{ color: 'Beige', images: ['https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=600&h=750&fit=crop'] }],
        availableSizes: ['M', 'L', 'XL'], allSizes: ['S', 'M', 'L', 'XL'],
        description: "Stay comfortable with this oversized hoodie, featuring a unique front print."
    },
    '3': {
        id: 3, name: 'Unisex T-Shirt With Printed', price: 10.55, originalPrice: 17.59, discount: 40,
        gallery: [
            { color: 'Navy', images: ['https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=600&h=750&fit=crop', 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=600&h=750&fit=crop'] },
            { color: 'Dark Red', images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600&h=750&fit=crop'] }
        ],
        availableSizes: ['S', 'M', 'L'], allSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        description: "A classic unisex t-shirt with a bold graphic print."
    },
    '4': {
        id: 4, name: 'Sport Life Windbreaker', price: 11.39, originalPrice: 56.95, discount: 80,
        gallery: [{ color: 'Yellow', images: ['https://images.unsplash.com/photo-1591047139829-d916b67ea74f?q=80&w=600&h=750&fit=crop'] }],
        availableSizes: ['S', 'M', 'L', 'XL'], allSizes: ['S', 'M', 'L', 'XL'],
        description: "Lightweight and water-resistant, this windbreaker is perfect for outdoor adventures."
    },
};

// --- Helper Icons ---
const ShareIcon = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" x2="12" y1="2" y2="15" /></svg>);
const HeartIcon = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>);

const ProductDetailPage = () => {
    // Since we can't use Next.js routing, we'll simulate getting the product ID.
    // In this example, we'll just display product '3'.
    const productId = '3'; 
    
    const [product, setProduct] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [mainImage, setMainImage] = useState(null);
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (productId) {
            const data = allProductsData[productId];
            if (data) {
                setProduct(data);
                setSelectedColor(data.gallery[0]);
                setMainImage(data.gallery[0].images[0]);
                setSelectedSize(data.availableSizes[0]);
            }
        }
    }, [productId]);

    const handleColorSelect = (colorOption) => {
        setSelectedColor(colorOption);
        setMainImage(colorOption.images[0]);
    };

    if (!product) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
        <main className="bg-white min-h-screen font-sans flex items-center justify-center py-8 px-4">
            <div className="w-full mx-auto px-[5%]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="flex flex-col-reverse md:flex-row gap-4">
                        <div className="flex md:flex-col gap-3 justify-center md:justify-start">
                            {selectedColor.images.map((img, index) => (
                                <img key={index} src={img} alt={`Thumbnail ${index + 1}`} className={`w-26 h-30 object-cover rounded-md cursor-pointer border-2 transition-all ${mainImage === img ? 'border-gray-500' : 'border-transparent hover:border-gray-300'}`} onMouseEnter={() => setMainImage(img)} />
                            ))}
                        </div>
                        <div className="flex-1 relative">
                            <img src={mainImage} alt={product.name} className="w-full h-auto object-cover rounded-lg aspect-[4/5]" onError={(e) => { e.currentTarget.src = "https://placehold.co/600x750/cccccc/ffffff?text=Error"; }} />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex justify-between items-center mb-2">
                            <div className="flex items-baseline gap-3 text-xl">
                                <span className="font-semibold text-gray-800">US ${product.price.toFixed(2)}</span>
                                <span className="text-red-500 font-semibold">-{product.discount}%</span>
                                <span className="text-gray-400 line-through">US ${product.originalPrice.toFixed(2)}</span>
                            </div>
                            <button className="p-2 rounded-full hover:bg-gray-100"><ShareIcon className="w-5 h-5 text-gray-600" /></button>
                        </div>
                        <h1 className="text-lg font-medium text-gray-700 mb-4">{product.name}</h1>
                        <div className="mb-6">
                            <h3 className="text-md font-bold text-gray-800 mb-2">{product.gallery.length} Colors Available</h3>
                            <div className="flex gap-2">
                                {product.gallery.map(colorOption => (
                                    <button key={colorOption.color} onClick={() => handleColorSelect(colorOption)}>
                                        <img src={colorOption.images[0]} alt={colorOption.color} className={`w-26 h-30 object-cover rounded-md border-2 transition ${selectedColor.color === colorOption.color ? 'border-gray-800' : 'border-gray-300 hover:border-gray-500'}`} />
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="mb-6">
                            <h3 className="text-md font-bold text-gray-800 mb-2">Size</h3>
                            <div className="flex flex-wrap gap-2">
                                {product.allSizes.map(size => {
                                    const isAvailable = product.availableSizes.includes(size);
                                    return (
                                        <button key={size} onClick={() => isAvailable && setSelectedSize(size)} disabled={!isAvailable} className={`px-4 py-2 rounded-md border text-sm font-medium transition relative ${isAvailable ? (selectedSize === size ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50') : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'}`}>
                                            {size}
                                            {!isAvailable && <div className="absolute inset-0 flex items-center justify-center"><div className="w-full h-px bg-gray-400 transform -rotate-12"></div></div>}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex items-center border border-gray-300 rounded-md">
                                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-3 py-2 text-xl font-light text-gray-600 hover:bg-gray-100 rounded-l-md">-</button>
                                <span className="px-5 py-2 text-md font-medium text-gray-800">{quantity}</span>
                                <button onClick={() => setQuantity(q => q + 1)} className="px-3 py-2 text-xl font-light text-gray-600 hover:bg-gray-100 rounded-r-md">+</button>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="flex-1 bg-black text-white font-semibold py-3 px-6 rounded-md hover:bg-gray-800 transition-colors duration-300">Add to bag</button>
                            <button className="p-3 border border-gray-300 rounded-md hover:bg-gray-100"><HeartIcon className="w-6 h-6 text-gray-500" /></button>
                        </div>
                        <ProductInfo />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProductDetailPage;
