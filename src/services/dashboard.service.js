// chouseangly/zandoapp/zandoApp-main/src/services/dashboard.service.js

import { getSession } from "next-auth/react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api/v1';

// ... (fetchDashboardStats is unchanged) ...

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
    
    // ✅ REMOVED: No more mapping and adding mock stats. Just return the payload.
    return apiResponse.payload;

  } catch (error) {
    console.error("Failed to fetch admin products:", error);
    return [];
  }
};