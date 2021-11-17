import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/endless-logo.png";
import { useForm } from "react-hook-form";
import { apiClient } from "../../api/client";
import { API_URLS } from "../../api/config";
import { Input } from "./../../components/Form/Input";
import { STATUS } from "../../constant/common";
import { errorToast } from "../../utils/notifications";
import {  forgotPasswordService } from "../../api/general";

const ForgetPwd = ({ history }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    forgotPasswordService({ url: API_URLS.auth.forgotPassword, email:data.email })
      .then((res) => {
        history.push("/login");
      })
      .catch((err) => errorToast(err));
  };
  return (
    <Fragment>
      <div className="page-wrapper">
        <div className="container-fluid p-0">
          <div className="authentication-main authBox">
            <div className="row">
              <div className="col-md-12 p-0">
                <div className="auth-innerright">
                  <div className="authentication-box">
                    <div className="reset-password-box">
                      <div className="text-center">
                        <img src={logo} alt="" />
                      </div>
                      <div className="card mt-4 mb-0 px-0">
                        <div className="card-body">
                          <div className="text-center">
                            <h4>Reset Your Password</h4>
                            <h6>{"Enter your Email address"} </h6>
                          </div>
                          <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="theme-form grid grid-cols-1 gap-5"
                          >
                            <Input
                              label={"Enter your email address"}
                              placeholder="username@example.com"
                              className="form-control digits mb-1"
                              error={errors?.email && `Email address is required`}
                              {...register("email", { required: true })}
                              type="email"
                            />
                            <div className="row m-0 mt-4">
                              <div className="w-full">
                                <button
                                  type="submit"
                                  className="btn btn-primary m-0 w-full"
                                  onClick={handleSubmit(onSubmit)}

                                >
                                  Send link
                                </button>
                              </div>
                              <div className="flex justify-content-between w-full mt-2 align-items-center">
                                <div className="text-left">
                                  <span className="reset-password-link">
                                  Back to
                                  <Link
                                    className="btn-link text-primary cursor-pointer ml-1"
                                    to={`/login`}
                                  >
                                    Login
                                  </Link>
                                </span>
                                </div>

                              </div>
                            </div>
                          </form>
                          </div>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ForgetPwd;
