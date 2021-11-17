import React from 'react';
import UserSchema from "./pages/User/User.schema.json";
import UserDetails from "./pages/User/UserDetails";
import UserContainer from "./pages/User/UserContainer";
import VerifyOtp from "./pages/auth/VerifyOtp";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import Error400 from './pages/errors/error400';
import Dashboard from './pages/Dashboard';
import UpdateProfile from './pages/auth/UpdateProfile';
import ChangePassword from './pages/auth/ChangePassword';
import App from './components/app';
import { MENUITEMS } from './components/common/Sidebar/menu';
import { isMocking } from "./utils/utils";

const Router = () => {
  return <BrowserRouter basename={`/`}>
    <Switch>
      <Route path={`/login`} component={Login} />
      <Route path={`/signup`} component={Signup} />
      <Route path={`/forgot-password`} component={ForgotPassword} />
      <Route path={`/reset-password/:tokenId`} component={ResetPassword} />
      <Route path={`/errors/error400`} component={Error400} />
      <App>
        <Route exact path="/" render={() => isMocking ? <Redirect to={`${MENUITEMS[0]?.path}`} /> : null} />
        <Route path={`/update-profile`} component={UpdateProfile} />
        <Route path={`/change-password`} component={ChangePassword} />
      <Route exact path="/User" component={UserContainer} /><Route path="/User/:id" render={props => <UserDetails {...props} modelName={"user"} />} /></App>
    </Switch>
  </BrowserRouter>;
};

export default Router;