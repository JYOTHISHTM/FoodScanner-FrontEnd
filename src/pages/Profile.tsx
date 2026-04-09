

import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";
import { updateProfile } from "../services/profileService";

const allergyOptions = [
  "Milk", "Egg", "Fish", "Peanut", "Tree Nuts", "Soy", "Wheat", "Shellfish",
  "Sesame", "Corn", "Chocolate", "Strawberry", "Tomato", "Garlic", "Onion",
  "Mustard", "Celery", "Lupin", "Mollusks", "Banana"
];

const allergyEmojis: Record<string, string> = {
  Milk: "🥛",
  Egg: "🥚",
  Fish: "🐟",
  Peanut: "🥜",
  "Tree Nuts": "🌰",
  Soy: "🌱",
  Wheat: "🌾",
  Shellfish: "🦀",
  Sesame: "🌾",
  Corn: "🌽",
  Chocolate: "🍫",
  Strawberry: "🍓",
  Tomato: "🍅",
  Garlic: "🧄",
  Onion: "🧅",
  Mustard: "🌭",
  Celery: "🥬",
  Lupin: "🌸",
  Mollusks: "🐚",
  Banana: "🍌",
};

const Profile = () => {
  const { user, login, token } = useAuth();

  const [form, setForm] = useState({
    age: "",
    gender: "",
    weight: "",
    height: "",
    allergies: [] as string[],
  });

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // Sync user data
  useEffect(() => {
    if (user) {
      setForm({
        age: user.age?.toString() || "",
        gender: user.gender || "",
        weight: user.weight?.toString() || "",
        height: user.height?.toString() || "",
        allergies: user.allergies || [],
      });
    }
  }, [user]);

  const validate = () => {
    const age = Number(form.age);
    const weight = Number(form.weight);
    const height = Number(form.height);

    if (age < 10 || age > 80) return "Age must be between 10-80";
    if (weight < 20 || weight > 150) return "Weight must be between 20-150 kg";
    if (height < 50 || height > 250) return "Height must be between 50-250 cm";

    return null;
  };

  const handleProfileSave = async () => {
    const error = validate();
    if (error) return toast.error(error);

    try {
      const data = await updateProfile(user?._id!, {
        age: Number(form.age),
        gender: form.gender,
        weight: Number(form.weight),
        height: Number(form.height),
      });
      login(token!, data);
      setIsEditingProfile(false);
      toast.success("Profile updated successfully ✅");
    } catch {
      toast.error("Failed to update profile");
    }
  };

  const handleAllergySave = async () => {
    try {
      const data = await updateProfile(user?._id!, { allergies: form.allergies });
      login(token!, data);
      setShowPopup(false);
      toast.success("Allergies updated successfully ✅");
    } catch {
      toast.error("Failed to update allergies");
    }
  };

  const toggleAllergy = (item: string) => {
    setForm((prev) => ({
      ...prev,
      allergies: prev.allergies.includes(item)
        ? prev.allergies.filter((a) => a !== item)
        : [...prev.allergies, item],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 flex items-center justify-center">
      <div className="max-w-5xl w-full">
        <div className="grid md:grid-cols-2 gap-8">
          {/* PROFILE CARD */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900">Personal Information</h2>

            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Full Name</p>
                <p className="font-medium text-xl">{user?.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Email Address</p>
                <p className="font-medium text-xl">{user?.email}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Age</p>
                  <input
                    type="number"
                    value={form.age}
                    disabled={!isEditingProfile}
                    onChange={(e) => setForm({ ...form, age: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-gray-900 disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Gender</p>
                  <select
                    value={form.gender}
                    disabled={!isEditingProfile}
                    onChange={(e) => setForm({ ...form, gender: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-gray-900 disabled:bg-gray-100"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Weight (kg)</p>
                  <input
                    type="number"
                    value={form.weight}
                    disabled={!isEditingProfile}
                    onChange={(e) => setForm({ ...form, weight: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-gray-900 disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Height (cm)</p>
                  <input
                    type="number"
                    value={form.height}
                    disabled={!isEditingProfile}
                    onChange={(e) => setForm({ ...form, height: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-gray-900 disabled:bg-gray-100"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={isEditingProfile ? handleProfileSave : () => setIsEditingProfile(true)}
              className={`mt-8 w-full py-3.5 rounded-2xl font-medium text-lg transition-all ${
                isEditingProfile
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-gray-900 hover:bg-black text-white"
              }`}
            >
              {isEditingProfile ? "Save Changes" : "Edit Profile"}
            </button>
          </div>

          {/* ALLERGIES CARD */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Allergies</h2>
              <button
                onClick={() => setShowPopup(true)}
                className="bg-gray-900 hover:bg-black text-white px-6 py-2.5 rounded-2xl transition"
              >
                Manage Allergies
              </button>
            </div>

            <div className="flex-1">
              {form.allergies.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {form.allergies.map((allergy) => (
                    <div
                      key={allergy}
                      className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-2.5 rounded-2xl text-sm font-medium shadow-sm"
                    >
                      <span className="text-lg">{allergyEmojis[allergy] || "⚠️"}</span>
                      {allergy}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic text-center py-10">
                  No allergies added yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Allergy Selection Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8">
            <h2 className="text-2xl font-semibold mb-6 text-center">Select Allergies</h2>

            <div className="grid grid-cols-3 gap-3 max-h-[420px] overflow-y-auto pb-6">
              {allergyOptions.map((item) => (
                <div
                  key={item}
                  onClick={() => toggleAllergy(item)}
                  className={`p-4 rounded-2xl text-center cursor-pointer border transition-all flex flex-col items-center gap-1 ${
                    form.allergies.includes(item)
                      ? "bg-red-100 border-red-400 text-red-700"
                      : "bg-gray-50 hover:bg-gray-100 border-gray-200"
                  }`}
                >
                  <span className="text-2xl">{allergyEmojis[item] || "⚠️"}</span>
                  <span className="text-xs font-medium">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowPopup(false)}
                className="flex-1 py-3 border border-gray-300 rounded-2xl font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAllergySave}
                className="flex-1 py-3 bg-green-600 text-white rounded-2xl font-medium hover:bg-green-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;