import { logEvent } from "convex-analytics";
import React, { createContext, useContext, useEffect, useState } from "react";
import Analytics from "../components/Analytics/Analytics";

import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";

function Root({ children }) {
  useEffect(() => {
    logEvent("view doc load", { path: location.pathname });
  }, []);

  // Scroll the active sidebar item into view in case
  // it's below fold.
  useEffect(() => {
    document.querySelectorAll(".menu__link--active").forEach((activeLink) => {
      // scrollIntoViewIfNeeded works great so use
      // it by default (Chrome, Safari)
      if (activeLink.scrollIntoViewIfNeeded) {
        activeLink.scrollIntoViewIfNeeded?.();
      } else {
        // If we used block: "center" it would
        // shift the whole page after page load
        activeLink.scrollIntoView({
          behavior: "instant",
          block: "nearest",
        });
      }
    });
  }, []);

  const [lang, setLang] = useState("TS");

  return (
    <DialectContext.Provider value={{ lang, setLang }}>
      {children}
      <Analytics />
    </DialectContext.Provider>
  );
}

const DialectContext = createContext();

export function useSelectedDialect() {
  return useContext(DialectContext).lang;
}

export function useSetDialect() {
  return useContext(DialectContext).setLang;
}

export default Root;
