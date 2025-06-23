import React from "react";
import BaseLayout from "../layout/BaseLayout";
import BlogPost from "../components/blogPost/BlogPost";
import { Link } from "react-router-dom";
import "../pages/blogPostPage.css";
import { ArrowBigLeft } from "lucide-react";

const BlogPostPage = () => {
  return (
    <>
      <BaseLayout>
        <Link to={"/"}>
          <button className="ms-3 mt-3 custom-button">
            {" "}
            <ArrowBigLeft />
            Indietro
          </button>
        </Link>

        <BlogPost />
      </BaseLayout>
    </>
  );
};

export default BlogPostPage;
