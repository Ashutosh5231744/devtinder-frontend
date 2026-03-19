import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

function Requests() {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  const reviewRequest = async (status, requestId) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + requestId,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(requestId));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // LOADING
  if (!requests) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <h1 className="text-2xl text-white">Loading...</h1>
      </div>
    );
  }

  // EMPTY STATE
  if (requests.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[80vh] px-4">
        <div className="max-w-2xl w-full rounded-2xl border border-[#1e5739] bg-[#0b2d1d] p-10 text-center shadow-xl">
          <h1 className="text-4xl font-extrabold text-white">
            No pending requests
          </h1>
          <p className="text-gray-300 mt-4">
            Jab koi developer tumhe request bhejega, wo yahan dikhega.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] bg-[#062b16] px-6 py-10 md:px-12">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">
          Connection Requests
        </h1>
        <p className="text-gray-300 mb-10">
          Review incoming developer requests and choose who to connect with.
        </p>

        {/* GRID */}
        <div className="grid gap-8 md:grid-cols-2">
          {requests.map((req) => {
            const user = req.fromUserId;

            return (
              <div
                key={req._id}
                className="rounded-2xl overflow-hidden bg-[#0b341e]/80 backdrop-blur-lg border border-[#1e5739] shadow-xl transition hover:scale-[1.02]"
              >

                {/* 🔥 IMAGE FIXED (NO CUT) */}
                <div className="w-full aspect-[4/5] overflow-hidden bg-black">
                  <img
                    src={user.photoUrl}
                    alt="user"
                    className="w-full h-full object-cover object-center hover:scale-105 transition duration-300"
                  />
                </div>

                {/* BODY */}
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-white">
                    {user.firstName} {user.lastName}
                  </h2>

                  <p className="text-[#6BB77B] mt-2 font-medium">
                    {user.age} years • {user.gender}
                  </p>

                  <p className="text-gray-300 mt-4 leading-7">
                    {user.about}
                  </p>

                  {/* SKILLS */}
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

                  {/* BUTTONS */}
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <button
                      className="border border-red-400 text-red-300 hover:bg-red-400 hover:text-white font-semibold py-3 rounded-xl transition"
                      onClick={() => reviewRequest("rejected", req._id)}
                    >
                      Reject
                    </button>

                    <button
                      className="bg-[#D76F30] hover:bg-[#bf5f28] text-white font-semibold py-3 rounded-xl transition shadow-md"
                      onClick={() => reviewRequest("accepted", req._id)}
                    >
                      Accept
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}

export default Requests;