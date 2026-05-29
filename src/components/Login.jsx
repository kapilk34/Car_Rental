import React from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { X, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";

const Login = () => {
  const { setShowLogin, axios, setToken, navigate, fetchUser } =
    useAppContext();

  const [state, setState] = React.useState("login");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [showPassword, setShowPassword] = React.useState(false);

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
      style={{ backgroundColor: "rgba(0,0,0,0.65)" }}
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm rounded-2xl shadow-2xl border animate-fadeIn"
        style={{ backgroundColor: "#1C1C1C", borderColor: "#2F2F2F" }}
      >
        <div className="px-6 pt-6 pb-4 border-b" style={{ borderColor: "#2F2F2F" }}>
          <button
            type="button"
            onClick={() => setShowLogin(false)}
            className="absolute top-4 right-4 transition"
            style={{ color: "#B3B3B3" }}
          >
            <X size={18} />
          </button>
          <h2 className="text-xl font-bold text-white">
            {state === "login" ? "Welcome Back 👋" : "Create Account"}
          </h2>
          <p className="text-xs mt-1" style={{ color: "#B3B3B3" }}>
            {state === "login" ? "Login to continue your journey" : "Sign up and get started today"}
          </p>
        </div>

        <div className="px-6 py-5 flex flex-col gap-3">

          {state === "register" && (
            <div>
              <label className="text-xs font-medium text-white block mb-1.5">Full Name</label>
              <div className="flex items-center border rounded-xl px-3 py-2.5 transition-all"
                style={{ borderColor: "#2F2F2F", backgroundColor: "#242424" }}
                onFocus={e => { e.currentTarget.style.borderColor = "#2563EB"; }}
                onBlur={e => { e.currentTarget.style.borderColor = "#2F2F2F"; }}
              >
                <User size={15} style={{ color: "#B3B3B3" }} />
                <input type="text" placeholder="Your name" value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full ml-2.5 outline-none bg-transparent text-sm text-white placeholder-[#B3B3B3]"
                  required />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-medium text-white block mb-1.5">Email Address</label>
            <div className="flex items-center border rounded-xl px-3 py-2.5 transition-all"
              style={{ borderColor: "#2F2F2F", backgroundColor: "#242424" }}
              onFocus={e => { e.currentTarget.style.borderColor = "#2563EB"; }}
              onBlur={e => { e.currentTarget.style.borderColor = "#2F2F2F"; }}
            >
              <Mail size={15} style={{ color: "#B3B3B3" }} />
              <input type="email" placeholder="you@email.com" value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full ml-2.5 outline-none bg-transparent text-sm text-white placeholder-[#B3B3B3]"
                required />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium text-white">Password</label>
              {state === "login" && (
                <button type="button" className="text-xs font-medium transition" style={{ color: "#F4A261" }}>
                  Forgot password?
                </button>
              )}
            </div>
            <div className="flex items-center border rounded-xl px-3 py-2.5 transition-all"
              style={{ borderColor: "#2F2F2F", backgroundColor: "#242424" }}
              onFocus={e => { e.currentTarget.style.borderColor = "#2563EB"; }}
              onBlur={e => { e.currentTarget.style.borderColor = "#2F2F2F"; }}
            >
              <Lock size={15} style={{ color: "#B3B3B3" }} />
              <input type={showPassword ? "text" : "password"} placeholder="••••••••" value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full ml-2.5 outline-none bg-transparent text-sm text-white placeholder-[#B3B3B3]"
                required />
              <button type="button" onClick={() => setShowPassword(p => !p)} className="ml-2 shrink-0" style={{ color: "#B3B3B3" }}>
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <button type="submit"
            className="w-full py-2.5 rounded-xl text-white font-semibold text-sm transition-all duration-300 mt-1"
            style={{ background: "linear-gradient(135deg, #2563EB, #4F46E5)", boxShadow: "0 8px 20px rgba(37,99,235,0.35)" }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.9"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >
            {state === "register" ? "Create Account" : "Login"}
          </button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px" style={{ backgroundColor: "#2F2F2F" }} />
            <span className="text-xs" style={{ color: "#B3B3B3" }}>OR</span>
            <div className="flex-1 h-px" style={{ backgroundColor: "#2F2F2F" }} />
          </div>

          <button type="button" onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2.5 border py-2.5 rounded-xl transition-all duration-300 text-sm font-medium text-white"
            style={{ borderColor: "#2F2F2F", backgroundColor: "#242424" }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = "#2F2F2F"}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = "#242424"}
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="google" className="w-4 h-4" />
            Continue with Google
          </button>

          <p className="text-center text-xs" style={{ color: "#B3B3B3" }}>
            {state === "login" ? "Don't have an account?" : "Already have an account?"}
            <span
              onClick={() => setState(state === "login" ? "register" : "login")}
              className="ml-1.5 font-semibold cursor-pointer"
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
