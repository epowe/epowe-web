import axios from "axios";
import ApiBaseURL from "./ApiBaseURL";
const BASE_URL = ApiBaseURL;

axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = false;

export const API = {
  //로그인
  authLogin: async (data) => {
    try {
      const response = await axios.get(
        "/oauth2/redirect",
        JSON.stringify({
          accessToken: data,
        })
      );
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  },
};
