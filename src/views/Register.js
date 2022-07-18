import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header.js";
import { API } from "../API";
const Register = () => {
  const navigate = useNavigate();
  const addressRef = useRef();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userProfile, setUserProfile] = useState("");

  const onRegister = () => {
    if (addressRef.current.value !== "") {
      //회원가입 처리하기
      navigate("/interview");
      giveAddress();
    } else {
      alert("사는 지역을 입력해주세요."); //-> modal로 바꾸기
    }
  };

  //클라이언트 API를 통해 유저의 정보를 가져오는 단계 입니다.
  const getUserInfo = async () => {
    var result = await API.authAfterLogin();
    if (result) {
      setUserEmail(result.email);
      setUserProfile(result.picture);
      setUserName(result.username);
    } else {
      console.log("사용자 데이터 잘 들어오지 않음");
    }
  };

  //회원가입하기 버튼 클릭시 클라이언트 API를 사용해서 백엔드로 데이터 옮기기
  const giveAddress = async () => {
    var result = await API.userPostAddress({ addressRef });
    if (result) {
      console.log("서버에 주소 데이터 전송 완료.");
    } else {
      console.log("서버에 주소 데이터 전송 실패.");
      console.log(result);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      <Header />
      <BodyContainer>
        <ButtonContainer>
          <Title>회원가입</Title>
          <ProfileContainer>
            <Span>
              <Image src={userProfile} />
            </Span>
            <Span>{userName}</Span>
            <Span>{userEmail}</Span>
          </ProfileContainer>
          <Input ref={addressRef} placeholder="사는 지역을 입력해주세요." />
          <Button onClick={onRegister}>회원가입하기</Button>
        </ButtonContainer>
      </BodyContainer>
    </>
  );
};

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

const ProfileContainer = styled.div`
  margin: 1rem;
  display: flex;
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
  background: #6c63ff;
  color: white;
  width: 90%;
  padding: 0.8rem;
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
  border: #6c63ff 0.125rem solid;
  outline: none;
  width: 90%;
  height: 50px;
  padding: 0 0 0 1rem;
  margin-top: 1rem;
  border-radius: 50px;
  font-size: 0.9rem;
`;

export default Register;
