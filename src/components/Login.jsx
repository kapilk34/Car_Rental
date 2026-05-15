import React from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { X, Mail, Lock, User } from "lucide-react";

const Login = () => {
  const { setShowLogin, axios, setToken, navigate, fetchUser } =
    useAppContext();

  const [state, setState] = React.useState("login");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  // Login / Register
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const payload =
        state === "register"
          ? { name, email, password }
          : { email, password };

      const { data } = await axios.post(
        `/api/user/${state}`,
        payload
      );

      if (data.success) {
        // Set authorization header FIRST before any state changes
        axios.defaults.headers.common["Authorization"] = data.token;
        
        // Save token to localStorage
        localStorage.setItem("token", data.token);
        
        // Update token state
        setToken(data.token);
        
        // Fetch user data before navigation to ensure dashboard button appears
        await fetchUser();
        
        // Show success message
        toast.success(data.message || "Logged in successfully!");
        
        // Navigate to home and close login modal
        navigate("/");
        setShowLogin(false);
      } else {
        toast.error(data.message || "Something went wrong!");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Server error, please try again."
      );
    }
  };

  // Google Login
  const handleGoogleLogin = () => {
    toast.success("Google Login Coming Soon 🚀");

    // Future Google Auth Logic Here
  };

  return (
    <div
      onClick={() => setShowLogin(false)}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-3xl bg-white shadow-2xl border border-gray-100 overflow-hidden animate-fadeIn"
      >
        <button
          type="button"
          onClick={() => setShowLogin(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-black transition"
        >
          <X size={22} />
        </button>

        <div className="px-8 py-10">
          {/* Heading */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              {state === "login" ? "Welcome Back" : "Create Account"}
            </h2>

            <p className="text-gray-500 mt-2 text-sm leading-relaxed">
              {state === "login"
                ? "Login to continue your journey with us"
                : "Create your account and get started today"}
            </p>
          </div>

          {/* Name */}
          {state === "register" && (
            <div className="mb-5">
              <label className="text-sm font-medium text-gray-700">
                Full Name
              </label>

              <div className="flex items-center mt-2 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-100 transition-all">
                <User size={18} className="text-gray-400" />

                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full ml-3 outline-none bg-transparent text-gray-700 placeholder:text-gray-400"
                  required
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div className="mb-5">
            <label className="text-sm font-medium text-gray-700">
              Email Address
            </label>

            <div className="flex items-center mt-2 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-100 transition-all">
              <Mail size={18} className="text-gray-400" />

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full ml-3 outline-none bg-transparent text-gray-700 placeholder:text-gray-400"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>

            <div className="flex items-center mt-2 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-100 transition-all">
              <Lock size={18} className="text-gray-400" />

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full ml-3 outline-none bg-transparent text-gray-700 placeholder:text-gray-400"
                required
              />
            </div>
          </div>

          {/* Forgot Password */}
          {state === "login" && (
            <div className="flex justify-end mb-6">
              <button
                type="button"
                className="text-sm text-orange-600 hover:text-orange-800 transition font-medium"
              >
                Forgot Password?
              </button>
            </div>
          )}

          {/* Main Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold text-sm shadow-lg hover:scale-[1.02] hover:shadow-orange-200 transition-all duration-300"
          >
            {state === "register" ? "Create Account" : "Login"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-200"></div>

            <p className="text-sm text-gray-400 font-medium">OR</p>

            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Google Login */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 border border-gray-200 py-3 rounded-xl bg-white hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google"
              className="w-5 h-5"
            />

            <span className="font-medium text-gray-700">
              Continue with Google
            </span>
          </button>

          {/* Bottom Switch */}
          <p className="text-center text-sm text-gray-500 mt-7">
            {state === "login"
              ? "Don't have an account?"
              : "Already have an account?"}

            <span
              onClick={() =>
                setState(state === "login" ? "register" : "login")
              }
              className="ml-2 text-orange-600 font-semibold cursor-pointer hover:text-orange-800 transition"
            >
              {state === "login" ? "Sign Up" : "Login"}
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;