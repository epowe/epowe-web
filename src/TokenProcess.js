import { useLocation, Navigate, useNavigate } from "react-router-dom";
import queryString from "query-string";
import React, { useEffect } from "react";
import axios from "axios";
import ApiBaseURL from "./ApiBaseURL";

export const TokenProcess = ({ location }) => {
  //url 에서 토큰 가져오는 부분
  const params = new URLSearchParams(window.location.search);
  let userToken = params.get("userToken");
  let getParameter = (key) => {
    return new URLSearchParams(window.location.search).get(key);
  };
  let userToken2 = getParameter("userToken");

  //주소 여부에 따라서 페이지 바뀌게해주는 함수
  const navigate = useNavigate();
  const navInterview = () => {
    return navigate("/interview/info");
  };
  const navRegister = () => {
    return navigate("/register");
  };
  useEffect(() => {
    if (userToken2) {
      localStorage.setItem("jwtToken", userToken2);
      localStorage.setItem("isLogged", true);
      if (localStorage.getItem("existingUser") == true) {
        navInterview();
        console.log("메인 페이지로 네비게이트 했다");
      } else {
        navRegister();
        console.log("회원가입 페이지로 네비게이트 했다");
      }
    } else {
      console.log("토큰을 못 받아옴");
    }
    console.log(localStorage.getItem("jwtToken"));
    console.log("토큰을 localStorage에 저장했다.");
  }, []);

  return <></>;
};
/// 토큰이 들어오지 않으면 401로
