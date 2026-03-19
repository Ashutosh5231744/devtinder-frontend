import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

function EditProfile() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [about, setAbout] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [skills, setSkills] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const getProfile = async () => {
      try {
        if (user) {
          setFirstName(user.firstName || "");
          setLastName(user.lastName || "");
          setAge(user.age || "");
          setGender(user.gender || "");
          setAbout(user.about || "");
          setPhotoUrl(user.photoUrl || "");
          setSkills(user.skills?.join(", ") || "");
          return;
        }

        const res = await axios.get(BASE_URL + "/profile/view", {
          withCredentials: true,
        });

        dispatch(addUser(res.data));

        setFirstName(res.data.firstName || "");
        setLastName(res.data.lastName || "");
        setAge(res.data.age || "");
        setGender(res.data.gender || "");
        setAbout(res.data.about || "");
        setPhotoUrl(res.data.photoUrl || "");
        setSkills(res.data.skills?.join(", ") || "");
      } catch (err) {
        console.log(err);
        setError("Profile load nahi hua");
      }
    };

    getProfile();
  }, [user, dispatch]);

  const handleEditProfile = async () => {
    try {
      setMessage("");
      setError("");

      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age: Number(age),
          gender,
          about,
          photoUrl,
          skills: skills.split(",").map((skill) => skill.trim()).filter(Boolean),
        },
        {
          withCredentials: true,
        }
      );

      dispatch(addUser(res.data.data));
      setMessage("Profile updated successfully");
    } catch (err) {
      console.log(err);
      setError("Profile update nahi hua");
    }
  };

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="card bg-base-100 w-full max-w-md shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl">Edit Profile</h2>

          <input
            type="text"
            placeholder="First Name"
            className="input input-bordered w-full mt-2"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Last Name"
            className="input input-bordered w-full mt-2"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <input
            type="number"
            placeholder="Age"
            className="input input-bordered w-full mt-2"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          <input
            type="text"
            placeholder="Gender"
            className="input input-bordered w-full mt-2"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />

          <textarea
            placeholder="About"
            className="textarea textarea-bordered w-full mt-2"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />

          <input
            type="text"
            placeholder="Photo URL"
            className="input input-bordered w-full mt-2"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
          />

          <input
            type="text"
            placeholder="Skills (comma separated)"
            className="input input-bordered w-full mt-2"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />

          {message && <p className="text-green-500 mt-2">{message}</p>}
          {error && <p className="text-red-500 mt-2">{error}</p>}

          <button className="btn btn-primary mt-4" onClick={handleEditProfile}>
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;