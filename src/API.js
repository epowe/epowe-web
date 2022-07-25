import axios from "axios";
import ApiBaseURL from "./ApiBaseURL";
const BASE_URL = ApiBaseURL;

axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = false;

export const API = {
  //로그인

  authAfterLogin: async () => {
    try {
      console.log(
        "로컬에 저장한걸로 요청한 토큰:   " + localStorage.getItem("jwtToken")
      );
      //응답 성공
      const response = await axios.get("/auth/info", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        console.log(
          "로컬에 저장한걸로 요청 성공한 토큰:   " +
            localStorage.getItem("jwtToken")
        );
        console.log("afterLogin api get 요청 성공");
        console.log(response.data);
        
        return response.data;
      } else {
        console.log("authAfterLogin 응답 없음");
        console.log(response);
      }
    } catch (error) {
      console.error(error);
      console.log("afterlogin 응답 실패");
    }
  },
  userPostAddress: async ({ address }) => {
    try {
      const response = await axios.post(
        `/register`,
        JSON.stringify({
          address: address,
        }),
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        console.log("address를 서버에게 잘 전송하였습니다");
        console.log(address);
        return response.data;
      } else return false;
    } catch (error) {
      console.log("address를 서버에게 잘 전송하지 못하였습니다.");
      console.error(error);
      console.log(error);
    }
    return false;
  },
};
