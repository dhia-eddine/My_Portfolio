import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";

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
    <nav
      className={`${
        styles.paddingX
      } w-full flex items-center py-4 fixed top-0 z-20 transition-all duration-500 ${
        scrolled || !isHome
          ? "glass border-b border-white/5 shadow-lg shadow-black/30"
          : "bg-transparent"
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-3 group"
          onClick={() => {
            setActive("");
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

        {/* Mobile nav */}
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <button
            className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            onClick={() => setToggle(!toggle)}
            aria-label="Toggle menu"
          >
            <img
              src={toggle ? close : menu}
              alt="menu"
              className="w-5 h-5 object-contain"
            />
          </button>

          <div
            className={`${
              !toggle
                ? "opacity-0 pointer-events-none scale-95"
                : "opacity-100 scale-100"
            } glass transition-all duration-200 absolute top-16 right-4 min-w-[180px] z-10 rounded-2xl p-4 border border-white/10`}
          >
            <ul className="list-none flex flex-col gap-1">
              {!isHome && (
                <li className="px-3 py-2 rounded-lg hover:bg-white/5">
                  <Link
                    to="/"
                    className="flex items-center gap-2 text-secondary text-[15px] font-medium hover:text-white transition-colors"
                    onClick={() => setToggle(false)}
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
                  className={`${
                    active === link.title ? "text-white" : "text-secondary"
                  } font-medium cursor-pointer text-[15px] hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/5`}
                  onClick={() => handleNavClick(link)}
                >
                  {link.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
