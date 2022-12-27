import React from "react";
import style from "./LinkButton.module.scss";

type ButtonProps = {
  buttonprops: {
    title: string;
    html?: React.ReactElement;
    tooltip?: string;
  };
  onClick?: () => void;
};

const LinkButton = ({ buttonprops, onClick }: ButtonProps) => {
  return (
    <button
      type="button"
      className={style.LinkButton}
      onClick={onClick}
      title={buttonprops.tooltip}
    >
      <>{buttonprops.html}</>
      {buttonprops.title.replace(/[a-z](?=[A-Z])/gm, "$& ")}
    </button>
  );
};

export default LinkButton;
