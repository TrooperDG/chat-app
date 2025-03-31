import React, { useState } from "react";

function ThemeChanger() {
  const htmlElement = document.querySelector("html");
  const [theme, setTheme] = useState(htmlElement.getAttribute("data-theme"));

  function handleClick() {
    if (theme === "dark") {
      htmlElement.setAttribute("data-theme", "light");
      setTheme("light");
    } else {
      htmlElement.setAttribute("data-theme", "dark");
      setTheme("dark");
    }
  }
  return (
    <div>
      <button onClick={handleClick} className="btn btn-outline">
        {theme === "dark" ? "Light" : "Dark"}
      </button>
    </div>
  );
}

export default ThemeChanger;
