import http, { httpBase } from "plugins/httpPlugin";

const prefix = "auth";

const authApi = {
  getCSRF() {
    return httpBase.get("sanctum/csrf-cookie");
  },
  register(payload) {
    return httpBase.post("register", payload);
  },
  login(payload) {
    return httpBase.post("login", payload);
  },
  logout() {
    return httpBase.post("logout");
  },
  forgotPassword(payload) {
    return httpBase.post("forgot-password", payload);
  },
  resetPassword(payload) {
    return httpBase.post("reset-password", payload);
  },
  me() {
    return http.get(`${prefix}/me`);
  },
};

export default authApi;
