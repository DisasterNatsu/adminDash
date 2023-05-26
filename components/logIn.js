import React, { useState } from "react";
import styles from "../styles/logIn.module.css";
import Image from "next/image";
import { Input, Spacer, Button } from "@nextui-org/react";
import { Axios } from "../utils/axios";
import Cookies from "js-cookie";
import Router from "next/router";

const LogIn = () => {
  // Define Your States Here

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const Submit = async (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
    };

    try {
      const isCorrect = await Axios.post("/admin/log-in", data); // Sending to backend for verification

      const response = await isCorrect.data;

      Cookies.set("ds-admin-token", response.data.token);

      Router.push("/dashboard");
    } catch (error) {
      setError(error.response.data.message);
      return setTimeout(() => {
        setError(undefined);
      }, 5000);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <div className={styles.left}>
          <Image src={"/logo.png"} alt="logo" width={400} height={400} />
          <h1>Disaster Scans</h1>
        </div>
        <div className={styles.right}>
          <form onSubmit={Submit} style={{ textAlign: "center" }}>
            <h1>Welcome Back!</h1>
            <h3>Log In</h3>
            <Spacer y={1.7} />
            <Input
              clearable
              labelPlaceholder="Email"
              width="20em"
              accept="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <Spacer y={1.7} />
            <Input.Password
              labelPlaceholder="Password"
              width="20em"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <Spacer y={1} />
            {error && <h6 style={{ color: "red" }}>{error}</h6>}
            <Spacer y={1} />
            <Button color="gradient" style={{ margin: "auto" }} type="submit">
              Log In
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
