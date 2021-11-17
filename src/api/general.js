
  import { STORAGE_KEY, FILTER_TYPES, STATUS } from "../constant/common";
  import { apiClient } from "./client";
  import { API_URLS, UPLOAD_URL } from "./config";
  
  export const loadOptions = async (data, inpuValue, callBack) => {
    if (inpuValue?.trim()?.length >= 1) {
      let res;
      try {
        res = await apiClient({
          url: API_URLS[data.ref].list,
          data: {
            query: {
              [data.displayAttribute]: { $regex: inpuValue.trim() },
              isActive: true,
              isDeleted: false,
            },
          },
        });
        callBack(res?.data?.data || []);
      } catch (error) {
        console.log('error: ', error);
        callBack([])
      }
    } else {
      callBack([]);
    }
  };
  
  export const handleUpload = (fileList, setImages) => {
  
    apiClient({
      url: UPLOAD_URL,
      data: fileList,
      noHeaders: true,
    })
      .then((data) => {
        if (data?.data) {
          setImages(data?.data?.map(img => process.env.REACT_APP_SERVICE_URL+img?.path));
        }
      }).catch(err => console.log(err));
  
  };

  export const getSchemaOptions = (schema, sortBy) => {
    const queryObj = {};
    if (sortBy && Array.isArray(sortBy) && sortBy.length > 0) {
      queryObj["sort"] = {};
      sortBy.forEach(col => {
        queryObj["sort"][col.id] = col.desc ? -1 : 1;
      });
    }
  
    let relations = schema.attributes.filter(item => item.type === "ObjectId");
    if (relations && relations.length > 0) {
      queryObj["populate"] = relations.map(item => ({
        path: item.attrName,
        select: item.displayAttribute
      }));
    }
    return queryObj;
  };

  export const generateQueryFromFilters = (filters) => {
    const result = {};
    if (filters && Array.isArray(filters) && filters.length > 0) {
      result["$and"] = filters.map(filter => {
        switch (filter?.type) {
          case FILTER_TYPES.CONTAINS:
            return {
              [filter?.q1]: {
                $regex: filter?.q2,
                $options: "i",
              },
            };
  
          case FILTER_TYPES.INCLUDES:
            return {
              [filter?.q1]: {
                $in: Array.isArray(filter?.q2) ? [...filter?.q2] : [filter?.q2]
              },
            };
  
          case FILTER_TYPES.NOT_INCLUDES:
            return {
              [filter?.q1]: {
                $nin: Array.isArray(filter?.q2) ? [...filter?.q2] : [filter?.q2]
              },
            };
  
          case FILTER_TYPES.EQUALS:
            return {
              [filter?.q1]: {
                $eq: filter?.q2,
              },
            };
  
          case FILTER_TYPES.NOT_EQUALS:
            return {
              [filter?.q1]: {
                $ne: filter?.q2,
              },
            };
  
          case FILTER_TYPES.GREATER_THAN:
            return {
              [filter?.q1]: {
                $gt: filter?.q2,
              },
            };
  
          case FILTER_TYPES.LESS_THAN:
            return {
              [filter?.q1]: {
                $lt: filter?.q2,
              },
            };
  
          case FILTER_TYPES.GT_EQUAL_TO:
            return {
              [filter?.q1]: {
                $gte: filter?.q2,
              },
            };
  
          case FILTER_TYPES.LT_EQUAL_TO:
            return {
              [filter?.q1]: {
                $lte: filter?.q2,
              },
            };
  
          default:
            return {
              [filter?.accessor]: {
                $regex: filter?.q2,
                $options: "i",
              },
            };
        }
      });
    }
    return result;
  };

  export const checkPermission = ({ permissionType, modelName }) => {
    const permissions = JSON.parse(localStorage.getItem(STORAGE_KEY.ROLE_ACCESS)) || {};
    return permissionType ?
      ((permissions.hasOwnProperty(modelName) && permissions[modelName]?.includes(permissionType)) ? true : false)
      : (Object.keys(permissions).length<=0?true:(permissions?.[modelName] ? true : false));
  }

  export const mergePermission = (roleAccess) => {
    const permissions = {}
    Object.keys(roleAccess).forEach((key) => {
      const roleAccessObj = roleAccess[key];
      Object.keys(roleAccessObj).forEach((modelName) => {
        if (permissions.hasOwnProperty(modelName)) {
          permissions[modelName] = [...permissions[modelName], ...roleAccessObj[modelName]];
        } else {
          permissions[modelName] = roleAccessObj[modelName];
        }
      })
    });
    return permissions;
  }
  
  
	export const loginService = (email, password) => {
  return new Promise((resolve, reject) => {
    apiClient({ url: API_URLS.auth.login, data: { username: email, password,includeRoleAccess:true } })
      .then((res) => {
        if (res?.data?.token) {
          resolve({ user: res.data, token: res.data.token, roleAccess: mergePermission(res?.data?.roleAccess || {}) });
        }
        reject(res?.message || "Something went wrong."   )
      })
      .catch((error) => {
        reject(error?.data?.message);
      });
  });
};

