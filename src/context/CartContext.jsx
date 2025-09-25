"use client";

import React, { createContext, useState, useEffect, useContext } from 'react';
import { useSession } from 'next-auth/react';
import { fetchFavoritesByUserId, addFavorite, removeFavorite } from '@/services/favorite.service';
import { fetchAllProducts } from '@/services/allProduct.service'; // Import fetchAllProducts
import toast from 'react-hot-toast';
import { fetchNotifications } from '@/services/notification.service';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { data: session, status } = useSession();
    const [favorites, setFavorites] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [products, setProducts] = useState([]);
    const [notifications, setNotifications] = useState([]); // State to hold all notifications

    // Fetch all products on component mount
    useEffect(() => {
        const getProducts = async () => {
            const fetchedProducts = await fetchAllProducts();
            setProducts(fetchedProducts);
        };
        getProducts();
    }, []);

    // Fetch user-specific data when user logs in
      useEffect(() => {
        if (status === 'authenticated' && session?.user?.id) {
            const loadUserData = async () => {
                const [favs, notifs] = await Promise.all([
                    fetchFavoritesByUserId(session.user.id),
                    fetchNotifications(session.user.id) // ✅ FETCH NOTIFICATIONS
                ]);
                setFavorites(favs);
                setNotifications(notifs);
            };
            loadUserData();
        } else if (status === 'unauthenticated') {
            setFavorites([]);
            setCartItems([]);
            setNotifications([]); // ✅ CLEAR ON LOGOUT
        }
    }, [status, session]);

    const handleAddFavorite = async (productId) => {
        if (!session?.user?.id) {
            toast.error("Please log in to add items to your wishlist.");
            return;
        }

        const isAlreadyFavorite = favorites.some(fav => fav.productId === productId);
        if (isAlreadyFavorite) {
            // This case is handled by the toggle, but we keep it for safety
            toast("This item is already in your wishlist!", { icon: '❤️' });
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
        products, // Provide products through context
        notifications, // ✅ PROVIDE NOTIFICATIONS
        setNotifications,
        addFavorite: handleAddFavorite,
        removeFavorite: handleRemoveFavorite,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);