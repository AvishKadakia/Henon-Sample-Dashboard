import React, { createContext, useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const StateContext = createContext();

const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

export const ContextProvider = ({ children }) => {
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState("#03C9D7");
  const [currentMode, setCurrentMode] = useState("Light");
  const [themeSettings, setThemeSettings] = useState(false);
  const [activeMenu, setActiveMenu] = useState(false);
  const [isloggedIn, setIsloggedIn] = useState(false);
  const [profileInfo, setProfileInfo] = useState({});
  const [isClicked, setIsClicked] = useState(initialState);

  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem("themeMode", e.target.value);
  };

  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem("colorMode", color);
  };

  const setLogin = (token) => {
    const data = jwt_decode(token);
    setProfileInfo({
      name: data.given_name.charAt(0).toUpperCase() + data.given_name.slice(1),
      picture: data.picture,
      email: data.email,
      loginType: "google",
    });
    setIsloggedIn(true);
    localStorage.setItem("loginToken", token);
  };

  const setLogout = (token) => {
    localStorage.setItem("loginToken", false);
    setIsloggedIn(false);
    setActiveMenu(false);
    setProfileInfo({});
  };

  const handleClick = (clicked) =>
    setIsClicked({ ...initialState, [clicked]: true });
  const checkAuthentication = (path) => {
    console.log("isloggedIn", isloggedIn);
    if (isloggedIn === false) {
      return <Navigate to="/login" />;
    } else {
      return path;
    }
  };
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StateContext.Provider
      value={{
        currentColor,
        currentMode,
        activeMenu,
        screenSize,
        setScreenSize,
        handleClick,
        isClicked,
        initialState,
        setIsClicked,
        setActiveMenu,
        setCurrentColor,
        setCurrentMode,
        setMode,
        setColor,
        themeSettings,
        setThemeSettings,
        isloggedIn,
        setLogin,
        setLogout,
        checkAuthentication,
        profileInfo,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
