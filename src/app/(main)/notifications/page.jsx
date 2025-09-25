"use client";
import React from 'react';
import { useCart } from '@/context/CartContext';
import { useSession } from 'next-auth/react';
import { markNotificationAsRead } from '@/services/notification.service';
import { formatDistanceToNow } from 'date-fns';
import { Bell, ShoppingCart, Info } from 'lucide-react';

const getNotificationIcon = (title) => {
    const lowerCaseTitle = title.toLowerCase();
    if (lowerCaseTitle.includes('order')) {
        return <ShoppingCart className="w-5 h-5 text-blue-500" />;
    }
    if (lowerCaseTitle.includes('welcome')) {
        return <Info className="w-5 h-5 text-green-500" />;
    }
     if (lowerCaseTitle.includes('update profile')) {
        return <Info className="w-5 h-5 text-green-500" />;
    }
    return <Bell className="w-5 h-5 text-gray-500" />;
};


const NotificationPanel = ({ onClose }) => {
    const { data: session } = useSession();
    const { notifications, setNotifications } = useCart();

    const handleMarkAsRead = async (notificationId) => {
        if (!session?.user?.id) return;

        const notification = notifications.find(n => n.id === notificationId);
        if (notification && !notification.is_read) {
            const success = await markNotificationAsRead(notificationId, session.user.id);
            if (success) {
                setNotifications(prev =>
                    prev.map(n => n.id === notificationId ? { ...n, is_read: true } : n)
                );
            }
        }
    };

    const sortedNotifications = [...notifications].sort((a, b) => {
        if (a.is_read && !b.is_read) return 1;
        if (!a.is_read && b.is_read) return -1;
        return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return (
        <div
            className="absolute top-full right-0 mt-2 w-80 md:w-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="p-4 border-b dark:border-gray-600 flex justify-between items-center">
                <h3 className="font-bold text-gray-800 dark:text-gray-100">Notifications</h3>
                <button onClick={onClose} className="text-sm text-blue-600 hover:underline">
                    Close
                </button>
            </div>

            <div className="max-h-80 overflow-y-auto">
                {sortedNotifications.length === 0 ? (
                    <p className="text-center text-gray-500 py-10">You have no new notifications.</p>
                ) : (
                    sortedNotifications.map(notif => (
                        <div
                            key={notif.id}
                            className={`flex items-start gap-4 p-4 border-b dark:border-gray-700/50 transition-colors ${!notif.is_read ? 'bg-blue-50 dark:bg-blue-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'}`}
                            onClick={() => handleMarkAsRead(notif.id)}
                            role="button"
                            tabIndex={0}
                        >
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                                {getNotificationIcon(notif.title)}
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-sm text-gray-800 dark:text-gray-100">{notif.title}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-300">{notif.content}</p>
                                <p className="text-xs text-gray-400 mt-1">
                                    {formatDistanceToNow(new Date(notif.createdAt), { addSuffix: true })}
                                </p>
                            </div>
                            {!notif.is_read && (
                                <div className="w-2.5 h-2.5 bg-blue-500 rounded-full self-center" title="Unread"></div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default NotificationPanel;