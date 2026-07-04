/* eslint-disable react/prop-types -- internal context provider */
/* eslint-disable react-refresh/only-export-components -- provider + hook live together */
import { createContext, useContext, useEffect, useState } from "react";

const PRELOAD_KEY = "dm-preloaded";
// Keep in sync with the Preloader exit timeline
export const PRELOAD_TOTAL_MS = 2400;

const LoadContext = createContext({ ready: true, firstVisit: false });

export function LoadProvider({ children }) {
  const [firstVisit] = useState(() => {
    try {
      return !sessionStorage.getItem(PRELOAD_KEY);
    } catch {
      return false;
    }
  });
  const [ready, setReady] = useState(!firstVisit);

  useEffect(() => {
    if (!firstVisit) return undefined;
    const t = setTimeout(() => {
      setReady(true);
      try {
        sessionStorage.setItem(PRELOAD_KEY, "1");
      } catch {
        /* storage unavailable */
      }
    }, PRELOAD_TOTAL_MS);
    return () => clearTimeout(t);
  }, [firstVisit]);

  return (
    <LoadContext.Provider value={{ ready, firstVisit }}>
      {children}
    </LoadContext.Provider>
  );
}

export function useLoad() {
  return useContext(LoadContext);
}
