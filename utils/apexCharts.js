import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import styles from "../styles/cards.module.css";
import dynamic from "next/dynamic";

const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

export const ExtendedCard = ({ params, setExtended }) => {
	const data = {
		options: {
			chart: {
				type: "area",
				height: "auto",
			},

			dropShadow: {
				enabled: false,
				enabledOnSeries: undefined,
				top: 0,
				left: 0,
				blur: 3,
				color: "#000",
				opacity: 0.35,
			},

			fill: {
				colors: ["#fff"],
				type: "gradient",
			},
			dataLabels: {
				enabled: false,
			},
			stroke: {
				curve: "smooth",
				colors: ["white"],
			},
			tooltip: {
				x: {
					format: "dd/MM/yy HH:mm",
				},
			},
			grid: {
				show: true,
			},
			xaxis: {
				type: "datetime",
				categories: [
					"2018-09-19T00:00:00.000Z",
					"2018-09-19T01:30:00.000Z",
					"2018-09-19T02:30:00.000Z",
					"2018-09-19T03:30:00.000Z",
					"2018-09-19T04:30:00.000Z",
					"2018-09-19T05:30:00.000Z",
					"2018-09-19T06:30:00.000Z",
				],
			},
		},
	};

	return (
		<div
			className={styles.extenedCard}
			style={{
				background: params.color.backGround,
				boxShadow: params.color.boxShadow,
			}}
		>
			<div>
				<AiOutlineCloseCircle onClick={setExtended} />
			</div>
			<span>{params.title}</span>
			<div className={styles.chartContainer}>
				<ApexCharts.Chart
					series={params.series}
					options={data.options}
					type="area"
				/>
			</div>
			<span>Last 24 hours</span>
		</div>
	);
};
