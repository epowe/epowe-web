import Cookies from "universal-cookie";
const cookies = new Cookies();

export function setRefreshTokenToCookie(refreshToken) {
  const today = new Date();
  console.log("Auth 접근 함.");
  const expireDate = today.setDate(today.getDate() + 7);
  cookies.set("refreshToken", refreshToken, {
    sameSite: "strict",
    expires: new Date(expireDate),
    httpOnly: false,
  });
}

export const getCookieToken = () => {
  return cookies.get("refreshToken");
};

export const removeCookieToken = () => {
  return cookies.remove("refreshToken", { sameSite: "strict" });
};
