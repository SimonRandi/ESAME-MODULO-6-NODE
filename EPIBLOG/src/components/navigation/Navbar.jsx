import React from "react";
import "../navigation/navigation.css";

const Navbar = () => {
  return (
    <div className="navBackground-class">
      <nav className="navbar navbar-expand-lg bg-transparent text-white">
        <div className="container-fluid">
          <a className="navbar-brand text-white" href="#">
            <h1 className="fw-light">EPIBLOG</h1>
          </a>
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
                <a className="nav-link fs-3 text-white" href="#">
                  HOME
                </a>
              </li>
              <li className="nav-item mx-5">
                <a className="nav-link text-white  fs-3" href="#">
                  AUTHORS
                </a>
              </li>
              <li className="nav-item mx-5">
                <a className="nav-link text-white  fs-3" href="#">
                  BLOG POST
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
