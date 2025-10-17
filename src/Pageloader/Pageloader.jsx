import React from "react";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/lottie.json"

const PageLoader = ({ loading }) => {
    return (
      <div
        className={`fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50 transition-opacity duration-500 ${
          loading ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <Lottie
          animationData={loadingAnimation}
          loop
          autoplay
          style={{ width: 250, height: 250 }}
        />
      </div>
    );
  };
export default PageLoader;
