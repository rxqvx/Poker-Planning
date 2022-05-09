import React from 'react';
import styles from './admControls.module.css'

interface AdmControlsProps {
  setShowVotes(show: boolean): void;
} 
// function mostrar(socket, setShowVotes){
//   setShowVotes(true)
//   socket.emit('admin-show-vote')
// }

const AdmControls: React.FC<AdmControlsProps> = ({setShowVotes}) => {
  return (
    <>
      <section className={styles.adminControls}>
        <div className={styles.titleAdminPai}>
          <p className={styles.titleAdminControl}>Admin Controls</p>
        </div>
        <div className={styles.buttonsFather}>
        {/* onClick={() => setShowVotes(true)} */}
          <button className={styles.displayButtons} onClick={() => setShowVotes(true)}>Show Votes</button>
          <button className={styles.displayButtons} onClick={() => setShowVotes(false)} >Reset Votes</button>
        </div>
        </section>
    </>
  );
  
}


export default AdmControls;
