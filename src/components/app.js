import React, { Fragment } from "react";
import { withRouter } from "react-router";
import Header from "./common/Header";
import Sidebar from "./common/Sidebar/sidebar";
// import ThemeCustomizer from "./common/ThemeCustomizer";
import { TOKEN_KEY } from "../api/config";
import { isMocking } from "../utils/utils";
import ConfigDB from "../data/customizer/config";

const AppLayout = ({ history, ...props }) => {
  React.useEffect(() => {

    const config_primary = ConfigDB.data.color.primary_color;
    const config_secondary = ConfigDB.data.color.secondary_color;
    const config_color = ConfigDB.data.color.color;
    const config_layout_version = ConfigDB.data.color.layout_version;

    if (
      localStorage.getItem("primary_color") == null ||
      localStorage.getItem("secondary_color") == null ||
      localStorage.getItem("color") == null ||
      localStorage.getItem("layout_version") == null
    ) {
      document.documentElement.className = config_color;
      localStorage.setItem("primary_color", config_primary);
      localStorage.setItem("secondary_color", config_secondary);
      localStorage.setItem("color", config_color);
      localStorage.setItem("layout_version", config_layout_version);
    }

    const hasToken = localStorage.getItem(TOKEN_KEY);
    if (!hasToken && !isMocking ) {
      history.push("/login");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <div className="page-wrapper d-flex flex-column">
          <Header />
          <div className="page-body-wrapper d-flex flex-row">
            <Sidebar />
            <div className="page-body">{props.children}</div>
            {/* <ThemeCustomizer /> */}
          </div>
      </div>
    </Fragment>
  );
};

export default withRouter(AppLayout);
