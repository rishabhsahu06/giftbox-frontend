// import { useEffect } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";

// const OAuthSuccess = () => {
//   const [searchParams] = useSearchParams(
//     new URLSearchParams(window.location.hash.replace("#", "?"))
//   );
//   const navigate = useNavigate();

//   useEffect(() => {
//     const accessToken = searchParams.get("accessToken");
//     const refreshToken = searchParams.get("refreshToken");

//     if (accessToken) {
//       // Save tokens for authenticated API calls
//       localStorage.setItem("accessToken", accessToken);
//       localStorage.setItem("refreshToken", refreshToken);

//       // Redirect to profile
//       navigate("/dashboard");
//     } else {
//       navigate("/login");
//     }
//   }, [navigate, searchParams]);

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
//       <div className="bg-white p-8 rounded-xl shadow-md">
//         <h2 className="text-lg font-semibold text-gray-800 mb-4">
//           Signing you in with Google...
//         </h2>
//         <p className="text-gray-500 text-sm">Please wait a moment.</p>
//       </div>
//     </div>
//   );
// };

// export default OAuthSuccess;

import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const OAuthSuccess = () => {
  const [searchParams] = useSearchParams(); // <-- no need for custom hash parsing
  const navigate = useNavigate();

  useEffect(() => {
    const code = searchParams.get("code"); // Google sends "code"
    
    if (code) {
      // Send code to backend to exchange for tokens
      fetch("https://2w1qtkhf-3000.inc1.devtunnels.ms/api/v1/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      })
        .then(res => res.json())
        .then(data => {
          // Assume backend returns accessToken & refreshToken
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);
          navigate("/dashboard");
        })
        .catch(err => {
          console.error(err);
          navigate("/login");
        });
    } else {
      navigate("/login");
    }
  }, [navigate, searchParams]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Signing you in with Google...
        </h2>
        <p className="text-gray-500 text-sm">Please wait a moment.</p>
      </div>
    </div>
  );
};

export default OAuthSuccess;
