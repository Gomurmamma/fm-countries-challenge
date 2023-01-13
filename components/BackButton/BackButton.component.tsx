import React from "react";
import style from "./BackButton.module.scss";
import { ImArrowLeft2 } from "react-icons/im";

type ButtonProps = {
  buttonprops: {
    title: string;
    tooltip?: string;
    text?: string;
  };
  onClick?: () => void;
};

const BackButton = ({ buttonprops, onClick }: ButtonProps) => {
  return (
    <button
      type="button"
      className={style.BackButton}
      onClick={onClick}
      title={buttonprops.tooltip}
    >
      <ImArrowLeft2 className={style.BackButton__text} />
      <span className={style.BackButton__text}>{buttonprops.text}</span>
    </button>
  );
};

export default BackButton;
