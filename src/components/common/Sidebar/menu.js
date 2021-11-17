import { Home } from "react-feather";
import { STORAGE_KEY } from "../../../constant/common";
import { isMocking } from "../../../utils/utils";
;
export const menuitems = [{
  title: "User",
  icon: Home,
  type: "link",
  path: "/User",
  badgeType: "primary",
  active: true,
  modelName: "user"
}];
export const filterPermission = () => {
  const rolePermissionObj = JSON.parse(localStorage.getItem(STORAGE_KEY.ROLE_ACCESS)) || {};
  const permissions = Object.keys(rolePermissionObj) || [];
  return menuitems.filter(item => permissions.includes(item.modelName) && rolePermissionObj[item.modelName].length > 0) || [];
};
export const MENUITEMS = isMocking ? menuitems : filterPermission();