import { useLocation, Navigate, useNavigate } from "react-router-dom";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ApiBaseURL from "./ApiBaseURL";
import { API } from "./API";
import {
  removeCookieToken,
  getCookieToken,
  setRefreshTokenToCookie,
} from "./Auth";

export const TokenProcess = ({ location }) => {
  //redirect url에서 토큰을 뽑아오는 부분
  let getParameter = (key) => {
    return new URLSearchParams(window.location.search).get(key);
  };
  let accessToken = getParameter("accessToken");

  //주소 여부에 따라서 페이지 바뀌게해주는 함수
  const navigate = useNavigate();
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
        localStorage.setItem("address", true);
        navInterview();
      } else {
        localStorage.setItem("address", false);
        navRegister();
      }
    } else {
      console.log("사용자 주소 데이터 잘 들어오지 않음");
    }
  };

  //백에서 전달 받은 리프레쉬 토큰을 가져와서 쿠키에 저장하는 함수
  const bringRefreshToken = async () => {
    var result = await API.getRefreshToken();
    if (result) {
      if (result.refreshToken) {
        console.log(
          "api를 이용해 서버로부터 새로 받아온 리프레쉬 토큰은?:" +
            result.refreshToken
        );
        setRefreshTokenToCookie(result.refreshToken);
      } else {
        console.log("서버에서 받아온 result.refreshToken의 토큰이 없음");
      }
    } else {
      console.log("사용자 리프레쉬 토큰 데이터 잘 들어오지 않음");
    }
  };

  useEffect(() => {
    if (accessToken) {
      console.log("서버로부터 발급 받은 엑세스 토큰: " + accessToken);
      localStorage.setItem("accessToken", accessToken);
      console.log("TokenProcess에서 엑세스 토큰을 localStorage에 저장했다.");
      bringRefreshToken();
      localStorage.setItem("isLogged", true);
      console.log(
        "TokenProcess에서 islogged를 true로 localStorage에 저장했다."
      );
      getUserAddress();
    } else {
      console.log("토큰을 못 받아옴");
    }
  }, []);

  return <></>;
};
/// 토큰이 들어오지 않으면 401로
