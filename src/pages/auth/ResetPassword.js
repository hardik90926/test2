import React, { Fragment } from "react";
import { API_URLS } from "../../api/config";
import logo from "../../assets/images/endless-logo.png";
import { apiClient } from "../../api/client";
import { useForm } from "react-hook-form";
import { Input } from "./../../components/Form/Input";
import { STATUS } from "../../constant/common";
import { errorToast, successToast } from "../../utils/notifications";
import { useParams } from "react-router";
import { resetPasswordService } from "../../api/general";

const ResetPassword = ({ history }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const query = useParams();
  const onSubmit = async (data) => {
    delete data.newPasswordConfirm;
    data.code = query.tokenId;
    resetPasswordService(data)
      .then((res) => {
        successToast(res);
        history.push("/login");
      })
      .catch((err) => errorToast(err));
  };

  return (
    <Fragment>
      <div className="page-wrapper">
        <div className="container-fluid">
          {/* <!-- Verify Otp page start--> */}
          <div className="authentication-main">
            <div className="row">
              <div className="col-md-12 p-0">
                <div className="auth-innerright">
                  <div className="authentication-box">
                    <div className="text-center">
                      <img src={logo} alt="" />
                    </div>
                    <div className="card mt-4 p-4">
                      <form
                        className="theme-form"
                        onSubmit={handleSubmit(onSubmit)}
                      >
                        <h5 className="f-16 mb-3 f-w-600">Change Password</h5>

                        <div className="form-group">
                          <label className="col-form-label">New Password</label>
                          <Input
                            {...register("newPassword", { required: true })}
                            error={errors.newPassword?.message}
                            className="form-control"
                            type="password"
                            placeholder="*****"
                          />
                        </div>
                        <div className="form-group">
                          <label className="col-form-label">
                            Retype password
                          </label>
                          <Input
                            {...register("newPasswordConfirm", {
                              validate: (value) =>
                                value === watch("newPassword") ||
                                `Passwords do not match`,
                            })}
                            error={errors.newPasswordConfirm?.message}
                            className="form-control"
                            type="password"
                            placeholder="*****"
                          />
                        </div>
                        <div className="form-group form-row mb-0">
                          <div className="col-md-2">
                            <button className="btn btn-primary" type="submit">
                              Submit
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Verify Otp page end--> */}
        </div>
      </div>
    </Fragment>
  );
};

export default ResetPassword;
