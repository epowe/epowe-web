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
        <Line />
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
  font-family: Montserrat-SemiBold;
  font-size: 22px;
  color: #6c63ff;
  cursor: pointer;
`;

const Line = styled.div`
  height: 1px;
  width: 1026px;
  background-color: #e0e0e0;
  margin-left: 238px;
`;

export default MainPage;
