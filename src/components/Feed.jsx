import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, removeUserFromFeed } from "../utils/feedSlice";

function Feed() {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <h1 className="text-2xl text-white">Loading...</h1>
      </div>
    );
  }

  if (feed.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[80vh] px-4">
        <div className="max-w-2xl w-full rounded-2xl border border-green-900 bg-[#0b2d1d] p-10 text-center shadow-xl">
          <h1 className="text-4xl font-extrabold text-white">
            No new developers found
          </h1>
          <p className="text-gray-300 mt-4">
            You’ve seen all available profiles for now. Come back later for fresh connections.
          </p>
        </div>
      </div>
    );
  }

  const user = feed[0];

  return (
    <div className="min-h-[85vh] bg-[#062b16] px-6 py-12 md:px-12 flex items-center">
      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT SIDE */}
        <div>
          <p className="text-[#6BB77B] font-semibold tracking-wide uppercase mb-4">
            Discover Developers
          </p>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-white">
            Build the
            <br />
            right
            <br />
            connection.
          </h1>

          <p className="mt-6 text-lg text-gray-300 max-w-lg leading-8">
            Explore developer profiles, discover their skills, and connect with
            people who match your tech interests and project goals.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              className="bg-[#D76F30] hover:bg-[#bf5f28] text-white font-semibold px-8 py-3 rounded-full transition"
              onClick={() => handleSendRequest("interested", user._id)}
            >
              Interested
            </button>

            <button
              className="border border-[#6BB77B] text-[#6BB77B] hover:bg-[#6BB77B] hover:text-[#062b16] font-semibold px-8 py-3 rounded-full transition"
              onClick={() => handleSendRequest("ignored", user._id)}
            >
              Ignore
            </button>
          </div>
        </div>

        {/* RIGHT SIDE CARD */}
        <div className="flex justify-center md:justify-end">
          <div className="bg-[#0b341e] rounded-2xl overflow-hidden shadow-2xl w-full max-w-md">

            {/* IMAGE FIXED */}
            <div className="w-full aspect-[4/5] overflow-hidden">
              <img
                src={user.photoUrl}
                alt="user"
                className="w-full h-full object-cover hover:scale-105 transition duration-300"
              />
            </div>

            {/* CARD CONTENT */}
            <div className="p-6">
              <h2 className="text-3xl font-bold text-white">
                {user.firstName} {user.lastName}
              </h2>

              <p className="text-[#6BB77B] mt-2 font-medium">
                {user.age} years • {user.gender}
              </p>

              <p className="text-gray-300 mt-4 leading-7">
                {user.about}
              </p>

              <div className="mt-5">
                <p className="text-white font-semibold mb-3">Skills</p>
                <div className="flex flex-wrap gap-2">
                  {user.skills?.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full bg-[#123d28] text-[#6BB77B] text-sm border border-[#1e5739]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  className="border border-[#6BB77B] text-[#6BB77B] hover:bg-[#6BB77B] hover:text-[#062b16] font-semibold py-3 rounded-xl transition"
                  onClick={() => handleSendRequest("ignored", user._id)}
                >
                  Ignore
                </button>

                <button
                  className="bg-[#D76F30] hover:bg-[#bf5f28] text-white font-semibold py-3 rounded-xl transition"
                  onClick={() => handleSendRequest("interested", user._id)}
                >
                  Interested
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Feed;