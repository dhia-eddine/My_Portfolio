import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo } from "../assets";

const HamburgerIcon = ({ open }) => (
  <span className="relative w-[22px] h-[22px] block">
    {/* Hamburger lines */}
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="absolute inset-0 transition-all duration-300"
      style={{
        opacity: open ? 0 : 1,
        transform: open ? "rotate(90deg) scale(0.7)" : "rotate(0deg) scale(1)",
      }}
    >
      <path d="M3 12h18M3 6h18M3 18h18" />
    </svg>
    {/* Close X */}
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="absolute inset-0 transition-all duration-300"
      style={{
        opacity: open ? 1 : 0,
        transform: open ? "rotate(0deg) scale(1)" : "rotate(-90deg) scale(0.7)",
      }}
    >
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  </span>
);

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (toggle) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [toggle]);

  const handleNavClick = (link) => {
    setActive(link.title);
    setToggle(false);
    if (isHome) {
      const el = document.getElementById(link.id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(`/#${link.id}`);
    }
  };

  return (
    <>
      <nav
        className={`${
          styles.paddingX
        } w-full flex items-center py-4 fixed top-0 z-30 transition-all duration-500 ${
          scrolled || !isHome
            ? "glass border-b border-white/5 shadow-lg shadow-black/30"
            : "bg-transparent"
        }`}
      >
        <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
            onClick={() => {
              setActive("");
              setToggle(false);
              window.scrollTo(0, 0);
            }}
          >
            <div className="w-9 h-9 rounded-full bg-[#915eff]/20 flex items-center justify-center ring-1 ring-[#915eff]/40 group-hover:ring-[#915eff] transition-all duration-300">
              <img src={logo} alt="logo" className="w-6 h-6 object-contain" />
            </div>
            <p className="text-white text-[16px] font-bold cursor-pointer flex items-center">
              Dhia Mandhouj
              <span className="sm:block hidden ml-2 text-secondary font-normal">
                |{" "}
                <span className="violet-text-gradient font-semibold">
                  Developer
                </span>
              </span>
            </p>
          </Link>

          {/* Desktop nav */}
          <ul className="list-none hidden sm:flex flex-row gap-8 items-center">
            {!isHome && (
              <li>
                <Link
                  to="/"
                  className="flex items-center gap-1.5 text-secondary hover:text-white text-[15px] font-medium transition-colors duration-200"
                  onClick={() => setActive("")}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 12H5M12 5l-7 7 7 7" />
                  </svg>
                  Home
                </Link>
              </li>
            )}
            {navLinks.map((link) => (
              <li
                key={link.id}
                className={`relative text-[15px] font-medium cursor-pointer transition-colors duration-200 ${
                  active === link.title
                    ? "text-white nav-link-active"
                    : "text-secondary hover:text-white"
                }`}
                onClick={() => handleNavClick(link)}
              >
                <span>{link.title}</span>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger button */}
          <button
            className="sm:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-[#915eff]/40 transition-all duration-200 z-40"
            onClick={() => setToggle(!toggle)}
            aria-label="Toggle menu"
          >
            <HamburgerIcon open={toggle} />
          </button>
        </div>
      </nav>

      {/* Mobile full-screen overlay menu */}
      <div
        className={`sm:hidden fixed inset-0 z-20 transition-all duration-300 ${
          toggle
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{
          backdropFilter: "blur(16px)",
          backgroundColor: "rgba(5,8,22,0.95)",
        }}
        onClick={() => setToggle(false)}
      >
        {/* Menu content */}
        <div
          className={`flex flex-col h-full pt-24 pb-10 px-8 transition-all duration-300 ${
            toggle ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
          }`}
        >
          {/* Nav links */}
          <ul className="flex flex-col gap-2 flex-1">
            {!isHome && (
              <li>
                <Link
                  to="/"
                  className="flex items-center gap-3 text-secondary text-[18px] font-medium py-4 px-4 rounded-2xl hover:bg-white/5 hover:text-white transition-all duration-200 border border-transparent hover:border-white/10"
                  onClick={() => {
                    setToggle(false);
                    setActive("");
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 12H5M12 5l-7 7 7 7" />
                  </svg>
                  Home
                </Link>
              </li>
            )}
            {navLinks.map((link, index) => (
              <li key={link.id}>
                <button
                  className={`w-full text-left flex items-center gap-4 text-[18px] font-semibold py-4 px-4 rounded-2xl transition-all duration-200 border ${
                    active === link.title
                      ? "text-white bg-[#915eff]/10 border-[#915eff]/30"
                      : "text-secondary hover:text-white hover:bg-white/5 border-transparent hover:border-white/10"
                  }`}
                  onClick={() => handleNavClick(link)}
                >
                  <span
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold"
                    style={{
                      background:
                        "linear-gradient(135deg, #915eff22, #2563eb22)",
                      border: "1px solid rgba(145,94,255,0.2)",
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {link.title}
                </button>
              </li>
            ))}
          </ul>

          {/* Bottom section */}
          <div className="mt-auto pt-8 border-t border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#915eff]/20 flex items-center justify-center ring-1 ring-[#915eff]/40">
                <img src={logo} alt="logo" className="w-6 h-6 object-contain" />
              </div>
              <div>
                <p className="text-white text-sm font-bold">Dhia Mandhouj</p>
                <p className="text-[#915eff] text-xs font-semibold">
                  Developer
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
