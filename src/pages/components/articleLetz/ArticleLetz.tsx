import letz from '../../../../public/letz.svg';
import React from 'react';
import styles from './articleLetz.module.css'

const ArticleLetz = () => {
    return(
        <>
        <article className={styles.articleLetz}>
            <div className="row">
            <div className="col-sm">
                <br></br>
                <img src={letz.src} alt="logo" />
            </div>
                <div className={styles.balloon}>
                <h1>Letz Poker Planning - Beta</h1>
            </div>
            </div>
        </article>
        </>
    )
}
export default ArticleLetz;
