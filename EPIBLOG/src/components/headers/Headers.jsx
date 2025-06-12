import React, { useState } from "react";
import "../headers/headers.css";
import { Button, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Headers = () => {
  const [show, setShow] = useState(false);
  const [author, setAuthor] = useState([]);
  const [mode, setMode] = useState("signup");
  const [formData, setFormData] = useState({
    name: "",
    surName: "",
    email: "",
    dob: "",
    password: "",
    avatar: "https://i.pravatar.cc/150?u=default",
  });

  const [isLogged, setIsLogged] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const hideModal = () => setShow(false);
  const showModal = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setIsLogged((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mode === "signup") {
      await signUp();
    } else {
      await login();
    }

    hideModal();
  };

  const signUp = async () => {
    try {
      const response = await fetch("http://localhost:9099/authors/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setAuthor(data);
    } catch (error) {
      console.log(error);
    }
  };

  const login = async () => {
    try {
      const response = await fetch("http://localhost:9099/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(isLogged),
      });
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setIsLogged(data);
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="d-flex flex-column justify-content-center background-custom">
        <h2 className="custom-text">
          "Non aspettare che accada qualcosa di straordinario. Scrivilo."
        </h2>
        <div className="d-flex gap-3 justify-content-center">
          <button
            onClick={() => {
              setMode("signup");
              showModal();
            }}
            className="btn btn-light
          "
          >
            Iscriviti
          </button>
          <button
            onClick={() => {
              setMode("login");
              showModal();
            }}
            className="btn btn-light
          "
          >
            Accedi
          </button>
        </div>
      </div>
      <Modal show={show} onHide={hideModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {mode === "signup" ? "Iscriviti a EpiBlog" : "Accedi"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {mode === "signup" && (
              <>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    name="name"
                    type="text"
                    placeholder="Inserisci il tuo nome"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formSurname">
                  <Form.Label>Cognome</Form.Label>
                  <Form.Control
                    name="surName"
                    type="text"
                    placeholder="Inserisci il tuo cognome"
                    value={formData.surName}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Età</Form.Label>
                  <Form.Control
                    name="dob"
                    type="date"
                    placeholder="Inserisci la tua età"
                    value={formData.dob}
                    onChange={handleChange}
                  />
                </Form.Group>
              </>
            )}

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="Inserisci la tua email"
                value={mode === "signup" ? formData.email : isLogged.email}
                onChange={mode === "signup" ? handleChange : handleLoginChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder={
                  mode === "signup"
                    ? "Crea una password"
                    : "Inserisci la password"
                }
                value={
                  mode === "signup" ? formData.password : isLogged.password
                }
                onChange={mode === "signup" ? handleChange : handleLoginChange}
              />
            </Form.Group>

            <Button
              onClick={hideModal}
              variant="secondary"
              type="submit"
              className="w-50"
            >
              {mode === "signup" ? "Crea account" : "Accedi"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Headers;
