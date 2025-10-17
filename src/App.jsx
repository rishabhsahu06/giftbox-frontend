  // src/App.jsx
  import { BrowserRouter } from "react-router-dom";
  import RouterPage from "./RouterPage";
  import { Toaster } from "sonner";
  import ScrollToTop from "./Component/Pages/ScrollToTop";
  import { AuthProvider } from "./context/AuthContext";
  import { CartProvider } from "./context/CartContext";

  function App() {
    return (
      <AuthProvider>
        <CartProvider>
          <Toaster richColors position="top-center" duration={1000} />
          <BrowserRouter>
            <ScrollToTop />
            <RouterPage />
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    );
  }

  export default App;
