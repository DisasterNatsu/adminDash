import React, { useState } from "react";
import Layout from "../../components/layout/layout";
import styles from "../../styles/comics.module.css";
import Head from "next/head";
import { BiBookAdd } from "react-icons/bi";
import { TbEdit } from "react-icons/tb";
import { useRouter } from "next/router";
import { Axios } from "../../utils/axios";
import NewComic from "../../components/newComicModal";
import { Pagination } from "@nextui-org/react";
import { DiscussionEmbed } from "disqus-react";

const Comics = ({ props }) => {
  const Router = useRouter(); // Defining Router

  // Difine your states here

  const [modalShow, setModalShow] = useState(false);
  const [comicsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [comic] = useState(props.comics);

  // Get Current Comics

  const indexOfLastComic = currentPage * comicsPerPage; // Index of Last Comic
  const indexOfFirstComic = indexOfLastComic - comicsPerPage; // Index of First Comic
  const currentComics =
    comic && comic.slice(indexOfFirstComic, indexOfLastComic); // Slicing The Page

  return (
    <Layout>
      <Head>
        <title>Disaster Admin - Comics</title>
      </Head>
      <div className={styles.container}>
        {/* Heading */}
        <div className={styles.headingButton}>
          <h1 className="heading">Comics</h1>
          <button className={styles.button} onClick={() => setModalShow(true)}>
            <span>
              <BiBookAdd /> Add New
            </span>
          </button>
          <NewComic show={modalShow} onHide={() => setModalShow(false)} />
        </div>

        {/* Table Container */}
        {comic ? (
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Comic Title</th>
                  <th>No. of Chapt</th>
                  <th>Status</th>
                  <th>Genres</th>
                  <th>Last Updated</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {currentComics.map((data, index) => {
                  let genre = data.Genres;

                  const handleClick = () => {
                    let comicName = data.ComicTitle.toLowerCase();
                    for (let i = 0; i < comicName.length; i++) {
                      comicName = comicName.replace(" ", "-");
                    }
                    const name = comicName;

                    const nameUrl = data.id + "-" + name;

                    return Router.push(`/comics/${nameUrl}`);
                  };

                  return (
                    <tr key={index} onClick={() => handleClick()}>
                      <td>{data.id}</td>
                      <td>{data.ComicTitle}</td>
                      <td>{data.totalChapters}</td>
                      <td>{data.Status}</td>
                      <td>{genre}</td>
                      <td>{data.Date}</td>
                      <td>
                        <TbEdit />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <Pagination
              color={"gradient"}
              className="mt-3"
              total={30}
              initialPage={1}
              onChange={(e) => setCurrentPage(e)}
            />
          </div>
        ) : (
          <h1 style={{ textAlign: "center", marginTop: "2em" }}>
            No Comics Found
          </h1>
        )}
      </div>
    </Layout>
  );
};

Comics.getInitialProps = async () => {
  const response = await Axios.get("/comics/all/comics");

  const comics = await response.data;

  return {
    props: {
      comics,
    },
  };
};

export default Comics;
