import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link } from "react-router-dom";

function Profile() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const fetchProfile = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!user) {
      fetchProfile();
    }
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <h1 className="text-2xl text-white">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] bg-[#062b16] px-6 py-10 md:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="rounded-2xl overflow-hidden bg-[#0b341e] border border-[#1e5739] shadow-xl">
          <div className="grid md:grid-cols-2">
            <div className="relative">
              <img
                src={user.photoUrl}
                alt="user"
                className="w-full h-full min-h-[420px] object-cover"
              />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#D76F30] text-white text-xs font-semibold">
                My Profile
              </div>
            </div>

            <div className="p-8 md:p-10">
              <h1 className="text-4xl font-extrabold text-white">
                {user.firstName} {user.lastName}
              </h1>

              <p className="text-[#6BB77B] mt-3 font-medium">
                {user.age} years • {user.gender}
              </p>

              <div className="mt-6 space-y-4 text-gray-300">
                <p>
                  <span className="text-white font-semibold">Email:</span>{" "}
                  {user.emailId}
                </p>

                <p>
                  <span className="text-white font-semibold">About:</span>{" "}
                  {user.about || "No bio added yet."}
                </p>
              </div>

              <div className="mt-6">
                <p className="text-white font-semibold mb-3">Skills</p>
                <div className="flex flex-wrap gap-2">
                  {user.skills?.length > 0 ? (
                    user.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full bg-[#123d28] text-[#6BB77B] text-sm border border-[#1e5739]"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-300">No skills added yet.</p>
                  )}
                </div>
              </div>

              <Link
                to="/profile/edit"
                className="inline-block mt-8 bg-[#D76F30] hover:bg-[#bf5f28] text-white font-semibold px-6 py-3 rounded-xl transition"
              >
                Edit Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;