import React from 'react';
import io, { Socket } from 'socket.io-client'

import PopularVote from './components/popularVote';
import UserCard from './components/userCard/UserCard'
import Card from './components/cardsFibonacci/CardFibonacci'
import { IRoom } from '../schemas/RoomModel';
import { IUser } from '../schemas/UserModel';
import AdmControls from './components/admControls/AdmControls';

import styles from '../styles/userRoom.module.css'

let socket;

const fibonnaciNumbers = ["1", "2", "3", "5", "8", "13", "21", "34", "55", "?", "-"]

const getUsers = () => {
  const users = JSON.parse(sessionStorage.getItem('users'));

  return users || [];
}

const getMyUser = () => {
  const user = JSON.parse(sessionStorage.getItem('myUser'));

  return user || {};
}
const getRoom = () => {
  const room = JSON.parse(sessionStorage.getItem('room'));

  return room || {};
}
function App() {
  let darkTheme;
  let color;
  let boolColor
  let boolDarkTheme
  if (typeof window !== 'undefined') {
    color = localStorage.getItem('color')
    boolColor = (color =="true"); 
    darkTheme = localStorage.getItem('darkTheme')
    boolDarkTheme = (darkTheme == "true");
  }
  
  const [disable, setDisable] = React.useState(false);
  const [showVotes, setShowVotes] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState(boolDarkTheme);
  const [users, setUsers] = React.useState([]);
  const [room, setRoom] = React.useState<IRoom>()
  const [myUser, setMyUser] = React.useState<IUser>()
  const [cor, setCor] = React.useState(boolColor);
  const [showPopularVotes, setShowPopularVotes] = React.useState(false);
  const [popVote, setPopVote] = React.useState('Não há votos');

  React.useEffect(() => {
    setRoom(getRoom())
    setUsers(getUsers())
    setMyUser(getMyUser())
    
  }, []);

  React.useEffect(() => {
    setCor(darkMode ? '#414141' : '#f3f3f3');
    localStorage.setItem('darkTheme', darkMode)
    localStorage.setItem('color', cor)
    console.log("popVote:", popVote)
  }, [darkMode]);


  //-----------socketInicio-------------------

  const socketInitializer = async () => {
    await fetch('/api/socket');
    socket = io({
      extraHeaders: {
        user: JSON.stringify(getMyUser())
      }
    })

    socket.emit('join-room', JSON.stringify(getMyUser()))

    socket.on('user-joined', payload => {
      const newUserJoined = JSON.parse(payload);

      setUsers(oldUsers => {
        const filteredUsers = oldUsers.filter(u => u.nameUser !== newUserJoined.nameUser);

        return [...filteredUsers, newUserJoined];
      })
    })

    socket.on('user-disconnect', payload => {
      const deletedUser = JSON.parse(payload);
      // console.log("payload do user-disconnect: " + payload)
      setUsers(oldUsers => oldUsers.filter(u => u.nameUser !== deletedUser.nameUser));
    })

    socket.on('admin-disconnect', (payload: string) => {
      const newUsersSemOlderAdmin = JSON.parse(payload);
      setUsers(newUsersSemOlderAdmin);
      console.log("newUsersSemOlderAdmin", newUsersSemOlderAdmin)
      if (newUsersSemOlderAdmin.map(u => {
        if (u.nameUser === myUser.nameUser) {
          setMyUser(u);
        }
      }))
        console.log("Admin saiu, payload:" + payload)
    })

    socket.on('user-voted', payload => {
      const userVoted = JSON.parse(payload)

      if (!userVoted) return;

      setUsers(oldUsers => oldUsers.map(u => {
        if (u.nameUser === userVoted.nameUser) {
          return { ...u, voteValue: userVoted.voteValue, isVoted: userVoted.voteValue !== '-' }
        }
        return u;
      }));
    });

    socket.on('admin-shows', popVotes => {
      setShowVotes(true);
      setDisable(true);
      setShowPopularVotes(true);

      if(popVotes) {
        setPopVote(JSON.parse(popVotes)); 
      }
    })

    socket.on('admin-reseted', () => {
      setShowVotes(false);
      setDisable(false);
      setUsers(oldUsers => oldUsers.map(u => {
        return { ...u, voteValue: '-', isVoted: false }
      }));
      setShowPopularVotes(false);
      setPopVote('');

    })

  }

  React.useEffect(() => {
    if (room) {
      socketInitializer()
    }

    return () => {
      socket?.off('user-joined');
      socket?.off('user-disconnect');
      socket?.off('admin-disconnect');
      socket?.off('user-voted');
      socket?.off('admin-shows');
      socket?.off('admin-reseted');
    }
  }, [room]);
  //-----------socketFim-------------------

  const handleClick = event => {
    const value = event.target.value;

    const newMyUser = { ...myUser, voteValue: (value), isVoted: true } as any

    setMyUser(newMyUser)

    setUsers(users.map(mu => {
      if (mu.nameUser === myUser.nameUser) {
        return { ...mu, voteValue: (value), isVoted: (value !== '-') }

      }
      return mu;
    }))

    socket.emit('my-vote', JSON.stringify(newMyUser))
  }

  const emitAdminVote = (show: boolean, popVotes: any) => {
    setShowVotes(show)
    setDisable(true);
    socket.emit(show ? 'admin-show-vote' : 'admin-reset-votes', JSON.stringify(popVotes));
  }

  return (
    <div className={styles.bodyUser}>
      <div style={{ backgroundColor: cor, height: '100%' }}>
        <header className={styles.headerRoomUser}>
          <div>
            <input type="checkbox" id={styles.toggleUser} checked={!darkMode} onChange={() => setDarkMode(state => !state)} />
            <label onClick={() => setDarkMode(state => !state)} htmlFor="toggleUser" className={styles.buttonUser} />
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
          {/*cartas de fibonacci */}
          <section className={styles.divCardsUser}>
            {fibonnaciNumbers.map(value => (
              <Card key={value} onClick={handleClick} voteValue={value} disable={disable} />
            ))}
          </section>
          {/*cartas dos users */}
          <section className={styles.sectionUserCardsUser}>
            {users.map((user, i) => <UserCard key={i} showVotes={showVotes} userName={user.nameUser} voteValue={user.voteValue} isVoted={user.isVoted} />)}
          </section>
          {showPopularVotes && <PopularVote popVote={popVote}/>}
          {myUser?.isAdmin && <AdmControls setShowVotes={emitAdminVote} setUsers={setUsers} setDisable={setDisable} setShowPopularVotes={setShowPopularVotes} users={users} setPopVote={setPopVote}/> }
        </div>
        <footer className={styles.rodapeRoomUserfixedUser} />
      </div>
    </div>
  );
}


export default App;
