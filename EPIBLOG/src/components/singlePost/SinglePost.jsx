import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import "../singlePost/SinglePost.css";
import { Link } from "react-router-dom";

const SinglePost = ({ post }) => {
  return (
    <>
      <div className="col-12 col-md-4 d-md-flex col-lg-4 d-flex mt-3 ">
        <Card className="border-4 rounded-4 custom-card">
          <Card.Img
            className="img-custom"
            variant="top"
            src={post.cover ? post.cover : <div>Nessuna foto dispinibile</div>}
          />
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Text>{post.content.slice(0, 300)}...</Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>Autore: {post.author?.name}</ListGroup.Item>
            <ListGroup.Item>
              Tempo di lettura: {post.readTime.value.$numberDecimal}{" "}
              {post.readTime.unit}
            </ListGroup.Item>
            <ListGroup.Item>Categoria: {post.category}</ListGroup.Item>
          </ListGroup>
          <Card.Body>
            <Link to={`/post/${post._id}`}>scopri di piu</Link>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default SinglePost;
