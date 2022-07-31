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
      const response = await axios.get("/auth/info", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
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
  //리프레쉬 토큰 첫 발급
  getRefreshToken: async () => {
    try {
      //응답 성공
      const response = await axios.get("/auth/refresh-token", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        console.log("refreshToken 받아오기 성공");
        console.log(response.data);

        return response.data;
      } else {
        console.log("refreshToken 받아오기 실패");
        console.log(response);
      }
    } catch (error) {
      console.error(error);
      console.log("refreshToken 받아오는 api 로직 실패");
    }
  },

  //(리프레쉬, 엑세스)토큰 재발급 api
  getAccessUsingRefresh: async ({ accessToken, refreshToken }) => {
    try {
      const response = await axios.post(
        `/auth/reissue`,
        JSON.stringify({
          accessToken: accessToken,
          refreshToken: refreshToken,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        console.log(
          "accessToken과 refreshToken을 정상적으로 재발급 받았습니다."
        );
        console.log(response);
        return response.data;
      } else {
        console.log("accessToken과 refreshToken을 재발급 받지 못하였습니다.");
        console.log(response);
        return false;
      }
    } catch (error) {
      console.log("accessToken과 refreshToken을 재발급 받지 못하였습니다.");
      console.error(error);
    }
    return false;
  },
  //유저의 주소 정보를 보내주는 api
  userPostAddress: async ({ address }) => {
    try {
      const response = await axios.post(
        `/register`,
        JSON.stringify({
          address: address,
        }),
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
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
