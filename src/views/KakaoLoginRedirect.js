import React, { useEffect } from "react";
import { useParams } from "react-router";

// 받아온 access token을 local storage에 token이라는 이름으로 저장한다.
//Local Storage: 해당 도메인에 영구 저장하고 싶을 때
// Session Storage: 해당 도메인의, 한 세션에서만 저장하고 싶을 때 (창 닫으면 data 날아감)
// Cookie: 해당 도메인에 날짜를 설정하고 그 때까지만 저장하고 싶을 때
function KakaoLoginRedirect() {
  const params = useParams();

  useEffect(() => {
    localStorage.clear();
    localStorage.setItem("token", params.token);
    window.location.replace("/");
  }, []);

  return <></>;
}

export default KakaoLoginRedirect;
