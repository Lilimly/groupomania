import React from 'react';

const InputFile = ({name, value, onChange, children, ref}) => {
    return <div className="form-group">
        <label htmlFor={name}>{children}
            <input type="file" value={value} onChange={onChange} ref={ref} id={name} name={name} className="form-control"/>
        </label>
    </div>
}

export default InputFile;