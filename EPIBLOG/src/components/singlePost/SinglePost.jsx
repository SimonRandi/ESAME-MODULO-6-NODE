import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import "../singlePost/SinglePost.css";
import { Link } from "react-router-dom";

const SinglePost = ({ post }) => {
  return (
    <>
      <div className="col-12 col-md-4 d-md-flex col-lg-3 d-flex mt-3 ">
        <Card className=" rounded-4 custom-card">
          <Card.Img
            className="custom-img"
            variant="top"
            src={post.cover ? post.cover : <div>Nessuna foto dispinibile</div>}
          />
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Text className="text-truncate ">{post.content}...</Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item className="background">
              Tempo di lettura: {post.readTime.value.$numberDecimal}{" "}
              {post.readTime.unit}
            </ListGroup.Item>
            <ListGroup.Item className="background">
              Categoria: {post.category}
            </ListGroup.Item>
          </ListGroup>
          <Card.Body>
            <div className="d-flex justify-content-center align-items-center">
              <Link
                className="text-decoration-none text-black"
                to={`/post/${post._id}`}
              >
                <button className="btn-custom">scopri di piu</button>
              </Link>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default SinglePost;
