import React from 'react';
import ProductClient from './ProductClient'; // Assuming ProductClient is in the same folder
import { Home, BarChart2, ShoppingBag, Users, Settings, LogOut, Search, Bell, DollarSign, ListOrdered, UserCheck } from 'lucide-react';

// --- LAYOUT COMPONENTS for the Dashboard Page ---

const Sidebar = () => (
    <div className="w-64 bg-gray-900 text-gray-300 flex-col min-h-screen hidden lg:flex">
        <div className="p-6 text-center border-b border-gray-700">
            <h1 className="text-2xl font-bold text-white">Backing</h1>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
            <a href="#" className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white">
                <Home size={20} className="mr-3" /> Home
            </a>
            <a href="#" className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white">
                <BarChart2 size={20} className="mr-3" /> Sales
            </a>
            <a href="#" className="flex items-center px-4 py-2 rounded-lg bg-gray-700 text-white font-semibold">
                <ShoppingBag size={20} className="mr-3" /> Products
            </a>
             <a href="#" className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white">
                <Users size={20} className="mr-3" /> Customers
            </a>
        </nav>
        <div className="px-4 py-6 border-t border-gray-700 space-y-2">
            <a href="#" className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white">
                <Settings size={20} className="mr-3" /> Settings
            </a>
            <a href="#" className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white">
                <LogOut size={20} className="mr-3" /> Log Out
            </a>
        </div>
    </div>
);

const Header = () => (
    <header className="flex justify-between items-center py-4 flex-wrap gap-4">
        <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
                type="text"
                placeholder="Search a product"
                className="w-full bg-white py-2 pl-10 pr-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        <div className="flex items-center gap-6">
             <div className="flex items-center gap-2 text-gray-600">
                <Bell size={20} />
            </div>
            <div className="flex items-center gap-3">
                <span className="font-semibold text-gray-700">Hypebeast Store</span>
                <div className="w-10 h-10 bg-red-500 text-white flex items-center justify-center rounded-full font-bold">H</div>
            </div>
        </div>
    </header>
);

const StatCard = ({ title, value, change, changeType, icon: Icon, iconBgColor }) => (
    <div className="bg-white p-6 rounded-xl shadow-md flex-1">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-gray-500 text-sm font-medium">{title}</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
            </div>
            <div className={`p-2 rounded-lg ${iconBgColor}`}>
                <Icon size={20} className="text-white" />
            </div>
        </div>
        {change && (
            <p className={`text-xs mt-2 ${changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`}>
                {change}
            </p>
        )}
    </div>
);


// --- MAIN DASHBOARD PAGE COMPONENT ---

const DashboardPage = () => {
    return (
        <div className="flex bg-gray-100 font-sans min-h-screen">
            <Sidebar />
            <main className="flex-1 p-4 sm:p-8">
                <Header />

                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
                    <StatCard 
                        title="Sales Today" 
                        value="$120" 
                        change="Updated every order success" 
                        icon={DollarSign}
                        iconBgColor="bg-orange-500"
                    />
                    <StatCard 
                        title="Total Earning" 
                        value="$81,020" 
                        change="+8.28% More earning than usual"
                        changeType="increase"
                        icon={DollarSign}
                        iconBgColor="bg-green-500"
                    />
                    <StatCard 
                        title="Total Orders" 
                        value="102" 
                        change="+2.18% More orders than usual"
                        changeType="increase"
                        icon={ListOrdered}
                        iconBgColor="bg-blue-500"
                    />
                    <StatCard 
                        title="Visitor Today" 
                        value="81,020" 
                        change="+3.08% More visitors than usual"
                        changeType="increase"
                        icon={UserCheck}
                        iconBgColor="bg-indigo-500"
                    />
                </div>

                {/* Product Client Section */}
                <ProductClient />
            </main>
        </div>
    );
};

export default DashboardPage;
