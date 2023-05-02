import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LogIn from "../components/logIn";
import { Loading } from "@nextui-org/react";
import Cookie from "js-cookie";
import { Axios } from "../utils/axios";

const Home = () => {
  // Define States Here

  const [isVerified, setIsVerified] = useState(undefined);

  const Router = useRouter(); // Defining Router

  // Fuction for authenticating

  const Authenticate = async () => {
    let token = Cookie.get("ds-admin-token"); // Getting Token

    if (!token) {
      setIsVerified(false); // If there are no token
    }

    // Authenticating

    const Auth = await Axios.post("/admin/isAuth", null, {
      headers: {
        "ds-admin-auth": token,
      },
    });

    const isAuth = await Auth.data;

    if (isAuth.verified) {
      isAuth && setIsVerified(isAuth.verified);
      return Router.push("/dashboard");
    } else {
      setIsVerified(false);
    }
  };

  useEffect(() => {
    Authenticate();
  }, []);

  return (
    <>
      {isVerified === false ? (
        <LogIn />
      ) : (
        <div className="loadingDiv">
          <Loading
            color="warning"
            className="spinnerLoad"
            size="xl"
            loadingCss={{ $$loadingBorder: "10px" }}
          >
            Working
          </Loading>
        </div>
      )}
    </>
  );
};

export default Home;
