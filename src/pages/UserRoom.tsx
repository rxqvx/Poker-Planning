import React from 'react';
import CreateNewCard from './components/userCard/UserCard'
import Card from './components/cardsFibonacci/CardFibonacci'
import { IRoom } from '../schemas/RoomModel';
import { IUser } from '../schemas/UserModel';
import AdmControls from './components/admControls/AdmControls';

import styles from '../styles/userRoom.module.css'
// import '../styles/userRoom.module.css'

import io, { Socket } from 'socket.io-client'

let socket;


const fibonnaciNumbers = ["1","2","3","5","8","13","21","34","55","?","-"]

const getUsers = () => {
    const users =  JSON.parse(sessionStorage.getItem('users'));

    return users || [];
}

const getMyUser = () => {
  const user =  JSON.parse(sessionStorage.getItem('myUser'));

  return user || {};
}
const getRoom = () => {
  const room =  JSON.parse(sessionStorage.getItem('room'));

  return room || {};
}
function App() {
  const [showVotes, setShowVotes] = React.useState(false);
  const [toogle, setToogle] = React.useState(false);
  const [cor, setCor] = React.useState('#f3f3f3');
  const [users, setUsers] = React.useState([]);
  const [room,setRoom] = React.useState<IRoom>()
  const [myUser,setMyUser] = React.useState<IUser>()
    // nameUser:String,  
    // roomUserName: String,
    // isVoted: boolean,
    // voteValue: number,
    // isAdmin: boolean

  React.useEffect(()=>{
    setRoom(getRoom())
    setUsers(getUsers())
    setMyUser(getMyUser())

  },[]);

//-----------socketInicio-------------------

const socketInitializer = async () => {
  await fetch('/api/socket');
  socket = io({extraHeaders: {
      user:JSON.stringify(getMyUser())
  }})

  socket.emit('join-room',JSON.stringify(getMyUser()))
  
  socket.on('user-joined', payload =>{
    const  newUserJoined  = JSON.parse(payload);
    // usersSpush(newUserJoined);
    setUsers(oldUsers => [...oldUsers,newUserJoined])
  })

  socket.on('user-disconnect', payload =>{
    const newUser = JSON.parse(payload);
    // users.filter((Users) => Users !== user);
    setUsers(newUser);

  })

  socket.on('admin-disconnect',(payload : string) => {
    const newUsers = JSON.parse(payload)
    setUsers(newUsers)
    newUsers.forEach(u => {
        if(u.nameUser === myUser.nameUser){
            setMyUser(u);
        }
    })
  })

  socket.emit('my-vote', JSON.stringify(myUser))
  
  socket.on('user-voted', payload => {
    const userVoted = JSON.parse(payload)
    console.log("userVoted: " + userVoted)

    setUsers(oldUsers => oldUsers.map(u => {
      if(u.nameUser === userVoted.nameUser){
        return {...u, voteValue: userVoted.voteValue, isVoted: true}
      }

      return u;
    }))

    
  });

  // socket.emit('admin-show-vote',JSON.stringify(users.filter((User) => User.isAdmin==true)))

  socket.on('admin-shows', () =>{
    setShowVotes(true);
    console.log("mostrou os votos")
  })
  socket.on('admin-reset-votes', () =>{
    setShowVotes(false);
    console.log("resetou os votos");
  })
}



React.useEffect(()=>{
  if(room){
    socketInitializer()
  }

  return () => {
    socket?.off('user-joined');
    socket?.off('user-disconnect');
    socket?.off('admin-disconnect');
    socket?.off('user-voted');
    socket?.off('admin-shows');
    socket?.off('admin-reset-votes');
  }
},[room]);
//-----------socketFim-------------------

  const handleClick = event => {
    //vai pegar o valor que clicou
    const value = event.target.value;

    console.log('clicked vote: ', value)

    setMyUser({...myUser, voteValue: parseInt(value), isVoted: true} as any)
  }


  React.useEffect(() => {
    setCor(toogle ? '#f3f3f3': '#414141');
  }, [toogle]);

  React.useEffect(() => {
    console.log(myUser)
  }, [myUser]);

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
            <h1>Sala: {room?.roomName || ''}</h1>
            </div>
            <div className={styles.baloonUser}> 
              <h1>User: {myUser?.nameUser || ''} (me)</h1>
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
            {users.map((user, i)=> <CreateNewCard key={i} showVotes={showVotes} userName={user.nameUser} voteValue={user.voteValue} />)}
            
          </section>
          {myUser?.isAdmin ? <AdmControls setShowVotes={setShowVotes}  /> : null}
          
        </div>
        {/* <footer className="rodapeRoomUser fixedUser"/> */}
        <footer className={styles.rodapeRoomUserfixedUser}/>
      </div>
    
    </div>

  );
  
}


export default App;