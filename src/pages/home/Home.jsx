import Banner from "@/components/banner/Banner";
import ShopByCategory from "@/components/category/ShopByCategory";
import ContactUs from "@/components/contactUs/ContactUs";
import Features from "@/components/feature/Features";

import TopSeller from "@/components/products/TopSeller";

const Home = () => {
  return (
    <>
      <Banner />
      <Features />
      <ShopByCategory />
      <TopSeller />
      <ContactUs />
    </>
  );
};

export default Home;
