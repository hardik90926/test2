import React, { Fragment, useState, useEffect } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { successToast } from "../../utils/notifications";
const configDBData = {
  settings: {
    layout_type: "ltr",
    sidebar: {
      wrapper: "default",
      bodyWrapper: "default"
    },
    sidebar_setting: "default-sidebar",
    sidebar_backround: "dark-sidebar"
  },
  color: {
    layout_version: "light",
    color: "color-1",
    primary_color: "#4466f2",
    secondary_color: "#1ea6ec",
    mix_layout: "light"
  },
  router_animation: "fadeIn"
};

const ThemeCustomizer = () => {
  const sidebar_type = localStorage.getItem("wrapper");
  const body_sidebar_type = localStorage.getItem("bodyWrapper");
  const [modal, setModal] = useState();
  const [rightSidebar, setRightSidebar] = useState(true);
  const [activeTab1, setActiveTab1] = useState("1");
  const configDB = configDBData; //useSelector(content => content.Customizer.customizer);

  const mix_layout = configDB.color.mix_layout;
  const [layout_type, setLayout_type] = useState(configDB.settings.layout_type);
  const config_primary = configDB.color.primary_color;
  const config_secondary = configDB.color.secondary_color;
  const config_color = configDB.color.color;
  const config_layout_version = configDB.color.layout_version;
  configDB.settings.sidebar.wrapper = sidebar_type;
  configDB.settings.sidebar.bodyWrapper = body_sidebar_type;
  useEffect(() => {
    //set layout_type
    document.body.setAttribute("main-theme-layout", layout_type);
    document.documentElement.dir = layout_type; //set sidebar wrapper

    if (sidebar_type === null && body_sidebar_type === null) {
      document.querySelector(".page-wrapper").className = "page-wrapper " + configDB.settings.sidebar.wrapper;
      document.querySelector(".page-body-wrapper").className = "page-body-wrapper " + configDB.settings.sidebar.bodyWrapper;
    } else {
      document.querySelector(".page-wrapper").className = "page-wrapper " + sidebar_type;
      document.querySelector(".page-body-wrapper").className = "page-body-wrapper " + body_sidebar_type;
    } //set sidebar setting


    document.querySelector(".page-sidebar").setAttribute("sidebar-layout", configDB.settings.sidebar_setting); //set colors

    document.body.className = mix_layout;

    if (localStorage.getItem("primary_color") == null || localStorage.getItem("secondary_color") == null || localStorage.getItem("color") == null || localStorage.getItem("layout_version") == null) {
      document.documentElement.className = config_color;
      localStorage.setItem("primary_color", config_primary);
      localStorage.setItem("secondary_color", config_secondary);
      localStorage.setItem("color", config_color);
      localStorage.setItem("layout_version", config_layout_version);
    }

    if (sidebar_type === "compact-wrapper" || configDB.settings.sidebar.wrapper === "compact-wrapper") {
      document.querySelector(".compactLogo").className = "compactLogo show";
    } else {
      document.querySelector(".compactLogo").className = "compactLogo hide";
    } // eslint-disable-next-line

  }, []);

  const toggle = () => {
    setModal(!modal);
  };

  const openCustomizer = () => {
    if (rightSidebar) {
      document.querySelector(".customizer-contain").classList.add("open");
      document.querySelector(".customizer-links").classList.add("open");
    } else {
      document.querySelector(".customizer-contain").classList.remove("open");
      document.querySelector(".customizer-links").classList.remove("open");
    }

    setRightSidebar(!rightSidebar);
  };

  const closeCustomizer = () => {
    setRightSidebar(!rightSidebar);
    document.querySelector(".customizer-contain").classList.remove("open");
    document.querySelector(".customizer-links").classList.remove("open");
  };

  const handleLayout = layout => {
    setLayout_type(layout);
    document.querySelectorAll(".main-layout li").forEach(item => {
      item.classList.remove("active");
    });
    document.body.setAttribute("main-theme-layout", layout);
    document.documentElement.dir = layout;
  };

  const handleSidebarSetting = e => {
    e.preventDefault();
    document.querySelectorAll(".sidebar-setting li").forEach(item => {
      item.classList.remove("active");
    });
    document.querySelector(".page-sidebar").setAttribute("sidebar-layout", e.currentTarget.getAttribute("data-attr"));
    e.currentTarget.classList.add("active");
  };

  const handleSidebarType = (e, wrapper, bodyWrapper) => {
    e.preventDefault();
    document.querySelectorAll(".sidebar-type li").forEach(item => {
      item.classList.remove("active");
    });
    document.querySelector(".page-wrapper").className = "page-wrapper " + wrapper;
    document.querySelector(".page-body-wrapper").className = "page-body-wrapper " + bodyWrapper;
    e.currentTarget.classList.add("active");
    localStorage.setItem("wrapper", wrapper);
    localStorage.setItem("bodyWrapper", bodyWrapper);
    window.location.reload();
  };

  return <Fragment>
      <div className="customizer-links">
        <div className="nav flex-column nac-pills" id="c-pills-tab" role="tablist" aria-orientation="vertical">
          <Nav tabs className="tab-list-bottom border-tab-primary">
            <NavItem className="nav nav-tabs" id="myTab" role="tablist">
              {
              /* eslint-disable-next-line */
            }
              <NavLink className={activeTab1 === "1" ? "active" : ""} onClick={() => setActiveTab1("1")}>
                <div className="settings">
                  <i className="fa fa-gear" onClick={openCustomizer}></i>
                </div>
              </NavLink>
            </NavItem>
          </Nav>
        </div>
      </div>
      <div className="customizer-contain">
        <div className="tab-content" id="c-pills-tabContent">
          <div className="customizer-header">
            <i className="fa fa-close icon-close" onClick={closeCustomizer}></i>
            <h5>Customizer</h5>
            <p className="mb-0">Customize &amp; Preview Real Time</p>
            <button className="btn btn-primary plus-popup mt-2 " onClick={() => setModal(!modal)}>
              Configuration
            </button>
            <Modal isOpen={modal} toggle={toggle} className="modal-body" centered={true}>
              <ModalHeader toggle={toggle}>Modal Title</ModalHeader>
              <ModalBody>
                <div className="container-fluid bd-example-row">
                  <div className="row">
                    <p>
                      {"To replace our design with your desired theme. Please do configuration as mention"}{" "}
                    </p>
                    <p>
                      {" "}
                      <b> {"Path : data > customizer > config.js"} </b>{" "}
                    </p>
                  </div>
                  <pre>
                    <code>
                      <div> {"export class ConfigDB"} &#123;</div>
                      <div> {"static data ="} &#123;</div>
                      <div> {"settings"}&#58; &#123;</div>
                      <div>
                        {" "}
                        {"layout_type"}&#58; '{configDB.settings.layout_type}',
                      </div>

                      <div> {"sidebar"}&#58; &#123;</div>
                      <div>
                        {" "}
                        {"type"}&#58; '{configDB.settings.sidebar.wrapper}',
                      </div>
                      <div>
                        {" "}
                        {"body_type"}&#58; '
                        {configDB.settings.sidebar.bodyWrapper}'{" "}
                      </div>
                      <div> &#125;,</div>
                      <div>
                        {" "}
                        {"sidebar_setting"}&#58; '
                        {configDB.settings.sidebar_setting}',{" "}
                      </div>
                      <div>
                        {" "}
                        {"sidebar_backround"}&#58; '
                        {configDB.settings.sidebar_backround}'{" "}
                      </div>
                      <div> &#125;,</div>
                      <div> {"color"}&#58; &#123;</div>
                      <div>
                        {" "}
                        {"layout_version"}&#58; '{configDB.color.layout_version}
                        ',{" "}
                      </div>
                      <div>
                        {" "}
                        {"color"}&#58; '{configDB.color.color}',{" "}
                      </div>
                      <div>
                        {" "}
                        {"primary_color"}&#58; '{configDB.color.primary_color}',{" "}
                      </div>
                      <div>
                        {" "}
                        {"secondary_color"}&#58; '
                        {configDB.color.secondary_color}',{" "}
                      </div>
                      <div>
                        {" "}
                        {"mix_layout"}&#58; '{configDB.color.mix_layout}'{" "}
                      </div>
                      <div> &#125;,</div>
                      <div>
                        {" "}
                        {"router_animation"}&#58; {"'fadeIn'"}
                      </div>
                      <div> &#125;</div>
                      <div> &#125;</div>
                    </code>
                  </pre>
                </div>
              </ModalBody>
              <ModalFooter>
                <CopyToClipboard text={JSON.stringify(configDB)}>
                  <button className="btn btn-primary notification" onClick={() => successToast("Code Copied to clipboard !")}>
                    Copy Text
                  </button>
                </CopyToClipboard>
                <Button color="secondary" onClick={toggle}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </div>
          <div className="customizer-body custom-scrollbar">
            <TabContent activeTab={activeTab1}>
              <TabPane tabId="1">
                <h6>Layout Type</h6>
                <ul className="main-layout layout-grid">
                  <li data-attr="ltr" className={`${layout_type === "ltr" ? "active" : ""}`} onClick={() => handleLayout("ltr")}>
                    <div className="header bg-light">
                      <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                      </ul>
                    </div>
                    <div className="body">
                      <ul>
                        <li className="bg-dark sidebar"></li>
                        <li className="bg-light body">
                          <span className="badge badge-dark">LTR Layout</span>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li data-attr="rtl" className={`${layout_type === "rtl" ? "active" : ""}`} onClick={() => handleLayout("rtl")}>
                    <div className="header bg-light">
                      <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                      </ul>
                    </div>
                    <div className="body">
                      <ul>
                        <li className="bg-light body">
                          <span className="badge badge-dark">RTL Layout</span>
                        </li>
                        <li className="bg-dark sidebar"></li>
                      </ul>
                    </div>
                  </li>
                </ul>
                <h6 className="">Sidebar Type</h6>
                <ul className="sidebar-type layout-grid">
                  <li data-attr="normal-sidebar" className="active" onClick={e => handleSidebarType(e, "default", "default")}>
                    <div className="header bg-light">
                      <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                      </ul>
                    </div>
                    <div className="body">
                      <ul>
                        <li className="bg-dark sidebar"></li>
                        <li className="bg-light body"></li>
                      </ul>
                    </div>
                  </li>
                  <li data-attr="compact-sidebar" onClick={e => handleSidebarType(e, "compact-wrapper", "sidebar-icon")}>
                    <div className="header bg-light">
                      <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                      </ul>
                    </div>
                    <div className="body">
                      <ul>
                        <li className="bg-dark sidebar compact"></li>
                        <li className="bg-light body"></li>
                      </ul>
                    </div>
                  </li>
                  <li data-attr="compact-icon-sidebar" onClick={e => handleSidebarType(e, "compact-page", "sidebar-hover")}>
                    <div className="header bg-light">
                      <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                      </ul>
                    </div>
                    <div className="body">
                      <ul>
                        <li className="bg-dark sidebar compact-icon"></li>
                        <li className="bg-light body"> </li>
                      </ul>
                    </div>
                  </li>
                  <li data-attr="horizontal_sidebar" className="horizontal_sidebar" onClick={e => handleSidebarType(e, "horizontal_sidebar", "")}>
                    <div className="header bg-light">
                      <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                      </ul>
                    </div>
                    <div className="body">
                      <ul>
                        <li className="bg-dark sidebar horizontal-menu"></li>
                        <li className="bg-light body"> </li>
                      </ul>
                    </div>
                  </li>
                </ul>
                <h6 className="">Sidebar Settings</h6>
                <ul className="sidebar-setting layout-grid">
                  <li className="active" data-attr="default-sidebar" onClick={handleSidebarSetting}>
                    <div className="header bg-light">
                      <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                      </ul>
                    </div>
                    <div className="body bg-light">
                      <span className="badge badge-dark">Default</span>
                    </div>
                  </li>
                  <li data-attr="border-sidebar" onClick={handleSidebarSetting}>
                    <div className="header bg-light">
                      <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                      </ul>
                    </div>
                    <div className="body bg-light">
                      <span className="badge badge-dark">Border</span>
                    </div>
                  </li>
                  <li data-attr="iconcolor-sidebar" onClick={handleSidebarSetting}>
                    <div className="header bg-light">
                      <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                      </ul>
                    </div>
                    <div className="body bg-light">
                      <span className="badge badge-dark">icon Color</span>
                    </div>
                  </li>
                </ul>
              </TabPane>
            </TabContent>
          </div>
        </div>
      </div>
    </Fragment>;
};

export default ThemeCustomizer;