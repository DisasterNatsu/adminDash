import Head from "next/head";
import React, { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
	const Router = useRouter();
	useEffect(() => {
		Router.push("/dashboard");
	}, []);
	return;
}
