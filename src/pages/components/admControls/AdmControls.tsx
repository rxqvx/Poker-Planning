import React from 'react';
import styles from './admControls.module.css'

function App() {
  const [showVotes, setShowVotes] = React.useState(false);
  return (
    <>
      <section className={styles.adminControls}>
          <div className={styles.titleAdminPai}>
          <p className={styles.titleAdminControl}>Admin Controls</p>
          </div>
          <div className={styles.buttonsFather}>
            <button className={styles.displayButtons} onClick={() => setShowVotes(true)}>Show Votes</button>
            <button className={styles.displayButtons} onClick={() => setShowVotes(false)} >Reset Votes</button>
            </div>
        </section>
    </>
  );
  
}


export default App;
