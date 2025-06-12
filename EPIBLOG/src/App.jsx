import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PostDetails from "./pages/postDetails";
import Dashboard from "./components/private page/Dashboard";
import ProtectedRoutes from "./middleware/protectedRoute";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<HomePage />}></Route>
          <Route path="/post/:id" element={<PostDetails />}></Route>
          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<Dashboard />}></Route>
          </Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
