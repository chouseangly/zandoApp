"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import {
  LayoutDashboard, BarChart2, ShoppingBag, Users, Settings, LogOut,
  Search, Bell, ChevronDown, FileText
} from 'lucide-react';
import { fetchCategories } from '@/services/category.service';

const SubCategory = ({ category, onSelectCategory, selectedCategory, level }) => (
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

const Sidebar = ({ onSelectCategory, selectedCategory }) => {
    const [categories, setCategories] = useState([]);
    const [isProductsOpen, setIsProductsOpen] = useState(true);
    const pathname = usePathname();

    useEffect(() => {
        const getCategories = async () => {
            const fetchedCategories = await fetchCategories();
            setCategories(fetchedCategories);
        };
        getCategories();
    }, []);

    const isActive = (path) => pathname === path;

    return (
        <aside className="w-64 bg-gray-900 text-gray-400 flex-col min-h-screen hidden lg:flex fixed">
            <div className="p-6 text-center border-b border-gray-800">
                 <img src="/logo.png" alt="Zando Logo" className="mx-auto h-8 w-auto invert" />
            </div>
            <nav className="flex-1 px-4 py-6 space-y-2">
                <Link href="/admin/dashboard" className={`flex items-center px-4 py-2 rounded-lg transition-colors ${isActive('/admin/dashboard') ? 'bg-gray-700 text-white' : 'hover:bg-gray-700 hover:text-white'}`}>
                    <LayoutDashboard size={20} className="mr-3" /> Dashboard
                </Link>
                <Link href="/admin/reports" className={`flex items-center px-4 py-2 rounded-lg transition-colors ${isActive('/admin/reports') ? 'bg-gray-700 text-white' : 'hover:bg-gray-700 hover:text-white'}`}>
                    <FileText size={20} className="mr-3" /> Reports
                </Link>
                <a href="#" className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white transition-colors">
                    <BarChart2 size={20} className="mr-3" /> Sales
                </a>
                <div>
                    <Link href="/admin/products">
                        <div onClick={() => setIsProductsOpen(!isProductsOpen)} className="w-full flex items-center justify-between px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white transition-colors cursor-pointer">
                            <div className="flex items-center">
                                <ShoppingBag size={20} className="mr-3" /> Products
                            </div>
                            <ChevronDown size={18} className={`transition-transform ${isProductsOpen ? 'rotate-180' : ''}`} />
                        </div>
                    </Link>
                    {isProductsOpen && (
                        <div className="pl-4 mt-2 space-y-1 border-l border-gray-700 ml-5 max-h-[calc(100vh-400px)] overflow-y-auto hide-scrollbar">
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
                <a href="#" className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white transition-colors">
                    <Users size={20} className="mr-3" /> Customers
                </a>
            </nav>
            <div className="px-4 py-6 border-t border-gray-800 space-y-2">
                <a href="#" className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white transition-colors">
                    <Settings size={20} className="mr-3" /> Settings
                </a>
                <button onClick={() => signOut({ callbackUrl: '/' })} className="w-full text-left flex items-center px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white transition-colors">
                    <LogOut size={20} className="mr-3" /> Log Out
                </button>
            </div>
        </aside>
    );
};

const Header = ({ onSearchChange }) => {
    return (
        <header className="flex justify-between items-center py-4 flex-wrap gap-4">
            <div className="relative w-full max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                    type="text"
                    placeholder="Search..."
                    onChange={onSearchChange}
                    className="w-full bg-white py-2 pl-10 pr-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="flex items-center gap-6">
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

const GlobalStyles = () => (
    <style jsx global>{`
      .hide-scrollbar::-webkit-scrollbar { display: none; }
      .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    `}</style>
);

export default function AdminLayout({ children }) {
    const { status } = useSession();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
        }
    }, [status, router]);

    if (status === 'loading') {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    const childrenWithProps = React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { searchQuery, selectedCategory });
        }
        return child;
    });

    return (
        <div className="bg-gray-50 font-sans min-h-screen">
            <GlobalStyles />
            <Sidebar 
                selectedCategory={selectedCategory} 
                onSelectCategory={setSelectedCategory} 
            />
            <main className="flex-1 p-4 sm:p-8 ml-0 lg:ml-64">
                <Header 
                    onSearchChange={(e) => setSearchQuery(e.target.value)}
                />
                {childrenWithProps}
            </main>
        </div>
    );
}