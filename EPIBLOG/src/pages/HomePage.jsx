import React from "react";
import BaseLayout from "../layout/BaseLayout";
import Headers from "../components/headers/Headers";
import HeroSection from "../components/heroSection/HeroSection";

const HomePage = () => {
  return (
    <>
      <BaseLayout>
        <Headers />
        <HeroSection />
      </BaseLayout>
    </>
  );
};

export default HomePage;
