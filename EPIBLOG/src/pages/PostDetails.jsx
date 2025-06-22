import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CommentList from "../components/commentList/CommentList";

import BaseLayout from "../layout/BaseLayout";
import "../pages/postDetails.css";

const PostDetails = () => {
  const { id } = useParams();

  const [postDetails, setPostDetails] = useState(null);
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    addComment({ user: "Utente", text });
    setText("");
  };

  const handleCommentDeleted = (id) => {
    getPostDetails();
  };

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

  const addComment = async (newComment) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/posts/create/${id}/comments`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newComment),
        }
      );
      const data = await response.json();

      if (response.ok) {
        setPostDetails((prev) => ({
          ...prev,
          comments: data.comments,
        }));
        getPostDetails();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPostDetails();
  }, [id]);
  return (
    <>
      <BaseLayout>
        {postDetails && (
          <div className="container d-flex flex-column justify-content-center align-items-center">
            <div className="row">
              <div className="col">
                <div className="d-flex justify-content-center mb-2 mt-5">
                  <img className="img-custom" src={postDetails.cover} alt="" />
                </div>

                <div className="d-flex flex-column align-items-center">
                  <h2 className="text-center">{postDetails.title}</h2>
                  <div className="d-flex justify-content-center align-items-center">
                    <p className="text-center py-3">{postDetails.content}</p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="d-flex flex-column">
                    <div>
                      <form onSubmit={handleCommentSubmit}>
                        <input
                          as="text-area"
                          id="forTextComment"
                          placeholder="Scrivi un commento"
                          value={text}
                          onChange={handleChange}
                          className="form-control border-4 mb-2 "
                        />
                        <div className="d-flex justify-content-center">
                          <button type="submit" className="btn btn-info">
                            Invia
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="d-flex justify-content-center">
                      <CommentList
                        comments={postDetails.comments || []}
                        setPostDetails={setPostDetails}
                        onCommentsChange={handleCommentDeleted}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </BaseLayout>
    </>
  );
};

export default PostDetails;
