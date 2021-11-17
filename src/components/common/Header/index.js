import React, { useState, Fragment } from "react";
import logo from "../../../assets/images/endless-logo.png";
import UserMenu from "./UserMenu";
import { Link } from "react-router-dom";
import { MoreHorizontal } from "react-feather";

const Header = () => {
  const [sidebar, setSidebar] = useState(false);
  const [headerbar, setHeaderbar] = useState(true);

  const openCloseSidebar = () => {
    let mainHeader = document.querySelector(".page-main-header");
    let mainSidebar = document.querySelector(".page-sidebar");
    setSidebar(!sidebar);
    if (sidebar) {
      mainHeader && mainHeader.classList.remove("open");
      mainSidebar && mainSidebar.classList.remove("open");
    } else {
      mainHeader && mainHeader.classList.add("open");
      mainSidebar && mainSidebar.classList.add("open");
    }
  };

  return (
    <Fragment>
      <div className="page-main-header relative">
        <div className="main-header-right row">
        {/* d-lg-none */}
          <div className="main-header-left">
            <div className="logo-wrapper">
              <Link to={`/`}>
                <img className="img-fluid" src={logo} alt="" />
              </Link>
            </div>
          </div>
          <div className={`mobile-sidebar d-block ${!sidebar ? "" : "open"}`}>
            <div className="media-body text-right switch-sm">
              <label className="switch m-0">
                <span className="cursor-pointer" onClick={openCloseSidebar}>
                  {/* <AlignLeft /> */}
                  {/* {"<"} */}
                  {/* <i className="fa fa-align-left"></i> */}
                  {sidebar ? <i className="fa fa-chevron-right"></i> : <i className="fa fa-chevron-left"></i>}
                </span>
              </label>
            </div>
          </div>
          <div className="nav-right col p-0">
            <ul className={`nav-menus ${headerbar ? "" : "open"}`}>
              <UserMenu />
            </ul>
            <div
              className="d-lg-none mobile-toggle pull-right"
              onClick={() => setHeaderbar(!headerbar)}
            >
              <MoreHorizontal />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default Header;
