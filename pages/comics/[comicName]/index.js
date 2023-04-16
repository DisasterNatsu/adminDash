import React from "react";
import ComicImage from "../../../components/comicImage";
import EditComic from "../../../components/editComic";
import Layout from "../../../components/layout/layout";
import styles from "../../../styles/ComicDetails.module.css";

const ComicDetails = () => {
	return (
		<Layout>
			<div className={styles.container}>
				<div className={styles.details}>
					<EditComic />
				</div>
				<div className={styles.cover}>
					<ComicImage />
				</div>
			</div>
		</Layout>
	);
};

export default ComicDetails;
