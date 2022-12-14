import React from "react";
import style from "./LinkButton.module.scss";

type ButtonProps = {
  buttonprops: {
    title: string;
  };
};

const LinkButton = ({ buttonprops }: ButtonProps) => {
  return (
    <button type="button" className={style.LinkButton}>
      {buttonprops.title}
    </button>
  );
};

export default LinkButton;
