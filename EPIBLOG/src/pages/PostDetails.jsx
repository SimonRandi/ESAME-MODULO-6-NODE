import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../pages/postDetails.css";

const PostDetails = () => {
  const { id } = useParams();

  const [postDetails, setPostDetails] = useState(null);

  const getPostDetails = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/posts/${id}`
      );
      const data = await response.json();
      console.log(data);
      setPostDetails(data.post);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPostDetails();
  }, [id]);
  return (
    <>
      {postDetails && (
        <div className="d-flex flex-column justify-content-center align-items-center">
          <div className="d-flex mt-5">
            <img className="img-custom" src={postDetails.cover} alt="" />
          </div>
          <div>
            <h2>{postDetails.title}</h2>
            <p>{postDetails.content}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default PostDetails;
