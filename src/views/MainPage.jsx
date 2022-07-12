import React, { useEffect, useContext, useState } from "react";
import styled from "styled-components";
import { useNavigate, Link, useParam } from "react-router-dom";
import GoogleLogoImg from "../images/GoogleLogo.png";
import NaverLogoImg from "../images/NaverLogo.png";
import "../App.css";
import Header from "./Header.js";
import axios from "axios";
import TypeIt from 'typeit-react';

export const API_BASE_URL = process.env.REACT_APP_BASE_URL;
//서버에서 인증을 완료한 후에 프론트엔드로 돌아올 redirect uri (app.oauth2.authorized-redirect-uri와 일치해야 한다)
export const OAUTH2_REDIRECT_URI = process.env.OAUTH2_REDIRECT_URI;
export const GOOGLE_AUTH_URL =
  API_BASE_URL +
  "/oauth2/authorization/google?redirect_uri=" +
  OAUTH2_REDIRECT_URI;
export const NAVER_AUTH_URL =
  API_BASE_URL +
  "/oauth2/authorization/naver?redirect_uri=" +
  OAUTH2_REDIRECT_URI;

const MainPage = () => {
  const navigate = useNavigate();
  const onClickLogo = () => {
    navigate("/");
  };

  return (
    <>
      <Header />
      <BodyContainer>
        <TitleContainer>
          <TitleText>AI 모의 면접 교정</TitleText>
          <TextLine />
          <ContentText>
            <TypeIt
              options={{
                strings: ["이에이승은 면접에서 어려움을 겪고 있는 사람들에게", "날개를 달아주는 서비스입니다."],
                speed: 90,
                waitUntilVisible: true,
              }} />
          </ContentText>
        </TitleContainer>
        <ButtonContainer>
          <NaverLogin>
            {/* 로그인 버튼을 클릭하면 다음 주소로 요청가게끔 구현 */}
            {/* <Link
              to="/oauth2/authorization/naver"
              style={{ textDecoration: "none" }}
            > */}
            <a href={NAVER_AUTH_URL} style={{ textDecoration: "none" }}>
              <NaverContainer>
                <NaverLogo src={NaverLogoImg}></NaverLogo>
                <NaverText>네이버 로그인</NaverText>
              </NaverContainer>
            </a>
            {/* </Link> */}
          </NaverLogin>
          <GoogleLogin>
            {/* 로그인 버튼을 클릭하면 다음 주소로 요청가게끔 구현 */}
            {/* <Link
              to="/oauth2/authorization/google"
              style={{ textDecoration: "none" }}
            > */}
            <a href={GOOGLE_AUTH_URL} style={{ textDecoration: "none" }}>
              <GoogleContainer>
                <GoogleLogo src={GoogleLogoImg}></GoogleLogo>
                <GoogleText>구글 로그인</GoogleText>
              </GoogleContainer>
            </a>
            {/* </Link> */}
          </GoogleLogin>
        </ButtonContainer>
      </BodyContainer>
    </>
  );
};

const GoogleText = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 37px;
  font-size: 15px;
  font-weight: 700;
  color: black;
`;

const NaverText = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 27px;
  font-size: 15px;
  font-weight: 800;
  color: white;
`;

const GoogleContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 27px;
`;
const NaverContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 20px;
`;

const NaverLogo = styled.img`
  width: 40px;
  height: 40px;
`;

const GoogleLogo = styled.img`
  width: 27px;
  height: 27px;
`;

const NaverLogin = styled.div`
  width: 337px;
  height: 55px;
  border: 1px solid;
  border-radius: 10px;
  color: lightgray;
  background: #01be31;
  font-family: SCDream-Light;
`;
const GoogleLogin = styled.div`
  margin-top: 25px;
  width: 337px;
  height: 55px;
  border: 1px solid;
  border-radius: 10px;
  color: lightgray;
  font-family: SCDream-Light;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const BodyContainer = styled.div`
  position: fixed;
  top: 5rem;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 80vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
const TitleContainer = styled.div`
  width: 541px;
  height: 194px;
  float: left;
  flex-direction: column;
`;
const TitleText = styled.div`
  font-family: SCDream-Regular;
  font-size: 44px;
  position: relative;
`;

const TextLine = styled.div`
  position: relative;
  height: 1px;
  width: 500px;
  background-color: #e0e0e0;
  margin-top: 50px;
`;
const ContentText = styled.div`
  position: relative;
  font-size: 20px;
  margin-top: 37px;
`;

export default MainPage;
