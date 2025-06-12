import React from "react";
import { Link } from "react-router-dom";
import { IoShareSocial } from "react-icons/io5";
import { TiSocialInstagram } from "react-icons/ti";
import { TiSocialTwitter } from "react-icons/ti";
import "../footer/footer.css";

const Footer = () => {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center gap-5 fs-3 mt-5 p-5 bg-custom">
        <div className="d-flex flex-column align-items-center ">
          <Link to={"/"} className="text-decoration-none text-white">
            EpiBlog
          </Link>
          <Link to={"/"} className="text-decoration-none text-white">
            <IoShareSocial />
          </Link>
          <Link to={"/"} className="text-decoration-none text-white">
            <TiSocialInstagram />
          </Link>
          <Link to={"/"} className="text-decoration-none text-white">
            <TiSocialTwitter />
          </Link>
        </div>
        <div className="d-flex flex-column align-items-center">
          <Link to={"/"} className="text-decoration-none text-white">
            Istituto EpiBlog
          </Link>
          <Link to={"/"} className="text-decoration-none text-white">
            Chi Siamo
          </Link>
          <Link to={"/"} className="text-decoration-none text-white">
            Club dei Lettori
          </Link>
          <Link to={"/"} className="text-decoration-none text-white">
            Idee e Novità
          </Link>
        </div>
        <div className="d-flex flex-column align-items-center">
          <Link to={"/"} className="text-decoration-none text-white">
            Informativa sulla Privacy
          </Link>
          <Link to={"/"} className="text-decoration-none text-white">
            Termini e Condizioni
          </Link>
          <Link to={"/"} className="text-decoration-none text-white">
            Cookie Policy
          </Link>
          <Link to={"/"} className="text-decoration-none text-white">
            Contatti
          </Link>
        </div>
      </div>
    </>
  );
};

export default Footer;
