"use client";

import { useState, useEffect } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

function ToggleDarkMode() {
  const [isDark, setIsDark] = useState();
  // const [isDark, setIsDark] = useState(
  //   window.matchMedia("(prefers-color-scheme: dark)").matches
  // );

  // Function to switch color scheme based on the state
  function switchColorScheme() {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    const htmlElement = document.querySelector("html");
    if (htmlElement) {
      htmlElement.dataset.bsTheme = newIsDark ? "dark" : "light";
    }
  }

  // Update the state based on system preference
  useEffect(() => {
    const prefersDarkScheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsDark(prefersDarkScheme);
    const htmlElement = document.querySelector("html");
    if (htmlElement) {
      htmlElement.dataset.bsTheme = prefersDarkScheme ? "dark" : "light";
    }

    // Add event listener for changes in system preference
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      setIsDark(e.matches);
      if (htmlElement) {
        htmlElement.dataset.bsTheme = e.matches ? "dark" : "light";
      }
    };
    mediaQuery.addEventListener("change", handleChange);

    // Cleanup the event listener on component unmount
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
