import React, { useContext } from "react";
import { LayoutContext } from "./context/layoutcontext";
const AppConfig = (props) => {
  const { layoutConfig, setLayoutConfig } =
    useContext(LayoutContext);
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

      const element = document.getElementById(id); // re-check
      element && element.remove();

      cloneLinkElement.setAttribute("id", id);
      onComplete && onComplete();
    });
  };

  

  
  return (
    <>
        <div className="grid mt-2 gap-3">
          <div className="col-3">
            <button
              className="p-link w-1rem h-1rem"
              onClick={() => changeTheme("md-light-deeppurple", "light")}
            >
              <img
                src="./layout/images/themes/md-light-deeppurple.svg"
                className="w-1rem h-1rem"
                alt="Material Light DeepPurple"
              />
            </button>
          </div>
          <div className="col-3">
            <button
              className="p-link w-1rem h-1rem"
              onClick={() => changeTheme("md-dark-indigo", "dark")}
            >
              <img
                src="./layout/images/themes/md-dark-indigo.svg"
                className="w-1rem h-1rem"
                alt="Material Dark Indigo"
              />
            </button>
          </div>
        </div>

    
    </>
  );
};

export default AppConfig;