export const changePasswordService = (data) => {
  return new Promise((resolve, reject) => {
     apiClient({
      method: "PUT",
      url: API_URLS.auth.changePassword,
      data,
    })
      .then((res) => {
        if (res.status === STATUS.SUCCESS) {
          resolve("Password changed Successfully");
        } else {
          reject(res.message);
        }
      })
      .catch((error) => {
        reject(error?.data?.message || "Invalid old password");
      });
  });
};

export const forgotPasswordService = (data) => {
  return new Promise((resolve, reject) => {
     apiClient({ url: API_URLS.auth.forgotPassword, data })
      .then((res) => {
        if (res.status === STATUS.SUCCESS) {
          resolve( res?.message);
        } else {
                    reject( res?.message || res.data );

        }
      })
      .catch((err) => reject(err?.data?.message || "Something went wrong."));
  });
};

export const updateProfileService = (data) => {
  return new Promise((resolve, reject) => {
     apiClient({
      method: "PUT",
      url: API_URLS.auth.updateProfile,
      data,
    })
      .then((res) => {
        if (res?.status === STATUS.SUCCESS) {
          resolve(res?.data)
        } else {
          reject(res?.message)
        }
      })
      .catch((err) => reject(err?.data?.message || "Something went wrong."));
  });
};

export const resetPasswordService = (data) => {
  return new Promise((resolve, reject) => {
     apiClient({
      method: "PUT",
      url: API_URLS.auth.resetPassword,
      data,
    })
      .then((res) => {
        if (res.status === STATUS.SUCCESS) {
        resolve(res.data);
      } else {
        reject( res?.message || res.data);
      }
      })
      .catch((err) => reject(err?.data?.message || "Something went wrong."));
  });
};

	
  
    export const assignRoleService = (data) => {
        return new Promise((resolve, reject) => {
          apiClient({ url: API_URLS.userRole.create, data: { userId: data.currentRecord.id, roleId: data.roleId } })
            .then((res) => {
              if (res.status === STATUS.SUCCESS) {
                resolve(res);
              } else {
                reject(res?.message || res.data);
      
              }
            })
            .catch((err) => reject(err?.data?.message || "Something went wrong."));
        });
      };
      
      export const getUserRoleService = (currentRecord) => {
        return new Promise((resolve, reject) => {
          apiClient({ url: `${API_URLS.userRole.list}`, data: { query: { userId: currentRecord.id, isActive: true, isDeleted: false }, options: { populate: "roleId" } } })
            .then((res) => {
              if (res.status === STATUS.SUCCESS || res.status === STATUS.RECORD_NOT_FOUND) {
                resolve(res?.data?.data || []);
              } else {
                reject(res?.message || res.data);
      
              }
            })
            .catch((err) => reject(err?.data?.message || "Something went wrong."));
        });
      }
      
      export const getRoles = () => {
        return new Promise((resolve, reject) => {
          apiClient({ url: `${API_URLS.role.list}`, data: { query: { isActive: true, isDeleted: false } } })
            .then((res) => {
              if (res.status === STATUS.SUCCESS) {
                resolve(res?.data?.data);
              } else {
                reject(res?.message || res.data);
      
              }
            })
            .catch((err) => reject(err?.data?.message || "Something went wrong."));
        });
      }
      
      export const removeUserRole = (data) => {
        return new Promise((resolve, reject) => {
          apiClient({ url: `${API_URLS.userRole.softdelete}${data.id}`, method: "PUT" })
            .then((res) => {
              if (res.status === STATUS.SUCCESS) {
                resolve(res);
              } else {
                reject(res?.message || res.data);
      
              }
            })
            .catch((err) => reject(err?.data?.message || "Something went wrong."));
        });
      };
      
    
  