import React from 'react';
import styles from './inputHome.module.css'
const Input = ({value, label, placeholder, tip, onChange, error}) =>{
    return(
        <div className={styles.inputHome}>
        <div className="form-group">
            <label>{label}</label>
            <input type="text" className="form-control" value={value} onChange={onChange} aria-describedby="txthelp" placeholder={placeholder}/>
            {error&&<p>{error}</p>}
            <small id="txthelp" className="form-text text-muted">{tip}</small>
        </div>
        </div>
    )
}

export default Input;
