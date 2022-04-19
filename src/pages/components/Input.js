import React from 'react';

function Input({value, label, placeholder, tip, onChange, error}){
    return(
        <div class="form-group">
            <label>{label}</label>
            <input type="text" class="form-control" value={value} onChange={onChange} aria-describedby="txthelp" placeholder={placeholder}/>
            {error&&<p>{error}</p>}
            <small id="txthelp" class="form-text text-muted">{tip}</small>
        </div>
    )
}

export default Input;