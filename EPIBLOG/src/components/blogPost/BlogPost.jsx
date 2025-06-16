import React, { useEffect, useState } from "react";
import SinglePost from "../singlePost/SinglePost";
import Spinner from "react-bootstrap/Spinner";

const BlogPost = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getAllPosts = async () => {
    try {
      setIsLoading(true);
      console.log("VITE_SERVER_URL =", import.meta.env.VITE_SERVER_URL);
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/posts`);

      const data = await response.json();

      setPosts(data.posts);
      console.log(posts);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
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
