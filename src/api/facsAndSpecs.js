import baseApi from "./baseApi";
const settings = {
  apiRoutes: {
    faculties: "faculties",
    specialities: "specialities",
    settings: "settings",
  },
  async getFaculties() {
    return await baseApi.execute(this.apiRoutes.faculties, null, "get");
  },
  async getSpecialityById(id) {
    return await baseApi.execute(
      `${this.apiRoutes.faculties}/${id}/${this.apiRoutes.specialities}`,
      null,
      "get"
    );
  },
  async getDuration() {
    return await baseApi.execute(this.apiRoutes.settings, null, "get");
  },
};
export default settings;
