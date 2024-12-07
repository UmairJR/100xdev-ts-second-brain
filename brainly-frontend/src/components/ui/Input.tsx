import React from "react";

interface InputProps {
  onChange: () => void;
  placeholder: string;
  type?: string;
  ref?: React.Ref<HTMLInputElement>;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <div>
      <input
        ref={ref}
        type={props.type ? props.type : "text"}
        placeholder={props.placeholder}
        className="px-4 py-2 border rounded m-2"
        onChange={props.onChange}
      />
    </div>
  );
});
