import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PostDetails from "./pages/PostDetails";
import Dashboard from "./components/private page/Dashboard";
import ProtectedRoutes from "./middleware/protectedRoute";
import SuccessPage from "./pages/SuccessPage";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<HomePage />}></Route>
          <Route path="/post/:id" element={<PostDetails />}></Route>
          <Route path="/success" element={<SuccessPage />}></Route>
          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<Dashboard />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
