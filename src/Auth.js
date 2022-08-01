import Cookies from "universal-cookie";
const cookies = new Cookies();

export function setRefreshTokenToCookie(refreshToken) {
  const today = new Date();
  const expireDate = today.setDate(today.getDate() + 7);
  cookies.set("refreshToken", refreshToken, {
    sameSite: "Lax",
    expires: new Date(expireDate),
    httpOnly: false,
  });
  console.log("리프레쉬 토큰 쿠키에 생성 완료.");
  console.log("Auth 에서 쿠키에 저장한 리프레쉬 토큰은? " + getCookieToken());
}

export const getCookieToken = () => {
  return cookies.get("refreshToken");
};

export const removeCookieToken = () => {
  return cookies.remove("refreshToken", { sameSite: "Lax" });
};
