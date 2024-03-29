import React, { useContext } from "react";
import { LayoutContext } from "./context/layoutcontext";
const AppConfig = () => {
  const { layoutConfig, setLayoutConfig } = useContext(LayoutContext);

  const changeTheme = (theme, colorScheme) => {
    const themeLink = document.getElementById("theme-css");
    const themeHref = themeLink ? themeLink.getAttribute("href") : null;
    const newHref = themeHref
      ? themeHref.replace(layoutConfig.theme, theme)
      : null;

    replaceLink(themeLink, newHref, () => {
      setLayoutConfig((prevState) => ({ ...prevState, theme, colorScheme }));
    });
  };

  const replaceLink = (linkElement, href, onComplete) => {
    if (!linkElement || !href) {
      return;
    }

    const id = linkElement.getAttribute("id");
    const cloneLinkElement = linkElement.cloneNode(true);

    cloneLinkElement.setAttribute("href", href);
    cloneLinkElement.setAttribute("id", id + "-clone");

    linkElement.parentNode.insertBefore(
      cloneLinkElement,
      linkElement.nextSibling
    );

    cloneLinkElement.addEventListener("load", () => {
      linkElement.remove();

      const element = document.getElementById(id);
      element && element.remove();

      cloneLinkElement.setAttribute("id", id);
      onComplete && onComplete();
    });
  };

  return (
    <>
      <div className="grid gap-3">
        {layoutConfig.colorScheme === "light" ? (
          <svg
            onClick={() => changeTheme("md-dark-indigo", "dark")}
            color="#c4afaf"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 30"
            stroke="currentColor"
            className="cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        ) : (
          <svg
            color="#c4afaf"
            onClick={() => changeTheme("md-light-deeppurple", "light")}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 30"
            stroke="currentColor"
            className="cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        )}
      </div>
    </>
  );
};

export default AppConfig;
