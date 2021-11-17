import React, { Fragment } from "react";
import { Lock, LogOut, User } from "react-feather";
import { withRouter } from "react-router";
import { TOKEN_KEY } from "../../../api/config";
import { STORAGE_KEY } from "../../../constant/common";

const UserMenu = ({
  history
}) => {
  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem("USER");
    localStorage.removeItem("USER_ID");
    history.push(`/login`);
  };

  const storageUserData = localStorage.getItem(STORAGE_KEY.USER);
  const userData = storageUserData ? JSON.parse(storageUserData) : {};
  return <Fragment>
      <li className="onhover-dropdown mr-0 pull-right w-auto">
        <div className="media align-items-center ">
          <i className="fa fa-user-o"></i>
        </div>
        <ul className="profile-dropdown onhover-show-div p-20 profile-dropdown-hover">
          <li className="d-flex align-items-center profileInformationBlock">
            <div className="media align-items-center flex-shrink-0 mr-3">
              <i className="fa fa-user-o"></i>
            </div>
          <span className="profileInformation">{userData?.username || "@username"}</span>;</li>
          <li>
            <a href="/update-profile">
              <User />
              <span>Update Profile</span>
            </a>
          </li>
          <li>
            <a href="/change-password">
              <Lock />
              <span>Change Password</span>
            </a>
          </li>
          <li>
            <a href="/login" onClick={logout}>
              <LogOut />
              <span>Log out</span>
            </a>
          </li>
        </ul>
      </li>
    </Fragment>;
};

export default withRouter(UserMenu);