import React, { useRef } from 'react'
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header.js";

const Register = () => {
  const navigate = useNavigate();
  const addressRef = useRef();

  const onRegister = () => {
    if (addressRef.current.value !== "") {
      //회원가입 처리하기
      navigate('/interview');
    } else {
      alert('사는 지역을 입력해주세요.') //-> modal로 바꾸기
    }
  };

  return (
    <>
      <Header/>
      <BodyContainer>
        <ButtonContainer>
          <Title>회원가입</Title>
          <ProfileContainer>
            <Span><Image src="https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"/></Span>
            <Span>홍길동</Span>
            <Span>example@naver.com</Span>
          </ProfileContainer>
          <Input ref={addressRef} placeholder="사는 지역을 입력해주세요." />
          <Button onClick={onRegister}>
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

const ProfileContainer = styled.div`
  margin: 1rem;
  display:flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const Span = styled.span`
  margin-top: 1rem;
  font-family: SCDream-Regular;
`;

const Image = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 20em;
`;

const Title = styled.div`
  font-family: SCDream-Regular;
  font-size: 1.5rem;
  text-align: center;
  margin: 0;
`;

const Button = styled.button`
  box-sizing: border-box;
  background: #6C63FF;
  color: white;
  width: 90%;
  padding: 1rem;
  margin-top: 1.5rem;
  outline: none;
  border: 0;
  border-radius: 50px;
  font-family: SCDream-Regular;
  font-size: 1rem;
  cursor: pointer;
  text-align: center;
`;

const Input = styled.input`
  box-sizing: border-box;
  border: #6C63FF 0.125rem solid;
  outline: none;
  width: 90%;
  height: 50px;
  padding: 0 0 0 1rem;
  margin-top: 1rem;
  border-radius: 50px;
  font-size: 0.9rem;
`;

export default Register