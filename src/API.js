import axios from "axios";
import ApiBaseURL from "./ApiBaseURL";
const BASE_URL = ApiBaseURL;

axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = false;

export const API = {
  //로그인

  authAfterLogin: async () => {
    try {
      //응답 성공
      const response = await axios.get("http://localhost:3000/auth/info", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        console.log("afterLogin api get 요청 성공");
        console.log(response.data);
        return response.data;
      } else if (response.status === 401) {
        console.log("토큰이 들어오지 않음");
        console.log(response);
      }
    } catch (error) {
      console.error(error);
      console.log("afterlogin 응답 실패");
    }
  },
};
