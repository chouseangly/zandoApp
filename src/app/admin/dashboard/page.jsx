"use client";

import React, { useState, useEffect } from 'react';
import ProductClient from './ProductClient';
import { DollarSign, ListOrdered, UserCheck } from 'lucide-react';
import { fetchDashboardStats } from '@/services/dashboard.service';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

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

const DashboardPage = ({ searchQuery, selectedCategory }) => {
    const { status } = useSession();
    const router = useRouter();
    const [stats, setStats] = useState({ salesToday: 0, totalEarning: 0, totalOrders: 0, visitorToday: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === 'authenticated') {
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
        return <div className="flex justify-center items-center py-20">Loading Dashboard Content...</div>;
    }

    return (
        <div>
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
        </div>
    );
};

export default DashboardPage;