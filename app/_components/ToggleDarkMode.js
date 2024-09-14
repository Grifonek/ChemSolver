"use client";

import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

function ToggleDarkMode() {
  const [isDark, setIsDark] = useState();

  function switchColorScheme() {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    const htmlElement = document.querySelector("html");
    if (htmlElement) {
      htmlElement.dataset.bsTheme = newIsDark ? "dark" : "light";
    }
  }

  useEffect(() => {
    const prefersDarkScheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsDark(prefersDarkScheme);
    const htmlElement = document.querySelector("html");
    if (htmlElement) {
      htmlElement.dataset.bsTheme = prefersDarkScheme ? "dark" : "light";
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      setIsDark(e.matches);
      if (htmlElement) {
        htmlElement.dataset.bsTheme = e.matches ? "dark" : "light";
      }
    };
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <button onClick={switchColorScheme}>
      {isDark ? (
        <SunIcon className="size-6" />
      ) : (
        <MoonIcon className="size-6" />
      )}
    </button>
  );
}

export default ToggleDarkMode;
