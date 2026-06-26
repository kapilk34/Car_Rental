import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {  menuLinks } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const NavBar = () => {
  const { setShowLogin, user, logout, isOwner, cars } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchError, setSearchError] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [scrolled, setScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const suggestionsRef = useRef(null);
  const searchInputRef = useRef(null);
  const profileMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const generateSuggestions = useCallback((value) => {
    if (value.trim() === "") {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const suggestionSet = new Set();
    const lowerValue = value.toLowerCase();

    cars.forEach(car => {
      if (car.brand?.toLowerCase().includes(lowerValue)) {
        suggestionSet.add(car.brand);
      }
      if (car.model?.toLowerCase().includes(lowerValue)) {
        suggestionSet.add(car.model);
      }
      if (car.category?.toLowerCase().includes(lowerValue)) {
        suggestionSet.add(car.category);
      }
    });

    const suggestionArray = Array.from(suggestionSet).slice(0, 5);
    setSuggestions(suggestionArray);
    setShowSuggestions(suggestionArray.length > 0);
  }, [cars]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchError("");

    if (value.length > 30) {
      setSearchError("Maximum 30 characters allowed");
      return;
    }

    if (value !== "" && !/[a-zA-Z]/.test(value)) {
      setSearchError("Search must contain at least one letter");
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setSearchInput(value);
    setSearchError("");
    generateSuggestions(value);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter") {
      if (searchInput.trim() !== "") {
        setShowSuggestions(false);
        setMobileSearchOpen(false);
        navigate(`/cars?search=${encodeURIComponent(searchInput.trim())}`);
      }
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchInput(suggestion);
    setShowSuggestions(false);
    setMobileSearchOpen(false);
    navigate(`/cars?search=${encodeURIComponent(suggestion)}`);
  };

  const clearSearch = () => {
    setSearchInput("");
    setSearchError("");
    setSuggestions([]);
    setShowSuggestions(false);
    searchInputRef.current?.focus();
  };

  const getUserInitials = () => {
    if (!user?.name) return "U";
    return user.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          scrolled 
            ? "bg-surface/95 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border-b border-border/50" 
            : "bg-surface/80 backdrop-blur-md border-b border-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group shrink-0">
              <div className="relative">
                <img
                  src="https://gvu57hqxi3.ufs.sh/f/FOd38ztMu1UwdyMcIgZp70jYMIdGQuW8qnyl5fzmKCVhtATS"
                  className="h-12 w-auto transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_8px_rgba(var(--accent-rgb),0.4)]"
                  alt="DriveSphere Logo"
                />
              </div>
              <h1 className="text-xl font-bold tracking-tight text-text-primary hidden sm:block">
                Drive<span className="text-accent">Sphere</span>
              </h1>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {menuLinks.map((link, index) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={index}
                    to={link.path}
                    className={`relative px-4 py-2 rounded-lg text-[14px] font-medium transition-all duration-300 ${
                      isActive 
                        ? "text-accent bg-accent/10" 
                        : "text-text-secondary hover:text-text-primary hover:bg-surface-hover"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent" />
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="hidden lg:flex items-center gap-4">
              {/* Search Bar */}
              <div className="relative" ref={suggestionsRef}>
                <div 
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all duration-300 w-64 xl:w-72 ${
                    searchFocused 
                      ? "border-accent/50 bg-surface shadow-[0_0_0_3px_rgba(var(--accent-rgb),0.1)]" 
                      : "border-border/60 bg-surface-secondary/50 hover:border-border"
                  }`}
                >
                  <svg 
                    className={`w-4 h-4 transition-colors ${searchFocused ? "text-accent" : "text-text-tertiary"}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search cars..."
                    value={searchInput}
                    onChange={handleSearchChange}
                    onKeyDown={handleSearchSubmit}
                    onFocus={() => {
                      setSearchFocused(true);
                      if (searchInput && suggestions.length > 0) setShowSuggestions(true);
                    }}
                    onBlur={() => setSearchFocused(false)}
                    maxLength="30"
                    className="bg-transparent outline-none border-none text-sm w-full placeholder-text-tertiary text-text-primary"
                  />
                  {searchInput && (
                    <button 
                      onClick={clearSearch}
                      className="p-0.5 rounded-full hover:bg-surface-hover transition-colors"
                    >
                      <svg className="w-3.5 h-3.5 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>

                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.15)] overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="w-full text-left px-4 py-2.5 text-sm text-text-primary hover:bg-accent/5 transition-colors flex items-center gap-3"
                      >
                        <svg className="w-4 h-4 text-text-tertiary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <span className="truncate">{suggestion}</span>
                        <svg className="w-4 h-4 text-text-tertiary ml-auto opacity-0 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    ))}
                  </div>
                )}

                {searchError && (
                  <p className="absolute top-full left-0 mt-1.5 text-xs text-red-500 px-1 animate-in fade-in slide-in-from-top-1 duration-200">
                    {searchError}
                  </p>
                )}
              </div>

              {user ? (
                <div className="flex items-center gap-3" ref={profileMenuRef}>
                  <div className="relative">
                    <button
                      onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                      className="flex items-center gap-2 pl-1 pr-3 py-1.5 rounded-full bg-surface-secondary border border-border/50 hover:border-accent/30 transition-all hover:shadow-md"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center text-white text-xs font-bold shadow-sm">
                        {getUserInitials()}
                      </div>
                      <span className="text-sm font-medium text-text-primary max-w-[100px] truncate hidden xl:block">
                        {user.name || "User"}
                      </span>
                      <svg 
                        className={`w-4 h-4 text-text-tertiary transition-transform duration-200 ${profileMenuOpen ? "rotate-180" : ""}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {profileMenuOpen && (
                      <div className="absolute top-full right-0 mt-2 w-56 bg-card border border-border rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.15)] overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="px-4 py-3 border-b border-border/50">
                          <p className="text-sm font-semibold text-text-primary">{user.name || "User"}</p>
                          <p className="text-xs text-text-tertiary mt-0.5">{user.email || ""}</p>
                        </div>
                        <div className="p-1.5">
                          <button
                            onClick={() => {
                              navigate(isOwner ? "/owner" : "/dashboard");
                              setProfileMenuOpen(false);
                            }}
                            className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface-hover rounded-lg transition-colors flex items-center gap-2"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                            Dashboard
                          </button>
                          <button
                            onClick={() => {
                              logout();
                              setProfileMenuOpen(false);
                            }}
                            className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-red-500/5 rounded-lg transition-colors flex items-center gap-2"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowLogin(true)}
                  className="px-6 py-2.5 rounded-xl text-white text-sm font-semibold bg-gradient-to-r from-accent to-accent-secondary hover:shadow-[0_8px_24px_rgba(var(--accent-rgb),0.35)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
                >
                  Login
                </button>
              )}
            </div>

            <div className="flex lg:hidden items-center gap-2">
              {/* Mobile Search Toggle */}
              <button 
                onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                className="p-2.5 rounded-xl text-text-secondary hover:text-accent hover:bg-surface-hover transition-all"
                aria-label="search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              <button 
                className="p-2.5 rounded-xl text-text-secondary hover:text-accent hover:bg-surface-hover transition-all" 
                aria-label="menu" 
                onClick={() => setOpen(!open)}
              >
                <div className="w-5 h-5 relative">
                  <span className={`absolute left-0 block w-5 h-0.5 bg-current rounded-full transition-all duration-300 ${open ? "top-2 rotate-45" : "top-0.5"}`} />
                  <span className={`absolute left-0 block w-5 h-0.5 bg-current rounded-full transition-all duration-300 ${open ? "opacity-0" : "top-2.5"}`} />
                  <span className={`absolute left-0 block w-5 h-0.5 bg-current rounded-full transition-all duration-300 ${open ? "top-2 -rotate-45" : "top-[18px]"}`} />
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileSearchOpen ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="px-4 pb-4">
            <div className="relative">
              <div className="flex items-center gap-3 px-4 py-3 bg-surface-secondary border border-border/60 rounded-xl">
                <svg className="w-5 h-5 text-text-tertiary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search cars..."
                  value={searchInput}
                  onChange={handleSearchChange}
                  onKeyDown={handleSearchSubmit}
                  maxLength="30"
                  className="bg-transparent outline-none border-none text-sm w-full placeholder-text-tertiary text-text-primary"
                  autoFocus={mobileSearchOpen}
                />
                {searchInput && (
                  <button onClick={clearSearch} className="p-1 rounded-full hover:bg-surface-hover">
                    <svg className="w-4 h-4 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>

              {showSuggestions && suggestions.length > 0 && (
                <div className="mt-2 bg-card border border-border rounded-xl shadow-lg overflow-hidden">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        handleSuggestionClick(suggestion);
                        setMobileSearchOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 text-sm text-text-primary hover:bg-accent/5 transition-colors flex items-center gap-3 border-b border-border/30 last:border-none"
                    >
                      <svg className="w-4 h-4 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}

              {searchError && (
                <p className="mt-2 text-xs text-red-500 px-1">{searchError}</p>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div 
        className={`lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setOpen(false)}
      />

      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-[85vw] max-w-[360px] bg-surface z-50 shadow-[-8px_0_40px_rgba(0,0,0,0.2)] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 h-[72px] border-b border-border/50">
          <span className="text-lg font-bold text-text-primary">Menu</span>
          <button 
            onClick={() => setOpen(false)}
            className="p-2 rounded-xl hover:bg-surface-hover transition-colors"
          >
            <svg className="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col h-[calc(100%-72px)] overflow-y-auto">
          {user && (
            <div className="px-6 py-6 border-b border-border/50">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center text-white text-lg font-bold shadow-lg">
                  {getUserInitials()}
                </div>
                <div className="min-w-0">
                  <p className="text-base font-semibold text-text-primary truncate">{user.name || "User"}</p>
                  <p className="text-sm text-text-tertiary truncate">{user.email || ""}</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-1 p-4">
            {menuLinks.map((link, index) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={index}
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-[15px] font-medium transition-all ${
                    isActive 
                      ? "text-accent bg-accent/10" 
                      : "text-text-secondary hover:text-text-primary hover:bg-surface-hover"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isActive ? "bg-accent" : "bg-text-tertiary/30"}`} />
                  {link.name}
                  {isActive && (
                    <svg className="w-4 h-4 ml-auto text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="mt-auto p-4 border-t border-border/50 space-y-3">
            {user && (
              <button
                onClick={() => {
                  navigate(isOwner ? "/owner" : "/dashboard");
                  setOpen(false);
                }}
                className="w-full py-3.5 rounded-xl border border-accent/30 text-accent font-semibold hover:bg-accent/5 transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                Go to Dashboard
              </button>
            )}

            <button
              onClick={() => {
                if (user) {
                  logout();
                } else {
                  setShowLogin(true);
                }
                setOpen(false);
              }}
              className={`w-full py-3.5 rounded-xl text-white font-semibold transition-all flex items-center justify-center gap-2 ${
                user 
                  ? "bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/20" 
                  : "bg-gradient-to-r from-accent to-accent-secondary hover:shadow-[0_8px_24px_rgba(var(--accent-rgb),0.35)]"
              }`}
            >
              {user ? (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Login
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      
      <div className="h-[72px]" />
    </>
  );
};

export default NavBar;