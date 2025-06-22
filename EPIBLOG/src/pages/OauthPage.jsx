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
      <div className="d-flex flex-column justify-content-center align-items-center">
        <h1>Login andato a buon fine!!</h1>
        <p>verrai rindirizzato alla tua pagina personale</p>
        <img
          src="https://img.freepik.com/free-vector/party-popper_78370-557.jpg"
          alt=""
        />
      </div>
    </>
  );
};

export default OauthPage;
