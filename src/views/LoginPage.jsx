import React from "react";
import styled from "styled-components";
import GoogleLogoImg from "../images/GoogleLogo.png";
import NaverLogoImg from "../images/NaverLogo.png";
import "../App.css";
import Header from "./Header.js";
import GoogleAuthURL from "../GoogleAuthURL";
import NaverAuthURL from "../NaverAuthURL";
import TypeIt from "typeit-react";

const LoginPage = () => {
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
                strings: [
                  "이에이승은 면접에서 어려움을 겪고 있는 사람들에게",
                  "날개를 달아주는 서비스입니다.",
                ],
                speed: 90,
                waitUntilVisible: true,
              }}
            />
          </ContentText>
        </TitleContainer>
        <ButtonContainer>
          <NaverLogin>
            <a href={NaverAuthURL} style={{ textDecoration: "none" }}>
              <NaverContainer>
                <NaverLogo src={NaverLogoImg}></NaverLogo>
                <NaverText>네이버 로그인</NaverText>
              </NaverContainer>
            </a>
          </NaverLogin>
          <GoogleLogin>
            <a href={GoogleAuthURL} style={{ textDecoration: "none" }}>
              <GoogleContainer>
                <GoogleLogo src={GoogleLogoImg}></GoogleLogo>
                <GoogleText>구글 로그인</GoogleText>
              </GoogleContainer>
            </a>
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
  font-family: Pretendard;
`;
const GoogleLogin = styled.div`
  margin-top: 25px;
  width: 337px;
  height: 55px;
  border: 1px solid;
  border-radius: 10px;
  color: lightgray;
  font-family: Pretendard;
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
  font-family: Pretendard;
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

export default LoginPage;
