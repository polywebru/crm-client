import baseApi from "./baseApi";
import routes from "./routes";

const settings = {
  async getFaculties() {
    return await baseApi.execute(routes.faculties, null, "get");
  },
  async getSpecialityById(id) {
    return await baseApi.execute(routes.specialitiesById(id), null, "get");
  },
  async getDuration() {
    return await baseApi.execute(routes.settings, null, "get");
  },
};
export default settings;
