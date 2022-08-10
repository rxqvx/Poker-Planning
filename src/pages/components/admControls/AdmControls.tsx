import React from 'react';
import io from 'socket.io-client'

import { IUser } from '../../../schemas/UserModel';
import styles from './admControls.module.css'
import { IRoom } from '../../../schemas/RoomModel';


interface AdmControlsProps {
  setShowVotes(show: boolean, popVotes: any): void;
  setUsers(cb: any): void;
  setDisable(cb: any): void;
  setShowPopularVotes(show: boolean): void;
  users: any;
  setPopVote(cb:any): void;

}

const AdmControls: React.FC<AdmControlsProps> = ({ setShowVotes, setUsers, setDisable, setShowPopularVotes, users, setPopVote }) => {
  

  function showUserCards() {
    setShowPopularVotes(true)
    setDisable(true);

    const arrayAux = []
    users.map((user) => { arrayAux.push(user.voteValue) })
    const modeArray =(array) =>{
      if (array.length == 0) return null;
      let modeMap = {},
        maxCount = 1,
        modes = [];
    
      for (let i = 0; i < array.length; i++) {
        let el = array[i];
    
        if (modeMap[el] == null) modeMap[el] = 1;
        else modeMap[el]++;
    
        if (modeMap[el] > maxCount) {
          modes = [el];
          maxCount = modeMap[el];
        } else if (modeMap[el] == maxCount) {
          modes.push(el);
          maxCount = modeMap[el];
        }
      }
      return modes;
    }

    const objectAux = modeArray(arrayAux);

    setShowVotes(true, objectAux)
    setPopVote(objectAux)
  }


  function resetUserCards() {
    setShowVotes(false, {})
    setDisable(false);
    setShowPopularVotes(false);
    // assim que o admin clickou no reset, passar todos os votevalues e isvoted como false de todos os users
    setUsers(oldUsers => oldUsers.map(u => {
      return { ...u, voteValue: '-', isVoted: false }
    }));
  }

  return (
    <>
      <section className={styles.adminControls}>
        <div className={styles.titleAdminPai}>
          <p className={styles.titleAdminControl}>Admin Controls</p>
        </div>
        <div className={styles.buttonsFather}>
          <button className={styles.displayButtons} onClick={showUserCards}>Show Votes</button>
          <button className={styles.displayButtons} onClick={resetUserCards} >Reset Votes</button>
        </div>
      </section>
    </>
  );

}


export default AdmControls;
