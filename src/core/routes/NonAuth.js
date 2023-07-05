import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useRefreshAccessToken } from "../pages/login/refreshToken";
import { useSelector } from "react-redux";

const NonAuth = (props) => {
  const { access_token } = useSelector(state => state.global);
  const { refreshAccessToken } = useRefreshAccessToken();

  useEffect(() => {
    refreshAccessToken();
  }, [refreshAccessToken]);


  if (access_token) {
    return (
      <Navigate to={{ pathname: "/", state: { from: props.location } }} />
    );
  }

  return <>{props.children}</>;
};


export { NonAuth };