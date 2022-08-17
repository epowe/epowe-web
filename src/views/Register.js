import React, { useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header.js";
import { API } from "../API";
import {
  removeCookieToken,
  getCookieToken,
  setRefreshTokenToCookie,
} from "../Auth";

import AppContext from "../AppContext";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const addressRef = useRef();
  const myContext = useContext(AppContext);

  const notify = (msg) =>
    toast(msg, {
      duration: 2500,
      style: {
        borderRadius: "50px",
      },
    });

  const onRegister = () => {
    if (addressRef.current.value !== "") {
      //회원가입 처리하기
      giveAddress();
      localStorage.setItem("address", true);
      console.log(addressRef.current.value);
      navigate("/interview");
      console.log("리프레쉬 토큰은???" + getCookieToken());
    } else {
      notify("사는 지역을 입력해주세요");
    }
  };

  //클라이언트 API를 통해 유저의 정보를 가져오는 단계 입니다.
  // const getUserInfo = async () => {
  //   var result = await API.authAfterLogin();
  //   if (result) {
  //     myContext.setUserEmail(result.email);
  //     setUserProfile(result.picture);
  //     setUserName(result.username);
  //   } else {
  //     console.log("사용자 데이터 잘 들어오지 않음");
  //   }

  //회원가입하기 버튼 클릭시 클라이언트 API를 사용해서 백엔드로 데이터 옮기기
  const giveAddress = async () => {
    var result = await API.userPostAddress({
      address: addressRef.current.value,
    });
    if (result) {
      console.log("서버에 주소 데이터 전송 완료.");
    } else {
      console.log("서버에 주소 데이터 전송 실패.");
      console.log(result);
    }
  };

  // useEffect(() => {
  //   getUserInfo();
  // }, []);

  return (
    <>
      <Header />
      <BodyContainer>
        <ButtonContainer>
          <Title>회원가입</Title>
          <ProfileContainer>
            <Span>
              <Image src={myContext.userProfile} />
            </Span>
            <Span>{myContext.userName}</Span>
            <Span>{myContext.userEmail}</Span>
          </ProfileContainer>
          <Input ref={addressRef} placeholder="사는 지역을 입력해주세요" />
          <Button onClick={onRegister}>회원가입하기</Button>
          <Toaster containerStyle={{ top: "5.1rem" }} />
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
  &:hover {
    background: #5850e6;
    transition: 0.3s;
  }
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