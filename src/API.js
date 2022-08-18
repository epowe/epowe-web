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
  //Flask 테스트용 api Get
  useFlaskTestGet: async () => {
    try {
      const response = await axios.get(
        `/model/data/score?title=카카오 면접 준비`,
        {
          headers: {
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWR4IjozLCJleHAiOjE2NjA4NDUxMzd9.8HuslT1oXljHDEA8CIEzLAHk7MqynDrcsnDA7EU70yc`,
            "Content-Type": "application/json",
          },
        }
      );
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

  //유저 인터뷰 정보들 보내주는 api
  sendUserInterviewInfo: async ({ title, question, videoURL }) => {
    try {
      const response = await axios.post(
        `/model/video`,
        JSON.stringify({
          title: title,
          question: question,
          videoURL: videoURL,
        }),
        {
          headers: {
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWR4IjozLCJleHAiOjE2NjA4NDUxMzd9.8HuslT1oXljHDEA8CIEzLAHk7MqynDrcsnDA7EU70yc`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        console.log("Flask에 정상적으로 연결되어 데이터를 보냈습니다.");
        console.log(response.data);
        return response.data;
      } else {
        console.log("Flask에 Post 연결 실패");
        console.log(response);
        return false;
      }
    } catch (error) {
      console.log("accessToken과 refreshToken을 재발급 받지 못하였습니다.");
      console.error(error);
    }
    return false;
  },
};

//Flask 연결 예시
// const onClickFlaskPostTest = async () => {
//   var result = await API.useFlaskTestPost({
//     title: "제목입니다.",
//     question: ["질문입니다."],
//     videoURL: ["동영상 주소입니다."],
//   });
//   if (result) {
//     console.log("flask에 Post 완료");
//   } else {
//     console.log("flask Post 실패");
//     console.log(result);
//   }
// };

// const onClickFlaskGetTest = async () => {
//   var result = await API.useFlaskTestGet();
//   if (result) {
//     console.log("flask get 성공");
//     console.log(result);
//     if (result.dialectCount) {
//       console.log("사투리 사용횟수:" + result.dialectCount);
//     } else {
//       console.log("사용횟수 존재x");
//     }
//     if (result.intonation) {
//       console.log("억양 점수:" + result.intonation);
//     } else {
//       console.log("억양 점수 존재x");
//     }
//     if (result.speechRate) {
//       console.log("말의 빠르기 점수:" + result.speechRate);
//     } else {
//       console.log("말의 빠르기 존재x");
//     }
//     if (result.word) {
//       console.log("가장 많이 사용하는 단어:" + result.word);
//     } else {
//       console.log("가장 많이 사용하는 단어 존재x");
//     }
//   } else {
//     console.log("Flask get 실패");
//   }
// };
