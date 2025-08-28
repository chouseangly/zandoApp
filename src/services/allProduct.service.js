// This function fetches all products from your backend API
export const fetchAllProducts = async () => {
  try {
    // The backend endpoint for getting all products is /api/products
    const response = await fetch('http://localhost:8080/api/products/getAllProducts');

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // The actual product list is inside the 'payload' property of the response
    const apiResponse = await response.json();
    return apiResponse.payload;

  } catch (error) {
    console.error("Failed to fetch products:", error);
    return []; // Return an empty array on error to prevent crashes
  }
};