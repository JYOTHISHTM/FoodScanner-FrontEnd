import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { sendOtp, verifyOtp } from "../services/authService";



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

  const sendOtpHandler = async () => {
    if (!email || !validateEmail(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await sendOtp(email);
      toast.success("OTP sent successfully!");
      setStep("otp");
      setTimer(60);
      setCanResend(false);
      setOtp("");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtpHandler = async () => {
    if (!otp || otp.length !== 4) {
      toast.error("Please enter 4-digit OTP");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await verifyOtp(email, otp);
      login(data.token, data.user);
      toast.success("Login successful!");
      navigate("/");
    } catch (err: any) {
      setError("Invalid or expired OTP");
      toast.error("Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  const resendOtpHandler = async () => {
    if (!canResend) return;

    setResendLoading(true);
    setError("");

    try {
      await sendOtp(email);
      toast.success("New OTP sent!");
      setTimer(60);
      setCanResend(false);
      setOtp("");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to resend OTP");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Toaster position="top-center" />

      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-semibold mb-8 text-center text-gray-900">
          {step === "email" ? "Login with Email" : "Enter OTP"}
        </h2>

        {step === "email" && (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 p-4 rounded-2xl mb-6 focus:outline-none focus:border-gray-900 text-gray-800 placeholder:text-gray-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={sendOtpHandler}
              disabled={loading}
              className="w-full bg-gray-900 hover:bg-black text-white p-4 rounded-2xl font-medium text-lg transition-all disabled:opacity-70"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </>
        )}

        {step === "otp" && (
          <>
            <p className="text-center text-gray-600 mb-6">
              We sent a 4-digit code to <br />
              <strong className="text-gray-900">{email}</strong>
            </p>

            <input
              type="text"
              maxLength={4}
              placeholder="0000"
              className="w-full border border-gray-300 p-6 rounded-2xl mb-4 text-center text-4xl tracking-widest focus:outline-none focus:border-gray-900"
              value={otp}
              onChange={(e) => {
                const val = e.target.value.replace(/[^0-9]/g, "");
                setOtp(val);
                if (error) setError("");
              }}
            />

            {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

            {/* Timer & Resend */}
            <div className="text-center mb-6">
              {timer > 0 ? (
                <p className="text-sm text-gray-500">
                  Resend OTP in <span className="font-semibold text-gray-700">{timer}s</span>
                </p>
              ) : (
                <button
                  onClick={resendOtpHandler}
                  disabled={resendLoading}
                  className="text-gray-900 hover:text-black font-medium"
                >
                  {resendLoading ? "Sending..." : "Resend OTP"}
                </button>
              )}
            </div>

            <button
              onClick={verifyOtpHandler}
              disabled={loading || otp.length !== 4}
              className="w-full bg-gray-900 hover:bg-black text-white p-4 rounded-2xl font-medium text-lg transition-all disabled:opacity-70"
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