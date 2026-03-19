import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setError("");
      setLoading(true);

      await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );

      const profileRes = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });

      dispatch(addUser(profileRes.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-[#1e5739] bg-[#123d28] px-4 py-3 text-white placeholder:text-gray-400 outline-none focus:border-[#D76F30]";

  return (
    <div className="min-h-screen bg-[#062b16] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#0b341e] p-8 rounded-2xl border border-[#1e5739] shadow-xl">
        
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Login
        </h2>

        <div className="space-y-5">
          {/* Email */}
          <div>
            <label className="text-sm text-gray-300 mb-1 block">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter email"
              className={inputClass}
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-300 mb-1 block">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className={inputClass}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {error && (
          <p className="text-red-400 text-sm mt-4 text-center">{error}</p>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="mt-6 w-full bg-[#D76F30] hover:bg-[#bf5f28] text-white font-semibold py-3 rounded-xl transition shadow-lg"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-gray-400 text-sm mt-4">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-[#D76F30] cursor-pointer hover:underline"
          >
            Signup
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;