import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import HeaderLogoI from "../images/HeaderLogo.png";

const MainPage = () => {
  const navigate = useNavigate();
  const onClickLogo = () => {
    navigate("/");
  };
  return (
    <Container>
      <Header>
        <HeaderLogoImage src={HeaderLogoI} onClick={onClickLogo} />
        <HeaderLogo>Epowe</HeaderLogo>
      </Header>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #ffffff;
  overflow: hidden;
`;
const Header = styled.div`
  position: relative;
  left: 23px;
  top: 19px;
  width: 100vw;
  height: 100vh;
  background-color: #ffffff;
  overflow: hidden;
`;

const HeaderLogoImage = styled.img`
  width: 51px;
  height: 51px;
  cursor: pointer;
`;

const HeaderLogo = styled.div`
  font-family: Montserrat-SemiBold;
  font-size: 22px;
  color: #6c63ff;
  cursor: pointer;
`;
const UserContainer = styled.div`
  position: absolute;
  right: 0px;
`;
export default MainPage;
