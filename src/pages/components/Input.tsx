import React from 'react';

function Input({value, label, placeholder, tip, onChange, error}){
    return(
        <div className="form-group">
            <label>{label}</label>
            <input type="text" className="form-control" value={value} onChange={onChange} aria-describedby="txthelp" placeholder={placeholder}/>
            {error&&<p>{error}</p>}
            <small id="txthelp" className="form-text text-muted">{tip}</small>
        </div>
    )
}

export default Input;