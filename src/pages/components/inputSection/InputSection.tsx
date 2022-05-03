import React from 'react';
import styles from './inputSection.module.css';

interface IInputSection {
    children: React.ReactNode
}

const InputSection = (props: IInputSection) : JSX.Element => {

    return(
        <div className={styles.inputSection}>
            {props.children}
        </div>
    )
}

export default InputSection;
