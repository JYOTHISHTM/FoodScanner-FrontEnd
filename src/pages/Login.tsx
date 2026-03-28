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
      login(res.data.token,res.data.user);
      navigate("/");

    } catch (error) {
      console.error("Login Failed", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Login with Google</h2>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => console.log("Login Failed")}
      />
    </div>
  );
};

export default Login;