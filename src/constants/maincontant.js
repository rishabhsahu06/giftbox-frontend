import axios from "axios";
import logo from "../assets/logo1.png";


export const MainContent = {
  appName: import.meta.env.VITE_APP_NAME,
  logo: logo,
  // appLogoClr: appLogoClr,
  appURL: "",
  contactNo: "9112233507",
  email: "hetalsoapstory@gmail.com",
  address: "10 Godha colony pagnispaga palsikar Indore 452001",
  // telegram_link: "https://t.me/YourTelegramUsername",
};
export const backendConfig = {

  base: "https://giftbox-backend-12cs.vercel.app/",
  origin: "https://giftbox-backend-12cs.vercel.app/api",

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



