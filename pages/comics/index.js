import React, { useState } from "react";
import Layout from "../../components/layout/layout";
import styles from "../../styles/comics.module.css";
import Head from "next/head";
import { BiBookAdd } from "react-icons/bi";
import { TbEdit } from "react-icons/tb";
import { useRouter } from "next/router";
import Link from "next/link";
import NewComic from "../../components/newComicModal";

const Comics = () => {
  const Router = useRouter(); // Defining Router

  const [modalShow, setModalShow] = useState(false);

  // Redirecting to comic Editing Page

  const handleClick = (props) => {
    let comicName = props;
    for (let i = 0; i < comicName.length; i++) {
      comicName = comicName.replace(" ", "-");
    }
    const nameUrl = comicName;

    return Router.push(`/comics/${nameUrl}`);
  };

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
              {dummyData.map((data, index) => {
                return (
                  <tr
                    key={index}
                    onClick={() => handleClick(data.title.toLocaleLowerCase())}
                  >
                    <td>{data.id}</td>
                    <td>{data.title}</td>
                    <td>{data.totalChapters}</td>
                    <td>{data.status}</td>
                    <td>{data.genres.join(", ")}</td>
                    <td>{data.lastUpdated}</td>
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
    </Layout>
  );
};

const dummyData = [
  {
    id: 123,
    title: "Martial Peak",
    totalChapters: 51,
    status: "Ongoing",
    genres: [
      "Action",
      "Adventure",
      "Comedy",
      "Ecchi",
      "Harem",
      "Live Action",
      "Martial Arts",
    ],
    lastUpdated: "2 days ago",
  },
  {
    id: 125,
    title: "Yuan Zun",
    totalChapters: 51,
    status: "Ongoing",
    genres: [
      "Action",
      "Adventure",
      "Comedy",
      "Ecchi",
      "Harem",
      "Live Action",
      "Martial Arts",
    ],
    lastUpdated: "2 days ago",
  },
  {
    id: 128,
    title: "Apotheosis",
    totalChapters: 51,
    status: "Dropped",
    genres: [
      "Action",
      "Adventure",
      "Comedy",
      "Ecchi",
      "Harem",
      "Live Action",
      "Martial Arts",
    ],
    lastUpdated: "3 days ago",
  },
  {
    id: 123,
    title: "Martial Peak",
    totalChapters: 51,
    status: "Ongoing",
    genres: [
      "Action",
      "Adventure",
      "Comedy",
      "Ecchi",
      "Harem",
      "Live Action",
      "Martial Arts",
    ],
    lastUpdated: "2 days ago",
  },
];

export default Comics;
