import React from "react";
import { cardsData } from "../data/cardData";
import styles from "../styles/mainDash.module.css";
import Cards from "./cards";
import Head from "next/head";

export const MainDash = () => {
	return (
		<div style={{ width: "100%" }}>
			<Head>
				<title>Disaster Admin - Dashboard</title>
			</Head>
			<div style={{ width: "100%" }}>
				<h1 className={"heading"}>Dashboard</h1>
			</div>
			<div className={styles.cards}>
				{cardsData.map((card, id) => {
					return (
						<div className={styles.parentContainer} key={id}>
							<Cards
								title={card.title}
								color={card.color}
								barValue={card.barValue}
								value={card.value}
								icon={card.icon}
								series={card.series}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
};
