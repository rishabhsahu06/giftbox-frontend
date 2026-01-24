import React, { useState } from "react";
import CategoryList from "./category/CategoryList";
import LandingSlider from "./LandinfSlider";
import CarouselManual from "./GiftByOccasion";
import FashionProductCards from "../pages/FashionProductCards";
import Footer2 from "./Footer2";
import PageLoader from "../Pageloader/Pageloader";
import CustomerReviews from "../pages/CustomerReview";
import BulkGifting from "./Bulkgift";
import BlogPost from "../pages/CustomerReview";
import GiftShop from "../pages/GiftShop";
import AutoSlider from "./Slider";
import HamperCard from "../pages/HampersGift/HamperCard";
import HampersPage from "../pages/HampersGift/HampersPage";

const Home = () => {
  // const [loading, setloading] = useState(true);

  return (
    <>
      {/* {loading && <PageLoader loading={loading} />} */}
      <div>
        <LandingSlider />
        <CategoryList />
        <HampersPage />
        <AutoSlider />
        <CarouselManual />
        <BulkGifting/>
        {/* <section className="mx-auto">
        <FashionProductCards /> */}
        {/* </section> */}
        <BlogPost/>
        <GiftShop/>
        {/* <Footer2 /> */}
      </div>
    </>
  );
};

export default Home;
