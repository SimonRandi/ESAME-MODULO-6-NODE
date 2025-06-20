import React from "react";

const CommentList = ({ comments }) => {
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
                <button className="btn btn-info btn-sm">Modifica</button>
                <button className="btn btn-danger btn-sm">Cancella</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default CommentList;
