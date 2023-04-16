import React from "react";
import styles from "../styles/comicImage.module.css";

const ComicImage = () => {
	return (
		<div div style={{ width: "100%" }}>
			<h1 className={`heading`} style={{ color: "transparent" }}>
				Edit Comic
			</h1>
			<div className={styles.container}>
				<img src="/mp.webp" alt="Cover" className={styles.coverImage} />
				<span>Click the image edit or update</span>
			</div>
			<div className={styles.container}>
				<span>Fix Requests</span>
			</div>
		</div>
	);
};

export default ComicImage;
