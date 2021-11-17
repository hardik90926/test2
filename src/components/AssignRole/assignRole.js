import React from "react";
import { Popup } from "./index";
import Select from "react-select";
import {
    assignRoleService,
    getUserRoleService,
    getRoles as getRolesOptions,
    removeUserRole
} from "../../api/general";

export const AssignRolePopUp = ({
    isOpen,
    handleClose,
    popupTitle,
    currentRecord
}) => {
    const [role, setRole] = React.useState(undefined);
    const [roles, setRoles] = React.useState([]);
    const [userRoles, setUserRoles] = React.useState([]);

    function fetchUserRoles() {
        getUserRoleService(currentRecord).then(setUserRoles);
    }

    React.useEffect(() => {
        if (isOpen) {
            fetchUserRoles()
            getRolesOptions().then(setRoles);
        }
    }, [isOpen])

    const onSubmit = () => {
        assignRoleService({ currentRecord, roleId: role.id }).then(() => {
            fetchUserRoles();
            setRole("");
        });
    };

    const handleDelete = data => removeUserRole(data).then(fetchUserRoles);

    const rolesOptions = React.useMemo(() => {
        let assignedRoles = userRoles?.map(userRole => userRole.roleId.id);
        return [...roles].map(role => ({
            ...role,
            isDisabled: assignedRoles.includes(role.id)
        }));
    }, [userRoles, roles]);

    return (
        <Popup
            handleCancel={() => handleClose()}
            CloseIcon={() => handleClose()}
            handleSubmit={onSubmit}
            isOpen={isOpen}
            popupbody="tagPopup"
            popupTitle={popupTitle}
            children={
                <div className="p-3">
                    <div className="d-flex justify-between">
                        <div className="flex-grow-1">
                            <Select
                                options={rolesOptions}
                                value={role}
                                onChange={setRole}
                                getOptionLabel={option => option.name}
                                getOptionValue={option => option.id}
                            />
                        </div>
                        <button className="btn btn-primary flex-shrink-0 ml-2" onClick={onSubmit}>Add</button>
                    </div>
                    <div className="d-flex flex-wrap align-center mt-3">
                        {userRoles?.map(userRole => {
                            return <>
                                <div className="listBox d-flex">
                                    <span>{userRole.roleId.name}</span>
                                    <div className="listBoxClose" onClick={() => handleDelete(userRole)}>
                                        <svg fill="#232323" width="80%" height="80%" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" class="m-auto" viewBox="0 0 24 24"><g id="Layer_4"><path d="M13.909,12.001l8.918-8.92c0.526-0.526,0.526-1.383,0-1.909c-0.243-0.244-0.592-0.384-0.954-0.384s-0.711,0.14-0.954,0.384 L12,10.091L3.082,1.172C2.837,0.928,2.49,0.788,2.127,0.788s-0.71,0.14-0.955,0.384c-0.526,0.526-0.526,1.383,0,1.909l8.918,8.92 l-8.918,8.92c-0.526,0.526-0.526,1.382,0,1.908c0.244,0.244,0.592,0.384,0.955,0.384s0.71-0.14,0.955-0.384L12,13.91l8.919,8.919 c0.255,0.256,0.594,0.396,0.954,0.396s0.699-0.14,0.954-0.396c0.526-0.526,0.526-1.382,0-1.908L13.909,12.001z"></path></g><g id="Layer_2"></g></svg>
                                    </div>
                                </div>
                            </>
                        })}
                    </div>

                </div>
            }>
        </Popup>
    );
};
