import React from "react";
import style from "./LinkButton.module.scss";

type ButtonProps = {
  buttonprops: {
    title: string;
  };
  onClick?: () => void;
};

const LinkButton = ({ buttonprops, onClick }: ButtonProps) => {
  return (
    <button type="button" className={style.LinkButton} onClick={onClick}>
      {buttonprops.title}
    </button>
  );
};

export default LinkButton;
