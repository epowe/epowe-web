// import React, { useEffect } from "react";
// import { useParams } from "react-router";

// function GoogleLoginRedirect() {
//   const params = useParams();

//   useEffect(() => {
//     localStorage.clear();
//     localStorage.setItem("token", params.token);
//     console.log(params.token);
//     window.location.replace("/");
//   }, []);

//   return <></>;
// }

// export default GoogleLoginRedirect;
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import React, { useEffect } from "react";
import axios from "axios";
import ApiBaseURL from "./ApiBaseURL";
const GoogleLoginRedirect = ({ location }) => {
  const params = new URLSearchParams(window.location.search);
  let userToken = params.get("userToken");
  let getParameter = (key) => {
    return new URLSearchParams(window.location.search).get(key);
  };
  let userToken2 = getParameter("userToken");

  const authAfterLogin = async () => {
    try {
      //응답 성공
      const response = await axios.get("http://localhost:8080/afterLogin", {
        headers: {
          Authorization: `Bearer ${userToken2}`,
        },
      });
      if (response.status === 200) {
        console.log("afterLogin api get 요청 성공");
      }
    } catch (error) {
      //응답 실패
      console.error(error);
      console.log("afterlogin 응답 실패");
    }
  };

  useEffect(() => {
    if (userToken2) {
      localStorage.clear();
      localStorage.setItem("jwtToken", userToken2);
      // axios.defaults.headers.common["Authorization"] = `Bearer ${userToken2}`;
      authAfterLogin();
    } else {
      console.log("토큰을 못 받아옴");
    }
    console.log(localStorage.getItem("jwtToken"));
    console.log("토큰을 localStorage에 저장했다.");
  }, []);

  return <></>;
};

export default GoogleLoginRedirect;
