import { Route, Routes } from "react-router-dom";
import CreateNote from "../Pages/CreateNote";
import Data from "../Pages/data";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const Routers = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Data />
          </PrivateRoute>
        }
      />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/createnote"
        element={
          <PrivateRoute>
            <CreateNote />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};
export default Routers;
