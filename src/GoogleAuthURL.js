import ApiBaseURL from "./ApiBaseURL";
import Oauth2RedirectURL from "./Oauth2RedirectURI";

const GoogleAuthURL =
  ApiBaseURL + "/oauth2/authorization/google?redirect_uri=" + Oauth2RedirectURL;

export default GoogleAuthURL;
