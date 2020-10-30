import React from 'react';

const Field = ({name, type, value, onChange, children}) => {
    return <div className="form-group">
        <label htmlFor={name}>{children}</label>
        <input type={type} value={value} onChange={onChange} id={name} name={name} className="form-control" noValidate/>
    </div>
}

export default Field;