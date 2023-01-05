import React from "react";
import Link from "next/link";
import style from "./Header.module.scss";

type HeaderProps = {
  heading: string;
  children?: React.ReactNode;
};

const Header: React.FunctionComponent<HeaderProps> = ({
  heading,
  children,
}) => {
  return (
    <nav className={style.header}>
      <h1 title="Go to the Home page" role="heading">
        <Link href="/" className={style.header__heading}>
          {heading}
        </Link>
      </h1>
      {children}
    </nav>
  );
};

export default Header;
