import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import { API } from "./API";
import { setRefreshTokenToCookie, getCookieToken } from "./Auth";
import AppContext from "./AppContext";

export const TokenProcess = () => {
  //redirect url에서 토큰을 뽑아오는 부분
  let getParameter = (key) => {
    return new URLSearchParams(window.location.search).get(key);
  };
  let accessToken = getParameter("accessToken");

  const navigate = useNavigate();
  const myContext = useContext(AppContext);

  //주소 여부에 따라서 페이지 바뀌게해주는 함수
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
        // localStorage.setItem("address", true);
        myContext.setAddressExist(true);
        console.log("로그인시 주소 존재: " + myContext.addressExist);
        navInterview();
      } else {
        // localStorage.setItem("address", false);
        myContext.setAddressExist(false);
        console.log("로그인시 주소 존재하지 않음: " + myContext.addressExist);
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
        console.log("새로 받아온 리프레쉬 토큰은?:" + result.refreshToken);
        setRefreshTokenToCookie(result.refreshToken);
        return true;
      }
    } else {
      console.log("사용자 리프레쉬 토큰 데이터 잘 들어오지 않음");
      return false;
    }
  };

  useEffect(() => {
    if (accessToken) {
      console.log("서버로부터 발급 받은 엑세스 토큰: " + accessToken);
      localStorage.setItem("accessToken", accessToken);
      console.log("TokenProcess에서 엑세스 토큰을 localStorage에 저장했다.");
      if (bringRefreshToken() && localStorage.getItem("accessToken")) {
        localStorage.setItem("isLogged", true);
        console.log(
          "리프레쉬 엑세스 토큰 가져오기 성공, isLogged true로 들어옴"
        );
      } else {
        console.log("리프레쉬 엑세스 토큰 가져오기 실패, islogged 안들어옴");
      }
      console.log(
        "TokenProcess에서 islogged를 true로 localStorage에 저장했다."
      );
      getUserAddress();
    } else {
      console.log("엑세스 토큰을 못 받아옴");
    }
  }, []);

  return <></>;
};
/// 토큰이 들어오지 않으면 401로
