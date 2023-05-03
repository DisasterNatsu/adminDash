import React, { useState } from "react";
import styles from "../styles/editComics.module.css";
import { GenreData } from "../utils/genreData";
import ChapterList from "./chapterList";

const EditComic = ({ comic }) => {
  // Parsing the Genre Array

  const genre = JSON.parse(comic.Genres);

  // Define all States here
  console.log(comic);
  const [status, setStatus] = useState(comic.Status);
  const [comicName, setComicName] = useState("");
  const [desc, setDesc] = useState("");
  const [tags, setTags] = useState(comic.Badges);
  const [genres, setGenres] = useState(genre);

  // Function for submitting

  const submit = async (e) => {
    e.preventDefault();
    console.log("Submit");
  };

  // Checkbox function for Hot, Mass Release and New

  const checkBox = (e) => {
    setTags(e.target.value);
  };

  // CheckBox Function for Genres

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
    <div style={{ width: "100%" }}>
      <form onSubmit={submit}>
        <h1 className={`heading ${styles.heading}`}>Edit Comic</h1>

        {/* Comic Name and Descriptoin */}

        <div className={styles.container}>
          <label htmlFor="comicName" className={styles.lables}>
            Name:
          </label>
          <input
            type="text"
            placeholder="Comic Name"
            id="comicName"
            className={styles.name}
            defaultValue={comic.ComicTitle}
            onChange={(e) => setComicName(e.target.value)}
          />
          <label htmlFor="desc" className={styles.lables}>
            Description:
          </label>
          <textarea
            cols="30"
            rows="7"
            type="text"
            placeholder="Description"
            id="desc"
            className={styles.desc}
            defaultValue={comic.Description}
            onChange={(e) => setDesc(e.target.value)}
          />

          <div className={styles.radioCotainer}>
            <h1>Status:</h1>
            <label htmlFor="ongoing">Ongoing</label>
            <input
              type="radio"
              id="ongoing"
              value={"Ongoing"}
              checked={status === "Ongoing"}
              onFocus={(e) => setStatus(e.target.value)}
            />
            <label htmlFor="dropped">Dropped</label>
            <input
              type="radio"
              id="dropped"
              value={"Dropped"}
              checked={status === "Dropped"}
              onFocus={(e) => setStatus(e.target.value)}
            />
            <label htmlFor="finished">Finished</label>
            <input
              type="radio"
              id="finished"
              value={"Finished"}
              checked={status === "Finished"}
              onFocus={(e) => setStatus(e.target.value)}
            />
          </div>
        </div>

        {/* Comic Extra Info */}

        <div
          className={styles.container}
          style={{
            marginTop: "2rem",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "1em",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h2 className={styles.secondHeading}>Comic Extra Info</h2>

          {/* Author */}

          <div className={styles.flexDisplay}>
            <label htmlFor="author" className={styles.lables}>
              Author:
            </label>
            <input
              type="text"
              id="author"
              className={styles.extra}
              defaultValue={comic.Author}
              onChange={(e) => setStatus(e.target.value)}
            />
          </div>

          {/* Artist */}

          <div className={styles.flexDisplay}>
            <label htmlFor="artist" className={styles.lables}>
              Artist:
            </label>
            <input
              type="text"
              id="artist"
              className={styles.extra}
              defaultValue={comic.Artist}
              onChange={(e) => setStatus(e.target.value)}
            />
          </div>
          <div className={styles.flexDisplay}>
            {/* Hot */}

            <label htmlFor="hot">
              <span className={styles.hot}>TRENDING</span>
            </label>
            <input
              type="radio"
              style={{ marginRight: "1em" }}
              value="TRENDING"
              checked={tags === "TRENDING"}
              onFocus={checkBox}
            />

            {/* Mass Release */}

            <label htmlFor="massRelease">
              <span className={styles.massRelease}>MASS RELEASE</span>
            </label>
            <input
              type="radio"
              style={{ marginRight: "1em" }}
              value="MASS RELEASE"
              checked={tags === "MASS RELEASE"}
              onFocus={checkBox}
            />

            {/* New */}

            <label htmlFor="new">
              <span className={styles.new}>NEW</span>
            </label>
            <input
              type="radio"
              style={{ marginRight: "1em" }}
              value="NEW"
              checked={tags === "NEW"}
              onFocus={checkBox}
            />

            {/* Submit Button */}

            <button type="submit" className={styles.button}>
              Publish
            </button>
          </div>

          {/* Genres */}

          <div className={styles.flexDisplay}>
            <div className={styles.mappedGeneres}>
              {GenreData.map((data, id) => {
                return (
                  <div key={id}>
                    <span className={styles.genre}>{data.genre}</span>
                    <input
                      className={styles.genreCheckbox}
                      type="checkbox"
                      value={data.genre}
                      onChange={getGenres}
                      checked={genres.includes(data.genre)}
                    />
                  </div>
                );
              })}
            </div>
            <textarea
              cols="30"
              rows="10"
              className={styles.genreHolder}
              disabled
              value={genres.join(", ")}
            ></textarea>
          </div>
        </div>
      </form>
      <div className={styles.container} style={{ marginTop: "1.8em" }}>
        <ChapterList />
      </div>
    </div>
  );
};

export default EditComic;
