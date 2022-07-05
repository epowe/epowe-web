import API_BASE_URL from "../API.js";
import OAUTH2_REDIRECT_URI from "./Oauth2RedirectURL";

export const GoogleAuthURL = () => {
  API_BASE_URL +
    "/oauth2/authorization/google?redirect_uri=" +
    OAUTH2_REDIRECT_URI;
};
