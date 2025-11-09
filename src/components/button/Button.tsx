import "../../index.css";
import "./Button.css";
import { Link } from "react-router-dom";
import React from "react";

const STYLES = ["btn--primary", "btn--outline", "gBtn--primary", "gBtn--outline"];
const SIZES = ["btn--medium", "btn--large"];

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  btnType?: string;
  btnStyle?: string;
  btnSize?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  path?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  type = "button",
  btnType = "",
  btnStyle,
  onClick,
  btnSize,
  path = "/",
}) => {
  const checkButtonStyle = STYLES.includes(btnStyle || "") ? btnStyle : STYLES[0];
  const checkButtonSize = SIZES.includes(btnSize || "") ? btnSize : SIZES[0];

  if (path) {
    return (
      <Link to={path}>
        <button
          className={`${btnType} ${checkButtonStyle} ${checkButtonSize}`}
          onClick={onClick}
          type={type}
        >
          {children}
        </button>
      </Link>
    );
  }

  return (
    <button
      className={`${btnType} ${checkButtonStyle} ${checkButtonSize}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};
