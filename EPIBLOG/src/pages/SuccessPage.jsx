import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

const SuccessPage = () => {
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

export default SuccessPage;
