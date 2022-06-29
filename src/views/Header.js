import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import HeaderLogoI from "../images/HeaderLogo.png";
import "../App.css";

const Header = () => {
    const navigate = useNavigate();
    const onClickLogo = () => {
      navigate("/");
    };
    return (
      <>
        <Container>
          <HeaderLogoImage src={HeaderLogoI} onClick={onClickLogo} />
          <HeaderLogo>2-POW</HeaderLogo>
          <Line />
        </Container>
      </>
    );
};

const Container = styled.div`
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

export default Header;