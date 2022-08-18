import ApiBaseURL from "./ApiBaseURL";
import Oauth2RedirectURL from "./Oauth2RedirectURI";

const NaverAuthURL =
  ApiBaseURL + "/oauth2/authorization/naver?redirect_uri=" + Oauth2RedirectURL;

export default NaverAuthURL;
