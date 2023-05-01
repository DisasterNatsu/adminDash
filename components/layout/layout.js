import React, { useState, useEffect } from "react";
import Sidebar from "../sidebar";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import { Axios } from "../../utils/axios";

const Layout = ({ children }) => {
  const [userName, setUserName] = useState();
  const [verified, setVerified] = useState(false);
  // Defining Router

  const Router = useRouter();

  const isTokenAuth = async () => {
    // Getting token from cookies

    let token = Cookie.get("ds-admin-token");

    // If there are no token

    if (!token) {
      return Router.replace("/");
    }

    // Sending token to backend for verification

    const Auth = await Axios.post("/admin/isAuth", null, {
      headers: {
        "ds-admin-auth": token,
      },
    });

    const isAuth = await Auth.data;

    console.log(isAuth);

    if (isAuth.verified) {
      isAuth && setUserName(isAuth.UserName.UserName);
      isAuth && setVerified(isAuth.verified);
      return;
    } else {
      return Router.replace("/");
    }
  };

  useEffect(() => {
    isTokenAuth();
  }, [Router.pathname]);

  return (
    <>
      {verified ? (
        <div style={{ width: "100%" }}>
          <Sidebar />
          <div className="main">{children}</div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Layout;
