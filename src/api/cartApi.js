import http from "plugins/httpPlugin";

const prefix = "/carts";

const cartApi = {
  fetchUserCarts() {
    return http.get(`${prefix}`);
  },
  store(payload) {
    return http.post(`${prefix}`, payload);
  },
  update(cartId, payload) {
    return http.post(`${prefix}/${cartId}`, {
      ...payload,
      _method: "PATCH",
    });
  },
  delete(cartId) {
    return http.post(`${prefix}/${cartId}`, {
      _method: "DELETE",
    });
  },
};

export default cartApi;
