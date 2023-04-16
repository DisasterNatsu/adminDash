import React, { useState } from "react";
import styles from "../styles/cards.module.css";
import { LayoutGroup } from "framer-motion";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Cards = (props) => {
	return (
		<LayoutGroup>
			<CompactCard params={props} />
		</LayoutGroup>
	);
};

// Compact Card

const CompactCard = ({ params }) => {
	return (
		<div
			className={styles.compactCard}
			style={{
				background: params.color.backGround,
				boxShadow: params.color.boxShadow,
			}}
		>
			<div className={styles.radialBar}>
				<CircularProgressbar
					className={styles.progressbar}
					value={params.barValue}
					text={`${params.barValue}%`}
				/>
				<span>{params.title}</span>
			</div>
			<div className={styles.detail}>
				<params.icon />
				<span>{params.value}</span>
				<span>Last 24 hours</span>
			</div>
		</div>
	);
};

export default Cards;
