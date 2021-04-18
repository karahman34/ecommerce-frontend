import http from "plugins/httpPlugin";

const prefix = "/products";

const productApi = {
  all(params = null) {
    return http.get(`${prefix}`, {
      params,
    });
  },
  show(productId) {
    return http.get(`${prefix}/${productId}`);
  },
  related(productId, params = null) {
    return http.get(`${prefix}/${productId}/related`, {
      params,
    });
  },
};

export default productApi;
