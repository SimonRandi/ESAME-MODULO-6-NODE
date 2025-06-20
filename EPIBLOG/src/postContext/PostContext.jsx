import { createContext, useEffect, useState, useContext } from "react";

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getAllPosts = async () => {
    try {
      setIsLoading(true);
      console.log("VITE_SERVER_URL =", import.meta.env.VITE_SERVER_URL);
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/posts`);

      const data = await response.json();

      setPosts(data.posts);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <PostContext.Provider value={{ posts, getAllPosts, isLoading }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = () => useContext(PostContext);
