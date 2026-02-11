import { Axios } from "../constants/maincontant";
export const userDetails = async () => {
  try {
    return Axios.get(`/api/v1/auth/profile`);
  } catch (error) {
    console.error("Error fetching user details:", error);
    return error;
  }
};

export const userRegister = async (userData) => {
  try {
    return Axios.post("/api/v1/auth/register", userData);
  } catch (error) { 
    console.error("Error preparing user data:", error);   
    return error;
  }
}

export const userLogin = async (credentials) => {
  try {
    return Axios.post("/api/v1/auth/login", credentials);
  } catch (error) {
    console.error("Error preparing user login data:", error);
    return error;
  }
}

export const verifyOTP = async (email, otp) => {
  try {
    return Axios.post("/api/v1/auth/verify-otp-register", { email, otp });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return error;
  }
};

export const sendForgotPasswordEmail = async ({ email }) => {
  try {
    return Axios.post("/api/v1/auth/forgot-password", { email });
  } catch (error) {
    console.error("Error sending forgot password email:", error);
    return error;
  }
};


export const changePassword = async ({ currentPassword, newPassword }) => {
  try {
    const response = await Axios.post("/api/v1/auth/change-password", {
      oldPassword: currentPassword,
      newPassword,
    });
    return response;
  } catch (error) {
    console.error("Error changing password:", error);
    throw error;
  }
};


export const raiseQuery = async (queryData) => {
  try {
    return Axios.post("/user/raise-query", queryData);
  } catch (error) {
    console.error("Error raising query:", error);
    return error;
  }
}

