import React from "react";
import Spinner from "./Spinner";
import styles from "../styles/Asset.module.css";
import imageStyle from '../styles/JobsCreateForm.module.css'

const Asset = ({ loading, src, message }) => {
  return (
    <div className={`${styles.Asset} p-4`}>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {src && <img src={src} className={imageStyle.defaultImage} alt={message} />}
          {message && <p className="mt-4">{message}</p>}
        </>
      )}
    </div>
  );
};

export default Asset;