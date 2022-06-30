import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = false;

export const API = {
  //로그인
  authLogin: async ({ socialType, socialId }) => {
    try {
      const response = await axios.post(
        `/api/v1/member/auth/web/login`,
        JSON.stringify({
          socialType: socialType,
          socialId: socialId,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${localStorage.getItem("accessToken")}`;
        return response.data.data;
      } else return false;
    } catch (e) {
      console.log(e);
    }
  },
};