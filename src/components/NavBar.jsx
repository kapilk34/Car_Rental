import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { assets, menuLinks } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const NavBar = () => {
  const { setShowLogin, user, logout, isOwner } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border backdrop-blur-lg bg-surface/90 shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between px-6 md:px-12 lg:px-20 py-4">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="https://gvu57hqxi3.ufs.sh/f/FOd38ztMu1UwdyMcIgZp70jYMIdGQuW8qnyl5fzmKCVhtATS"
            className="h-14 w-auto transition-transform duration-300 group-hover:scale-[1.03]"
            alt="DriveSphere Logo"
          />
          <h1 className="text-xl font-bold tracking-tight text-text-primary">
            Drive<span className="text-accent">Sphere</span>
          </h1>
        </Link>

        <div className="hidden lg:flex items-center gap-10">
          {menuLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className={`relative text-[15px] font-medium transition-all duration-300 ${
                location.pathname === link.path ? "text-accent" : "text-text-secondary hover:text-accent"
              }`}
            >
              {link.name}
              {location.pathname === link.path && (
                <span className="absolute left-0 -bottom-1 h-[2px] w-full rounded-full bg-accent" />
              )}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-5">
          <div className="flex items-center gap-3 px-4 py-2 bg-card border border-border rounded-full w-64 focus-within:border-primary focus-within:bg-surface transition-all">
            <img src={assets.search_icon} alt="search" className="w-4 opacity-50" />
            <input
              type="text"
              placeholder="Search cars..."
              className="bg-transparent outline-none text-sm w-full placeholder-text-secondary text-text-primary"
            />
          </div>

          {user && (
            <button
              onClick={() => navigate(isOwner ? "/owner" : "/dashboard")}
              className="text-sm font-medium text-text-secondary hover:text-accent transition-all"
            >
              Dashboard
            </button>
          )}

          <button
            onClick={() => { user ? logout() : setShowLogin(true); }}
            className="px-6 py-2.5 rounded-xl text-white text-sm font-semibold bg-primary hover:opacity-90 shadow-md hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
          >
            {user ? "Logout" : "Login"}
          </button>
        </div>

        <button className="lg:hidden" aria-label="menu" onClick={() => setOpen(!open)}>
          <img
            src={open ? assets.close_icon : assets.menu_icon}
            alt="menu"
            className="w-6 brightness-[10]"
          />
        </button>
      </div>

      <div
        className={`lg:hidden fixed top-[73px] right-0 h-screen w-full bg-surface transition-all duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-6 p-6">
          <div className="flex items-center gap-3 px-4 py-3 bg-card rounded-xl border border-border">
            <img src={assets.search_icon} alt="search" className="w-4 opacity-50" />
            <input
              type="text"
              placeholder="Search cars..."
              className="bg-transparent outline-none text-sm w-full text-text-primary placeholder-text-secondary"
            />
          </div>

          <div className="flex flex-col gap-5">
            {menuLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                onClick={() => setOpen(false)}
                className={`text-lg font-medium transition-all ${
                  location.pathname === link.path ? "text-accent" : "text-text-secondary hover:text-accent"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {user && (
            <button
              onClick={() => navigate(isOwner ? "/owner" : "/dashboard")}
              className="w-full py-3 rounded-xl border border-primary/40 text-text-primary font-medium hover:bg-primary/10 transition-all"
            >
              Go to Dashboard
            </button>
          )}

          <button
            onClick={() => { user ? logout() : setShowLogin(true); }}
            className="w-full py-3 rounded-xl text-white font-semibold bg-primary hover:opacity-90 transition-all shadow-md"
          >
            {user ? "Logout" : "Login"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
