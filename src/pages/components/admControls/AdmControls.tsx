import React from 'react';
import { IUser } from '../../../schemas/UserModel';
import styles from './admControls.module.css'

interface AdmControlsProps {
  setShowVotes(show: boolean): void;
  setUsers(cb: any): void;
  setDisable(cb: any): void;
} 
// function mostrar(socket, setShowVotes){
//   setShowVotes(true)
//   socket.emit('admin-show-vote')
// }

const AdmControls: React.FC<AdmControlsProps> = ({setShowVotes, setUsers, setDisable }) => {
  function showUserCards(){
    setShowVotes(true)

    setDisable(true);
  }
  
  function resetUserCards(){
    setShowVotes(false)
    setDisable(false);
    // assim que o admin clickou no reset, passar todos os votevalues e isvoted como false de todos os users
    setUsers(oldUsers => oldUsers.map(u => {
        return {...u, voteValue: '-', isVoted: false}
    }));
  }

  return (
    <>
      <section className={styles.adminControls}>
        <div className={styles.titleAdminPai}>
          <p className={styles.titleAdminControl}>Admin Controls</p>
        </div>
        <div className={styles.buttonsFather}>
        {/* onClick={() => setShowVotes(true)} */}
          <button className={styles.displayButtons} onClick={showUserCards}>Show Votes</button>
          <button className={styles.displayButtons} onClick={resetUserCards} >Reset Votes</button>
        </div>
        </section>
    </>
  );
  
}


export default AdmControls;
