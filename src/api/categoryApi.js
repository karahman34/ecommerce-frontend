import http from "plugins/httpPlugin";

const prefix = "/categories";

const categoryApi = {
  popular(params = null) {
    return http.get(`${prefix}/popular`, {
      params,
    });
  },
};

export default categoryApi;
