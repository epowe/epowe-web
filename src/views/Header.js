import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import HeaderLogoI from "../images/HeaderLogo.png";
import "../App.css";
import { removeCookieToken } from "../Auth";

const Header = ({ isLogin }) => {
  const navigate = useNavigate();
  const onClickLogo = () => {
    if (localStorage.getItem("isLogged")) {
      navigate("/interview");
    } else {
      navigate("/");
      localStorage.clear();
      console.log("로그인된 상태가 아니여서 로그인 페이지로 이동 ");
    }
  };

  const onLogout = () => {
    //로그아웃 처리하기
    removeCookieToken();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("isLogged");
    console.log("로그아웃 되었습니다.");
    navigate("/");
  };

  return (
    <>
      <Container>
        <LogoContainer>
          <HeaderLogoImage src={HeaderLogoI} onClick={onClickLogo} />
          <HeaderLogo onClick={onClickLogo}>2-POW</HeaderLogo>
        </LogoContainer>
        {isLogin ? (
          <SmallContainer>
            <SmallButton onClick={onLogout}>로그아웃</SmallButton>
            <ProfileContainer onClick={() => navigate("/feedback")}>
              <Image src="https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png" />
              <Span>홍길동</Span>
            </ProfileContainer>
          </SmallContainer>
        ) : (
          ""
        )}
      </Container>
      <Line />
    </>
  );
};

const Container = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.2rem;
  width: 100vw;
  height: 5rem;
  background-color: #ffffff;
  overflow: hidden;
  z-index: 1;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const HeaderLogoImage = styled.img`
  width: 3rem;
  height: 3rem;
  cursor: pointer;
`;

const HeaderLogo = styled.div`
  position: relative;
  display: inline-block;
  margin: 0.8rem;
  text-align: center;
  font-family: Montserrat-Bold;
  display: inline-block;
  font-size: 1.4rem;
  color: #6c63ff;
  cursor: pointer;
`;

const SmallContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SmallButton = styled.button`
  border: none;
  border-radius: 50px;
  color: #ffffff;
  background: #6c63ff;
  height: 2rem;
  width: 5rem;
  font-family: SCDream-Regular;
  font-size: 0.7rem;
  padding: 0.5rem;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-contents: space-evenly;
  margin: 0 1rem;
  cursor: pointer;
`;

const Image = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  margin: 0 0.5rem;
`;

const Span = styled.span`
  font-family: SCDream-Regular;
  font-size: 0.8rem;
`;

const Line = styled.div`
  position: fixed;
  top: 5rem;
  left: 12rem;
  right: 0;
  height: 0.08rem;
  width: 90vw;
  background-color: #e0e0e0;
`;

export default Header;
