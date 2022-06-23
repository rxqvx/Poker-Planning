import React from 'react';
import styles from '../styles/AppAdm.module.css';
//sao as cartas dos usuarios
export default function CreateNewCard(props){
    
    return(
        <>
       
        <div className={styles.espaco3d}>
          <p className={styles.titleUserCard}>{props.userName}</p> 
          <div className={`${styles.flipper} ${props.showVotes ? styles.flipperOpen : styles.flipperClosed}`}>
            <div className={styles.versoCarta}>
              
              
              <div className={styles.userCardDiv}>
                <span className={styles.BackCard}/>
              </div>

            </div>
            <div className={styles.frenteCarta}>

              
              <div className={styles.userCardDiv}>
                  <span className={styles.userCardVote}>
                      <h1 className={styles.numberUserCardVote}>
                        {props.voteValue}
                      </h1>
                  </span>
              </div>

            </div>
          </div>
        </div>
      
        </>
        
    )
}