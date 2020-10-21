import React from "react";

const noop = () => {};

const InputFile = ({ onChange = noop}) => (
  <div>
    <label>
      Selectionnez votre photo
      <input className="form-control" type="file" name="file"
        onChange={e => { onChange([e.target.file]);}}/>
    </label>
  </div>
);

export default InputFile;