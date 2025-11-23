import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/beta.png";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa";
import { useAppContext } from "../hooks/useAppContext";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout, token } = useAppContext();

  const navigate = useNavigate();

  const isAuthenticated = !!token && !!user;

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    setMenuOpen(false);
    navigate("/login");
  };

  const handleScrollTo = (targetId) => {
    const el = document.getElementById(targetId);
    if (!el) return;

    const headerOffset = 80; 
    const elementPosition = el.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  const navItems = [
    { name: "Home", to: "/", isDummy: false, scrollToId: null },
    {
      name: "Properties",
      to: null,
      isDummy: false,
      scrollToId: "properties-section",
    },
    { name: "About Us", to: "/about", isDummy: true, scrollToId: null },
    { name: "Blog", to: "/blog", isDummy: true, scrollToId: null },
    {
      name: "Contact Us",
      to: null,
      isDummy: false,
      scrollToId: "footer-section",
    },
  ];

  return (
    <div className="fixed top-0 left-0 w-full z-50 h-[80px] bg-transparent">
      <nav className="component flex items-center justify-between px-4 py-3 bg-transparent">
        <NavLink to="/">
          <img src={logo} alt="logo" className="w-[170px]" />
        </NavLink>

        <div className="hidden lg:flex items-center gap-8 text-[18px] text-white">
          {navItems.map((item) =>
            item.isDummy ? (
              <span
                key={item.name}
                className="relative opacity-50 cursor-not-allowed"
                style={{
                  fontWeight: "500",
                  pointerEvents: "none",
                }}
              >
                {item.name}
              </span>
            ) : item.scrollToId ? (
              <button
                key={item.name}
                type="button"
                onClick={() => handleScrollTo(item.scrollToId)}
                className="relative font-medium hover:after:w-full after:absolute after:left-0 after:-bottom-[2px] after:h-[2px] after:bg-white after:transition-all after:duration-300 after:w-0"
              >
                {item.name}
              </button>
            ) : (
              <NavLink
                key={item.to}
                to={item.to}
                style={{ fontWeight: "500" }}
                className={({ isActive }) =>
                  `relative ${
                    isActive ? "after:w-full" : "after:w-0"
                  } after:absolute after:left-0 after:-bottom-[2px] after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full`
                }
              >
                {item.name}
              </NavLink>
            )
          )}
        </div>

        <div className="hidden lg:flex items-center gap-4 relative">
          {!isAuthenticated ? (
            <>
              <button
                onClick={() => navigate("/signup")}
                className="cursor-pointer w-[100px] h-[45px] rounded-[8px] text-white font-semibold border border-white
                transition-all duration-200 hover:bg-white/20 hover:shadow-[0_0_10px_rgba(255,255,255,0.5)]
                active:scale-95"
              >
                Sign Up
              </button>

              <button
                onClick={() => navigate("/login")}
                className="cursor-pointer w-[100px] h-[45px] rounded-[8px] text-white font-semibold bg-[#3D9970]
                transition-all duration-200 hover:bg-[#4FBF8C] hover:shadow-[0_0_12px_rgba(61,153,112,0.6)]
                active:scale-95"
              >
                Login
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2 cursor-pointer relative">
              <img
                src="https://i.pravatar.cc/40"
                alt="user avatar"
                className="w-10 h-10 rounded-full border border-gray-400"
              />
              <span className="text-white font-medium whitespace-nowrap">
                {user.firstName} {user.lastName}
              </span>

              <FaChevronDown
                className="text-white"
                onClick={() => setDropdownOpen((prev) => !prev)}
              />

              {dropdownOpen && (
                <div className="absolute right-0 top-[60px] bg-[#1a1a1a] shadow-lg rounded-md py-2 w-[150px]">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-white hover:bg-[#333] transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="lg:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <IoMdClose size={30} className="text-white" />
            ) : (
              <IoMdMenu size={30} className="text-white" />
            )}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/40">
          <div className="ml-auto h-full w-[70%] max-w-xs bg-[#020617]/90 text-white flex flex-col justify-between py-6 px-5 shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-6">
                <img src={logo} alt="logo" className="w-[130px]" />
                <button onClick={() => setMenuOpen(false)}>
                  <IoMdClose size={26} className="text-white" />
                </button>
              </div>

              <nav className="flex flex-col gap-4">
                {navItems.map((item) =>
                  item.isDummy ? (
                    <span
                      key={item.name}
                      className="text-sm font-semibold text-gray-400 cursor-not-allowed"
                    >
                      {item.name}
                    </span>
                  ) : item.scrollToId ? (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => {
                        setMenuOpen(false);
                        handleScrollTo(item.scrollToId);
                      }}
                      className="text-[15px] font-semibold tracking-wide text-gray-200 text-left"
                    >
                      {item.name}
                    </button>
                  ) : (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={() => setMenuOpen(false)}
                      className={({ isActive }) =>
                        `text-[15px] font-semibold tracking-wide ${
                          isActive ? "text-white" : "text-gray-200"
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  )
                )}
              </nav>
            </div>

            <div className="flex flex-col gap-3 mt-6">
              {!isAuthenticated ? (
                <>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      navigate("/signup");
                    }}
                    className="w-full h-[44px] rounded-[8px] border border-white text-[15px] font-semibold text-white
                    bg-transparent transition-all duration-200 hover:bg-white/15"
                  >
                    Sign Up
                  </button>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      navigate("/login");
                    }}
                    className="w-full h-[44px] rounded-[8px] text-[15px] font-semibold text-white bg-[#3D9970]
                    transition-all duration-200 hover:bg-[#4FBF8C]"
                  >
                    Login
                  </button>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-2">
                    <img
                      src="https://i.pravatar.cc/60"
                      alt="user avatar"
                      className="w-10 h-10 rounded-full border border-gray-400"
                    />
                    <span className="text-sm font-semibold">
                      {user.firstName} {user.lastName}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full h-[44px] rounded-[8px] text-[15px] font-semibold text-white bg-red-600
                    transition-all duration-200 hover:bg-red-700"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
