import axios from "axios";

export default {
  host: process.env.VUE_APP_API_URL,
  async execute(url, params, method = "post", authToken = "") {
    if (typeof params !== "object") {
      params = {};
    }
    const requestHeaders = {
      "Access-Control-Allow-Origin": "*",
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "Cache-Control": "no-cache",
    };
    if (authToken) {
      requestHeaders.Authorization = authToken;
    }

    const parameters = params || {};
    const requestUrl = this.host + url;
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
    try {
      const response = await axios(request);
      return response;
    } catch (e) {
      if (e.response.status >= 300 && e.response.status < 400)
        return e.response;
      throw e;
    }
  },
};
