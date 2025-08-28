"use client";

import ProductInfo from '@/components/product/ProductInfo';
import React, { useState, useEffect } from 'react';
import { fetchProductById } from '@/services/getProductById.service';

// --- Helper Icons ---
const ShareIcon = (props) => ( <svg xmlns="http://www.w.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" x2="12" y1="2" y2="15" /></svg>);
const HeartIcon = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>);


// In Next.js App Router, the page component receives 'params' which contains the dynamic route segments.
const ProductDetailPage = ({ params }) => {
    const { productId } = params; // Get the product ID from the URL
    
    const [product, setProduct] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [mainImage, setMainImage] = useState(null);
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [allPossibleSizes, setAllPossibleSizes] = useState([]);

    useEffect(() => {
        // Fetch the product data when the component mounts or when productId changes
        if (productId) {
            const getProduct = async () => {
                const data = await fetchProductById(productId);
                if (data) {
                    setProduct(data);
                    
                    // Set initial state based on the first color variant
                    const initialColor = data.gallery[0];
                    setSelectedColor(initialColor);
                    setMainImage(initialColor.images[0]);
                    
                    // Get a unique list of all available sizes for this product
                    const uniqueSizes = [...new Set(data.gallery.flatMap(variant => variant.sizes))];
                    setAllPossibleSizes(uniqueSizes);

                    // Set the initial selected size to the first available size of the first variant
                    if (initialColor.sizes && initialColor.sizes.length > 0) {
                      setSelectedSize(initialColor.sizes[0]);
                    }
                }
            };
            getProduct();
        }
    }, [productId]);

    const handleColorSelect = (colorOption) => {
        setSelectedColor(colorOption);
        setMainImage(colorOption.images[0]);
        // If the current selected size is not available in the new color, reset it
        if (!colorOption.sizes.includes(selectedSize)) {
            setSelectedSize(colorOption.sizes[0] || '');
        }
    };

    if (!product) {
        return <div className="flex justify-center items-center h-screen">Loading product details...</div>;
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
                                {product.discount > 0 && <span className="text-red-500 font-semibold">-{product.discount}%</span>}
                                {product.originalPrice && <span className="text-gray-400 line-through">US ${product.originalPrice.toFixed(2)}</span>}
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
                                {allPossibleSizes.map(size => {
                                    // Check if the current size is available for the *selected color*
                                    const isAvailable = selectedColor.sizes.includes(size);
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