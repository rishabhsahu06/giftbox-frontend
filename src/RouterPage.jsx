import { useRoutes } from "react-router-dom";
import Layout from "./layout/Layout";
import Dashboard from "./userPanel/Dashboard";
import { Routers } from "./constants/router";
import Home from "./landingPage/Home";
import FashionProductCards from "./pages/FashionProductCards";
import ProductDetailPage from "./pages/ProductDetailPage";
import RegisterPage from "./auth/RegisterPage";
import ContactPage from "./landingPage/contact/ContactPage";
import CartPage from "./pages/Cart";
import Profile from "./userPanel/Profile";
import MyOrders from "./userPanel/MyOrders";
import AddressBook from "./userPanel/AddressBook";
import ChangePassword from "./userPanel/ChangePassword";
import AddressCheckoutPage from "./pages/Addresscheckout";
import Payment from "./pages/Payment";
import WishlistPage from "./landingPage/WishlistPage";
import Invoice from "./userPanel/Invoice";
import AllProductsPage from "./pages/AllProducts";
import OAuthSuccess from "./pages/OAuthSuccess";
import About from "./landingPage/About";
import Supportpage from "./landingPage/support";
import AllCategoryPage from "./landingPage/Allcategorypage/AllCategoryPage";
import LoginPage from "./auth/LoginPage";
import CustomizedPage from "./landingPage/Customize";

const RouterPage = () => {
  const element = useRoutes([
    {
      element: <Layout />,
      children: [
        { path: Routers.website, element: <Home /> },
        { path: Routers.about, element: <About /> },
        { path: Routers.support, element: <Supportpage /> },
        { path: Routers.products, element: <FashionProductCards /> },
        { path: Routers.productDetail, element: <ProductDetailPage /> },
        { path: Routers.cart, element: <CartPage /> },
        { path: Routers.AddressCheckoutPage, element: <AddressCheckoutPage /> },
        { path: Routers.Payment, element: <Payment /> },
        { path: Routers.wishlist, element: <WishlistPage /> },
        { path: Routers.contact, element: <ContactPage /> },
        { path: Routers.AllProductsPage, element: <AllProductsPage /> },
        { path: Routers.AllCategoryPage, element: <AllCategoryPage /> },
        { path: Routers.oAuthSuccess, element: <OAuthSuccess /> }, // fixed key
        { path: Routers.customize, element: <CustomizedPage /> },
      ],
    },
    { path: Routers.login, element: <LoginPage /> },
    { path: Routers.register, element: <RegisterPage /> },
    {
      path: Routers.dashboard,
      element: <Dashboard />, // removed ProtectedRoute
      children: [
        { index: true, element: <Profile /> },
        { path: Routers.invoice, element: <Invoice /> },
        { path: "myOrders", element: <MyOrders /> },
        { path: "addressBook", element: <AddressBook /> },
        { path: "changePassword", element: <ChangePassword /> },
      ],
    },
  ]);

  return element;
};

export default RouterPage;
