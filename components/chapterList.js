import React, { useState } from "react";
import { ChapterData } from "../data/dummyData";
import styles from "../styles/chapterList.module.css";
import { TbEdit } from "react-icons/tb";
import { Pagination } from "@nextui-org/react";

const ChapterList = ({ chapters }) => {
  // Define All Your States Here

  const [displayedChapter, setDisplayedChapter] = useState(chapters);
  const [ChaptersPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);

  // Get Current Chapters

  const indexOfLastChapter = currentPage * ChaptersPerPage; // Index of Last Comic
  const indexOfFirstChapter = indexOfLastChapter - ChaptersPerPage; // Index of First Comic
  const CurrentChapters = displayedChapter.slice(
    indexOfFirstChapter,
    indexOfLastChapter
  );

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
              <th>Uploaded At</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {CurrentChapters.map((data, id) => {
              return (
                <tr key={id}>
                  <td>{data.chapterID}</td>
                  <td>{data.chapterNumber}</td>
                  <td>{data.ChapterName && data.ChapterName}</td>
                  <td>{data.date}</td>
                  <td>
                    <TbEdit />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Pagination
        color={"gradient"}
        className="mt-3"
        total={30}
        initialPage={1}
        onChange={(e) => setCurrentPage(e)}
      />
    </div>
  );
};

export default ChapterList;
