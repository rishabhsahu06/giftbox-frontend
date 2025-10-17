import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useTokenExpiryWatcher = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        navigate("/login");
      }
    };

    // Check immediately
    checkToken();

    // Then check every 5 seconds (or any interval you like)
    const interval = setInterval(checkToken, 5000);

    return () => clearInterval(interval);
  }, [navigate]);
};

export default useTokenExpiryWatcher;
