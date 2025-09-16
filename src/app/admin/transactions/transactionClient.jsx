// src/app/admin/transactions/TransactionClient.jsx

"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, CalendarIcon, ChevronDown, Filter, Upload } from 'lucide-react';
import { format, parseISO, isValid } from 'date-fns';
import { fetchTransactions, fetchTransactionStatusCounts } from '@/services/transaction.service';
import DatePicker from '@/components/ui/DatePicker'; // Your DatePicker component
import TransactionCard from './transactionCard'; // Component to display individual transaction

// Status filter options
const statusOptions = ['All Status', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Pending'];

const TransactionClient = ({ initialSearchParams }) => {
    const router = useRouter();
    const searchParams = useSearchParams(); // Use this for reading current URL state
    
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusCounts, setStatusCounts] = useState({});
    
    // State for local input values before updating URL
    const [searchInputValue, setSearchInputValue] = useState('');
    const [selectedDate, setSelectedDate] = useState(null); // For single date picker

    // Derive current filter states from URL search params
    const currentStatusFilter = searchParams.get('status') || 'All Status';
    const currentSearchQuery = searchParams.get('q') || '';
    const currentDateFrom = searchParams.get('dateFrom');
    const currentDateTo = searchParams.get('dateTo'); // Not directly used by single date picker, but good for range if implemented

    // Initialize local input value from URL on first render or URL change
    useEffect(() => {
        setSearchInputValue(currentSearchQuery);
        if (currentDateFrom && isValid(parseISO(currentDateFrom))) {
            setSelectedDate(parseISO(currentDateFrom));
        } else {
            setSelectedDate(null);
        }
    }, [currentSearchQuery, currentDateFrom]);

    // Function to update URL search parameters
    const updateSearchParams = useCallback((key, value) => {
        const newParams = new URLSearchParams(searchParams.toString());
        if (value) {
            newParams.set(key, value);
        } else {
            newParams.delete(key);
        }
        router.push(`?${newParams.toString()}`);
    }, [router, searchParams]);

    // Handle Search input change (updates URL on submit/debounce)
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        updateSearchParams('q', searchInputValue.trim());
    };

    // Handle Status filter click
    const handleStatusFilter = (status) => {
        updateSearchParams('status', status === 'All Status' ? null : status);
    };

    // Handle Date selection
    const handleDateSelect = (date) => {
        setSelectedDate(date);
        if (date) {
            // For a single date picker, we filter by that specific date
            // You might want a range picker for dateFrom/dateTo in a real app
            const formattedDate = format(date, 'yyyy-MM-dd');
            updateSearchParams('dateFrom', formattedDate);
            updateSearchParams('dateTo', formattedDate); // For single date, dateFrom and dateTo are the same
        } else {
            updateSearchParams('dateFrom', null);
            updateSearchParams('dateTo', null);
        }
    };

    // Fetch transactions based on URL parameters
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            
            const filters = {
                search: currentSearchQuery,
                status: currentStatusFilter,
                dateRange: (currentDateFrom && currentDateTo) ? { 
                    from: parseISO(currentDateFrom), 
                    to: parseISO(currentDateTo) 
                } : null,
            };

            const [fetchedTransactions, fetchedCounts] = await Promise.all([
                fetchTransactions(filters),
                fetchTransactionStatusCounts(), // Fetch counts separately as they might not change with filters
            ]);
            
            setTransactions(fetchedTransactions);
            setStatusCounts(fetchedCounts);
            setLoading(false);
        };

        loadData();
    }, [currentStatusFilter, currentSearchQuery, currentDateFrom, currentDateTo]); // Dependencies on URL params

    return (
        <div className="px-4 py-8 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                    <h1 className="text-2xl font-bold text-gray-800">Transaction</h1>
                    <div className="flex items-center text-sm breadcrumbs text-gray-600">
                        <ul>
                            <li>Dashboard</li>
                            <li>Transaction</li>
                        </ul>
                    </div>
                    <button className="bg-white text-gray-800 px-4 py-2 rounded-lg flex items-center gap-2 border border-gray-300 hover:bg-gray-100 transition-colors">
                        <Upload size={18} /> Export All Transaction
                    </button>
                </div>

                {/* Filter and Search Bar */}
                <div className="bg-white p-6 rounded-xl shadow-md mb-8">
                    <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
                        <form onSubmit={handleSearchSubmit} className="relative flex-grow max-w-sm">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search orders..."
                                value={searchInputValue}
                                onChange={(e) => setSearchInputValue(e.target.value)}
                                className="w-full bg-gray-100 py-2 pl-10 pr-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </form>
                        <div className="flex items-center gap-4 flex-wrap">
                            <DatePicker 
                                selectedDate={selectedDate}
                                onSelectDate={handleDateSelect}
                                placeholder="Select Date"
                            />
                            <button className="flex items-center gap-2 text-gray-600 text-sm font-medium border rounded-md px-3 py-1.5 hover:bg-gray-50">
                                <Filter size={16} /> Filters <ChevronDown size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Status Tabs */}
                    <div className="flex flex-wrap gap-2">
                        {statusOptions.map(status => (
                            <button
                                key={status}
                                onClick={() => handleStatusFilter(status)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    currentStatusFilter === status
                                        ? 'bg-black text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {status} ({statusCounts[status] || 0})
                            </button>
                        ))}
                    </div>
                </div>

                {/* Transactions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading ? (
                        Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 animate-pulse h-60">
                                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                                <div className="h-10 bg-gray-200 rounded mb-4"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                            </div>
                        ))
                    ) : transactions.length > 0 ? (
                        transactions.map(transaction => (
                            <TransactionCard key={transaction.id} transaction={transaction} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-10 text-gray-600">No transactions found for the current filters.</div>
                    )}
                </div>

                {/* Pagination (Placeholder - not fully implemented in this example) */}
                <div className="flex justify-center mt-8">
                    {/* You'll add pagination controls here based on your backend API */}
                    {/* <button className="px-4 py-2 border rounded-lg hover:bg-gray-100">Previous</button> */}
                    {/* <span className="mx-2">Page 1 of 10</span> */}
                    {/* <button className="px-4 py-2 border rounded-lg hover:bg-gray-100">Next</button> */}
                </div>
            </div>
        </div>
    );
};

export default TransactionClient;