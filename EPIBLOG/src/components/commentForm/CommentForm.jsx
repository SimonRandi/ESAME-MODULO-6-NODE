import React, { useState } from "react";

const CommentForm = (addComment) => {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    addComment({ user: "Utente", text });
    setText("");
  };

  return (
    <>
      <form onSubmit={handleCommentSubmit}>
        <input
          as="textarea"
          rows={6}
          id="forTextComment"
          placeholder="Scrivi un commento"
          value={text}
          onChange={handleChange}
          className="form-control"
        />

        <button type="submit" onClick={addComment} className="btn btn-info">
          Invia
        </button>
      </form>
    </>
  );
};

export default CommentForm;
