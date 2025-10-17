import { Axios } from "../constants/maincontant";

export const crateAddress = async (addressData) => {
    try {
        // console.log("Address Data being sent:", addressData);
        return Axios.post("api/v1/address/create-address", addressData);
    } catch (error) {
        console.error("Error preparing address data:", error);
        return error;
    }
}

export const updateAddress = async (addressData) => {
  try {
    // console.log("Address Data being sent:", addressData);
    return Axios.patch(`api/v1/address/update-address/${addressData._id}`, addressData); 
  } catch (error) {
    console.error("Error preparing address data:", error);
    return error;
  }
};


export const deleteAddress = async (addressId) => {
    try {
        return Axios.delete(`/api/v1/address/delete-address/${addressId}`);
    } catch (error) {
        console.error("Error deleting address:", error);
        return error;
    }
}


export const getAddress = async () => {
    try {
        const res = await Axios.get("/api/v1/address/get-address");
        return res;
    } catch (error) {
        console.error("Error fetching address:", error);
        return error;
    }
};



// ------------payment api---------------------

export const createOrderAPI = async (payload) => {
    try {

        const res = await Axios.post("/api/v1/orders/create-order", payload);
        return res.data;
    } catch (error) {
        console.error("errpr create api")
        return error;
    }
};

export const verifyPaymentAPI = async (payload) => {
    try {

        const res = await Axios.post("/api/v1/orders/verify-payment", payload);
        return res.data;
    } catch (error) {
        console.error("error create api")
        return error;
    }
};



