import React from "react";
import ComicImage from "../../../components/comicImage";
import EditComic from "../../../components/editComic";
import Layout from "../../../components/layout/layout";
import styles from "../../../styles/ComicDetails.module.css";
import { Axios } from "../../../utils/axios";

const ComicDetails = ({ comic }) => {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.details}>
          <EditComic comic={comic} />
        </div>
        <div className={styles.cover}>
          <ComicImage />
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps = async (context) => {
  const ComicRes = await Axios.get(`/comics/${context.params.comicName}`);
  const ChapterRes = await Axios.get(`/chapters/${context.params.comicName}`);

  const comic = await ComicRes.data;
  const chapters = await ChapterRes.data;

  if (!comic) {
    return {
      notFound: true,
    };
  }
  if (comic && chapters) {
    return {
      props: {
        comic,
        chapters,
      },
    };
  }
  return {
    props: {
      comic,
    },
  };
};

export default ComicDetails;
