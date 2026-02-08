// import React, { useState } from "react";
// import CategoryList from "./category/CategoryList";
// import LandingSlider from "./LandinfSlider";
// import CarouselManual from "./GiftByOccasion";
// import FashionProductCards from "../pages/FashionProductCards";
// import Footer2 from "./Footer2";
// import PageLoader from "../Pageloader/Pageloader";
// import CustomerReviews from "../pages/CustomerReview";
// import BulkGifting from "./Bulkgift";
// import BlogPost from "../pages/CustomerReview";
// import GiftShop from "../pages/GiftShop";
// import AutoSlider from "./Slider";
// import HamperCard from "../pages/HampersGift/HamperCard";
// import HampersPage from "../pages/HampersGift/HampersPage";

// const Home = () => {
//   // const [loading, setloading] = useState(true);

//   return (
//     <>
//       {/* {loading && <PageLoader loading={loading} />} */}
//       <div>
//         <LandingSlider />
//         <CategoryList />
//         <HampersPage />
//         <AutoSlider />
//         <CarouselManual />
//         <BulkGifting/>
//         {/* <section className="mx-auto">
//         <FashionProductCards /> */}
//         {/* </section> */}
//         <BlogPost/>
//         <GiftShop/>
//         {/* <Footer2 /> */}
//       </div>
//     </>
//   );
// };

// export default Home;

import React, { lazy, Suspense } from "react";
import LandingSlider from "./LandinfSlider";
import CategoryList from "./category/CategoryList";
import PageLoader from "../Pageloader/Pageloader";

/* Lazy loaded sections */
const HampersPage = lazy(() =>
  import("../pages/HampersGift/HampersPage")
);
const AutoSlider = lazy(() => import("./Slider"));
const CarouselManual = lazy(() => import("./GiftByOccasion"));
const BulkGifting = lazy(() => import("./Bulkgift"));
const BlogPost = lazy(() => import("../pages/CustomerReview"));
const GiftShop = lazy(() => import("../pages/GiftShop"));

const Home = () => {
  return (
    <div>
      {/* Above the fold (instant load) */}
      <LandingSlider />
      <CategoryList />

      {/* Lazy sections */}
      <Suspense fallback={<PageLoader />}>
        <HampersPage />
        <AutoSlider />
        <CarouselManual />
        <BulkGifting />
        <BlogPost />
        <GiftShop />
      </Suspense>
    </div>
  );
};

export default Home;