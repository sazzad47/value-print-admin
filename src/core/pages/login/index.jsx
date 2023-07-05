import React, { useState } from "react";
import LoginPage from "./Login";
import VerifyLogin from "./VerifyLogin";

export default function Auth() {
  const [sentCode, setSentCode] = useState(false);

  const [userData, setUserData] = useState({
    email: "",
    password: "",
    code: null,
  });

  return (
    <>
      {sentCode ? (
        <LoginPage userData={userData} setUserData={setUserData} />
      ) : (
        <VerifyLogin
          userData={userData}
          setUserData={setUserData}
          setSentCode={setSentCode}
        />
      )}
    </>
  );
}
