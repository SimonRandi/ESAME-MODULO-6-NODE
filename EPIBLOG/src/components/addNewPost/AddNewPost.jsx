import React from "react";
import { Form, FormControl, FormLabel } from "react-bootstrap";
import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "react-bootstrap";
import "../addNewPost/addNewPost.css";

const AddNewPost = () => {
  const [newPost, setNewPost] = useState([]);
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    cover: "",
    readTime: {
      value: "",
      unit: "",
    },
    content: "",
  });
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const addPost = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Devi fare il login per publicare un post");
    }
    try {
      console.log(token);
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/posts/create`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      setNewPost(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCoverUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setIsSuccess(false);
    setFormData((prev) => ({
      ...prev,
      cover: file,
    }));
    const formDataImg = new FormData();
    formDataImg.append("image", file);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/posts/cloud-upload`,
        {
          method: "POST",
          body: formDataImg,
        }
      );

      const data = await response.json();

      if (response.ok) {
        setFormData((prev) => ({
          ...prev,
          cover: data.imageUrl,
        }));
        setIsSuccess(true);
      } else {
        alert("erroe nel caricamento della immagine");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "readTime.value" || name === "readTime.unit") {
      setFormData((prev) => ({
        ...prev,
        readTime: {
          ...prev.readTime,
          [name.split(".")[1]]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addPost();
    setFormData({
      category: "",
      title: "",
      cover: "",
      readTime: {
        value: "",
        unit: "",
      },
      content: "",
    });
  };

  return (
    <>
      <div className="d-flex justify-content-center ">
        <Form className="container-custom" onSubmit={handleSubmit}>
          <Form.Group controlId="formCategory">
            <Form.Label> Categoria</Form.Label>
            <Form.Control
              type="text"
              name="category"
              placeholder="Categoria del post"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formTitle">
            <Form.Label> Titolo</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="Titolo del post"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formCover">
            <Form.Label> Copertina</Form.Label>
            <Form.Control
              type="file"
              name="cover"
              accept="image/*"
              onChange={handleCoverUpload}
            />

            {isUploading && <span>Caricamento in corso...</span>}
            {isSuccess && <Check color="green" />}
          </Form.Group>
          <Form.Group controlId="formReadTimeValue">
            <FormLabel>Tempo di lettura</FormLabel>
            <Form.Control
              type="text"
              name="readTime.value"
              value={formData.readTime.value}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formReadTimeUnit">
            <FormLabel>Unità</FormLabel>
            <Form.Control
              as="select"
              name="readTime.unit"
              value={formData.readTime.unit}
              onChange={handleChange}
              required
            >
              <option value="">Seleziona unità</option>
              <option value="sec">Secondi</option>
              <option value="min">Minuti</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formContent">
            <FormLabel>Testo del Post</FormLabel>
            <Form.Control
              as="textarea"
              rows={6}
              name="content"
              value={formData.content}
              onChange={handleChange}
            />
          </Form.Group>

          <Button
            className="mt-3
            
          "
            type="submit"
          >
            Invia
          </Button>
        </Form>
      </div>
    </>
  );
};

export default AddNewPost;
