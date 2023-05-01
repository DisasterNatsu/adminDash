import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import styles from "../styles/newComicModal.module.css";
import { GenreData } from "../utils/genreData";
import { Input, Spacer, Radio } from "@nextui-org/react";
import Cooke from "js-cookie";
import { useRouter } from "next/router";
import { Axios } from "../utils/axios";

const NewComic = (props) => {
  // Defining State

  const [comicName, setComicName] = useState("");
  const [desc, setDesc] = useState("");
  const [author, setAuthor] = useState("");
  const [artist, setArtist] = useState("");
  const [genres, setGenres] = useState([]);
  const [coverImage, setCoverImage] = useState();
  const [titleBadge, setTitleBadge] = useState("");
  const [origin, setOrigin] = useState("");
  const [status, setStatus] = useState("");

  // Defining Router

  const Router = useRouter();

  // Submit Function

  const Submit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Appening Data to Form Data

    // Appeding Comic Name
    formData.append("comicTitle", comicName);

    // Appeding Description

    formData.append("description", desc);

    // Appeding Origin

    formData.append("origin", origin);

    // Appeding Status

    formData.append("status", status);

    // Appeding Genres Array as a String

    formData.append("tags", JSON.stringify(genres));

    // Appeding Author

    formData.append("author", author);

    // Appeding Artist

    formData.append("artist", artist);

    // Appeding Cover Image

    formData.append("coverImage", coverImage);

    try {
      // Making A request to Backend using Axios

      // Getting Token
      console.log("I'm here");
      let token = Cooke.get("ds-admin-token");

      // Error handling if no token

      if (!token) {
        return Router.replace("/");
      }

      // If no error and a token

      const post = await Axios.post("/postComic/new", formData);

      const hasPosted = await post.data;

      console.log(hasPosted);
    } catch (error) {
      console.log(error);
    }
  };

  // Function for adding Genres to array

  const getGenres = (e) => {
    // Destructuring

    const { value, checked } = e.target;

    if (checked) {
      setGenres([...genres, value]);
    } else {
      setGenres(genres.filter((e) => e !== value));
    }
  };

  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable={true}
    >
      <form onSubmit={Submit}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            New Comic
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={styles.formContainer}>
            {/* Comic Name */}
            <label htmlFor="comicName">Comic Name:</label>
            <br />
            <input
              type="text"
              placeholder="e.g. Martial Peak"
              className={styles.textInput}
              onChange={(e) => setComicName(e.target.value)}
              required
            />

            {/* Description */}

            <label htmlFor="desc">Description:</label>
            <br />
            <textarea
              cols="30"
              rows="5"
              type="text"
              placeholder="e.g. Type the description of the Chat here"
              className={styles.textInput}
              onChange={(e) => setDesc(e.target.value)}
              required
            />

            {/* Author and Artist Flex Box */}

            <div style={{ display: "flex", gap: 5 }}>
              <div style={{ flex: "6" }}>
                <label htmlFor="author">Author:</label>
                <br />
                <input
                  type="text"
                  placeholder="e.g. Momo"
                  className={styles.textInput}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </div>
              <div style={{ flex: "6" }}>
                <label htmlFor="artist">Artist</label>
                <br />
                <input
                  type="text"
                  placeholder="e.g. Pikapi"
                  className={styles.textInput}
                  onChange={(e) => setArtist(e.target.value)}
                />
              </div>
            </div>
            <Spacer y={0.5} />
            <div style={{ display: "flex" }}>
              <div style={{ flexBasis: "60%" }}>
                <Input
                  label="Origin"
                  width="100%"
                  required
                  onChange={(e) => setOrigin(e.target.value)}
                />
              </div>
              <div style={{ flexBasis: "40%" }}>
                <Spacer y={1.4} />
                <Radio.Group orientation="horizontal" defaultValue="primary">
                  <Spacer y={0.5} />
                  <Radio
                    value="Ongoing"
                    color="success"
                    onClick={(e) => setStatus(e.target.value)}
                  >
                    Ongoing
                  </Radio>
                  <Radio
                    value="Completed"
                    color="warning"
                    onClick={(e) => setStatus(e.target.value)}
                  >
                    Completed
                  </Radio>
                  <Radio
                    value="Dropped"
                    color="error"
                    onClick={(e) => setStatus(e.target.value)}
                  >
                    Dropped
                  </Radio>
                </Radio.Group>
              </div>
            </div>

            {/* Checkboxes for Genres */}

            <div className={styles.flexCheckbox}>
              <label htmlFor="genre" style={{ flexBasis: "100%" }}>
                Genre:
              </label>
              {GenreData.map((data, i) => {
                return (
                  <div key={i}>
                    <span className={styles.genre}>{data.genre}</span>
                    <input
                      className={styles.genreCheckbox}
                      type="checkbox"
                      value={data.genre}
                      onChange={getGenres}
                    />
                  </div>
                );
              })}
              <textarea
                type="text"
                placeholder="e.g. Martial Peak"
                className={styles.textInput}
                value={genres.join(", ")}
                disabled
                required
              />
            </div>
            <label htmlFor="coverImage" style={{ marginRight: "1em" }}>
              Cover Image:
            </label>
            <input
              type="file"
              required
              onChange={(e) => setCoverImage(e.target.files[0])}
            />
            <span style={{ marginRight: "1em" }}>Title Badge:</span>

            {/* Hot */}

            <label htmlFor="trending" className={styles.hot}>
              TRENDING
            </label>
            <input
              type="radio"
              style={{ verticalAlign: "middle", marginRight: "1.5em" }}
              value={"TRENDING"}
              checked={titleBadge === "TRENDING"}
              onClick={() => setTitleBadge("TRENDING")}
            />

            {/* Mass Release */}

            <label htmlFor="massRelease" className={styles.mass}>
              MASS RELEASE
            </label>
            <input
              type="radio"
              style={{ verticalAlign: "middle", marginRight: "1.5em" }}
              value={"MASS RELEASE"}
              checked={titleBadge === "MASS RELEASE"}
              onClick={() => setTitleBadge("MASS RELEASE")}
            />

            {/* New */}

            <label htmlFor="new" className={styles.new}>
              NEW
            </label>
            <input
              type="radio"
              style={{ verticalAlign: "middle", marginRight: "1.5em" }}
              value={"NEW"}
              checked={titleBadge === "NEW"}
              onClick={() => setTitleBadge("NEW")}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="warning"
            type="submit"
            className={styles.Closebutton}
          >
            Submit
          </Button>
          <Button
            variant="danger"
            onClick={props.onHide}
            className={styles.Closebutton}
          >
            Close
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default NewComic;
