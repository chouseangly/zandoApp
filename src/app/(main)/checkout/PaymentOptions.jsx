import React from 'react';
import { CheckCircle } from 'lucide-react';

const paymentMethods = [
    { name: 'ABA PAY', icon: '/aba.png' },
    { name: 'Credit/Debit Card', icon: '/visa.png' },
    { name: 'ACLEDA PAY', icon: '/acleda.png' },
    { name: 'Wing Bank', icon: '/wing.png' },
    { name: 'CHIP MONG BANK', icon: '/chipmong.png' },
    { name: 'Cash On Delivery', icon: null }
];

const PaymentOptions = ({ selected, onSelect }) => {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border dark:border-gray-700">
            <h3 className="font-semibold text-lg mb-4">Payment</h3>
            <div className="space-y-3">
                {paymentMethods.map(method => (
                    <div 
                        key={method.name}
                        onClick={() => onSelect(method.name)}
                        className={`p-3 border rounded-md flex items-center justify-between cursor-pointer transition-all ${selected === method.name ? 'border-black dark:border-white ring-1 ring-black dark:ring-white' : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'}`}
                    >
                        <div className="flex items-center gap-3">
                             {method.icon && <img src={method.icon} alt={method.name} className="h-6"/>}
                             <span className="font-medium text-sm">{method.name}</span>
                        </div>
                        {selected === method.name && <CheckCircle size={20} className="text-black dark:text-white" />}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PaymentOptions;