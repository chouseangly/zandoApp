import React from 'react';
import { CheckCircle } from 'lucide-react';

const DeliveryAddress = ({ user }) => {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border dark:border-gray-700 mb-6">
            <h3 className="font-semibold text-lg mb-4">Delivery address</h3>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center gap-2">
                    <CheckCircle size={18} className="text-green-500" />
                    <p className="font-semibold text-gray-800 dark:text-gray-100">{user.name}</p>
                </div>
                <p className="pl-7">Phnom Penh</p>
                <p className="pl-7">0884979443</p>
            </div>
            <button className="text-sm text-blue-600 hover:underline mt-3 pl-7">Change Address &gt;</button>
            <div className="border-t dark:border-gray-700 mt-4 pt-4">
                 <div className="flex items-center gap-2">
                    <CheckCircle size={18} className="text-green-500" />
                    <div>
                        <p className="font-semibold text-gray-800 dark:text-gray-100">Delivery: $1.0</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">ZANDO Bikers (Delivery within 1-3 days)</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeliveryAddress;