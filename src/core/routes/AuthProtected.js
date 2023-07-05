import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useRefreshAccessToken } from "../pages/login/refreshToken";
import { useSelector } from "react-redux";
import { Oval } from "react-loader-spinner";

const AuthProtected = (props) => {
  const { access_token } = useSelector((state) => state.global);
  const { refreshAccessToken, loading } = useRefreshAccessToken();

  useEffect(() => {
    refreshAccessToken();
  }, [refreshAccessToken]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Oval
          height={30}
          width={30}
          color="#4fa94d"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#4fa94d"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    );
  }

  if (!access_token) {
    return (
      <Navigate to={{ pathname: "/login", state: { from: props.location } }} />
    );
  }

  return <>{props.children}</>;
};

export { AuthProtected };
