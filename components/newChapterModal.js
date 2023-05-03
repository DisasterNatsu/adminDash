import React, { useState } from "react";
import styles from "../styles/newChapterModal.module.css";
import Cookie from "js-cookie";
import { Modal, Button } from "@nextui-org/react";
import { Axios } from "../utils/axios";
import { useRouter } from "next/router";

const NewChapterModal = ({ hideModal }) => {
  // Define Router

  const Router = useRouter();

  // Define all the states here

  const [chapterNumber, setChapterNumber] = useState("");
  const [chapterName, setChapterName] = useState("");
  const [zipFile, setZipFile] = useState();
  const [uploading, setUploading] = useState(false);
  const [uploadPercent, setUploadPercent] = useState();

  // Form submit button

  const handleSubmit = async (e) => {
    // Try Catch Block

    try {
      e.preventDefault();

      // Setting Uploading to true

      uploading === false ? setUploading(true) : null; // With Check

      // Getting Comic Name from query

      const param = Router.query.comicName.split("-");

      const paramName = param.splice(1, param.length - 1);

      // Changing the first letter of every String to upper Case

      for (let i = 0; i < paramName.length; i++) {
        paramName[i] =
          paramName[i].charAt(0).toUpperCase() + paramName[i].slice(1);
      }

      let comicTitle = paramName.join(" ");

      let comicID = Router.query.comicName.split("-").splice(0, 1)[0]; // Comic ID from Router Query Param

      const formData = new FormData();

      // Appending the File to form Data

      formData.append("pages", zipFile);

      // Appending Other Necessary Data

      formData.append("chapterNumber", Number(chapterNumber)); // Appening Chapter Number
      formData.append("chapterName", chapterName); // Appening Chapter Name
      formData.append("comicTitle", comicTitle); // Appening Comic Title
      formData.append("comicID", comicID); // Appening Comic ID

      // Getting Auth Token From Cookie

      let token = Cookie.get("ds-admin-token");

      // In case of no token or error

      if (!token) {
        Cookie.set("ds-admin-token", "");
        token = "";
      }
      // Now Sending the Post request to backend using Axios

      await Axios.post("/postChapter/", formData, {
        headers: { "ds-admin-auth": token },
        onUploadProgress: (ProgressEvent) => {
          let percentCompleted = Math.round(
            (ProgressEvent.loaded * 100) / ProgressEvent.total
          );
          setUploadPercent(percentCompleted);
        },
      }).then((response) => {
        console.log(response);
      });
    } catch (error) {
      setUploading(false);
      return console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Modal.Header>
        <h1 className={styles.heading}>New Chapter</h1>
      </Modal.Header>
      <Modal.Body>
        <div>
          {/* Chapter Number */}

          <label htmlFor="chapterNumber" className={styles.lables}>
            Chapter Number:
          </label>
          <br />
          <input
            required
            type="number"
            value={chapterNumber}
            className={`${styles.inputText} ${styles.numberInput}`}
            onChange={(e) => setChapterNumber(e.target.value)}
          />

          {/* Chapter Name */}

          <label htmlFor="chapterName" className={styles.lables}>
            Chapter Name:
          </label>
          <br />
          <input
            type="text"
            value={chapterName}
            className={styles.inputText}
            onChange={(e) => setChapterName(e.target.value)}
          />

          {/* Chapter Images */}

          <label
            htmlFor="pages"
            style={{ marginTop: "10px" }}
            className={styles.lables}
          >
            Upload File:{" "}
          </label>
          <input
            type="file"
            style={{ marginLeft: "15px" }}
            className={styles.lables}
            accept="application/zip"
            required
            onChange={(e) => setZipFile(e.target.files[0])}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onPress={hideModal}>
          Close
        </Button>
        <Button auto color="gradient" type="submit">
          Submit
        </Button>
      </Modal.Footer>
    </form>
  );
};

export default NewChapterModal;
