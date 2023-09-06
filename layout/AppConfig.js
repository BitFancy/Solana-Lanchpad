import { Sidebar } from "primereact/sidebar";
import React, { useContext, useEffect, useState } from "react";
import { LayoutContext } from "./context/layoutcontext";

const AppConfig = (props) => {
  const [scales] = useState([12, 13, 14, 15, 16]);
  const { layoutConfig, setLayoutConfig, layoutState, setLayoutState } =
    useContext(LayoutContext);

  const onConfigButtonClick = () => {
    setLayoutState((prevState) => ({
      ...prevState,
      configSidebarVisible: true,
    }));
  };

  const onConfigSidebarHide = () => {
    setLayoutState((prevState) => ({
      ...prevState,
      configSidebarVisible: false,
    }));
  };

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

  

  const applyScale = () => {
    document.documentElement.style.fontSize = layoutConfig.scale + "px";
  };

  useEffect(() => {
    applyScale();
  }, [layoutConfig.scale]);

  return (
    <>
      <button
      style={{width:'45px',height:'45px',background:'none'}}
        type="button"
        onClick={onConfigButtonClick}
      >
        <svg 
        style={{color:'white'}}
         
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
         
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      </button>

      <Sidebar
        visible={layoutState.configSidebarVisible}
        onHide={onConfigSidebarHide}
        position="right"
        className="layout-config-sidebar w-20rem"
      >
        <div className="grid mt-5">
          <div className="col-3">
            <button
              className="p-link w-2rem h-2rem"
              onClick={() => changeTheme("md-light-deeppurple", "light")}
            >
              <img
                src="./layout/images/themes/md-light-deeppurple.svg"
                className="w-2rem h-2rem"
                alt="Material Light DeepPurple"
              />
            </button>
          </div>
          <div className="col-3">
            <button
              className="p-link w-2rem h-2rem"
              onClick={() => changeTheme("md-dark-indigo", "dark")}
            >
              <img
                src="./layout/images/themes/md-dark-indigo.svg"
                className="w-2rem h-2rem"
                alt="Material Dark Indigo"
              />
            </button>
          </div>
        </div>

      </Sidebar>
    </>
  );
};

export default AppConfig;
