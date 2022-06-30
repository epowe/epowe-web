import React from 'react'
import styled from "styled-components";
import Header from "./Header.js";

const Register = () => {
  return (
    <>
      <Header/>
      <BodyContainer>
        <ButtonContainer>
          <Title>회원가입</Title>
          <Input placeholder="사는 지역을 입력해주세요." />
          <Button>
            회원가입하기
          </Button>   
        </ButtonContainer>
      </BodyContainer>
    </>
  )
}

const BodyContainer = styled.div`
  width: 100vw;
  height: 80vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
`;

const Title = styled.div`
  font-family: 'Montserrat';
  font-weight: bold;
  font-size: 24px;
  text-align: center;
  margin: 0;
`;

const Button = styled.button`
  box-sizing: border-box;
  background: #6C63FF;
  color: white;
  width: 100%;
  padding: 15px;
  margin-top: 20vh;
  border: none;
  border-radius: 50px;
  font-family: Montserrat-Bold;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  text-align: center;
`;

const Input = styled.input`
  box-sizing: border-box;
  border: #6C63FF 2px solid;
  outline: none;
  width: 100%;
  height: 50px;
  padding: 0 0 0 15px;
  margin-top: 5vh;
  border-radius: 50px;
  font-family: Montserrat-Bold;
  font-size: 15px;
`;

export default Register