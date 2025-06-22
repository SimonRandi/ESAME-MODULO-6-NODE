import React, { useState } from "react";
import { Trash, Pencil } from "lucide-react";
import "../commentList/commentList.css";

const CommentList = ({ comments, onCommentsChange }) => {
  const [editingId, setEditingId] = useState(null);
  const [newText, setNewText] = useState("");

  const startEditing = (comment) => {
    setEditingId(comment._id);
    setNewText(comment.text);
  };
  const deleteComment = async (id) => {
    console.log(id);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/posts/delete/${id}/comments`,
        { method: "DELETE" }
      );

      if (response.ok) {
        onCommentsChange();
      }
    } catch (error) {
      alert("Errore nella cancellazione del post");
    }
  };

  const updateComment = async (id, newText) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/posts/update/${id}/comments`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: newText }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setEditingId(null);
        setNewText("");
        onCommentsChange();
      }
    } catch (error) {}
  };

  console.log(comments);
  return (
    <>
      <div className="d-flex flex-column align-items-start">
        <h4 className="mt-4">Commenti</h4>
        <ul className="list-group w-100">
          {comments.map((comment) => (
            <li
              key={comment._id}
              className="list-group-item d-flex justify-content-between align-items-center border-3 mt-2 rounded"
            >
              {editingId === comment._id ? (
                <input
                  className="form-control me-2"
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                />
              ) : (
                <div className="d-flex flex-column">
                  <span className="fs-4">{comment.text}</span>
                  <span className="text-muted small">
                    {new Date(comment.date).toLocaleString()}
                  </span>
                </div>
              )}

              <div className="d-flex gap-2">
                {editingId === comment._id ? (
                  <>
                    <button
                      className="btn btn-success"
                      onClick={() => updateComment(comment._id, newText)}
                    >
                      Salva
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => {
                        setEditingId(null);
                        setNewText("");
                      }}
                    >
                      Annulla
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => deleteComment(comment._id)}
                      className="btn-custom"
                    >
                      <Trash color="red" />
                    </button>
                    <button
                      className="btn-custom"
                      onClick={() => startEditing(comment)}
                    >
                      <Pencil color="green" />
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default CommentList;
