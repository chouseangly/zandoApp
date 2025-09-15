"use client";

import React, { useState, useEffect } from 'react';
import ProductClient from './ProductClient';
import { LayoutDashboard, BarChart2, ShoppingBag, Users, Settings, LogOut, Search, Calendar, Bell, DollarSign, ListOrdered, UserCheck, ChevronDown, FileText } from 'lucide-react';
import { fetchCategories } from '@/services/category.service';
import { fetchDashboardStats } from '@/services/dashboard.service';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // ✅ 1. Import Link from Next.js

const SubCategory = ({ category, onSelectCategory, selectedCategory, level }) => {
    return (
        <div style={{ marginLeft: `${level * 10}px` }}>
            <a href="#" onClick={(e) => { e.preventDefault(); onSelectCategory(category.id); }}
               className={`block text-sm py-1.5 px-2 rounded-md ${selectedCategory === category.id ? 'bg-gray-600 font-semibold' : 'hover:bg-gray-700'}`}>
                {category.name}
            </a>
            {category.children && category.children.map(child => (
                <SubCategory key={child.id} category={child} onSelectCategory={onSelectCategory} selectedCategory={selectedCategory} level={level + 1} />
            ))}
        </div>
    );
};

const Sidebar = ({ onSelectCategory, selectedCategory }) => {
    const [categories, setCategories] = useState([]);
    const [isProductsOpen, setIsProductsOpen] = useState(true);

    useEffect(() => {
        const getCategories = async () => {
            const fetchedCategories = await fetchCategories();
            setCategories(fetchedCategories);
        };
        getCategories();
    }, []);

    return (
        <aside className="w-64 bg-gray-900 text-gray-400 flex-col min-h-screen hidden lg:flex fixed">
            <div className="p-6 text-center border-b border-gray-800">
                <h1 className="text-2xl font-bold text-white"> Dashboard</h1>
            </div>
            <nav className="flex-1 px-4 py-6 space-y-2">
                <Link href="/admin/dashboard" className="flex items-center px-4 py-2 rounded-lg bg-gray-700 text-white font-semibold transition-colors">
                    <LayoutDashboard size={20} className="mr-3" /> Dashboard
                </Link>
                <a href="#" className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white transition-colors">
                    <BarChart2 size={20} className="mr-3" /> Sales
                </a>
                <div>
                    <button onClick={() => setIsProductsOpen(!isProductsOpen)} className="w-full flex items-center justify-between px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white transition-colors">
                        <div className="flex items-center">
                            <ShoppingBag size={20} className="mr-3" /> Products
                        </div>
                        <ChevronDown size={18} className={`transition-transform ${isProductsOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isProductsOpen && (
                         <div className="pl-4 mt-2 space-y-1 border-l border-gray-700 ml-5 max-h-[calc(100vh-250px)] overflow-y-auto hide-scrollbar">
                            <a href="#" onClick={(e) => { e.preventDefault(); onSelectCategory(null); }}
                               className={`flex justify-between items-center text-sm py-2 px-2 rounded-md ${!selectedCategory ? 'bg-gray-600' : 'hover:bg-gray-700'}`}>
                                Show All
                            </a>
                            {categories.map(mainCat => (
                                <div key={mainCat.id} className="pt-2">
                                    <h4 className="font-bold text-gray-300 uppercase text-xs tracking-wider px-2">{mainCat.name}</h4>
                                    {mainCat.children.map(subCat => (
                                        <SubCategory key={subCat.id} category={subCat} onSelectCategory={onSelectCategory} selectedCategory={selectedCategory} level={1} />
                                    ))}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                 {/* ✅ 2. Add the new Link to the Reports page */}
                <Link href="/admin/reports" className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white transition-colors">
                    <FileText size={20} className="mr-3" /> Reports
                </Link>
                <a href="#" className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white transition-colors">
                    <Users size={20} className="mr-3" /> Customers
                </a>
            </nav>
            <div className="px-4 py-6 border-t border-gray-800 space-y-2">
                <a href="#" className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white transition-colors">
                    <Settings size={20} className="mr-3" /> Settings
                </a>
                <button onClick={() => signOut({ callbackUrl: '/' })} className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white transition-colors">
                    <LogOut size={20} className="mr-3" /> Log Out
                </button>
            </div>
        </aside>
    );
}

const Header = ({ searchQuery, onSearchChange }) => {
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        const date = new Date();
        const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
        setCurrentDate(date.toLocaleDateString('en-US', options));
    }, []);

    return (
        <header className="flex justify-between items-center py-4 flex-wrap gap-4">
            <div className="relative w-full max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                    type="text"
                    placeholder="Search a product"
                    value={searchQuery}
                    onChange={onSearchChange}
                    className="w-full bg-white py-2 pl-10 pr-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-gray-600">
                    <Calendar size={20} />
                    <span className="text-sm font-medium">{currentDate}</span>
                </div>
                <div className="relative flex items-center gap-2 text-gray-600">
                    <Bell size={20} />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="font-semibold text-gray-700">Hypebeast Store</span>
                    <div className="w-10 h-10 bg-red-500 text-white flex items-center justify-center rounded-full font-bold">H</div>
                </div>
            </div>
        </header>
    );
};

const RevenueChart = ({ revenue }) => (
    <div className="bg-white p-6 rounded-xl shadow-md col-span-1 lg:col-span-2">
        <div className="flex justify-between items-center mb-4">
            <div>
                <h3 className="text-lg font-bold text-gray-800">Revenue</h3>
                <p className="text-2xl font-bold text-gray-900 mt-1">${revenue.toLocaleString()} <span className="text-sm font-semibold text-green-500 ml-2">+8.26%</span></p>
            </div>
            <div className="flex gap-4 text-sm">
                <p className="text-gray-500">Total Earn</p>
                <p className="text-gray-500">Total Views</p>
            </div>
        </div>
        <div className="h-64 w-full">
            <svg width="100%" height="100%" viewBox="0 0 500 220" preserveAspectRatio="none">
                <path d="M 0 150 L 50 120 L 100 140 L 150 100 L 200 130 L 250 80 L 300 110 L 350 120 L 400 90 L 450 110 L 500 100" stroke="#fb923c" fill="none" strokeWidth="2" />
                <path d="M 0 160 L 50 170 L 100 130 L 150 150 L 200 120 L 250 160 L 300 140 L 350 180 L 400 150 L 450 170 L 500 140" stroke="#4ade80" fill="none" strokeWidth="2" />
                <line x1="0" y1="200" x2="500" y2="200" stroke="#e5e7eb" strokeWidth="1" />
                {['4 Mon', '5 Tue', '6 Wed', '7 Thu', '8 Fri', '9 Sat'].map((day, i) => (
                    <text key={day} x={i * 83 + 41.5} y="215" fontSize="12" fill="#9ca3af" textAnchor="middle">{day}</text>
                ))}
            </svg>
        </div>
    </div>
);

const StatCard = ({ title, value, change, icon: Icon, iconBgColor }) => (
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
            <p className="text-xs text-gray-500 mt-2">
                {change}
            </p>
        )}
    </div>
);

const GlobalStyles = () => (
  <style jsx global>{`
    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .hide-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `}</style>
);

const DashboardPage = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [stats, setStats] = useState({ salesToday: 0, totalEarning: 0, totalOrders: 0, visitorToday: 0 });
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
        } else if (status === 'authenticated') {
            const loadDashboardData = async () => {
                setLoading(true);
                const fetchedStats = await fetchDashboardStats();
                setStats(fetchedStats);
                setLoading(false);
            };
            loadDashboardData();
        }
    }, [status, router]);

    if (loading || status === 'loading') {
        return <div className="flex justify-center items-center h-screen">Loading Dashboard...</div>
    }

    return (
        <div className="bg-gray-50 font-sans min-h-screen">
            <GlobalStyles />
            <Sidebar 
                selectedCategory={selectedCategory} 
                onSelectCategory={setSelectedCategory} 
            />
            <main className="flex-1 p-4 sm:p-8 ml-0 lg:ml-64">
                <Header 
                    searchQuery={searchQuery}
                    onSearchChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-8">
                    <RevenueChart revenue={2810} />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                        <StatCard
                            title="Sales Today"
                            value={`$${stats.salesToday}`}
                            change="Updated every order success"
                            icon={DollarSign}
                            iconBgColor="bg-orange-500"
                        />
                        <StatCard
                            title="Total Earning"
                            value={`$${stats.totalEarning.toLocaleString()}`}
                            change="+8.28% More earning than usual"
                            icon={DollarSign}
                            iconBgColor="bg-green-500"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <StatCard
                        title="Total Orders"
                        value={stats.totalOrders.toLocaleString()}
                        change="+2.18% More orders than usual"
                        icon={ListOrdered}
                        iconBgColor="bg-blue-500"
                    />
                    <StatCard
                        title="Visitor Today"
                        value={stats.visitorToday.toLocaleString()}
                        change="+3.08% More visitors than usual"
                        icon={UserCheck}
                        iconBgColor="bg-indigo-500"
                    />
                </div>
                <ProductClient 
                    searchQuery={searchQuery} 
                    selectedCategory={selectedCategory} 
                />
            </main>
        </div>
    );
};

export default DashboardPage;