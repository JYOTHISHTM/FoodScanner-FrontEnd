import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const EmailLogin = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"email" | "otp">("email");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  // Timer Logic
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (step === "otp" && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const sendOtp = async () => {
    if (!email || !validateEmail(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await axios.post("http://localhost:4000/api/auth/send-otp", { email });
      toast.success("OTP sent successfully!");
      setStep("otp");
      setTimer(60);
      setCanResend(false);
      setOtp("");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp || otp.length !== 4) {
      toast.error("Please enter 4-digit OTP");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:4000/api/auth/verify-otp",
        { email, otp }
      );

      login(res.data.token, res.data.user);
      toast.success("Login successful!");
      navigate("/");
    } catch (err: any) {
      setError("Invalid or expired OTP");
      toast.error("Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    if (!canResend) return;

    setResendLoading(true);
    setError("");

    try {
      await axios.post("http://localhost:4000/api/auth/send-otp", { email });
      toast.success("New OTP sent!");
      setTimer(60);
      setCanResend(false);
      setOtp("");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to resend OTP");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <Toaster position="top-center" />

      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {step === "email" ? "Login with Email" : "Enter OTP"}
        </h2>

        {step === "email" && (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:outline-none focus:border-green-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={sendOtp}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg font-medium disabled:opacity-70"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </>
        )}

        {step === "otp" && (
          <>
            <p className="text-center text-gray-600 mb-4">
              We sent a 4-digit code to <br />
              <strong>{email}</strong>
            </p>

            <input
              type="text"
              maxLength={4}
              placeholder="Enter 4-digit OTP"
              className="w-full border border-gray-300 p-3 rounded-lg mb-2 text-center text-2xl tracking-widest focus:outline-none focus:border-green-500"
              value={otp}
              onChange={(e) => {
                const val = e.target.value.replace(/[^0-9]/g, "");
                setOtp(val);
                if (error) setError("");
              }}
            />

            {error && <p className="text-red-500 text-sm text-center mb-3">{error}</p>}

            {/* Timer & Resend */}
            <div className="text-center mb-4">
              {timer > 0 ? (
                <p className="text-sm text-gray-500">
                  Resend OTP in <span className="font-semibold">{timer}s</span>
                </p>
              ) : (
                <button
                  onClick={resendOtp}
                  disabled={resendLoading}
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  {resendLoading ? "Sending..." : "Resend OTP"}
                </button>
              )}
            </div>

            <button
              onClick={verifyOtp}
              disabled={loading || otp.length !== 4}
              className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg font-medium disabled:opacity-70"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default EmailLogin;