// src/app/admin/transactions/TransactionCard.jsx

import React from 'react';
import { format, parseISO } from 'date-fns';

const StatusBadge = ({ status }) => {
    let baseClasses = "px-3 py-1 text-xs font-semibold rounded-full";
    let statusStyle = "";

    switch (status) {
        case 'Delivered':
            statusStyle = "bg-blue-100 text-blue-800";
            break;
        case 'Processing':
            statusStyle = "bg-yellow-100 text-yellow-800";
            break;
        case 'Shipped':
            statusStyle = "bg-purple-100 text-purple-800";
            break;
        case 'Cancelled':
            statusStyle = "bg-red-100 text-red-800";
            break;
        case 'Pending': // As seen in your image
            statusStyle = "bg-orange-100 text-orange-800"; // Using orange for pending
            break;
        default:
            statusStyle = "bg-gray-100 text-gray-800";
            break;
    }
    return <span className={`${baseClasses} ${statusStyle}`}>{status}</span>;
};

const TransactionCard = ({ transaction }) => {
    const orderDate = transaction.orderDate ? format(parseISO(transaction.orderDate), 'dd MMMM yyyy') : 'N/A';

    return (
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                    <input type="checkbox" className="form-checkbox text-blue-600 rounded" />
                    <span className="font-semibold text-gray-700">#{transaction.id}</span>
                    <span className="text-sm text-gray-500">{transaction.orderType}</span>
                </div>
                <StatusBadge status={transaction.status} />
            </div>

            <div className="flex items-center gap-4 mb-3">
                <img 
                    src={transaction.productImage || 'https://placehold.co/40x40'} 
                    alt={transaction.productName} 
                    className="w-12 h-12 object-cover rounded-md" 
                />
                <div>
                    <h3 className="text-md font-semibold text-gray-800">{transaction.productName}</h3>
                    {transaction.additionalProducts > 0 && (
                        <p className="text-sm text-gray-500">+{transaction.additionalProducts} Other Product</p>
                    )}
                </div>
                <div className="ml-auto text-lg font-bold text-gray-900">${transaction.price?.toFixed(2)}</div>
            </div>

            <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-600 border-t pt-3 border-gray-100">
                <div>Order Date</div>
                <div className="text-right font-medium text-gray-700">{orderDate}</div>
                <div>Customer</div>
                <div className="text-right font-medium text-gray-700">{transaction.customerName}</div>
                <div>Payment</div>
                <div className="text-right font-medium text-gray-700">{transaction.paymentMethod}</div>
            </div>
        </div>
    );
};

export default TransactionCard;