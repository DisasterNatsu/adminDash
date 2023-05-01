import React, { useState } from "react";
import styles from "../styles/editComics.module.css";
import { GenreData } from "../utils/genreData";
import ChapterList from "./chapterList";

const EditComic = () => {
  // All States

  const [status, setStatus] = useState("ongoing");
  const [comicName, setComicName] = useState("Martial Peak");
  const [desc, setDesc] = useState("");
  const [hot, setHot] = useState(true);
  const [massRelease, setMassRelease] = useState(false);
  const [newSeries, setNewSeries] = useState(false);
  const [genres, setGenres] = useState([]);

  // Function for submitting

  const submit = async (e) => {
    e.preventDefault();
    console.log("Submit");
  };

  // Checkbox function for Hot, Mass Release and New

  const checkBox = (e) => {
    const { value, checked } = e.target;

    if (value === "hot") {
      setHot(!hot);
      console.log(hot);
    } else if (value === "massRelease") {
      setMassRelease(!massRelease);
    } else if (value === "new") {
      setNewSeries(!newSeries);
    }
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
            defaultValue={"Martial Peak"}
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
            defaultValue={
              "The journey to the martial peak is a lonely, solitary and long one. In the face of adversity, you must survive and remain unyielding. Only then can you break through and and continue on your journey to become the strongest. Sky Tower tests its disciples in the harshest ways to prepare them for this journey. One day the lowly sweeper Yang Kai managed to obtain a black book, setting him on the road to the peak of the martials world."
            }
            onChange={(e) => setDesc(e.target.value)}
          />

          <div className={styles.radioCotainer}>
            <h1>Status:</h1>
            <label htmlFor="ongoing">Ongoing</label>
            <input
              type="radio"
              id="ongoing"
              value={"ongoing"}
              checked={status === "ongoing"}
              onChange={(e) => setStatus(e.target.value)}
            />
            <label htmlFor="dropped">Dropped</label>
            <input
              type="radio"
              id="dropped"
              value={"dropped"}
              checked={status === "dropped"}
              onChange={(e) => setStatus(e.target.value)}
            />
            <label htmlFor="finished">Finished</label>
            <input
              type="radio"
              id="finished"
              value={"finished"}
              checked={status === "finished"}
              onChange={(e) => setStatus(e.target.value)}
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
              value={"Author"}
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
              value={"Artist"}
              onChange={(e) => setStatus(e.target.value)}
            />
          </div>
          <div className={styles.flexDisplay}>
            {/* Hot */}

            <label htmlFor="hot">
              <span className={styles.hot}>HOT</span>
            </label>
            <input
              type="checkbox"
              style={{ marginRight: "1em" }}
              checked={hot}
              value="hot"
              onChange={checkBox}
            />

            {/* Mass Release */}

            <label htmlFor="massRelease">
              <span className={styles.massRelease}>Mass Release</span>
            </label>
            <input
              type="checkbox"
              style={{ marginRight: "1em" }}
              checked={massRelease}
              value="massRelease"
              onChange={checkBox}
            />

            {/* New */}

            <label htmlFor="new">
              <span className={styles.new}>New</span>
            </label>
            <input
              type="checkbox"
              style={{ marginRight: "1em" }}
              checked={newSeries}
              value="new"
              onChange={checkBox}
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
