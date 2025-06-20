import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../middleware/protectedRoute";

const useSession = () => {
  const session = useAuth();
  const decodedSession = session ? jwtDecode(session) : null;

  const navigate = useNavigate();

  useEffect(() => {
    if (!session) {
      navigate("/", { replace: true });
    }
  }, [session, navigate]);
  return decodedSession;
};

export default useSession;
