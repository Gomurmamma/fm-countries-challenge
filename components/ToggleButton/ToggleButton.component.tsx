import React from "react";
import style from "./ToggleButton.module.scss";
import { BsMoon, BsFillMoonFill } from "react-icons/bs";
import { useState, useEffect } from "react";

const ToggleButton: React.FC = () => {
  const [activeTheme, setActiveTheme] = useState(document.body.dataset.theme);
  console.log(activeTheme);
  const inactiveTheme =
    activeTheme === "light" || activeTheme === undefined ? "dark" : "light";
  console.log(inactiveTheme);

  // Set activeTheme on the body element via document obj
  useEffect(() => {
    document.body.dataset.theme = activeTheme;
    window.localStorage.setItem("theme", activeTheme);
  }, [activeTheme]);

  return (
    <button
      aria-label={`Change to ${inactiveTheme} mode`}
      title={`Change to ${inactiveTheme} mode`}
      type="button"
      className={style.togglebutton}
      onClick={() => setActiveTheme(inactiveTheme)}
    >
      {activeTheme === "light" || activeTheme === undefined ? (
        <>
          <BsMoon aria-hidden={true} />
          <span className={style.togglebutton__text}> Light Mode</span>
        </>
      ) : (
        <>
          {" "}
          <BsFillMoonFill aria-hidden={true} />{" "}
          <span className={style.togglebutton__text}> Dark Mode</span>
        </>
      )}
    </button>
  );
};

export default ToggleButton;
