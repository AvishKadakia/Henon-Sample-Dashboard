import React, { useEffect } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { Navbar, Footer, Sidebar, ThemeSettings } from "./components";
import {
  Ecommerce,
  Stacked,
  Pyramid,
  Line,
  Area,
  Bar,
  Financial,
  Pie,
  ColorPicker,
  ColorMapping,
  Login,
} from "./pages";
import "./App.css";

import { useStateContext } from "./contexts/ContextProvider";

const App = () => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
    isloggedIn,
    checkAuthentication,
    setLogin
  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
    const token = localStorage.getItem("loginToken");
    if (token !== "false" && token !== "null" && token !== "undefined" && token !== undefined && token !== null && token !== false) {
        setLogin(token, "google")
    }
  }, []);

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <HashRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          {isloggedIn ? (
            <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
              <TooltipComponent content="Settings" position="Top">
                <button
                  type="button"
                  onClick={() => setThemeSettings(true)}
                  style={{ background: currentColor, borderRadius: "50%" }}
                  className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                >
                  <FiSettings />
                </button>
              </TooltipComponent>
            </div>
          ) : (
            ""
          )}

          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
                : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
            }
          >
            {isloggedIn ? (
              <div className="fixed bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                <Navbar />
              </div>
            ) : (
              ""
            )}
            <div>
              {themeSettings && <ThemeSettings />}

              <Routes>
                {/* dashboard  */}
                <Route
                  path="/Henon-Sample-Dashboard"
                  element={isloggedIn ? <Ecommerce /> : <Login />}
                />
                <Route
                  path="/"
                  element={<Navigate to="/Henon-Sample-Dashboard" />}
                />

                <Route
                  path="/ecommerce"
                  element={checkAuthentication(<Ecommerce />)}
                />

                {/* charts  */}
                <Route path="/line" element={checkAuthentication(<Line />)} />
                <Route path="/area" element={checkAuthentication(<Area />)} />
                <Route path="/bar" element={checkAuthentication(<Bar />)} />
                <Route path="/pie" element={checkAuthentication(<Pie />)} />
                <Route
                  path="/financial"
                  element={checkAuthentication(<Financial />)}
                />
                <Route
                  path="/color-mapping"
                  element={checkAuthentication(<ColorMapping />)}
                />
                <Route
                  path="/pyramid"
                  element={checkAuthentication(<Pyramid />)}
                />
                <Route
                  path="/stacked"
                  element={checkAuthentication(<Stacked />)}
                />
                <Route
                  path="/privacy-policy"
                  element={<Navigate to="/Henon-Sample-Dashboard" />}
                />
              </Routes>
            </div>
            <Footer />
          </div>
        </div>
      </HashRouter>
    </div>
  );
};

export default App;
