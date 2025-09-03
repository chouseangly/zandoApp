const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api/v1';

// In a real app, you'd have a dedicated endpoint for these stats.
// For now, we'll return hardcoded data as a placeholder.
export const fetchDashboardStats = async () => {
  try {
    const stats = {
      salesToday: 120,
      totalEarning: 81020,
      totalOrders: 102,
      visitorToday: 81020,
    };
    return await Promise.resolve(stats);
  } catch (error) {
    console.error("Failed to fetch dashboard stats:", error);
    return { salesToday: 0, totalEarning: 0, totalOrders: 0, visitorToday: 0 };
  }
};

// Fetches all products for the admin table
export const fetchAdminProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) throw new Error('Network response was not ok');
    
    const apiResponse = await response.json();
    
    // Simulate extra stats not present in the backend model
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