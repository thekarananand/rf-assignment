'use client'

import styles from "./Main.module.css";
import { useState } from "react";
import Right from "./Right";

const Main = () => {

  const endpoint = "/upload";

  const [WordFile, setWordFile] = useState(null);
  const [Metadata, setMetadata] = useState(null);
  const [Link    , setLink    ] = useState(null);
  const [Loading , setLoading ] = useState(false);

  const handleUpload = async(event) => {
    event.preventDefault()

    const file = event.target.files[0];

    if (!file.name.endsWith(".docx")) {
      alert("Please select a .docx file!");
      return;
    } else {
      setMetadata(null);
      setLink(null)
      setWordFile(file);
    }
  }

  const sendFile = async(event) => {
    event.preventDefault();

    if (WordFile==null) {
      alert("No Word File Selected!");
    } else {
      setLoading(true);

      const formData = new FormData();
      formData.append('file', WordFile);

      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      })

      if ( response.ok ) {
        let serverResponse = await response.json();
        setLink(serverResponse?.link)
        setMetadata(serverResponse?.metadata)
      } 

      setLoading(false);
    };
  };

  return (
    <main className={styles.main}>
      <div className={styles.Loading} data-visible={Loading}>
        <div className={styles.Loader_Wrapper}>
          Loading...
        </div>
      </div>
      <section className={styles.wrapper}>
        <form className={styles.left}>
          <div className={styles.wrapper1}>
              <label htmlFor="file">
                <span className="big">Select a Word (.docx) file</span>
                <span>{" or "}</span>
                <span>drag & drop it here!</span>
              </label>
              <input
                name="file"
                id="file"
                type="file"
                onChange={handleUpload}
              />
          </div>
          <div className={styles.wrapper2}>
              <input
                type="submit"
                value={"Convet to PDF"}
                data-disable={ WordFile==null }
                onClick={sendFile}
              />
          </div>
        </form>
        <div className={styles.right}>
          { Link &&
            <Right
              metadata={Metadata}
              link={Link}
            />
          }
        </div>
      </section>
    </main>
  )
}

export default Main