
import React from 'react';
import styles from './userCard.module.css';
//sao as cartas dos usuarios
export default function CreateNewCard(props){
    
    return(
        <>
       
        <div className={styles.espaco3dUser}>
          <p className={styles.titleUserCardUser}>{props.userName}</p> 
          <div className={`${styles.flipperUser} ${props.showVotes ? styles.flipperOpenUser : styles.flipperClosedUser}`}>
            <div className={styles.versoCartaUser}>
              
              
              <div className={styles.userCardDivUser}>
                {/* <span className={styles.BackCardUser}/> */}
                <span className={`${props.isVoted ? styles.clickedBackCardUser : styles.BackCardUser}`}/>
                
              </div>

            </div>
            <div className={styles.frenteCartaUser}>

              
              <div className={styles.userCardDivUser}>
                  <span className={styles.userCardVoteUser}>
                      <h1 className={styles.numberUserCardVoteUser}>
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