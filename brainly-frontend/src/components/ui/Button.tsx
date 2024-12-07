import { ReactElement } from "react";
import React from "react";
import Loader from "./Loader";

export interface ButtonProps {
  variant: "primary" | "secondary";
  size: "small" | "medium" | "large";
  text: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClick?: () => void;
  fullWidth?: boolean;
  loading?: boolean;
}

const Variants = {
  primary: "bg-purple-900 text-white",
  secondary: "bg-purple-300 text-purple-900",
};

const defaultStyles = "rounded-lg flex items-center font-light";

const Sizes = {
  small: "py-1 px-2 text-sm",
  medium: "py-2 px-4 text-md",
  large: "py-2 px-6 text-lg",
};

const Button = (props: ButtonProps): ReactElement => {
  return (
    <button
      className={`${defaultStyles} ${Variants[props.variant]} ${
        Sizes[props.size]
      } ${props.fullWidth ? "w-full flex justify-center items-center" : ""} ${
        props.loading ? "opacity-50" : ""
      }`}
      onClick={props.onClick}
      disabled={props.loading}
    >
      {props.loading ? (
        <Loader />
      ) : (
        <>
          {props.startIcon && <div className="pr-2">{props.startIcon}</div>}
          {props.text}
        </>
      )}
    </button>
  );
};

export default Button;
