
        import { apiClient } from "./../api/client";
        import { API_URLS } from "../api/config";
        const {user} = API_URLS;

        export const listUsers = (payload) =>{
            return apiClient({ url: user.list, data: payload })
            .then((res) => res?.data)
            .catch((err) => {
              throw new Error(err);
            });
          } 
        
        export const createUser = (payload) =>{
            return apiClient({ url: user.create, data: payload })
            .then((res) => res)
            .catch((err) => {
              throw new Error(err?.data?.message);
            });
        }

        export const updateUser = (payload) =>{
            return apiClient({ url: user.update + payload.id, data: payload,
                method: "PUT" })
            .then((res) => res.data)
            .catch((err) => {
              throw new Error(err?.data?.message || "Can't update record.");
            });
        }

        export const softDeleteUser = (payload) =>{
            return apiClient({ url: user.softdelete + payload.id, data: payload,
                method: "PUT" })
            .then((res) => res)
            .catch((err) => {
              throw new Error(err);
            });
        }

        export const deleteUser = (payload) =>{
            return apiClient({ url: user.delete + payload.id, data: payload,
                method: "DELETE" })
            .then((res) => res)
            .catch((err) => {
              throw new Error(err);
            });
        }

        export const getUserCount = () =>{
            return apiClient({ url: user.count })
            .then((res) => res.data?.totalRecords || 0)
            .catch((err) => {
              throw new Error(err);
            });
        }

        export const getUserAggregate = (payload) =>{
            return apiClient({ url: user.aggregation ,data: payload})
            .then((res) => res.data?.data)
            .catch((err) => {
              throw new Error(err);
            });
        }

        export const getUserById = (payload) =>{
            return apiClient({ url: user.singlerecord + payload ,data: { query: { isActive: true, isDeleted: false } },
                method: "GET",})
            .then((res) => res.data)
            .catch((err) => {
              throw new Error(err);
            });
        }

        export const softDeleteMultipleUser = (payload) => {
          return apiClient({
            url: user.multisoftdelete,
            data: payload,
            method: "PUT",
          })
            .then((res) => res)
            .catch((err) => {
              throw new Error(err);
            });
        };

    