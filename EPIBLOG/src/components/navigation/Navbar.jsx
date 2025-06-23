import React from "react";
import "../navigation/navigation.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="navBackground-class px-3">
        <nav className="navbar navbar-expand-lg bg-transparent text-white">
          <div className="container-fluid">
            <Link className="text-decoration-none text-light" to="/">
              <h1 className="fw-light">EPIBLOG</h1>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto ">
                <li className="nav-item mx-5">
                  <Link className="fs-3 text-decoration-none text-light" to="/">
                    HOME
                  </Link>
                </li>

                <li className="nav-item mx-5">
                  <Link
                    className="fs-3 text-decoration-none text-light"
                    to="/blogPost"
                  >
                    BLOG POST
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
