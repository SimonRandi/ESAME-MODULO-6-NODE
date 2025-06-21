import React from "react";

const CommentList = ({ comments, onCommentsChange }) => {
  const deleteComment = async (id) => {
    console.log(id);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/posts/delete/${id}/comments`,
        { method: "DELETE" }
      );

      if (response.ok) {
        onCommentsChange(id);
      }
    } catch (error) {
      alert("Errore nella cancellazione del post");
    }
  };

  console.log(comments);
  return (
    <>
      <div className="d-flex flex-column align-items-start">
        <h4 className="mt-4">Commenti</h4>
        <ul className="list-group">
          {comments.map((comment, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center border-3 mt-2 rounded"
            >
              <span className="me-2">{comment.text}</span>
              <div className="d-flex gap-2">
                <button
                  onClick={() => deleteComment(comment._id)}
                  className="btn btn-danger btn-sm"
                >
                  Cancella
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default CommentList;
