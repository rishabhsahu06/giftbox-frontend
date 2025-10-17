import axios from "axios";
import logo from "../assets/logo1.png";


export const MainContent = {
  appName: "Darvar Collection",
  logo: logo,
  // appLogoClr: appLogoClr,
  appURL: "",
  contactNo: "+096855 53090",
  email: "Hetalcollection@example.com",
  address: "Shop NO.- 5 and 6, Plot no.130, Birla Mandir Rd, Near Malviya Complex, Roshanpura, Malviya Nagar, Bhopal, Madhya Pradesh 462003",
  telegram_link: "https://t.me/YourTelegramUsername",
};
export const backendConfig = {

  base: "https://2w1qtkhf-3000.inc1.devtunnels.ms/",
  origin: "https://2w1qtkhf-3000.inc1.devtunnels.ms/api",

};

export const Axios = axios.create({
  baseURL: backendConfig.base,
  withCredentials: true,
});
Axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken"); // get token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


