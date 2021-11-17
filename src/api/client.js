import axios from "axios";
import { TOKEN_KEY } from "./config";
import { STORAGE_KEY } from "./../constant/common";
import { isMocking } from "../utils/utils";

const defaultHeaders = {
  "Cache-Control": "no-cache",
  Pragma: "no-cache",
  Expires: "0"
};

export const defaultAxios = axios.create({
});

export function apiClient({
  url,
  data = {},
  method = "POST",
  headers = {},
  noHeaders,
  ...rest
}) {
  if(isMocking){
    throw new Error("This feature is not supported in mock environment.")
  }
  const token = localStorage.getItem(TOKEN_KEY);
  return new Promise((resolve, reject) => {
    defaultAxios({
      method,
      url,
      headers: {
        ...(noHeaders ? {} : defaultHeaders),
        ...headers,
        Authorization: token ? `Bearer ${token}` : undefined,
      },
      data,
      ...rest,
    })
      .then((res) => {
        resolve(res?.data);
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          localStorage.removeItem(TOKEN_KEY);
          localStorage.removeItem(STORAGE_KEY.USER_ID);
          if(!isMocking) window.location = "/login";
        }
        reject(err?.response || err);
      });
  });
}
