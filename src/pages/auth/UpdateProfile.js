import React from "react";
import { withRouter } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import ThemedForm from "@dhiwise/core-ui";
import Button from "../../components/common/Button";
import AuthModelSchema from "./Auth.schema.json";
import { STORAGE_KEY } from "../../constant/common";
import { updateProfileService } from "../../api/general";

const UpdateProfile = () => {
  const formRef = React.createRef();

  const [loggedUser, setLoggedUser] = React.useState({});

  React.useEffect(() => {
    const userStr = localStorage.getItem(STORAGE_KEY.USER);
    if (userStr && userStr !== "") {
      setLoggedUser(JSON.parse(userStr));
    }
  }, []);

  const updateProfile = async data => {
    updateProfileService(data)
      .then(data => {
        if (data) {
          setLoggedUser({ ...data });
          localStorage.setItem(STORAGE_KEY.USER, JSON.stringify(data));
        }
        toast.success("Update Profile Successfully!!!");
      })
      .catch(err => toast.error("Update Profile Failed!!!"));
  };

  AuthModelSchema.attributes =
    AuthModelSchema.actions.find(action => action.category === "addEdit")
      ?.attributes || [];

  return (
    <React.Fragment>
      {/* <!-- Reset Password page start--> */}
      <div className="authentication-main">
        <div className="auth-innerright w-full">
          <div className="card w-full">
            <div className="page-header mb-10 ">
              <div className="page-header-left row m-0">
                <h3>Update Profile</h3>
              </div>
            </div>
            {/* <h5 className="f-16 mb-3 f-w-600"> Update Profile</h5> */}

            <div
              className="drawerBody"
              //   style={{ height: "calc(100vh - 129px)" }}
            >
              <ThemedForm
                formRef={formRef}
                onSubmit={updateProfile}
                defaultValues={loggedUser}
                schema={{
                  attributes: AuthModelSchema.attributes.filter(
                    attr => attr.attrName.toLowerCase() !== "password"
                  ),
                  screenLayout: AuthModelSchema.screenLayout,
                  databaseType: process.env.REACT_APP_DATABASE_TYPE
                }}
              />
            </div>
            <div className="py-3 px-4 drawerFooter">
              <Button
                className="ml-2"
                onClick={() => formRef.current.submit()}
                type="button"
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Reset Password page end--> */}
    </React.Fragment>
  );
};

export default withRouter(UpdateProfile);
