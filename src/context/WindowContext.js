// src/contexts/WindowContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

const WindowContext = createContext();

export const useWindow = () => useContext(WindowContext);

export const WindowProvider = ({ children }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  function onResize() {
    setWindowWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <WindowContext.Provider value={{ windowWidth }}>
      {children}
    </WindowContext.Provider>
  );
};
