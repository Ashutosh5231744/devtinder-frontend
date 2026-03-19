import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Feed from "./Feed";
import Login from "./Login";
import Signup from "./Signup";
import Profile from "./Profile";
import EditProfile from "./EditProfile";
import Connections from "./Connections";
import Requests from "./Requests";
import Footer from "./Footer";
import ProtectedRoute from "./ProtectedRoute";

function Body() {
  return (
    <div className="min-h-screen bg-[#062b16]">
      <NavBar />
      <div className="flex-grow">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Feed />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/edit"
            element={
              <ProtectedRoute>
                <EditProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/connections"
            element={
              <ProtectedRoute>
                <Connections />
              </ProtectedRoute>
            }
          />
          <Route
            path="/requests"
            element={
              <ProtectedRoute>
                <Requests />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default Body;