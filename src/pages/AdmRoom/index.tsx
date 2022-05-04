import React from 'react';
import styles from './styles/AppAdm.module.css';
// import CreateNewCard from './components/CreateNewCard';
import CreateNewCard from './components/CreateNewCard'
// import UserCards from './components/UserCards';
import Card from './components/Card'

function App() {
  const [showVotes, setShowVotes] = React.useState(false);
  const [toogle, setToogle] = React.useState(true);
  const [cor, setCor] = React.useState('#f3f3f3');
  const fibonnaciNumbers = ["1","2","3","5","8","13","21","34","55","?","-"]

    // nameUser:String,  
    // roomUserName: String,
    // isVoted: boolean,
    // voteValue: number,
    // isAdmin: boolean

  const [users, setUsers] = React.useState([
    {isAdmin:true, "nameUser":"admin","voteValue":"-", isVoted: false, roomUserName:"teste"},
    {isAdmin:false, "nameUser":"henrique","voteValue":"-", isVoted: false, roomUserName:"teste"},
    {isAdmin:false, "nameUser":"vini","voteValue":"-", isVoted: false, roomUserName:"teste"},
    {isAdmin:false, "nameUser":"fernando","voteValue":"-", isVoted: false, roomUserName:"teste"},
    {isAdmin:false, "nameUser":"bruninho","voteValue":"-", isVoted: false, roomUserName:"teste"},
    {isAdmin:false, "nameUser":"pava","voteValue":"-", isVoted: false, roomUserName:"teste"},
    {isAdmin:false, "nameUser":"thiago","voteValue":"-", isVoted: false, roomUserName:"teste"},
    {isAdmin:false, "nameUser":"drugo","voteValue":"-", isVoted: false, roomUserName:"teste"},
    {isAdmin:false, "nameUser":"doutor","voteValue":"-", isVoted: false, roomUserName:"teste"},
    {isAdmin:false, "nameUser":"math","voteValue":"-", isVoted: false, roomUserName:"teste"},
    {isAdmin:false, "nameUser":"lu","voteValue":"-", isVoted: false, roomUserName:"teste"},
    {isAdmin:false, "nameUser":"ivan","voteValue":"-", isVoted: false, roomUserName:"teste"},
    {isAdmin:false, "nameUser":"carol","voteValue":"-", isVoted: false, roomUserName:"teste"},
    {isAdmin:false, "nameUser":"cacuba","voteValue":"-", isVoted: false, roomUserName:"teste"},
    
  ]);

  const myUser = {isAdmin:true, "nameUser":"admin","voteValue":"-", isVoted: false, roomUserName:"teste"}
  
  const handleClick = event => {
    //vai pegar o valor que clicou
    const value = event.target.value;

    console.log('clicked vote: ', value)

    // novo map de users atualizado
    const newUsers = users.map(user => {
      //se o nome de usuario dos usuarios presentes da sala for igual o meu que receberei do back, vai setar o novo valor do voto pra minha carta, da carta que eu clickei
      if(user.nameUser === myUser.nameUser) {
        console.log(user.voteValue);
        return {...user, voteValue: value, isVoted: true}
      }
      return user;
    })

    console.log(newUsers);

    setUsers(newUsers);
  }



  React.useEffect(() => {
    setCor((state) => toogle ? '#f3f3f3': '#414141');
  }, [toogle]);

  return (
    <div className={styles.body}>
      <div style={{ backgroundColor:cor, height: '100%'}}>
          <header className={styles.headerRoom}>

          <div>
              <input type="checkbox" id={styles.toggle} checked={!toogle} onChange={() => setToogle(state => !state)}/>
              <label onClick={() => setToogle(state => !state)} htmlFor="toggleUser" className={styles.button}/>
            </div>

          </header>          
          <div className={styles.baloonRow}>
            <div className={styles.baloon}> 
              <h1>Sala: {myUser.roomUserName}</h1>
            </div>
            <div className={styles.baloon}> 
              <h1>User: {myUser.nameUser} (me)</h1>
            </div>
          </div>
        <div className={styles.body}>
          {/* essa secao abaixo é pra apresentar as cartas de fibonacci */}
          <section className={styles.divCards}>
              {fibonnaciNumbers.map(value =>(
                <Card onClick={handleClick} voteValue={value}/>
              ))}
          </section>
          {/* essa secao abaixo apresenta as cartas dos users */}
          <section className={styles.sectionUserCards}>
            
            {/* imprime as cartas dos usuarios */}
            
            {users.map((user, i)=> <CreateNewCard key={i} showVotes={showVotes} userName={user.nameUser} voteValue={user.voteValue} />)}
          
          </section>
          {/* essa secao abaixo apresenta os controles do adm */}
          <section className={styles.adminControls}>
            <div className={styles.titleAdminPai}>
            <p className={styles.titleAdminControl}>Admin Controls</p>
            </div>
            <div className={styles.buttonsFather}>
              <button className={styles.displayButtons} onClick={() => setShowVotes(true)}>Show Votes</button>
              <button className={styles.displayButtons} onClick={() => setShowVotes(false)} >Reset Votes</button>
            </div>
          </section>
        </div>
          <footer className={styles.rodapeRoomfixed}/>
      </div>
    </div>
    
  );
  
}


export default App;
