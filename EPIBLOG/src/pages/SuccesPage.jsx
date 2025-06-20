import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const SuccesPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
      navigate("/dashboard");
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

export default SuccesPage;
