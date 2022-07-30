import { useLocation, Navigate, useNavigate } from "react-router-dom";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ApiBaseURL from "./ApiBaseURL";
import { API } from "./API";

export const TokenProcess = ({ location }) => {
  //url 에서 토큰 가져오는 부분

  let getParameter = (key) => {
    return new URLSearchParams(window.location.search).get(key);
  };
  let accessToken = getParameter("accessToken");
  let refreshToken = getParameter("refreshToken");

  //주소 여부에 따라서 페이지 바뀌게해주는 함수
  const navigate = useNavigate();
  const [userAddress, setUserAddress] = useState("");
  const navInterview = () => {
    return navigate("/interview");
  };

  const navRegister = () => {
    return navigate("/register");
  };

  //백에서 전달받은 데이터 중 주소 데이터의 유무를 판별하는 함수
  const getUserAddress = async () => {
    var result = await API.authAfterLogin();
    if (result) {
      if (result.address) {
        console.log(
          "사용자 존재, 서버로부터 주소 받아옴 주소는:" + result.address
        );
        navInterview();
      } else {
        navRegister();
      }
    } else {
      console.log("사용자 주소 데이터 잘 들어오지 않음");
    }
  };

  useEffect(() => {
    if (accessToken && refreshToken) {
      console.log("발급 받은 엑세스 토큰:  " + accessToken);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      console.log("발급 받은 refresh 토큰:   " + refreshToken);
      localStorage.setItem("isLogged", true);
      getUserAddress();
    } else {
      console.log("토큰을 못 받아옴");
    }
    console.log(localStorage.getItem("accessToken"));
    console.log("토큰을 localStorage에 저장했다.");
  }, []);

  return <></>;
};
/// 토큰이 들어오지 않으면 401로 (401 UNAUTHORIZED)
