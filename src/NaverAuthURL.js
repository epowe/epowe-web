import ApiBaseURL from "./ApiBaseURL";
import Oauth2BaseURL from "./Oauth2BaseURL";
import Oauth2RedirectURL from "./Oauth2RedirectURI";

const NaverAuthURL =
  Oauth2BaseURL +
  "/oauth2/authorization/naver?redirect_uri=" +
  Oauth2RedirectURL;

export default NaverAuthURL;
