import React, { Fragment, useState, useEffect } from "react";
import { MENUITEMS,menuitems } from "./menu";
import { Link,useLocation } from "react-router-dom";
import configDB from "../../../data/customizer/config";
import { checkPermission } from "../../../api/general";
import { isMocking , formatLabel } from "../../../utils/utils";

const Sidebar = (props) => {
  const location = useLocation();
  const [margin, setMargin] = useState(0);
  const [width, setWidth] = useState(0);
  const [hideLeftArrowRTL, setHideLeftArrowRTL] = useState(true);
  const [hideRightArrowRTL, setHideRightArrowRTL] = useState(true);
  const [hideRightArrow, setHideRightArrow] = useState(true);
  const [hideLeftArrow, setHideLeftArrow] = useState(true);
  const [mainmenu, setMainMenu] = useState(MENUITEMS);
  const wrapper = configDB.data.settings.sidebar.wrapper;
  const layout = "ltr"; //useSelector(content => content.Customizer.layout);

  React.useEffect(() => {
    setMainMenu(
      isMocking ? menuitems
      : menuitems.filter(menuItem => checkPermission({
        modelName: menuItem.modelName
      }))
    )
  },[location.pathname])

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();

    const timeout = setTimeout(() => {
      const elmnt = document.getElementById("myDIV");
      const menuWidth = elmnt.offsetWidth;
      if (menuWidth > window.innerWidth) {
        setHideRightArrow(false);
        setHideLeftArrowRTL(false);
      } else {
        setHideRightArrow(true);
        setHideLeftArrowRTL(true);
      }
    }, 500);

    return () => {
      // eslint-disable-next-line
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeout);
    };
    // eslint-disable-next-line
  }, []);


  const handleResize = () => {
    setWidth(window.innerWidth - 310);
  };

  const isMenuActive = (item) => location.pathname.toLowerCase().startsWith(item.path.toLowerCase())

  // Click Toggle menu
  const toggletNavActive = (item) => {
    if (!item.active) {
      mainmenu.forEach((a) => {
        if (a.title === item.title) {
          a.active = true;
        } else {
          a.active = false;
        }
        if (!a.children) return false;
        a.children.forEach((b) => {
          if (a.children.includes(item)) {
            b.active = false;
          }
          if (!b.children) return false;
          b.children.forEach((c) => {
            if (b.children.includes(item)) {
              c.active = false;
            }
          });
        });
      });
    }
    // item.active = !item.active;
    setMainMenu(mainmenu);
  };

  const scrollToRight = () => {
    const elmnt = document.getElementById("myDIV");
    const menuWidth = elmnt.offsetWidth;
    const temp = menuWidth + margin;
    if (temp < menuWidth) {
      setMargin(-temp);
      setHideRightArrow(true);
    } else {
      setMargin((margin) => (margin += -width));
      setHideLeftArrow(false);
    }
  };

  const scrollToLeft = () => {
    // If Margin is reach between screen resolution
    if (margin >= -width) {
      setMargin(0);
      setHideLeftArrow(true);
    } else {
      setMargin((margin) => (margin += width));
      setHideRightArrow(false);
    }
  };

  const scrollToLeftRTL = () => {
    if (margin <= -width) {
      setMargin((margin) => (margin += -width));
      setHideLeftArrowRTL(true);
    } else {
      setMargin((margin) => (margin += -width));
      setHideRightArrowRTL(false);
    }
  };

  const scrollToRightRTL = () => {
    const temp = width + margin;
    // Checking condition for remaing margin
    if (temp === 0) {
      setMargin(temp);
      setHideRightArrowRTL(true);
    } else {
      setMargin((margin) => (margin += width));
      setHideRightArrowRTL(false);
      setHideLeftArrowRTL(false);
    }
  };

  return (
    <Fragment>
      <div className="page-sidebar">
        <div className="sidebar custom-scrollbar">
          <ul
            className="sidebar-menu"
            id="myDIV"
            style={
              wrapper === "horizontal_sidebar"
                ? layout === "rtl"
                  ? { marginRight: margin + "px" }
                  : { marginLeft: margin + "px" }
                : { margin: "0px" }
            }
          >
            <li
              className={`left-arrow ${
                layout === "rtl"
                  ? hideLeftArrowRTL
                    ? "d-none"
                    : ""
                  : hideLeftArrow
                  ? "d-none"
                  : ""
              }`}
              onClick={
                wrapper === "horizontal_sidebar" && layout === "rtl"
                  ? scrollToLeftRTL
                  : scrollToLeft
              }
            >
              <i className="fa fa-angle-left"></i>
            </li>
            {mainmenu?.map((menuItem, i) => (
              <li className={`${isMenuActive(menuItem) ? "active" : ""}`} key={i}>
                {menuItem.sidebartitle ? (
                  <div className="sidebar-title">{menuItem.sidebartitle}</div>
                ) : (
                  ""
                )}
                {menuItem.type === "sub" ? (
                  <a
                    className="sidebar-header"
                    href="#javascript"
                    onClick={() => toggletNavActive(menuItem)}
                  >
                    <menuItem.icon />
                    <span>{formatLabel(menuItem.title)}</span>
                    <i className="fa fa-angle-right pull-right"></i>
                  </a>
                ) : (
                  ""
                )}
                {menuItem.type === "link" ? (
                  <Link
                    to={`${menuItem.path}`}
                    className={`sidebar-header ${
                      isMenuActive(menuItem) ? "active" : ""
                    }`}
                    onClick={() => toggletNavActive(menuItem)}
                  >
                    <menuItem.icon />
                    <span>{formatLabel(menuItem.title)}</span>
                    {menuItem.children ? (
                      <i className="fa fa-angle-right pull-right"></i>
                    ) : (
                      ""
                    )}
                  </Link>
                ) : (
                  ""
                )}
                {menuItem.children ? (
                  <ul
                    className={`sidebar-submenu ${
                      isMenuActive(menuItem) ? "menu-open" : ""
                    }`}
                    style={
                      isMenuActive(menuItem)
                        ? { opacity: 1, transition: "opacity 500ms ease-in" }
                        : {}
                    }
                  >
                    {menuItem.children.map((childrenItem, index) => (
                      <li
                        key={index}
                        className={
                          childrenItem.children
                            ? childrenItem.active
                              ? "active"
                              : ""
                            : ""
                        }
                      >
                        {childrenItem.type === "sub" ? (
                          <a
                            href="#javascript"
                            onClick={() => toggletNavActive(childrenItem)}
                          >
                            <i className="fa fa-circle"></i>
                            {childrenItem.title}{" "}
                            <i className="fa fa-angle-right pull-right"></i>
                          </a>
                        ) : (
                          ""
                        )}

                        {childrenItem.type === "link" ? (
                          <Link
                            to={`${childrenItem.path}`}
                            className={childrenItem.active ? "active" : ""}
                            onClick={() => toggletNavActive(childrenItem)}
                          >
                            <i className="fa fa-circle"></i>
                            {childrenItem.title}{" "}
                          </Link>
                        ) : (
                          ""
                        )}
                        {childrenItem.children ? (
                          <ul
                            className={`sidebar-submenu ${
                              childrenItem.active ? "menu-open" : "active"
                            }`}
                          >
                            {childrenItem.children.map(
                              (childrenSubItem, key) => (
                                <li
                                  className={
                                    childrenSubItem.active ? "active" : ""
                                  }
                                  key={key}
                                >
                                  {childrenSubItem.type === "link" ? (
                                    <Link
                                      to={`${childrenSubItem.path}`}
                                      className={
                                        childrenSubItem.active ? "active" : ""
                                      }
                                      onClick={() =>
                                        toggletNavActive(childrenSubItem)
                                      }
                                    >
                                      <i className="fa fa-circle"></i>
                                      {childrenSubItem.title}
                                    </Link>
                                  ) : (
                                    ""
                                  )}
                                </li>
                              )
                            )}
                          </ul>
                        ) : (
                          ""
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  ""
                )}
              </li>
            ))}
            <li
              className={`right-arrow ${
                layout === "rtl"
                  ? hideRightArrowRTL
                    ? "d-none"
                    : ""
                  : hideRightArrow
                  ? "d-none"
                  : ""
              }`}
              onClick={
                wrapper === "horizontal_sidebar" && layout === "rtl"
                  ? scrollToRightRTL
                  : scrollToRight
              }
            >
              <i className="fa fa-angle-right"></i>
            </li>
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

export default Sidebar;
