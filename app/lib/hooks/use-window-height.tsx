"use client";
import { useState, useEffect } from "react";

export function useWindowHeight() {
  // Initialize state with current window height
  const [windowHeight, setWindowHeight] = useState<number>(0);

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window height to state
      setWindowHeight(window.innerHeight);
    }

    // Set initial height
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect runs only on mount and unmount

  return windowHeight;
}
