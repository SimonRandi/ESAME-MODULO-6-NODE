import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

const OauthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    } else {
      navigate("/");
    }
  }, []);
  return (
    <>
      <div>
        <p>Login in corso</p>
      </div>
    </>
  );
};

export default OauthPage;
