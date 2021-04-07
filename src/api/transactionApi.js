import http from "plugins/httpPlugin";

const prefix = "/transactions";

const transactionApi = {
  store() {
    return http.post(prefix);
  },
};

export default transactionApi;
