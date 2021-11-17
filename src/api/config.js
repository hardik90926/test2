export const TOKEN_KEY = "authToken";
export const REFRESH_TOKEN_KEY = "refreshToken"; // Change URL as per your server configuration

let serviceUrl = process.env.REACT_APP_SERVICE_URL;
const BASE_URL = `${serviceUrl}/admin`;
export const UPLOAD_URL = `${BASE_URL}/upload`;
export const API_URLS = {
  auth: {
    url: `${BASE_URL}`,
    login: `${BASE_URL}/auth/login`,
    resetPassword: `${BASE_URL}/auth/reset-password`,
    forgotPassword: `${BASE_URL}/auth/forgot-password`,
    register: `${BASE_URL}/auth/register`,
    validateOtp: `${BASE_URL}/auth/validate-otp`,
    changePassword: `${BASE_URL}/user/change-password/`,
    updateProfile: `${BASE_URL}/user/update-profile/`,
    login: `${BASE_URL}/auth/login/`
  },
  user: {
    create: `${BASE_URL}/user/create`,
    update: `${BASE_URL}/user/update/`,
    delete: `${BASE_URL}/user/delete/`,
    list: `${BASE_URL}/user/list`,
    count: `${BASE_URL}/user/count`,
    aggregate: `${BASE_URL}/user/aggregate`,
    softdelete: `${BASE_URL}/user/softDelete/`,
    multisoftdelete: `${BASE_URL}/user/softDeleteMany/`,
    singlerecord: `${BASE_URL}/user/`
  },
  role: {
    list: `${BASE_URL}/role/list`
  },
  userRole: {
    create: `${BASE_URL}/userRole/create`,
    list: `${BASE_URL}/userRole/list`,
    softdelete: `${BASE_URL}/userRole/softDelete/`
  }
};