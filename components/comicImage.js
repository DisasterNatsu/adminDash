import React from "react";
import styles from "../styles/comicImage.module.css";
import { BiBookAdd } from "react-icons/bi";
import { Modal, useModal, Button } from "@nextui-org/react";
import NewChapterModal from "./newChapterModal";

const ComicImage = () => {
  const { setVisible, bindings } = useModal();
  // Define All states in the file here

  // Function for setting the Modal Show to false

  const hideModal = () => setVisible(false);

  return (
    <div div style={{ width: "100%" }}>
      <h1 className={`heading`} style={{ color: "transparent" }}>
        Edit Comic
      </h1>
      <div className={styles.container}>
        <img src="/mp.webp" alt="Cover" className={styles.coverImage} />
        <span>Click the image edit or update</span>
      </div>
      <div className={`${styles.container} ${styles.flexDisplay}`}>
        <Button color="gradient" onPress={() => setVisible(true)}>
          <div className={styles.newChapterButton}>
            Add New Chapter <BiBookAdd style={{ marginLeft: "5px" }} />
          </div>
        </Button>
        <Modal
          scroll
          width="1000px"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          {...bindings}
        >
          <NewChapterModal hideModal={hideModal} />
        </Modal>
      </div>
      <div className={styles.container}>
        <span>Fix Requests</span>
      </div>
    </div>
  );
};

export default ComicImage;
