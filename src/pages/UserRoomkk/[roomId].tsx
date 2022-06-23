import React from 'react';
import styles from './styles/AppUser.module.css';
import CreateNewCard from './components/CreateNewCard'
import Card from './components/Card'
const fibonnaciNumbers = ["1","2","3","5","8","13","21","34","55","?","-"]

const getUsers = () => {
    const users =  JSON.parse(sessionStorage.getItem('users'));

    return users || [];
}

function App() {
  const [toogle, setToogle] = React.useState(false);
  const [cor, setCor] = React.useState('#f3f3f3');
  const [users, setUsers] = React.useState([]);
    // nameUser:String,  
    // roomUserName: String,
    // isVoted: boolean,
    // voteValue: number,
    // isAdmin: boolean

    React.useEffect(()=>{
        sessionStorage.getItem('myUser')
        setUsers(getUsers())
        sessionStorage.getItem('room')
    },[]);


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
    setCor(toogle ? '#f3f3f3': '#414141');
  }, [toogle]);

  return (
    <div className={styles.bodyUser}>
      <div style={{ backgroundColor:cor, height: '100%'}}>
          <header className={styles.headerRoomUser}>

            <div>
              <input type="checkbox" id={styles.toggleUser} checked={!toogle} onChange={() => setToogle(state => !state)}/>
              <label onClick={() => setToogle(state => !state)} htmlFor="toggleUser" className={styles.buttonUser}/>
            </div>

          </header>          
          <div className={styles.baloonRowUser}>
            <div className={styles.baloonUser}> 
              <h1>Sala: {myUser.roomUserName}</h1>
            </div>
            <div className={styles.baloonUser}> 
              <h1>User: {myUser.nameUser} (me)</h1>
            </div>
          </div>
        <div className={styles.blankGambiarra}>
          {/* essa secao abaixo é pra apresentar as cartas de fibonacci */}
          <section className={styles.divCardsUser}>
              {fibonnaciNumbers.map(value =>(
                <Card key={value} onClick={handleClick} voteValue={value}/>
              ))}
          </section>
          {/* essa secao abaixo apresenta as cartas dos users */}
          <section className={styles.sectionUserCardsUser}>

            {/* imprime as cartas dos usuarios */}
            {users.map((user, i)=> <CreateNewCard key={i} showVotes={true} userName={user.nameUser} voteValue={user.voteValue} />)}
            
          </section>

        </div>
        {/* <footer className="rodapeRoomUser fixedUser"/> */}
        <footer className={styles.rodapeRoomUserfixedUser}/>
      </div>
    </div>
    
  );
  
}


export default App;