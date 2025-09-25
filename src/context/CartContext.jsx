"use client";

import React, { createContext, useState, useEffect, useContext } from 'react';
import { useSession } from 'next-auth/react';
import { fetchFavoritesByUserId, addFavorite, removeFavorite } from '@/services/favorite.service';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { data: session, status } = useSession();
    const [favorites, setFavorites] = useState([]);
    const [cartItems, setCartItems] = useState([]); // Placeholder for future cart implementation

    // Fetch initial data when user logs in
    useEffect(() => {
        if (status === 'authenticated' && session?.user?.id) {
            const loadInitialData = async () => {
                const favs = await fetchFavoritesByUserId(session.user.id);
                setFavorites(favs);
                // Future: Load cart items here
            };
            loadInitialData();
        } else {
            // Clear data on logout
            setFavorites([]);
            setCartItems([]);
        }
    }, [status, session]);

    const handleAddFavorite = async (productId) => {
        if (!session?.user?.id) {
            toast.error("Please log in to add items to your wishlist.");
            return;
        }

        const isAlreadyFavorite = favorites.some(fav => fav.productId === productId);
        if (isAlreadyFavorite) {
            toast.success("This item is already in your wishlist!");
            return;
        }

        const newFavorite = await addFavorite(session.user.id, productId);
        if (newFavorite) {
            setFavorites(prev => [...prev, newFavorite]);
            toast.success("Added to wishlist!");
        } else {
            toast.error("Failed to add to wishlist.");
        }
    };

    const handleRemoveFavorite = async (productId) => {
        if (!session?.user?.id) return;
        
        const success = await removeFavorite(session.user.id, productId);
        if (success) {
            setFavorites(prev => prev.filter(fav => fav.productId !== productId));
            toast.success("Removed from wishlist.");
        } else {
            toast.error("Failed to remove from wishlist.");
        }
    };

    const value = {
        favorites,
        cartItems,
        addFavorite: handleAddFavorite,
        removeFavorite: handleRemoveFavorite,
        // Future cart functions here: addToCart, removeFromCart, etc.
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);