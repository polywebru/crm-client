import axios from "axios";
export default {
  host: process.env.VUE_APP_API_URL,
  prefix: "api/v1",
  lastModified: "",
  execute(url, params, method = "post", prefix = false, authToken = "") {
    if (typeof params !== "object") {
      params = {};
    }
    const requestHeaders = {
      "Access-Control-Allow-Origin": "*",
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "If-Modified-Since": this.lastModified,
    };
    if (authToken) {
      requestHeaders.Authorization = authToken;
    }

    let requestUrl = this.host;
    if (prefix) {
      requestUrl += this.prefix;
    }
    requestUrl += url;

    const parameters = params || {};
    const request = {
      method: method,
      url: requestUrl,
      headers: requestHeaders,
    };

    if (method === "get") {
      request.params = parameters;
    } else {
      request.data = parameters;
    }
    return axios(request);
  },
};
