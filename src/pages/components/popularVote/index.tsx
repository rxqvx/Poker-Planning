import React from 'react'
import styles from './popularVote.module.css'

const PopularVote = (props) => {
  if(props.popVote.length > 1){
    return(
      <div className={styles.width}>
        <div className={styles.tieContainer}>
          <p>Empate!</p>
          <p>Votos populares: </p>
          <strong className={styles.strong}>{props.popVote.map(popVote => `${popVote} `)}</strong>
        </div>
      </div>
    )
  }
  return (
    <div className={styles.width}>
      <div className={styles.voteContainer}>
        <p>Voto popular:</p>
        <strong className={styles.strong}>{props.popVote}</strong>
      </div>
    </div>
    
  );
}

export default PopularVote;