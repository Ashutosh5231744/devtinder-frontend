import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

function NavBar() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await axios.post(
        BASE_URL + "/logout",
        {},
        { withCredentials: true }
      );
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const navLink = (path) =>
    `px-4 py-2 rounded-md text-sm font-medium transition ${
      location.pathname === path
        ? "bg-[#D76F30] text-white"
        : "text-white/80 hover:text-white hover:bg-[#D76F30]/20"
    }`;

  return (
    <div className="border-b border-[#1e5739] bg-[#0b2d1d]">
      
      {/* 👇 removed max-w-7xl for proper left alignment */}
      <div className="w-full px-8 h-16 flex items-center justify-between">

        {/* LEFT SIDE (perfectly left aligned) */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-[#D76F30] text-white flex items-center justify-center font-bold text-sm">
            DT
          </div>
          <h1 className="text-lg font-semibold tracking-wide text-white">
            DevTinder
          </h1>
        </Link>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-2">
          {!user && (
            <>
              <Link to="/login" className={navLink("/login")}>
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 rounded-md text-sm font-medium bg-[#D76F30] text-white hover:bg-[#bf5f28] transition"
              >
                Signup
              </Link>
            </>
          )}

          {user && (
            <>
              <Link to="/" className={navLink("/")}>
                Feed
              </Link>
              <Link to="/profile" className={navLink("/profile")}>
                Profile
              </Link>
              <Link to="/connections" className={navLink("/connections")}>
                Connections
              </Link>
              <Link to="/requests" className={navLink("/requests")}>
                Requests
              </Link>

              {/* USER BOX */}
              <div className="hidden md:flex items-center gap-2 ml-3 px-3 py-1.5 rounded-md bg-[#123d28]">
                <img
                  src={user.photoUrl}
                  alt="user"
                  className="w-8 h-8 rounded-md object-cover"
                />
                <span className="text-sm font-medium text-white">
                  {user.firstName}
                </span>
              </div>

              {/* LOGOUT */}
              <button
                className="ml-2 px-4 py-2 rounded-md text-sm font-medium border border-[#D76F30] text-[#D76F30] hover:bg-[#D76F30] hover:text-white transition"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavBar;