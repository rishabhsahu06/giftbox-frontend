import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // page ko top se scroll kare
    window.scrollTo({
      top: 0,
      behavior: "auto", // "smooth" bhi kar sakte ho agar smooth scroll chahiye
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;