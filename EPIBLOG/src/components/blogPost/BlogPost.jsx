import React, { useEffect, useState } from "react";
import SinglePost from "../singlePost/SinglePost";

const BlogPost = () => {
  const [posts, setPosts] = useState([]);
  const getAllPosts = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/posts`);
      const data = await response.json();

      setPosts(data.posts);
      console.log(posts);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllPosts();
  }, []);

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
