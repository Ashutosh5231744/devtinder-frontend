import { useEffect, useState } from "react";
import axios from "axios";
import Body from "./components/Body";
import { BASE_URL } from "./utils/constants";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "./utils/userSlice";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      dispatch(removeUser());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#062b16] flex items-center justify-center">
        <h1 className="text-white text-2xl font-semibold">Loading...</h1>
      </div>
    );
  }

  return <Body />;
}

export default App;