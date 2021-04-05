import http from "plugins/httpPlugin";

const prefix = "/products";

const productApi = {
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
  random(params = null) {
    return http.get(`${prefix}/random`, {
      params,
    });
  },
};

export default productApi;
