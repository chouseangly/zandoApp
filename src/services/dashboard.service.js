import { getSession } from "next-auth/react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api/v1';

export const fetchDashboardStats = async () => {
  const session = await getSession();
  try {
    const response = await fetch(`${API_BASE_URL}/dashboard/stats`, {
      headers: {
        'Authorization': `Bearer ${session?.user?.token}`
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const apiResponse = await response.json();
    return apiResponse.payload;

  } catch (error) {
    console.error("Failed to fetch dashboard stats:", error);
    return { salesToday: 0, totalEarning: 0, totalOrders: 0, visitorToday: 0 };
  }
};

export const fetchAdminProducts = async () => {
  const session = await getSession();
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
        headers: {
        'Authorization': `Bearer ${session?.user?.token}`
      }
    });
    if (!response.ok) throw new Error('Network response was not ok');
    
    const apiResponse = await response.json();
    
    // Add mock stats for display until backend provides them
    return apiResponse.payload.map(p => ({
        ...p,
        sell: Math.floor(Math.random() * 150),
        view: Math.floor(Math.random() * 15000),
        earning: p.price * Math.floor(Math.random() * 100),
        status: p.isAvailable ? 'Available' : 'Out of stock' 
    }));
  } catch (error) {
    console.error("Failed to fetch admin products:", error);
    return [];
  }
};