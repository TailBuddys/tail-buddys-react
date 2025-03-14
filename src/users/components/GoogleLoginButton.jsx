import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import useUsers from "../hooks/useUsers";

const GoogleLoginButton = () => {
  const { handleLogin } = useUsers();

  return (
    // לאבטח קליינט ID
    <GoogleOAuthProvider clientId="120433266070-4uvh1add8411p4se8j310n9pait1nll7.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          const userToLogin = {
            email: null,
            password: null,
            googleId: credentialResponse.credential,
          };
          handleLogin(userToLogin);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
