import React from 'react';
import ProductClient from './ProductClient';

const DashboardPage = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4 text-gray-700">Manage Products</h2>
                <ProductClient />
            </div>
        </div>
    );
};

export default DashboardPage;