// import React, { useEffect } from "react";
// import { useParams } from "react-router";

// function GoogleLoginRedirect() {
//   const params = useParams();

//   useEffect(() => {
//     localStorage.clear();
//     localStorage.setItem("token", params.token);
//     console.log(params.token);
//     window.location.replace("/");
//   }, []);

//   return <></>;
// }

// export default GoogleLoginRedirect;
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import React, { useEffect } from "react";
import axios from "axios";
import ApiBaseURL from "../ApiBaseURL";
const GoogleLoginRedirect = ({ location }) => {
  const params = new URLSearchParams(window.location.search);
  let userToken = params.get("userToken");
  let getParameter = (key) => {
    return new URLSearchParams(window.location.search).get(key);
  };
  let userToken2 = getParameter("userToken");

  useEffect(() => {
    {
      userToken2
        ? localStorage.setItem("jwtToken", userToken2)
        : console.log("토큰을 못 받아옴");
    }
    console.log(
      localStorage.getItem("jwtToken") + "토큰을 localStorage에 저장했다."
    );
  }, []);

  return <></>;
};

export default GoogleLoginRedirect;
