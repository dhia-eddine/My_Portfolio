import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { styles } from "../styles";
import { navLinks, siteMeta, socials } from "../constants";
import { scrollToId, scrollToTop, getLenis } from "../lib/lenis";
import { EASE } from "../utils/motion";

const menuPanel = {
  closed: { y: "-100%" },
  open: { y: "0%" },
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  // Hide on scroll down, reveal on scroll up
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (!open) setHidden(y > 140 && y > lastY.current);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  // Lock scroll while menu is open
  useEffect(() => {
    const lenis = getLenis();
    if (open) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const handleNavClick = (link) => {
    setOpen(false);
    if (isHome) {
      // Wait a tick so the menu starts closing before the scroll begins
      setTimeout(() => scrollToId(link.id), open ? 350 : 0);
    } else {
      navigate({ pathname: "/", hash: `#${link.id}` });
    }
  };

  const handleLogoClick = () => {
    setOpen(false);
    if (isHome) scrollToTop();
  };

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <motion.header
        className={`fixed top-0 left-0 right-0 z-[100] transition-colors duration-500 ${
          scrolled && !open
            ? "bg-ink/80 backdrop-blur-md border-b hairline"
            : "bg-transparent border-b border-transparent"
        }`}
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <nav
          className={`${styles.paddingX} max-w-[1680px] mx-auto flex items-center justify-between h-16 sm:h-20`}
          aria-label="Primary"
        >
          <Link
            to="/"
            onClick={handleLogoClick}
            className="group flex items-baseline gap-2 relative z-[110]"
          >
            <span className="font-display text-lg sm:text-xl font-medium tracking-tight text-paper">
              Dhia Mandhouj
            </span>
            <span className="hidden sm:inline font-mono text-[10px] tracking-[0.2em] uppercase text-mute group-hover:text-accent-soft transition-colors duration-300">
              — Full-Stack Dev
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-9 list-none">
            {!isHome && (
              <li>
                <Link
                  to="/"
                  className="link-sweep font-mono text-[12px] tracking-[0.18em] uppercase text-mute hover:text-paper transition-colors duration-300"
                >
                  ← Home
                </Link>
              </li>
            )}
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => handleNavClick(link)}
                  className="link-sweep font-mono text-[12px] tracking-[0.18em] uppercase text-mute hover:text-paper transition-colors duration-300"
                >
                  <span className="text-accent-soft/70 mr-1.5">{link.index}</span>
                  {link.title}
                </button>
              </li>
            ))}
          </ul>

          {/* Menu toggle (mobile) */}
          <button
            className="md:hidden relative z-[110] flex items-center gap-3 group"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-mute group-hover:text-paper transition-colors">
              {open ? "Close" : "Menu"}
            </span>
            <span className="relative w-8 h-8 flex flex-col items-center justify-center gap-[5px]">
              <span
                className="block w-6 h-px bg-paper transition-transform duration-500 ease-expo"
                style={{
                  transform: open
                    ? "translateY(3px) rotate(45deg)"
                    : "none",
                }}
              />
              <span
                className="block w-6 h-px bg-paper transition-transform duration-500 ease-expo"
                style={{
                  transform: open
                    ? "translateY(-3px) rotate(-45deg)"
                    : "none",
                }}
              />
            </span>
          </button>
        </nav>
      </motion.header>

      {/* Full-screen menu (mobile) */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[105] bg-ink-800 md:hidden flex flex-col"
            variants={menuPanel}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div className={`${styles.paddingX} flex-1 flex flex-col justify-center`}>
              <span className="eyebrow mb-8">Navigation</span>
              <ul className="flex flex-col list-none">
                {navLinks.map((link, i) => (
                  <li key={link.id} className="border-b hairline">
                    <motion.button
                      initial={{ y: 40, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        duration: 0.7,
                        ease: EASE,
                        delay: 0.25 + i * 0.06,
                      }}
                      onClick={() => handleNavClick(link)}
                      className="w-full flex items-baseline gap-4 py-4 text-left group"
                    >
                      <span className="font-mono text-[11px] text-accent-soft/80">
                        {link.index}
                      </span>
                      <span className="font-display text-4xl xs:text-5xl font-medium text-paper group-active:text-accent-soft transition-colors">
                        {link.title}
                      </span>
                    </motion.button>
                  </li>
                ))}
              </ul>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className={`${styles.paddingX} pb-10 flex flex-wrap items-end justify-between gap-6`}
            >
              <div>
                <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-mute mb-2">
                  Get in touch
                </p>
                <a
                  href={`mailto:${siteMeta.email}`}
                  className="text-paper text-sm link-sweep"
                >
                  {siteMeta.email}
                </a>
              </div>
              <div className="flex gap-5">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[11px] tracking-[0.16em] uppercase text-mute hover:text-paper transition-colors"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
