import React from "react";
import BaseLayout from "../layout/BaseLayout";
import Headers from "../components/headers/Headers";
import BlogPost from "../components/blogPost/BlogPost";

const HomePage = () => {
  return (
    <>
      <BaseLayout>
        <Headers />
        <BlogPost />
      </BaseLayout>
    </>
  );
};

export default HomePage;
