import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";
import { updateProfile } from "../services/profileService";

const allergyOptions = [
  "Milk", "Egg", "Fish", "Peanut", "Tree Nuts",
  "Soy", "Wheat", "Shellfish", "Sesame", "Corn",
  "Chocolate", "Strawberry", "Tomato", "Garlic",
  "Onion", "Mustard", "Celery", "Lupin", "Mollusks", "Banana"
];

const Profile = () => {
  const { user, login, token } = useAuth();

  const [form, setForm] = useState<any>({
    age: "",
    gender: "",
    weight: "",
    height: "",
    allergies: [],
  });

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingAllergy, setIsEditingAllergy] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // ✅ Sync user data
  useEffect(() => {
    if (user) {
      setForm({
        age: user.age || "",
        gender: user.gender || "",
        weight: user.weight || "",
        height: user.height || "",
        allergies: user.allergies || [],
      });
    }
  }, [user]);

  // ✅ Validation
  const validate = () => {
    const age = Number(form.age);
    const weight = Number(form.weight);
    const height = Number(form.height);

    if (age < 10 || age > 80) return "Age must be 10-80";
    if (weight < 20 || weight > 150) return "Weight must be 20-150";
    if (height < 20 || height > 200) return "Height must be 20-200";

    return null;
  };

  const handleProfileSave = async () => {
    const error = validate();
    if (error) return toast.error(error);

    try {
      const data = await updateProfile(user?._id!, {
        age: form.age,
        gender: form.gender,
        weight: form.weight,
        height: form.height,
      });

      login(token!, data);
      setIsEditingProfile(false);

      toast.success("Profile updated ✅");
    } catch {
      toast.error("Update failed ❌");
    }
  };


  const handleAllergySave = async () => {
    try {
      const data = await updateProfile(user?._id!, {
        allergies: form.allergies,
      });

      login(token!, data);
      setIsEditingAllergy(false);
      setShowPopup(false);

      toast.success("Allergies updated ✅");
    } catch {
      toast.error("Update failed ❌");
    }
  };

  // ✅ Toggle allergy
  const toggleAllergy = (item: string) => {
    setForm((prev: any) => ({
      ...prev,
      allergies: prev.allergies.includes(item)
        ? prev.allergies.filter((a: string) => a !== item)
        : [...prev.allergies, item],
    }));
  };

  return (
    <div className="min-h-screen bg-green-50 flex gap-6 p-6">

      {/* PROFILE */}
      <div className="w-1/2 bg-white p-5 rounded-xl shadow-lg border">

        <h2 className="text-xl font-bold mb-4">Profile</h2>

        <p><b>Name:</b> {user?.name}</p>
        <p><b>Email:</b> {user?.email}</p>

        <div className="mt-4 space-y-3">

          <input
            placeholder="Age"
            disabled={!isEditingProfile}
            value={form.age}
            className="w-full p-2 text-sm border rounded shadow disabled:bg-gray-100"
            onChange={(e) => setForm({ ...form, age: e.target.value })}
          />

          <select
            value={form.gender}
            disabled={!isEditingProfile}
            className="w-full p-2 text-sm border rounded shadow disabled:bg-gray-100"
            onChange={(e) => setForm({ ...form, gender: e.target.value })}
          >
            <option value="" disabled hidden>Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <input
            placeholder="Weight"
            disabled={!isEditingProfile}
            value={form.weight}
            className="w-full p-2 text-sm border rounded shadow disabled:bg-gray-100"
            onChange={(e) => setForm({ ...form, weight: e.target.value })}
          />

          <input
            placeholder="Height"
            disabled={!isEditingProfile}
            value={form.height}
            className="w-full p-2 text-sm border rounded shadow disabled:bg-gray-100"
            onChange={(e) => setForm({ ...form, height: e.target.value })}
          />
        </div>

        {/* Profile Buttons */}
        {!isEditingProfile ? (
          <button
            onClick={() => setIsEditingProfile(true)}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Edit
          </button>
        ) : (
          <button
            onClick={handleProfileSave}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        )}
      </div>

      {/* ALLERGIES */}
      <div className="w-1/2 bg-white p-5 rounded-xl shadow-lg border">

        <div className="flex justify-between">
          <h2 className="text-xl font-bold">Allergies</h2>

          {!isEditingAllergy ? (
            <button
              onClick={() => setIsEditingAllergy(true)}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Edit
            </button>
          ) : (
            <button
              onClick={() => setShowPopup(true)}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              Add
            </button>
          )}
        </div>

        {/* Selected */}
        <div className="mt-4 flex flex-wrap gap-2">
          {form.allergies.map((a: string) => (
            <span key={a} className="bg-red-100 px-3 py-1 rounded shadow text-sm">
              {a}
            </span>
          ))}
        </div>

        {/* Popup */}
        {showPopup && (
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
            <div className="bg-white p-6 rounded-xl w-[400px] shadow-xl">

              <h2 className="font-bold mb-3">Select Allergies</h2>

              <div className="grid grid-cols-3 gap-2 max-h-[300px] overflow-y-auto">
                {allergyOptions.map((item) => (
                  <div
                    key={item}
                    onClick={() => toggleAllergy(item)}
                    className={`p-2 border rounded cursor-pointer text-center text-sm ${form.allergies.includes(item)
                      ? "bg-red-200"
                      : "hover:bg-green-100"
                      }`}
                  >
                    {item}
                  </div>
                ))}
              </div>

              <button
                onClick={handleAllergySave}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded w-full"
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default Profile;