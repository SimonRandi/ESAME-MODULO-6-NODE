import React, { useEffect, useState } from "react";
import BaseLayout from "../../layout/BaseLayout";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <BaseLayout>
        <div className="d-flex justify-content-end me-5 mt-3">
          <button className="btn btn-danger" onClick={logOut}>
            Esci
          </button>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="d-flex flex-column justify-content-center align-items-center mt-5">
                <h2>Benvenuto Utente</h2>
                <p>
                  In questa sezione potrai contribuire anche tu al nostro blog
                  parlandoci di qualche argomento che ti sta davvero a cuore
                </p>
              </div>
            </div>
          </div>
        </div>
      </BaseLayout>
    </>
  );
};

export default Dashboard;
