import http from "plugins/httpPlugin";

const prefix = "/profile";

const profileApi = {
  update(payload) {
    return http.post(prefix, {
      ...payload,
      _method: "PATCH",
    });
  },
};

export default profileApi;
