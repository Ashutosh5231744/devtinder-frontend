import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState("");
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const uploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append("file", photo);
      formData.append("upload_preset", "devtinder");

      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dg6lni8gn/image/upload",
        formData
      );

      return res.data.secure_url;
    } catch (err) {
      throw new Error("Image upload failed");
    }
  };

  const handleSignup = async () => {
    try {
      setError("");
      setLoading(true);

      let photoUrl = "";

      if (photo) {
        try {
          photoUrl = await uploadImage();
        } catch {
          setError("Image upload failed ❌");
          setLoading(false);
          return;
        }
      }

      await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
          age: age ? Number(age) : null,
          gender,
          about,
          photoUrl,
          skills: skills
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
        },
        { withCredentials: true }
      );

      navigate("/login");
    } catch (err) {
      setError(err?.response?.data || "Signup failed");
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
          Create Account
        </h2>

        <div className="space-y-4">
          <input placeholder="First Name" className={inputClass} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <input placeholder="Last Name" className={inputClass} value={lastName} onChange={(e) => setLastName(e.target.value)} />
          <input placeholder="Email" className={inputClass} value={emailId} onChange={(e) => setEmailId(e.target.value)} />
          <input type="password" placeholder="Password" className={inputClass} value={password} onChange={(e) => setPassword(e.target.value)} />
          <input type="number" placeholder="Age" className={inputClass} value={age} onChange={(e) => setAge(e.target.value)} />

          <select className={inputClass} value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <textarea placeholder="About" className={inputClass} value={about} onChange={(e) => setAbout(e.target.value)} />

          <input placeholder="Skills (comma separated)" className={inputClass} value={skills} onChange={(e) => setSkills(e.target.value)} />

          {/* Upload */}
          <div className="flex items-center gap-3">
            <label className="cursor-pointer bg-[#D76F30] hover:bg-[#bf5f28] text-white px-4 py-2 rounded-lg text-sm">
              Upload Photo
              <input
                type="file"
                className="hidden"
                onChange={(e) => setPhoto(e.target.files[0])}
              />
            </label>

            <span className="text-sm text-gray-300">
              {photo ? photo.name : "Select your profile photo"}
            </span>
          </div>

          {/* Preview */}
          {photo && (
            <div className="flex items-center gap-3 mt-2">
              <img
                src={URL.createObjectURL(photo)}
                className="w-16 h-16 rounded-full object-cover"
              />
              <button
                onClick={() => setPhoto(null)}
                className="text-red-400 text-sm"
              >
                Remove
              </button>
            </div>
          )}
        </div>

        {error && <p className="text-red-400 mt-4 text-center">{error}</p>}

        <button
          onClick={handleSignup}
          disabled={loading}
          className="mt-6 w-full bg-[#D76F30] hover:bg-[#bf5f28] text-white font-semibold py-3 rounded-xl transition shadow-lg"
        >
          {loading ? "Creating..." : "Create Account"}
        </button>
      </div>
    </div>
  );
}

export default Signup;