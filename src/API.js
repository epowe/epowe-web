import axios from "axios";
import { ApiBaseURL, ApiBaseURL2 } from "./ApiBaseURL";
const BASE_URL = ApiBaseURL;
const BASE_URL_2 = ApiBaseURL2;

axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = false;

export const modelInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
});

export const modelInstance2 = axios.create({
  baseURL: BASE_URL_2,
  withCreadentials: false,
});

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
        withCreadentials: true,
      });
      if (response.status === 200) {
        console.log("refreshToken 받아오기 성공");
        console.log(response.data);
        return response.data;
      } else {
        console.log("refreshToken 받아오기 실패");
        console.log(response.data);
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
        console.log(response.data);
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
        `/auth/register`,
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

  //해당 면접 제목에 있는 단일 결과 데이터, 배열 행식 x, 하나의 질문에 있는 것들
  getOneUserInterviewData: async ({ title }) => {
    try {
      const response = await modelInstance.get(`/model/data/score?title=${title}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        console.log("Flask에서 정상적으로 데이터를 받았습니다.");
        console.log(response.data);
        return response.data;
      } else {
        console.log("Flask에 get 연결 실패");
        console.log(response);
        return false;
      }
    } catch (error) {
      console.log("accessToken과 refreshToken을 재발급 받지 못하였습니다.");
      console.error(error);
    }
    return false;
  },

  //유저 인터뷰 정보들 서버에 보내주는 api
  sendUserInterviewInfo: async ({ title, question, videoURL, speaker }) => {
    try {
      const response = await modelInstance2.post(
        `/model/video`,
        JSON.stringify({
          title: title,
          question: question,
          videoURL: videoURL,
          speaker: speaker,
        }),
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        console.log("유저의 면접 정보가 정상적으로 제출되었습니다.");
        console.log(response);
        return response;
      } else {
        console.log("유저의 면접 정보가 정상적으로 제출되지 못하였습니다");
        console.log(response);
        return false;
      }
    } catch (error) {
      console.error(error);
    }
    return false;
  },

  //유저의 전체 피드백 목록을 배열 형식으로 가져오는 API
  getUserInterviewList: async () => {
    try {
      const response = await modelInstance.get(`/model/data/list`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        console.log("유저의 전체 면접 데이터를 받았습니다.");
        console.log(response.data);
        return response.data;
      } else {
        console.log("유저의 전체 면접 데이터를 받지 못했습니다.");
        console.log(response);
        return false;
      }
    } catch (error) {
      console.error(error);
    }
    return false;
  },

  //유저의 특정 면접에서 질문 목록을 가져오는 API
  getUserQuestionList: async ({ title }) => {
    try {
      const response = await modelInstance.get(
        `/model/data/list/question?title=${title}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        console.log(`유저의 ${title} 면접에 대한 질문 리스트를 받았습니다.`);
        console.log(response.data);
        return response.data;
      } else {
        console.log(
          `유저의 ${title}면접에 대한 질문 리스트를 받지 못했습니다.`
        );
        console.log(response);
        return false;
      }
    } catch (error) {
      console.error(error);
    }
    return false;
  },

  //전체 피드백 평균 점수 데이터 가져오는 API
  getUserAverageScore: async () => {
    try {
      const response = await modelInstance.get(`/model/score/average`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        console.log("유저의 전체 면접 점수 평균을 가져오는데 성공했습니다.");
        console.log(response.data);
        return response.data;
      } else {
        console.log("유저의 전체 면접 점수 평균을 가져오는데 실패했습니다.");
        console.log(response);
        return false;
      }
    } catch (error) {
      console.error(error);
    }
    return false;
  },

  //유저 질문별 상세 분석 데이터 가져오는 API
  getUserInterviewDetail: async ({ title, question }) => {
    try {
      const response = await modelInstance.get(
        `/model/data/detail?title=${title}&question=${question}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        console.log("유저의 질문별 상세 데이터를 가져오는데 성공했습니다. ");
        console.log(response.data);
        return response.data;
      } else {
        console.log("유저의 질문별 상세 데이터를 가져오는데 실패했습니다. ");
        console.log(response);
        return false;
      }
    } catch (error) {
      console.error(error);
    }
    return false;
  },

  //면접 제목 중복 확인하는 API
  getTitleOverlap: async ({ title }) => {
    try {
      const response = await modelInstance.get(
        `/model/check/title?title=${title}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200 || response.status === 400) {
        console.log("면접 제목 중복 정보를 가져오는데 성공했습니다. ");
        console.log(response);
        return response.status;
      } else {
        console.log("면접 제목 중복 정보를 가져오는데 실패했습니다. ");
        console.log(response);
        return false;
      }
    } catch (error) {
      console.error(error);
    }
    return false;
  },
};