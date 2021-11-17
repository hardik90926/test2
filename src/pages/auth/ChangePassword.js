import React from "react";
import { withRouter } from "react-router";
import { useForm } from "react-hook-form";
import { Input } from "./../../components/Form/Input";
import { API_URLS } from "../../api/config";
import { apiClient } from "../../api/client";
import { STATUS } from "../../constant/common";
import { errorToast, successToast } from "../../utils/notifications";
import { changePasswordService } from "../../api/general";

const ChangePassword = ({ history }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const changePassword = async (data) => {
    changePasswordService(data)
      .then((message) => {
      successToast(message);
        history.push(`/`);
      })
      .catch((error) => {
        errorToast(error);
      });
  };

  return (
      <React.Fragment>

            {/* <!-- Reset Password page start--> */}
            <div className="authentication-main">
                  <div className="auth-innerright w-full">
                  <div className="card w-full">
                    <div className="page-header mb-10 ">
                        <div className="page-header-left row m-0">
                        <h3>
                        Change Password
                        </h3>
                      </div>
                    </div>
                    <div className="authentication-box w-full">
                      <div className="">
                        <form
                          onSubmit={handleSubmit(changePassword)}
                          className="theme-form"
                        >

                      <div className="grid grid-col-1 gap-5">
                          <Input
                            label={"Current Password"}
                            error={
                              errors.oldPassword && `Current Password is required`
                            }
                            {...register("oldPassword", { required: true })}
                            type="password"
                          />

                          <Input
                            label={"New Password"}
                            error={
                              errors.newPassword && `New Password is required`
                            }
                            {...register("newPassword", { required: true })}
                            type="password"
                          />
                          <Input
                            label={"Confirm New Password"}
                            error={errors.newPasswordConfirm?.message}
                            {...register("newPasswordConfirm", {
                              validate: (value) =>
                                value === watch("newPassword") ||
                                `Passwords do not match`,
                            })}
                            type="password"
                          />
                          </div>
                          <div className="form-group form-row mb-0 mt-5">
                            <div className="col-md-2">
                              <button className="btn btn-primary" type="submit">
                                Update
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                </div>
                </div>
            </div>
            {/* <!-- Reset Password page end--> */}
      </React.Fragment>
    );
};

export default withRouter(ChangePassword);
