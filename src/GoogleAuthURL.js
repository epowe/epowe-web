import Oauth2BaseURL from "./Oauth2BaseURL";
import Oauth2RedirectURL from "./Oauth2RedirectURI";

const GoogleAuthURL =
  Oauth2BaseURL +
  "/oauth2/authorization/google?redirect_uri=" +
  Oauth2RedirectURL;

export default GoogleAuthURL;
