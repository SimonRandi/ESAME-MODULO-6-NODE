import React, { useEffect, useState } from "react";
import BaseLayout from "../../layout/BaseLayout";
import { useNavigate, useLocation } from "react-router-dom";
import BlogPost from "../blogPost/BlogPost";
import AddNewPost from "../addNewPost/AddNewPost";
import useSession from "../../hooks/useSession";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = useSession();
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
                <h2>{`Benvenuto ${user.name}`}</h2>
                <p>
                  In questa sezione potrai contribuire anche tu al nostro blog
                  parlandoci di qualche argomento che ti sta davvero a cuore
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <AddNewPost />
          <BlogPost />
        </div>
      </BaseLayout>
    </>
  );
};

export default Dashboard;
