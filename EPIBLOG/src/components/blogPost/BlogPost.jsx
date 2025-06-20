import React, { useEffect, useState } from "react";
import SinglePost from "../singlePost/SinglePost";
import Spinner from "react-bootstrap/Spinner";
import { usePosts } from "../../postContext/PostContext";

const BlogPost = () => {
  const { posts, getAllPosts, isLoading } = usePosts();

  useEffect(() => {
    getAllPosts();
  }, []);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center">
        <Spinner animation="grow" />
      </div>
    );
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row ">
          {posts.length > 0 ? (
            posts.map((post) => <SinglePost key={post._id} post={post} />)
          ) : (
            <p>Nessun post trovato!</p>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogPost;
