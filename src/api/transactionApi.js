import http from "plugins/httpPlugin";

const prefix = "/transactions";

const transactionApi = {
  all(params = null) {
    return http.get(prefix, {
      params,
    });
  },
  details(transactionId) {
    return http.get(`${prefix}/${transactionId}`);
  },
  store() {
    return http.post(prefix);
  },
};

export default transactionApi;
