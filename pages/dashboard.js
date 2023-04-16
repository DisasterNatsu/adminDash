import Image from "next/image";
import styles from "../styles/Home.module.css";
import Sidebar from "../components/sidebar";
import Layout from "../components/layout/layout";
import { MainDash } from "../components/mainDash";

export default function Dashboard() {
	return (
		<Layout>
			<MainDash />
		</Layout>
	);
}
