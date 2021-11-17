
import React from "react";
import logo from "../../assets/images/endless-logo.png";
import { withRouter } from "react-router";
import { useForm } from "react-hook-form";
import { Input } from "./../../components/Form/Input";
import { apiClient } from "../../api/client";
import { API_URLS, TOKEN_KEY } from "../../api/config";
import { STORAGE_KEY } from "./../../constant/common";
import { errorToast, successToast } from "../../utils/notifications";
import { isMocking } from "../../utils/utils";
import { filterPermission } from "../../components/common/Sidebar/menu";
import { loginService } from "../../api/general";

const Logins = ({ history }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

const loginAuth = (data) => {
    loginService(data?.username, data?.password)
      .then(({ token, user ,roleAccess }) => {
        localStorage.setItem(STORAGE_KEY.ROLE_ACCESS,JSON.stringify(roleAccess))
        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem(STORAGE_KEY.USER_ID, user.id);
        localStorage.setItem(STORAGE_KEY.USER, JSON.stringify(user));
        successToast("Login Successful");
        const data = filterPermission()
        history.push(`${data[0]?.path}`);
      })
      .catch((error) => {
        errorToast(error);
      });
  };

  return (
    <div>
      <div className="page-wrapper">
        <div className="container-fluid p-0">
          {/* <!-- login page start--> */}
          <div className="authentication-main authBox">
            <div className="auth-innerright">
              <div className="authentication-box">
                <div className="text-center">
                  <img src={logo} alt="" />
                </div>
                <div className="card mt-4">
                  <div className="card-body">
                    <div className="text-center">
                      <h4>LOGIN</h4>
                      <h6>{"Enter your Username and Password"} </h6>
                    </div>
                    <form
                      onSubmit={handleSubmit(loginAuth)}
                      className="theme-form grid grid-cols-1 gap-5"
                    >
                      <Input
                        label={"Username / Email"}
                        error={
                          errors.username && "Username / Email is required."
                        }
                        {...register("username", { required: true })}
                      />
                      <Input
                        label={"Password"}
                        error={errors.password && "Password is required."}
                        type="password"
                        {...register("password", { required: true })}
                      />
                      <div className="checkbox p-0">
                        <input
                          {...register("remember")}
                          id="checkbox1"
                          type="checkbox"
                        />
                        <label htmlFor="checkbox1">Remember Me</label>
                        <a className="pull-right" href="/forgot-password">
                          Forgot Password?
                        </a>
                      </div>
                      <div className="form-group form-row mt-3 mb-0">
                        <button
                          className="btn btn-primary btn-block"
                          type="submit"
                        >
                          Login
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- login page end--> */}
        </div>
      </div>
    </div>
  );
};

export default withRouter(Logins);

	