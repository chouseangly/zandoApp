"use client";

import React from 'react';
import { useCart } from "@/context/CartContext";
import CartItem from './CartItem';
import Link from 'next/link';
import Image from "next/image";
import OrderSummary from './OrderSummary'; // Import the OrderSummary component

const CartClient = () => {
    const { cartItems, products } = useCart();

    const cartProducts = cartItems
        .map(item => {
            const product = products.find(p => p.id === item.productId);
            return product ? { ...item, product } : null;
        })
        .filter(Boolean); // Filter out any nulls if a product wasn't found

    const subtotal = cartProducts.reduce((acc, item) => {
        return acc + (item.product.price * item.quantity);
    }, 0);

    return (
        <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
            <div className="p-4 md:p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/80 min-h-[60vh]">
                <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">Shopping Cart</h1>
                {cartProducts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <Image
                            src="/no listings fav.jpg"
                            alt="Empty Cart"
                            width={300}
                            height={300}
                            className="w-full max-w-xs h-auto mb-6 rounded-lg"
                        />
                        <h2 className="font-semibold text-xl mb-2 dark:text-gray-100">Your cart is empty</h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md mb-6">
                            Looks like you haven’t added anything to your cart yet. Start exploring and add products you love!
                        </p>
                        <Link href="/" className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-4">
                            {cartProducts.map(item => (
                                <CartItem key={`${item.productId}-${item.variantId}-${item.sizeId}`} item={item} />
                            ))}
                        </div>
                        <div className="lg:col-span-1">
                           <OrderSummary subtotal={subtotal} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartClient;