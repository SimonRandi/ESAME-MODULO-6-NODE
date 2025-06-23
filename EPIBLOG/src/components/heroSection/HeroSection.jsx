import React from "react";
import { Link } from "react-router-dom";
import "../heroSection/heroSection.css";

const HeroSection = () => {
  return (
    <>
      <section className="hero bg-light text-center py-5">
        <h1 className="display-4 mb-3">Benvenuto nel mio blog!</h1>
        <p className="fs-4 mb-4">
          Qui puoi esprimere liberamente le tue idee, leggere opinioni di tutti
          i tipi e partecipare a una community senza filtri. <br />
          Pronto a condividere la tua voce? <br />
          Scopri, commenta e divertiti!
        </p>
        <Link to="/blogPost">
          <button className="btn-custom px-4 py-2 fs-5">
            Esplora gli articoli
          </button>
        </Link>
      </section>
    </>
  );
};

export default HeroSection;
