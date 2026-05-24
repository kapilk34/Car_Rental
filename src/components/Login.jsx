import React from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { X, Mail, Lock, User } from "lucide-react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";

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
        axios.defaults.headers.common["Authorization"] = data.token;
        localStorage.setItem("token", data.token);
        setToken(data.token);
        const loggedInUser = await fetchUser();
        toast.success(data.message || "Logged in successfully!");
        navigate(loggedInUser?.role === "owner" ? "/owner" : "/dashboard");
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
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      const payload = {
        name: user.displayName,
        email: user.email,
        image: user.photoURL
      };

      const { data } = await axios.post('/api/user/google-auth', payload);
      
      if (data.success) {
        axios.defaults.headers.common["Authorization"] = data.token;
        localStorage.setItem("token", data.token);
        setToken(data.token);
        const loggedInUser = await fetchUser();
        toast.success(data.message || "Logged in successfully!");
        navigate(loggedInUser?.role === "owner" ? "/owner" : "/dashboard");
        setShowLogin(false);
      } else {
        toast.error(data.message || "Something went wrong with Google Login!");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to login with Google");
    }
  };

  return (
    <div
      onClick={() => setShowLogin(false)}
      className="fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-sm px-4"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-3xl shadow-2xl border overflow-hidden animate-fadeIn"
        style={{
          backgroundColor: "#1C1C1C",
          borderColor: "#2F2F2F"
        }}
      >
        <button
          type="button"
          onClick={() => setShowLogin(false)}
          className="absolute top-4 right-4 transition"
          style={{ color: "#B3B3B3" }}
        >
          <X size={22} />
        </button>

        <div className="px-8 py-10">
          {/* Heading */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-text-primary">
              {state === "login" ? "Welcome Back" : "Create Account"}
            </h2>

            <p className="text-text-secondary mt-2 text-sm leading-relaxed">
              {state === "login"
                ? "Login to continue your journey with us"
                : "Create your account and get started today"}
            </p>
          </div>

          {/* Name */}
          {state === "register" && (
            <div className="mb-5">
              <label className="text-sm font-medium text-text-primary">
                Full Name
              </label>

              <div className="flex items-center mt-2 border rounded-xl px-4 py-3 transition-all" style={{
                borderColor: "#2F2F2F",
                backgroundColor: "#242424"
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#E63946";
                e.currentTarget.style.boxShadow = "0 0 0 3px rgba(230, 57, 70, 0.1)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#2F2F2F";
                e.currentTarget.style.boxShadow = "none";
              }}
              >
                <User size={18} style={{ color: "#B3B3B3" }} />

                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full ml-3 outline-none bg-transparent text-text-primary placeholder-text-secondary"
                  required
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div className="mb-5">
            <label className="text-sm font-medium text-text-primary">
              Email Address
            </label>

            <div className="flex items-center mt-2 border rounded-xl px-4 py-3 transition-all" style={{
              borderColor: "#2F2F2F",
              backgroundColor: "#242424"
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#E63946";
              e.currentTarget.style.boxShadow = "0 0 0 3px rgba(230, 57, 70, 0.1)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#2F2F2F";
              e.currentTarget.style.boxShadow = "none";
            }}
            >
              <Mail size={18} style={{ color: "#B3B3B3" }} />

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full ml-3 outline-none bg-transparent text-text-primary placeholder-text-secondary"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="text-sm font-medium text-text-primary">
              Password
            </label>

            <div className="flex items-center mt-2 border rounded-xl px-4 py-3 transition-all" style={{
              borderColor: "#2F2F2F",
              backgroundColor: "#242424"
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#E63946";
              e.currentTarget.style.boxShadow = "0 0 0 3px rgba(230, 57, 70, 0.1)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#2F2F2F";
              e.currentTarget.style.boxShadow = "none";
            }}
            >
              <Lock size={18} style={{ color: "#B3B3B3" }} />

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full ml-3 outline-none bg-transparent text-text-primary placeholder-text-secondary"
                required
              />
            </div>
          </div>

          {/* Forgot Password */}
          {state === "login" && (
            <div className="flex justify-end mb-6">
              <button
                type="button"
                className="text-sm transition font-medium"
                style={{ color: "#F4A261" }}
              >
                Forgot Password?
              </button>
            </div>
          )}

          {/* Main Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl text-white font-semibold text-sm shadow-lg transition-all duration-300"
            style={{
              background: "#E63946",
              boxShadow: "0 20px 25px rgba(230, 57, 70, 0.3)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 25px 30px rgba(230, 57, 70, 0.5)";
              e.currentTarget.style.transform = "scale(1.02)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 20px 25px rgba(230, 57, 70, 0.3)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            {state === "register" ? "Create Account" : "Login"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px" style={{ backgroundColor: "#2F2F2F" }}></div>

            <p className="text-sm font-medium" style={{ color: "#B3B3B3" }}>OR</p>

            <div className="flex-1 h-px" style={{ backgroundColor: "#2F2F2F" }}></div>
          </div>

          {/* Google Login */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 border py-3 rounded-xl transition-all duration-300 shadow-sm"
            style={{
              borderColor: "#2F2F2F",
              backgroundColor: "#242424"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#2F2F2F";
              e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#242424";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google"
              className="w-5 h-5"
            />

            <span className="font-medium text-text-primary">
              Continue with Google
            </span>
          </button>

          {/* Bottom Switch */}
          <p className="text-center text-sm mt-7" style={{ color: "#B3B3B3" }}>
            {state === "login"
              ? "Don't have an account?"
              : "Already have an account?"}

            <span
              onClick={() =>
                setState(state === "login" ? "register" : "login")
              }
              className="ml-2 font-semibold cursor-pointer transition"
              style={{ color: "#F4A261" }}
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
