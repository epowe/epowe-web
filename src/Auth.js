//리프레쉬 토큰 쿠키와 연결해서 다루는 페이지 입니다.
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
const cookies = new Cookies();

export function setRefreshTokenToCookie(refreshToken) {
  var decoded = jwt_decode(refreshToken);
  const expireDate = new Date(decoded.exp * 1000);
  console.log("리프레쉬 토큰의 만료일: " + expireDate);
  cookies.set("refreshToken", refreshToken, {
    sameSite: "Lax",
    expires: new Date(expireDate),
    httpOnly: false,
  });
  console.log("리프레쉬 토큰 쿠키에 생성 완료.");
  console.log("Auth 에서 쿠키에 저장한 리프레쉬 토큰은? " + getCookieToken());
}

export const getCookieToken = () => {
  console.log("auth 에서 쿠키 가져옴");
  return cookies.get("refreshToken");
};

export const removeCookieToken = () => {
  console.log("auth 에서 쿠키 삭제됨");
  return cookies.remove("refreshToken", { sameSite: "strict" });
};
