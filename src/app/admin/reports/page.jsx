"use client";

import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { MoreHorizontal, DollarSign, ListOrdered, Users, ArrowUp, ArrowDown } from 'lucide-react';
import { fetchDashboardStats, fetchAdminProducts } from '@/services/dashboard.service';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// --- Reusable Components ---

const StatCard = ({ title, value, change, changeType, icon: Icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex-1">
    <div className="flex justify-between items-center">
      <div className="flex flex-col">
        <span className="text-sm text-gray-500">{title}</span>
        <span className="text-2xl font-bold text-gray-800 mt-1">{value}</span>
      </div>
      <Icon className="w-8 h-8 text-gray-400" />
    </div>
    <div className={`flex items-center text-sm mt-2 ${changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`}>
      {changeType === 'increase' ? <ArrowUp size={16} className="mr-1" /> : <ArrowDown size={16} className="mr-1" />}
      <span>{change}</span>
    </div>
  </div>
);

const RevenueChart = () => {
  const data = [
    { name: 'Jan', current: 4000, previous: 2400 },
    { name: 'Feb', current: 3000, previous: 1398 },
    { name: 'Mar', current: 5000, previous: 9800 },
    { name: 'Apr', current: 4780, previous: 3908 },
    { name: 'May', current: 5890, previous: 4800 },
    { name: 'Jun', current: 4390, previous: 3800 },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md col-span-2">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Revenue</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="current" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="previous" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const TopProductsTable = ({ products }) => (
  <div className="bg-white p-6 rounded-lg shadow-md mt-6">
    <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800">Top Selling Products</h3>
        <button className="text-sm text-blue-500 hover:underline">See All</button>
    </div>
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-500">Product Name</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-500">Price</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-500">Category</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-500">Quantity</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-500">Amount</th>
          </tr>
        </thead>
        <tbody>
          {products.slice(0, 5).map(product => (
            <tr key={product.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 flex items-center">
                    <img src={product.gallery?.[0]?.images?.[0] || 'https://placehold.co/40x40'} alt={product.name} className="w-10 h-10 rounded-md object-cover mr-4" />
                    <span className="font-medium text-gray-800">{product.name}</span>
                </td>
                <td className="py-3 px-4 text-gray-600">${product.price.toFixed(2)}</td>
                <td className="py-3 px-4 text-gray-600">{product.categories?.[0]?.name || 'N/A'}</td>
                <td className="py-3 px-4 text-gray-600">{product.sell}</td>
                <td className="py-3 px-4 font-semibold text-gray-800">${product.earning.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// --- Main Report Page Component ---

const ReportsPage = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [stats, setStats] = useState({ salesToday: 0, totalEarning: 0, totalOrders: 0, visitorToday: 0 });
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
        } else if (status === 'authenticated') {
            const loadData = async () => {
                setLoading(true);
                const [fetchedStats, fetchedProducts] = await Promise.all([
                    fetchDashboardStats(),
                    fetchAdminProducts()
                ]);
                setStats(fetchedStats);
                setProducts(fetchedProducts);
                setLoading(false);
            };
            loadData();
        }
    }, [status, router]);

    if (loading || status === 'loading') {
        return <div className="flex justify-center items-center h-screen bg-gray-100">Loading Reports...</div>
    }

    return (
        <div className="bg-gray-100 p-8 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Reports</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <StatCard title="Total Sales" value={`$${stats.totalEarning.toLocaleString()}`} change="14% in the last month" changeType="increase" icon={DollarSign} />
                <StatCard title="Total Orders" value={stats.totalOrders.toLocaleString()} change="17% in the last month" changeType="decrease" icon={ListOrdered} />
                <StatCard title="Total Revenue" value={`$${stats.salesToday.toLocaleString()}`} change="14% in the last month" changeType="increase" icon={DollarSign} />
                <StatCard title="Total Customers" value={stats.visitorToday.toLocaleString()} change="11% in the last month" changeType="decrease" icon={Users} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <RevenueChart />
                {/* Placeholder for Sales By Location & Total Sales Donut Chart */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Sales By Location</h3>
                    {/* You can add a map or bar chart component here */}
                    <p className="text-gray-500">Location chart placeholder.</p>
                </div>
            </div>

            <TopProductsTable products={products} />
        </div>
    );
};

export default ReportsPage;