import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

function Connections() {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <h1 className="text-2xl text-white">Loading...</h1>
      </div>
    );
  }

  if (connections.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[80vh] px-4">
        <div className="max-w-2xl w-full rounded-2xl border border-[#1e5739] bg-[#0b2d1d] p-10 text-center shadow-xl">
          <h1 className="text-4xl font-extrabold text-white">No connections yet</h1>
          <p className="text-gray-300 mt-4">
            Once your requests get accepted, your developer network will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] bg-[#062b16] px-6 py-10 md:px-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">
          Your Connections
        </h1>
        <p className="text-gray-300 mb-10">
          Developers who are now part of your network.
        </p>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {connections.map((user) => (
            <div
              key={user._id}
              className="rounded-2xl overflow-hidden bg-[#0b341e] border border-[#1e5739] shadow-xl"
            >
              <div className="relative">
                <img
                  src={user.photoUrl}
                  alt="user"
                  className="w-full h-72 object-cover"
                />
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#D76F30] text-white text-xs font-semibold">
                  Connected
                </div>
              </div>

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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Connections;