import letz from '../../../public/letz.svg';
import React from 'react';

function ArticleLetz(){
    return(
        <>
        <article className="article-letz">
            <div className="row">
            <div className="col-sm">
                <br></br>
                <img src={letz.src} alt="logo" />
            </div>
                <div className="balloon"> 
                <h1>Letz Poker Planning - Beta</h1>
            </div>
            </div>
        </article>
        </>
    )
}
export default ArticleLetz;