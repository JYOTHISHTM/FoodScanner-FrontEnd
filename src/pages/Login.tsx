import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSuccess = async (credentialResponse: any) => {
    try {
      const res = await axios.post("http://localhost:4000/api/auth/google", {
        token: credentialResponse.credential,
      });

      localStorage.setItem("token", res.data.token);
      login(res.data.token, res.data.user);
      navigate("/");
    } catch (error) {
      console.error("Login Failed", error);
    }
  };

  return (
    <div className="min-h-screen flex">
      
      {/* LEFT SIDE */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-green-50 px-6">
        
        <h1 className="text-3xl font-bold text-green-800 mb-6">
          Welcome Back
        </h1>

        <div className="w-full max-w-sm space-y-4">

          {/* Google Login */}
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={() => console.log("Login Failed")}
            />
          </div>

          {/* OR */}
          <div className="flex items-center gap-2">
            <hr className="flex-grow border-green-300" />
            <span className="text-green-600 text-sm">OR</span>
            <hr className="flex-grow border-green-300" />
          </div>

          {/* Email Button */}
          <button
            onClick={() => navigate("/email-login")}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition"
          >
            Continue with Email
          </button>

          {/* Caution */}
          <p className="text-xs text-green-700 text-center mt-4">
            ⚠️ Please use your registered account. Unauthorized access is restricted.
          </p>

        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden md:flex w-1/2 bg-green-100 items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1601597111158-2fceff292cdc"
          alt="barcode"
          className="w-2/3 rounded-xl shadow-lg"
        />
      </div>

    </div>
  );
};

export default Login;