// src/services/transaction.service.js

import { format, subDays, startOfMonth, endOfMonth, parseISO } from 'date-fns';

const mockTransactions = [
    {
        id: '14098',
        orderType: 'Express Shipping',
        productImage: '/images/smartwatch.png', // Ensure you have this image or replace
        productName: 'Smartwatch E2 Black',
        additionalProducts: 1,
        price: 183.00,
        status: 'Cancelled',
        orderDate: '2023-09-26',
        customerName: 'Ralph Edwards',
        paymentMethod: 'Visa',
    },
    {
        id: '14097',
        orderType: 'Standard Shipping',
        productImage: '/images/sneakers.png', // Ensure you have this image or replace
        productName: 'Sneakers Pro X',
        additionalProducts: 0,
        price: 375.00,
        status: 'Delivered',
        orderDate: '2023-09-26',
        customerName: 'Marilyn Mondrong', // Your name from the image!
        paymentMethod: 'Mastercard',
    },
    {
        id: '14096',
        orderType: 'Flat Shipping',
        productImage: '/images/headphones.png', // Ensure you have this image or replace
        productName: 'Headphone G1 Pro Wired',
        additionalProducts: 2,
        price: 332.00,
        status: 'Pending',
        orderDate: '2023-09-24',
        customerName: 'Cameron Williamson',
        paymentMethod: 'Mastercard',
    },
    {
        id: '14095',
        orderType: 'Expedited',
        productImage: '/images/smartphone.png', // Ensure you have this image or replace
        productName: 'Smartphone X2 Ultra',
        additionalProducts: 1,
        price: 286.00,
        status: 'Delivered',
        orderDate: '2023-09-24',
        customerName: 'Kathryn Murphy',
        paymentMethod: 'Ethereum',
    },
    {
        id: '14093',
        orderType: 'Express Shipping',
        productImage: '/images/laptop.png', // Ensure you have this image or replace
        productName: 'Iphone XR Black 128 GB',
        additionalProducts: 0,
        price: 328.00,
        status: 'Delivered',
        orderDate: '2023-09-22',
        customerName: 'William Howard',
        paymentMethod: 'Visa',
    },
    {
        id: '14094',
        orderType: 'Cargo Shipping',
        productImage: '/images/keyboard.png', // Ensure you have this image or replace
        productName: 'Logitech MX Master II',
        additionalProducts: 1,
        price: 249.00,
        status: 'Delivered',
        orderDate: '2023-09-22',
        customerName: 'Jacob Jones',
        paymentMethod: 'Bitcoin',
    },
    {
        id: '14092',
        orderType: 'Standard Shipping',
        productImage: '/images/tablet.png', // Ensure you have this image or replace
        productName: 'Samsung Galaxy Tab A7 Lite',
        additionalProducts: 0,
        price: 150.00,
        status: 'Processing',
        orderDate: '2023-09-20',
        customerName: 'Leslie Alexander',
        paymentMethod: 'Visa',
    },
    {
        id: '14091',
        orderType: 'Express Shipping',
        productImage: '/images/camera.png', // Ensure you have this image or replace
        productName: 'Sony Alpha a6000 Mirrorless',
        additionalProducts: 0,
        price: 599.00,
        status: 'Shipped',
        orderDate: '2023-09-18',
        customerName: 'Eleanor Pena',
        paymentMethod: 'Mastercard',
    },
    {
        id: '14090',
        orderType: 'Flat Shipping',
        productImage: '/images/drone.png', // Ensure you have this image or replace
        productName: 'DJI Mini 2 Drone',
        additionalProducts: 0,
        price: 449.00,
        status: 'Delivered',
        orderDate: '2023-09-15',
        customerName: 'Guy Hawkins',
        paymentMethod: 'PayPal',
    },
    {
        id: '14089',
        orderType: 'Standard Shipping',
        productImage: '/images/watch.png', // Ensure you have this image or replace
        productName: 'Fitbit Charge 5',
        additionalProducts: 0,
        price: 149.00,
        status: 'Pending',
        orderDate: '2023-09-12',
        customerName: 'Annette Black',
        paymentMethod: 'Visa',
    },
];

// Ensure you have these placeholder images in your public folder or update paths:
// public/images/smartwatch.png
// public/images/sneakers.png
// public/images/headphones.png
// public/images/smartphone.png
// public/images/laptop.png
// public/images/keyboard.png
// public/images/tablet.png
// public/images/camera.png
// public/images/drone.png
// public/images/watch.png


export async function fetchTransactions(filters = {}) {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay

    let filtered = [...mockTransactions];

    if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filtered = filtered.filter(t => 
            t.productName.toLowerCase().includes(searchTerm) ||
            t.customerName.toLowerCase().includes(searchTerm) ||
            t.id.includes(searchTerm)
        );
    }

    if (filters.status && filters.status !== 'All Status') {
        filtered = filtered.filter(t => t.status === filters.status);
    }

    if (filters.dateRange) {
        const { from, to } = filters.dateRange;
        const fromDate = from ? parseISO(format(from, 'yyyy-MM-dd')) : null;
        const toDate = to ? parseISO(format(to, 'yyyy-MM-dd')) : null;
        
        filtered = filtered.filter(t => {
            const orderDate = parseISO(t.orderDate);
            let match = true;
            if (fromDate && orderDate < fromDate) match = false;
            if (toDate && orderDate > toDate) match = false;
            return match;
        });
    }

    // Sort by most recent for display consistency
    filtered.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));

    return filtered;
}

// You might also need a function to get transaction counts by status for the filters
export async function fetchTransactionStatusCounts() {
    await new Promise(resolve => setTimeout(resolve, 300));
    const counts = mockTransactions.reduce((acc, t) => {
        acc[t.status] = (acc[t.status] || 0) + 1;
        return acc;
    }, {});
    
    // Add 'All Status' count
    counts['All Status'] = mockTransactions.length;

    return counts;
}