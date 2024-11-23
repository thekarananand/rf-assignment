'use client'

import styles from "./Main.module.css";

const Right = (props) => {
  return (
    <>
      <div className={styles.wrapper3}>
        <h2>Yaay! Your PDF is ready!!...</h2>

        <h3>Here's the Metadata Attached to Uploaded Document</h3>
        <code className={styles.code}>
          {'\"filename\": \"' + props?.metadata?.filename + '\"'} <br/>
          {'\"content_type\": \"' + props?.metadata?.content_type + '\"'}<br/>
          {'\"size\": \"' + props?.metadata?.size + '\"'}
        </code>
      </div>
      <div className={styles.wrapper4}>
        
        <a
          href={props?.link}
          target="_blank"
        >Download PDF</a>

      </div>
    </>
  )
}

export default Right