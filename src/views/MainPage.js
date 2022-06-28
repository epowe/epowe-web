import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import HeaderLogoI from "../images/HeaderLogo.png";
import GoogleLoginButton from "../images/GoogleLoginButton.png";
import NaverLoginButton from "../images/NaverLoginButton.png";
import '../App.css'

const MainPage = () => {
  const navigate = useNavigate();
  const onClickLogo = () => {
    navigate("/");
  };

  return (
    <>
      <Header>
        <HeaderLogoImage src={HeaderLogoI} onClick={onClickLogo} />
        <HeaderLogo>Epowe</HeaderLogo>
        <Line />
      </Header>
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
          <NaverLogin src={NaverLoginButton}></NaverLogin>
          <GoogleLogin src={GoogleLoginButton}></GoogleLogin>
        </ButtonContainer>
      </BodyContainer>
    </>
  );
};
const NaverLogin = styled.img`
  width: 337px;
  height: 55px;

`;
const GoogleLogin = styled.img`
  margin-top: 25px;
  width: 337px;
  height: 55px;
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

const Header = styled.div`
  position: relative;
  left: 23px;
  top: 19px;
  width: 100vw;
  height: 85px;
  background-color: #ffffff;
  overflow: hidden;
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
