import { useEffect, useState } from "react";
import { SectionWrapper } from "../hoc";
import { siteMeta, socials } from "../constants";
import { scrollToTop } from "../lib/lenis";
import { RevealLines, FadeUp } from "./ui/Reveal";
import Magnetic from "./ui/Magnetic";

function useLocalTime(timezone) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: timezone,
      }).format(new Date());
    setTime(format());
    const t = setInterval(() => setTime(format()), 30_000);
    return () => clearInterval(t);
  }, [timezone]);
  return time;
}

const ArrowIcon = () => (
  <svg
    width="0.5em"
    height="0.5em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="inline-block shrink-0 transition-transform duration-500 ease-expo group-hover:translate-x-2 group-hover:-translate-y-2"
    aria-hidden="true"
  >
    <path d="M7 17L17 7M17 7H7M17 7v10" />
  </svg>
);

const Contact = () => {
  const time = useLocalTime(siteMeta.timezone);
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteMeta.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — the mailto link still works */
    }
  };

  return (
    <footer>
      <FadeUp
        y={0}
        className="flex items-baseline justify-between border-t hairline pt-5"
      >
        <span className="eyebrow">Contact</span>
        <span className="font-mono text-[11px] tracking-[0.22em] text-mute">
          /05
        </span>
      </FadeUp>

      <div className="mt-14 sm:mt-20">
        <RevealLines
          as="h2"
          lines={["Let's build", "something great."]}
          className="font-display font-medium text-display-xl text-paper"
        />

        <FadeUp delay={0.25} className="mt-12 sm:mt-16">
          <div className="flex flex-wrap items-center gap-5">
            <Magnetic strength={0.2}>
              <a
                href={`mailto:${siteMeta.email}`}
                data-cursor="link"
                className="group inline-flex items-center gap-3 font-display text-xl xs:text-2xl sm:text-4xl text-paper hover:text-accent-soft transition-colors duration-300"
              >
                <span className="link-sweep break-all">{siteMeta.email}</span>
                <ArrowIcon />
              </a>
            </Magnetic>
            <button
              onClick={copyEmail}
              className="font-mono text-[10px] tracking-[0.2em] uppercase border hairline rounded-full px-4 py-2 text-mute hover:text-paper hover:border-accent-soft/50 transition-colors duration-300"
              aria-live="polite"
            >
              {copied ? "Copied ✓" : "Copy"}
            </button>
          </div>
        </FadeUp>
      </div>

      {/* Meta grid */}
      <div className="mt-20 sm:mt-28 grid grid-cols-1 sm:grid-cols-3 gap-10 border-t hairline pt-10">
        <FadeUp delay={0.05}>
          <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-mute mb-4">
            Phone
          </p>
          <p className="text-paper text-sm mb-3">{siteMeta.phone}</p>
          <div className="flex gap-4">
            <a
              href={`tel:${siteMeta.phoneHref}`}
              className="link-sweep font-mono text-[11px] tracking-[0.16em] uppercase text-mute hover:text-paper transition-colors"
            >
              Call
            </a>
            <a
              href={`https://wa.me/${siteMeta.phoneHref.replace("+", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="link-sweep font-mono text-[11px] tracking-[0.16em] uppercase text-mute hover:text-paper transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </FadeUp>

        <FadeUp delay={0.12}>
          <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-mute mb-4">
            Socials
          </p>
          <ul className="space-y-2 list-none">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-sm text-mute hover:text-paper transition-colors duration-300"
                >
                  <span className="link-sweep">{s.label}</span>
                  <ArrowIcon />
                </a>
              </li>
            ))}
          </ul>
        </FadeUp>

        <FadeUp delay={0.19}>
          <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-mute mb-4">
            Location
          </p>
          <p className="text-paper text-sm">{siteMeta.location}</p>
          <p className="mt-2 font-mono text-[11px] tracking-[0.14em] text-mute tabular-nums">
            Local time — {time} GMT+1
          </p>
          <div className="mt-4 flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="text-[12px] text-mute">
              {siteMeta.availability}
            </span>
          </div>
        </FadeUp>
      </div>

      {/* Footer bar */}
      <div className="mt-16 sm:mt-20 border-t hairline pt-6 pb-2 flex flex-wrap items-center justify-between gap-4">
        <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-mute">
          © 2026 {siteMeta.fullName}
        </p>
        <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-mute hidden sm:block">
          Designed &amp; built with love
        </p>
        <button
          onClick={() => scrollToTop()}
          className="group inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.16em] uppercase text-mute hover:text-paper transition-colors"
        >
          Back to top
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-500 ease-expo group-hover:-translate-y-1"
          >
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
      </div>
    </footer>
  );
};

const ContactSection = SectionWrapper(Contact, "contact");
export default ContactSection;
