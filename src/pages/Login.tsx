import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { googleLogin } from "../services/authService";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSuccess = async (credentialResponse: any) => {
    try {
      const data = await googleLogin(credentialResponse.credential);
      localStorage.setItem("token", data.token);
      login(data.token, data.user);
      navigate("/");
    } catch (error: any) {
      console.log("ERROR 👉", error);

      let message = "Login failed";

      if (error.response && error.response.data) {
        message = error.response.data.message;
      } else if (error.message) {
        message = error.message;
      }

      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* LEFT SIDE - Login Form */}
      <div className="w-full  flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-10 md:p-12 border border-gray-100">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-semibold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600 text-lg">
              Sign in to continue to FoodScanner
            </p>
          </div>

          {/* Google Login */}
          <div className="flex justify-center mb-8">
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={() => console.log("Login Failed")}
            />
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 my-8">
            <hr className="flex-grow border-gray-300" />
            <span className="text-gray-500 text-sm font-medium">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Email Login Button */}
          <button
            onClick={() => navigate("/email-login")}
            className="w-full bg-gray-900 hover:bg-black text-white py-3.5 rounded-2xl font-medium text-lg transition-all duration-200"
          >
            Continue with Email
          </button>

          {/* Note */}
          <p className="text-center text-sm text-gray-500 mt-8">
            ⚠️ Please use your registered account. Unauthorized access is restricted.
          </p>
        </div>
      </div>

    </div>
  );
};

export default Login;