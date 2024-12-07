import React, { ReactElement } from "react";
import { IconProps, Sizes } from "./iconStyles";


const PlusIcon = (props: IconProps): ReactElement => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className={Sizes[props.size]}
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
    </>
  );
};

export default PlusIcon;
