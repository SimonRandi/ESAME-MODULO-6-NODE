import React, { useEffect, useState } from "react";
import SinglePost from "../singlePost/singlePost";

const BlogPost = () => {
  const [posts, setPosts] = useState([]);
  const getAllPosts = async () => {
    try {
      const response = await fetch("http://localhost:9099/posts");
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
