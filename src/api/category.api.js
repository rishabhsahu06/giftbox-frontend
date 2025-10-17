import { Axios } from "../constants/maincontant";

export const getAllCategories = async () => {
  try {
    const response = await Axios.get("/api/v1/categories/get-categories");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return error.response?.data || { success: false, message: "Server error" };
  }
};

export const getSubcategoriesByCategory = async (categoryId) => {
    try {
        const response = await Axios.get(`/api/v1/categories/get-sub-categories/${categoryId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching subcategories:", error);
        return error;
    }
};

export const getParentCategoriesBySubcategory = async () => {
    try {
        const response = await Axios.get("/api/v1/categories/get-parent-categories");
        return response.data;
    }

    catch (error) {
        console.error("Error fetching child categories:", error);
        return error;
    }
};

export const getAllProductsByCategory = async (categoryId) => {
    try {
      const res = await Axios.get(`/user/products-by-category/${categoryId}`);
      return res.data; // { products: [...] }
    } catch (err) {
      console.error("Error fetching products by category:", err);
      return { products: [] };
    }
  };
  
  // Get products by subcategory
  export const getAllProductsBySubCategory = async (subcategoryId) => {
    try {
      const res = await Axios.get(`/user/products-by-subcategory/${subcategoryId}`);
      return res.data; // { products: [...] }
    } catch (err) {
      console.error("Error fetching products by subcategory:", err);
      return { products: [] };
    }
  };

  export const customizedcategory = async (productIds, description) => {
  try {
    const payload = {
      products: productIds,
      description: description,
    };
    const res = await Axios.post(
      "/api/v1/hamper-requests/create-hamper-request",
      payload
    );
    return res.data;
  } catch (err) {
    console.error("Failed to submit hamper request:", err);
    throw err;
  }
};