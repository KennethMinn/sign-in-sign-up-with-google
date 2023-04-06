import React from "react";

const InputForm = ({ label, ...otherProps }) => {
  return (
    <>
      <input className="form-control" {...otherProps}></input>
      <label className="form-label" htmlFor="">
        {label}
      </label>
    </>
  );
};

export default InputForm;
