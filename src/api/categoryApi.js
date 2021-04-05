import http from "plugins/httpPlugin";

const prefix = "/categories";

const categoryApi = {
  all(params = null) {
    return http.get(`${prefix}`, {
      params,
    });
  },
  popular(params = null) {
    return http.get(`${prefix}/popular`, {
      params,
    });
  },
};

export default categoryApi;
