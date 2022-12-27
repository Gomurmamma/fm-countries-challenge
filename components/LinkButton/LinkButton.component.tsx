import React from "react";
import style from "./LinkButton.module.scss";

type ButtonProps = {
  buttonprops: {
    title: string;
    html?: React.ReactElement;
  };
  onClick?: () => void;
};

const LinkButton = ({ buttonprops, onClick }: ButtonProps) => {
  return (
    <button type="button" className={style.LinkButton} onClick={onClick}>
      <>{buttonprops.html}</>
      {buttonprops.title}
    </button>
  );
};

export default LinkButton;
