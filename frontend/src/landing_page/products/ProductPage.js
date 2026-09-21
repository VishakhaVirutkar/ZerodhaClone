import React from "react";
import Hero from "./Hero";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
import Universe from "./Universe";
function ProductPage() {
  return (
    <>
      <Hero />
      <LeftSection
        imageUrl="media/images/kite.png"
        productName="Kite"
        productDescription="Our ultra-fast flagship trading platform with streaming market data, advanced charts, an elegant UI, and more. Enjoy the Kite experience seamlessly on your Android and iOS devices."
        tryDemo="tryDemo"
        learnMore="learnMore"
        googlePlay=""
        appStore=""
      />
      <RightSection
        imageUrl="media/images/console.png"
        productName="Console by Zerodha"
        productDescription="The central dashboard for your Zerodha account with in-depth reporting and analytics on your trades and investments"
        learnMore="Login to console"
      />
      <LeftSection
        imageUrl="media/images/coin.png"
        productName="Coin"
        productDescription="Buy direct mutual funds online, commission-free, delivered directly to your Demat account. Enjoy the investment experience on your Android and iOS devices."
        tryDemo="coin"
        learnMore=""
        googlePlay=""
        appStore=""
      />
      <RightSection
        imageUrl="media/images/kiteconnect.png"
        productName="Analytics"
        productDescription="Multi-dimensional insights on your trades and portfolio presented as easy-to-understand visualisations."
        learnMore=""
      />
      <LeftSection
        imageUrl="media/images/varsinity.jpeg"
        productName="Varsity mobile"
        productDescription="An easy to grasp, collection of stock market lessons with in-depth coverage and illustrations. Content is broken down into bite-size cards to help you learn on the go."
        tryDemo=""
        learnMore=""
        googlePlay=""
        appStore=""
      />
      <RightSection />
        <p className="text-center">Want to know more about our technology stack? Check out the Zerodha.tech blog.</p>
      <Universe />
    </>
  );
}

export default ProductPage;
