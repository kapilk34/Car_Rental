import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { assets, menuLinks } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const NavBar = () => {
  const {
    setShowLogin,
    user,
    logout,
    isOwner,
    axios,
    setIsOwner,
    fetchUser,
  } = useAppContext();

  const location = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const changeRole = async () => {
    try {
      const { data } = await axios.post("api/owner/change-role");

      if (data.success) {
        setIsOwner(true);
        await fetchUser();

        toast.success(data.message);
        navigate("/owner");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <nav
      className={`sticky top-0 z-50 w-full border-b border-gray-200 backdrop-blur-lg transition-all duration-300 ${
        location.pathname === "/"
          ? "bg-white/80"
          : "bg-white/90 shadow-sm"
      }`}
    >
      <div className="flex items-center justify-between px-6 md:px-12 lg:px-20 py-4">
        <Link to="/" className="flex items-center gap-3 group">
          <img src="https://gvu57hqxi3.ufs.sh/f/FOd38ztMu1UwdyMcIgZp70jYMIdGQuW8qnyl5fzmKCVhtATS" className="h-14 w-auto" alt="DriveSphere Logo"/>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900">
              Drive<span className="text-blue-800">Sphere</span>
            </h1>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-10">
          {menuLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className={`relative text-[15px] font-medium transition-all duration-300 hover:text-blue-600 ${
                location.pathname === link.path
                  ? "text-blue-600"
                  : "text-gray-700"
              }`}
            >
              {link.name}

              {location.pathname === link.path && (
                <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-blue-600 rounded-full"></span>
              )}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-5">
          <div className="flex items-center gap-3 px-4 py-2 bg-gray-100 border border-gray-200 rounded-full w-64 focus-within:border-blue-500 focus-within:bg-white transition-all">
            <img
              src={assets.search_icon}
              alt="search"
              className="w-4 opacity-70"
            />

            <input
              type="text"
              placeholder="Search cars..."
              className="bg-transparent outline-none text-sm w-full placeholder-gray-400"
            />
          </div>

          {user && (
            <button
              onClick={() =>
                isOwner ? navigate("/owner") : changeRole()
              }
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-all"
            >
              {isOwner ? "Dashboard" : "List Cars"}
            </button>
          )}

          <button
            onClick={() => {
              user ? logout() : setShowLogin(true);
            }}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300"
          >
            {user ? "Logout" : "Login"}
          </button>
        </div>

        <button
          className="lg:hidden"
          aria-label="menu"
          onClick={() => setOpen(!open)}
        >
          <img
            src={open ? assets.close_icon : assets.menu_icon}
            alt="menu"
            className="w-6"
          />
        </button>
      </div>

      <div
        className={`lg:hidden fixed top-[73px] right-0 h-screen w-full bg-white transition-all duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-6 p-6">
          <div className="flex items-center gap-3 px-4 py-3 bg-gray-100 rounded-xl border border-gray-200">
            <img
              src={assets.search_icon}
              alt="search"
              className="w-4 opacity-70"
            />

            <input
              type="text"
              placeholder="Search cars..."
              className="bg-transparent outline-none text-sm w-full"
            />
          </div>

          <div className="flex flex-col gap-5">
            {menuLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                onClick={() => setOpen(false)}
                className={`text-lg font-medium transition-all ${
                  location.pathname === link.path
                    ? "text-blue-600"
                    : "text-gray-700"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Owner Button */}
          {user && (
            <button
              onClick={() =>
                isOwner ? navigate("/owner") : changeRole()
              }
              className="w-full py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:border-blue-600 hover:text-blue-600 transition-all"
            >
              {isOwner ? "Go to Dashboard" : "List Your Cars"}
            </button>
          )}

          {/* Login / Logout */}
          <button
            onClick={() => {
              user ? logout() : setShowLogin(true);
            }}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all"
          >
            {user ? "Logout" : "Login"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;