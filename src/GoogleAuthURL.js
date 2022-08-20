import Oauth2BaseURL from "./Oauth2BaseURL";
import Oauth2RedirectURL from "./Oauth2RedirectURI";

const GoogleAuthURL =
  "http://ec2-3-34-204-121.ap-northeast-2.compute.amazonaws.com:8080" +
  "/oauth2/authorization/google?redirect_uri=" +
  Oauth2RedirectURL;

export default GoogleAuthURL;
