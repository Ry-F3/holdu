import React from 'react';
import classNames from 'classnames';
// Styles
import styles from '../styles/Avatar.module.css';

function Avatar({ src, height = 50, border }) {
  const avatarClasses = classNames(styles.Avatar, {
    [styles.Border]: border, // Apply border class conditionally based on the prop
  });
  return (
    <span>
      <img
        className={avatarClasses}
        src={src}
        height={height}
        width={height}
        alt="avatar"
      />

    </span>
  );
}

export default Avatar;
