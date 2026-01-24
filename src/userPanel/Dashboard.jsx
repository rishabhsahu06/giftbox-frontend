// import React from "react";
// import { Outlet } from "react-router-dom";
// import Sidebar from "./Sidebar";
// import Header from "./Header";
// import useTokenExpiryWatcher from "../auth/useTokenExpiryWatcher";

// const Dashboard = () => {

//   useTokenExpiryWatcher();

//   return (
//     <div className="flex h-screen">
//       <Sidebar />
//       <div className="flex-1 flex flex-col">
//         <Header />
//         <main className="p-6 bg-gray-100 flex-1 overflow-auto">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import useTokenExpiryWatcher from "../auth/useTokenExpiryWatcher";

const Dashboard = () => {
  useTokenExpiryWatcher();

  const location = useLocation();

  // 🔥 Invoice page detection
  const isInvoicePage = location.pathname.includes("/invoice");

  return (
    <div className="flex h-screen">
      {/* Sidebar hide on invoice */}
      {!isInvoicePage && <Sidebar />}

      <div className="flex-1 flex flex-col">
        {/* Header hide on invoice */}
        {!isInvoicePage && <Header />}

        <main
          className={`flex-1 ${
            isInvoicePage
              ? "bg-gray-100 p-0 overflow-visible"
              : "p-6 bg-gray-100 overflow-auto"
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
