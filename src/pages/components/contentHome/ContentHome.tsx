import React from 'react';
import styles from './contentHome.module.css';

const ContentHome = (props) : JSX.Element => {

    return(
        <section className={styles.contentHome}>
            {props.children}
        </section>
    )
}

export default ContentHome;
