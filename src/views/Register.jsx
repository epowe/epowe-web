import React, { useRef, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header.js";
import { API } from "../API";
import { getCookieToken } from "../Auth";

import AppContext from "../AppContext";
import toast, { Toaster } from "react-hot-toast";
import { Modal } from "react-bootstrap";

const Register = () => {
  const navigate = useNavigate();
  const addressRef = useRef();
  const myContext = useContext(AppContext);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const notify = (msg) =>
    toast(msg, {
      duration: 2500,
      style: {
        borderRadius: "50px",
      },
    });

  const onRegister = () => {
    let checkBox = document.getElementById('checkBox');
    let text = document.getElementById('text');
    
    if (addressRef.current.value !== "") {
      //개인정보처리 동의 확인
      if (checkBox.checked !== true) {
        text.style.display = 'block';
        return;
      }
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

  const onCheck = () => {
    let checkBox = document.getElementById('checkBox');
    let text = document.getElementById('text');

    if(checkBox.checked === true) {
      text.style.display = "none";
    } else {
      text.style.display = "block";
    }
  };

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
          <br />
          <p id="text" style={{display: 'none', fontSize: '0.8rem', color: '#6c63ff'}}>회원가입을 진행하려면 동의해주세요.</p>
          <label>
            <input id="checkBox" type="checkbox" onClick={onCheck} style={{marginRight: '0.5rem'}}/>
            <font style={{fontSize: '0.8rem'}}>본인은 <button onClick={handleShow} style={{border: '0', color: '#6c63ff', background: 'none', padding: '0', textDecoration: 'underline', cursor: 'pointer'}} data-toggle="modal" data-target="#exampleModal">개인정보처리방침</button>을 읽었으며 이에 동의합니다.</font>
          </label>
          <Button onClick={onRegister}>회원가입하기</Button>
          <Modal size="lg" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>개인정보처리방침</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p> </p><p class="ls2 lh6 bs5 ts4"><em class="emphasis">&lt; epowe &gt;('www.2-pow.com'이하 'epowe')</em>은(는) 「개인정보 보호법」 제30조에 따라 정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.</p><p class="ls2"><br /></p><p class="sub_p mgt30"><strong>제1조(개인정보의 처리목적)<br /><br />&lt; epowe &gt;(이)가 개인정보 보호법 제32조에 따라 등록․공개하는 개인정보파일의 처리목적은 다음과 같습니다.</strong></p><ul class="list_indent2 mgt10"><li class="tt"><b>1. 개인정보 파일명 : 사용자 주소 정보</b></li><li>개인정보의  처리목적 : 사용자 주소를 받기 위함</li><li>수집방법 : 홈페이지</li><li>보유근거 : 정보주체 동의</li><li>보유기간 : 영구</li><li>관련법령 : 신용정보의 수집/처리 및 이용 등에 관한 기록 : 3년</li></ul><ul class="list_indent2 mgt10"><li class="tt"><b>2. 개인정보 파일명 : 사용자 면접 영상</b></li><li>개인정보의  처리목적 : 면접 영상을 통해 사투리 교정을 하기 위함</li><li>수집방법 : 홈페이지</li><li>보유근거 : 정보주체 동의</li><li>보유기간 : 영구</li><li>관련법령 : 신용정보의 수집/처리 및 이용 등에 관한 기록 : 3년</li></ul><br /><br /><p class="lh6 bs4"><strong>제2조(처리하는 개인정보의 항목) </strong><br /><br /> ① <em class="emphasis">&lt; epowe &gt;</em>은(는) 다음의 개인정보 항목을 처리하고 있습니다.</p><ul class="list_indent2 mgt10"><li class="tt">1&lt; 사용자 주소 정보 &gt;</li><li>필수항목 : 자택주소</li><li>선택항목 : </li></ul><ul class="list_indent2 mgt10"><li class="tt">2&lt; 사용자 면접 영상 &gt;</li><li>필수항목 : 영상</li><li>선택항목 : </li></ul><br /><br /><p class="lh6 bs4"><strong>제3조(개인정보의 파기절차 및 파기방법)<em class="emphasis"></em></strong></p><p class="ls2"><em class="emphasis"><br />① &lt; epowe &gt; 은(는) 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.<br /><br />② 정보주체로부터 동의받은 개인정보 보유기간이 경과하거나 처리목적이 달성되었음에도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야 하는 경우에는, 해당 개인정보를 별도의 데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다.<br />1. 법령 근거 :<br />2. 보존하는 개인정보 항목 : 계좌정보, 거래날짜<br /><br />③ 개인정보 파기의 절차 및 방법은 다음과 같습니다.<br />1. 파기절차<br /> &lt; epowe &gt; 은(는) 파기 사유가 발생한 개인정보를 선정하고, &lt; epowe &gt; 의 개인정보 보호책임자의 승인을 받아 개인정보를 파기합니다.<br /></em></p><p class="sub_p mgt10"><em class="emphasis">2. 파기방법</em></p><p class="sub_p"><em class="emphasis">전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용합니다</em></p><em class="emphasis"><br /><br /><p class="lh6 bs4"><strong>제4조(정보주체와 법정대리인의 권리·의무 및 그 행사방법에 관한 사항)</strong></p><p class="ls2"><br /><br />① 정보주체는 epowe에 대해 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다.</p><p class="sub_p">② 제1항에 따른 권리 행사는epowe에 대해 「개인정보 보호법」 시행령 제41조제1항에 따라 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며 epowe은(는) 이에 대해 지체 없이 조치하겠습니다.</p><p class="sub_p">③ 제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다.이 경우 “개인정보 처리 방법에 관한 고시(제2020-7호)” 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.</p><p class="sub_p">④ 개인정보 열람 및 처리정지 요구는  「개인정보 보호법」  제35조 제4항, 제37조 제2항에 의하여 정보주체의 권리가 제한 될 수 있습니다.</p><p class="sub_p">⑤ 개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수 없습니다.</p><p class="sub_p">⑥ epowe은(는) 정보주체 권리에 따른 열람의 요구, 정정·삭제의 요구, 처리정지의 요구 시 열람 등 요구를 한 자가 본인이거나 정당한 대리인인지를 확인합니다.</p><br /><br /><p class="lh6 bs4"><strong>제5조(개인정보의 안전성 확보조치에 관한 사항)<em class="emphasis"><br /><br />&lt; epowe &gt;</em>은(는) 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.</strong></p><p class="sub_p mgt10">1. 정기적인 자체 감사 실시<br /> 개인정보 취급 관련 안정성 확보를 위해 정기적(분기 1회)으로 자체 감사를 실시하고 있습니다.<br /><br />2. 개인정보에 대한 접근 제한<br /> 개인정보를 처리하는 데이터베이스시스템에 대한 접근권한의 부여,변경,말소를 통하여 개인정보에 대한 접근통제를 위하여 필요한 조치를 하고 있으며 침입차단시스템을 이용하여 외부로부터의 무단 접근을 통제하고 있습니다.<br /><br /></p><br /><br /><p class="lh6 bs4"><strong>제6조(개인정보를 자동으로 수집하는 장치의 설치·운영 및 그 거부에 관한 사항)</strong></p><p class="ls2"><br /><br />① epowe 은(는) 이용자에게 개별적인 맞춤서비스를 제공하기 위해 이용정보를 저장하고 수시로 불러오는 ‘쿠키(cookie)’를 사용합니다.<br />② 쿠키는 웹사이트를 운영하는데 이용되는 서버(http)가 이용자의 컴퓨터 브라우저에게 보내는 소량의 정보이며 이용자들의 PC 컴퓨터내의 하드디스크에 저장되기도 합니다.<br />가. 쿠키의 사용 목적 : 이용자가 방문한 각 서비스와 웹 사이트들에 대한 방문 및 이용형태, 인기 검색어, 보안접속 여부, 등을 파악하여 이용자에게 최적화된 정보 제공을 위해 사용됩니다.<br />나. 쿠키의 설치•운영 및 거부 : 웹브라우저 상단의 도구&gt;인터넷 옵션&gt;개인정보 메뉴의 옵션 설정을 통해 쿠키 저장을 거부 할 수 있습니다.<br />다. 쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이 발생할 수 있습니다.</p><p class="sub_p mgt30"><strong>제7조 (개인정보 보호책임자에 관한 사항) </strong></p><p class="sub_p mgt10"> ①  <span class="colorLightBlue">epowe</span> 은(는) 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.</p><ul class="list_indent2 mgt10"><li class="tt">▶ 개인정보 보호책임자 </li><li>성명 :고동천</li><li>직책 :팀장</li><li>직급 :대표</li><li>연락처 :010-8252-3196, ehdcjs159@naver.com</li></ul><p class="sub_p">※ 개인정보 보호 담당부서로 연결됩니다.</p><p> </p><ul class="list_indent2 mgt10"><li class="tt">▶ 개인정보 보호 담당부서</li><li>부서명 :</li><li>담당자 :</li><li>연락처 :, , </li></ul><p class="sub_p">② 정보주체께서는 epowe 의 서비스(또는 사업)을 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자 및 담당부서로 문의하실 수 있습니다. epowe 은(는) 정보주체의 문의에 대해 지체 없이 답변 및 처리해드릴 것입니다.</p><p class="sub_p mgt30"><strong>제8조(개인정보의 열람청구를 접수·처리하는 부서)<br /> 정보주체는 ｢개인정보 보호법｣ 제35조에 따른 개인정보의 열람 청구를 아래의 부서에 할 수 있습니다.<br />&lt; epowe &gt;은(는) 정보주체의 개인정보 열람청구가 신속하게 처리되도록 노력하겠습니다. </strong></p><ul class="list_indent2 mgt10"><li class="tt">▶ 개인정보 열람청구 접수·처리 부서 </li><li>부서명 : </li><li>담당자 : </li><li>연락처 : , , </li></ul><br /><br /><p class="lh6 bs4"><strong>제9조(정보주체의 권익침해에 대한 구제방법)<em class="emphasis"></em></strong></p><br /><br />정보주체는 개인정보침해로 인한 구제를 받기 위하여 개인정보분쟁조정위원회, 한국인터넷진흥원 개인정보침해신고센터 등에 분쟁해결이나 상담 등을 신청할 수 있습니다. 이 밖에 기타 개인정보침해의 신고, 상담에 대하여는 아래의 기관에 문의하시기 바랍니다.<br /><br />



              1. 개인정보분쟁조정위원회 : (국번없이) 1833-6972 (www.kopico.go.kr)<br />

              2. 개인정보침해신고센터 : (국번없이) 118 (privacy.kisa.or.kr)<br />

              3. 대검찰청 : (국번없이) 1301 (www.spo.go.kr)<br />

              4. 경찰청 : (국번없이) 182 (ecrm.cyber.go.kr)<br /><br />



            「개인정보보호법」제35조(개인정보의 열람), 제36조(개인정보의 정정·삭제), 제37조(개인정보의 처리정지 등)의 규정에 의한 요구에 대 하여 공공기관의 장이 행한 처분 또는 부작위로 인하여 권리 또는 이익의 침해를 받은 자는 행정심판법이 정하는 바에 따라 행정심판을 청구할 수 있습니다.<br /><br />



            ※ 행정심판에 대해 자세한 사항은 중앙행정심판위원회(www.simpan.go.kr) 홈페이지를 참고하시기 바랍니다.<br /><br /><p class="lh6 bs4"><strong>제10조(개인정보 처리방침 변경)<em class="emphasis"></em></strong></p><br /><p></p><p class="sub_p">① 이 개인정보처리방침은 2022년 8월 20부터 적용됩니다.</p><p class="sub_p"></p><p class="sub_p"></p>


            </em>
            </Modal.Body>
          </Modal>
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
