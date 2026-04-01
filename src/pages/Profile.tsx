import { useAuth } from "../hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-green-50 flex justify-center items-center px-4">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center">

        {/* Avatar */}
        <div className="flex justify-center mb-4">
          <div className="w-24 h-24 rounded-full bg-green-200 flex items-center justify-center text-3xl font-bold text-green-800">
            {user?.name?.charAt(0) || "U"}
          </div>
        </div>

        {/* Name */}
        <h2 className="text-2xl font-bold text-green-800">
          {user?.name || "User"}
        </h2>

        {/* Email */}
        <p className="text-green-600 mt-1">
          {user?.email}
        </p>

        {/* Divider */}
        <hr className="my-6 border-green-200" />

        {/* Info Section */}
        <div className="space-y-3 text-left">

          <div className="bg-green-100 p-3 rounded-lg">
            <p className="text-sm text-green-700">Full Name</p>
            <p className="font-semibold text-green-900">
              {user?.name}
            </p>
          </div>

          <div className="bg-green-100 p-3 rounded-lg">
            <p className="text-sm text-green-700">Email Address</p>
            <p className="font-semibold text-green-900">
              {user?.email}
            </p>
          </div>

        </div>

        {/* Button */}
        <button className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition">
          Edit Profile
        </button>

      </div>

    </div>
  );
};

export default Profile;