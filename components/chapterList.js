import React from "react";
import { ChapterData } from "../data/dummyData";
import styles from "../styles/chapterList.module.css";
import { TbEdit } from "react-icons/tb";

const ChapterList = () => {
	return (
		<div className={styles.container} style={{ marginBottom: "15px" }}>
			<h1 className={styles.heading}>Chapter List</h1>
			<div className={styles.tableContainer}>
				<table className={styles.table}>
					<thead>
						<tr>
							<th>Id</th>
							<th>Chapter Number</th>
							<th>Chapter Name</th>
							<th>Edit</th>
						</tr>
					</thead>
					<tbody>
						{ChapterData.map((data, id) => {
							return (
								<tr key={id}>
									<td>{data.id}</td>
									<td>{data.number}</td>
									<td>{data.name && data.name}</td>
									<td>
										<TbEdit />
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default ChapterList;
