import http from "plugins/httpPlugin";

const prefix = "/carts";

const cartApi = {
  fetchUserCarts() {
    return http.get(`${prefix}`);
  },
};

export default cartApi;
