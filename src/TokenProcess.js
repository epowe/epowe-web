import { useLocation } from "react-router-dom";
import queryString from "query-string";
import React, { useEffect } from "react";
import axios from "axios";
import ApiBaseURL from "./ApiBaseURL";

export const TokenProcess = ({ location }) => {
  const params = new URLSearchParams(window.location.search);
  let userToken = params.get("userToken");
  let getParameter = (key) => {
    return new URLSearchParams(window.location.search).get(key);
  };
  let userToken2 = getParameter("userToken");

  useEffect(() => {
    if (userToken2) {
      localStorage.clear();
      localStorage.setItem("jwtToken", userToken2);
      // axios.defaults.headers.common["Authorization"] = `Bearer ${userToken2}`;
      //authAfterLogin();
    } else {
      console.log("토큰을 못 받아옴");
    }
    console.log(localStorage.getItem("jwtToken"));
    console.log("토큰을 localStorage에 저장했다.");
  }, []);

  return <></>;
};
/// 토큰이 들어오지 않으면 401로
