import API_BASE_URL from "../API.js";
import OAUTH2_REDIRECT_URI from "./Oauth2RedirectURL.js";
export const NaverAuthURL = () => {
  API_BASE_URL +
    "/oauth2/authorization/naver?redirect_uri=" +
    OAUTH2_REDIRECT_URI;
};
