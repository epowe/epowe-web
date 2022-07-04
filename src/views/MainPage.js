import React, { useEffect, useContext, useState } from "react";
import styled from "styled-components";
import { useNavigate, Link, useParam } from "react-router-dom";
import HeaderLogoI from "../images/HeaderLogo.png";
import GoogleLogoImg from "../images/GoogleLogo.png";
import NaverLogoImg from "../images/NaverLogo.png";
import "../App.css";
import Header from "./Header.js";

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
            이에이승은 면접에서 어려움을 겪고 있는 사람들에게 <br />
            날개를 달아주는 서비스 입니다.
          </ContentText>
        </TitleContainer>
        <ButtonContainer>
          <NaverLogin>
            {/* 로그인 버튼을 클릭하면 다음 주소로 요청가게끔 구현 */}
            <Link
              to="/oauth2/authorization/naver"
              style={{ textDecoration: "none" }}
            >
              <NaverContainer>
                <NaverLogo src={NaverLogoImg}></NaverLogo>
                <NaverText>네이버 로그인</NaverText>
              </NaverContainer>
            </Link>
          </NaverLogin>
          <GoogleLogin>
            {/* 로그인 버튼을 클릭하면 다음 주소로 요청가게끔 구현 */}
            <Link
              to="/oauth2/authorization/google"
              style={{ textDecoration: "none" }}
            >
              <GoogleContainer>
                <GoogleLogo src={GoogleLogoImg}></GoogleLogo>
                <GoogleText>구글 로그인</GoogleText>
              </GoogleContainer>
            </Link>
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
`;
const GoogleLogin = styled.div`
  margin-top: 25px;
  width: 337px;
  height: 55px;
  border: 1px solid;
  border-radius: 10px;
  color: lightgray;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const BodyContainer = styled.div`
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
  font-family: Montserrat-Bold;
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
  font-family: Montserrat-Regular;
  font-size: 20px;
  margin-top: 37px;
`;

const HeaderLogoImage = styled.img`
  width: 51px;
  height: 51px;
  cursor: pointer;
`;

const HeaderLogo = styled.div`
  position: relative;
  display: inline-block;
  bottom: 11px;
  margin-left: 19px;
  text-align: center;
  font-family: Montserrat-Bold;
  display: inline-block;
  position: relative;
  font-size: 22px;
  color: #6c63ff;
  cursor: pointer;
  margin-left: 19px;
  margin-top: 20px;
`;

const Line = styled.div`
  height: 1px;
  width: 90vw;
  background-color: #e0e0e0;
  margin-left: 238px;
`;

export default MainPage;
