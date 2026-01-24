import { Axios } from "../constants/maincontant";
export const getAllhampers = async (filters = {}) => {
  try {
    // console.log('🔍 Sending filters to backend:', filters);

    // ✅ FIXED: Pass 'filters' as the 'params' property
    const response = await Axios.get("/api/v1/hampers", {
      params: filters, 
    });

    // console.log('✅ Hampers received:', response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching hampers:", error.response?.data || error.message);
    throw error; // Throwing error so the UI can catch it and show a message
  }
};


export const getHamperById = async (hamperId) => {
  try {
    const response = await Axios.get(`/api/v1/hampers/${hamperId}`);
    // Assuming standard response structure: { success: true, data: { ...hamper } }
    return response.data; 
  } catch (error) {
    console.error("Error fetching hamper:", error);
    throw error; // Throwing allows the UI to catch it
  }
};


export const userCustomizeHamper = async (customization, hamperId) => {
  try {
    const res = await Axios.put(
      `/api/v1/hampers/${hamperId}/customize`,
      customization
    );
    return res.data;
  } catch (err) {
    return err.response?.data || err;
  }
};



export const getAllCards = async (filters = {}) => {
  try {
    // console.log('🔍 Sending filters to backend:', filters);

    // ✅ FIXED: Pass 'filters' as the 'params' property
    const response = await Axios.get("/api/v1/cards");

    // console.log('✅ Hampers received:', response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching hampers:", error.response?.data || error.message);
    throw error; // Throwing error so the UI can catch it and show a message
  }
};
export const getAllBoxes = async (filters = {}) => {
  try {
    // console.log('🔍 Sending filters to backend:', filters);

    // ✅ FIXED: Pass 'filters' as the 'params' property
    const response = await Axios.get("/api/v1/boxes");

    // console.log('✅ Hampers received:', response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching hampers:", error.response?.data || error.message);
    throw error; // Throwing error so the UI can catch it and show a message
  }
};


export const submitCustomizeRequest = async (data) => {
  try {
    const response = await Axios.post("/api/v1/customize-requests", data);
    return response.data;
  } catch (error) {
    console.error("❌ Error creating request:", error.response?.data || error.message);
    throw error;
  }
};