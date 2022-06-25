import React from 'react';
import UserCard from './components/userCard/UserCard'
import Card from './components/cardsFibonacci/CardFibonacci'
import { IRoom } from '../schemas/RoomModel';
import { IUser } from '../schemas/UserModel';
import AdmControls from './components/admControls/AdmControls';
import styles from '../styles/userRoom.module.css'

import io, { Socket } from 'socket.io-client'

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
  if (typeof window !== 'undefined') {
    color = localStorage.getItem('color')
    darkTheme = localStorage.getItem('themeDark')
  }
  // console.log("darkteme: ", darkTheme)
  const [disable, setDisable] = React.useState(false);
  const [showVotes, setShowVotes] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState(darkTheme);
  const [users, setUsers] = React.useState([]);
  const [room, setRoom] = React.useState<IRoom>()
  const [myUser, setMyUser] = React.useState<IUser>()
  const [cor, setCor] = React.useState(color);

  React.useEffect(() => {
    setCor(darkMode ? '#414141' : '#f3f3f3');
    localStorage.setItem('themeDark', darkMode)
    localStorage.setItem('color', cor)
  }, [darkMode]);

  React.useEffect(() => {
    setRoom(getRoom())
    setUsers(getUsers())
    setMyUser(getMyUser())

  }, []);

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

    // socket.emit('disconnecting')

    socket.on('user-disconnect', payload => {
      const deletedUser = JSON.parse(payload);
      console.log("payload do user-disconnect: " + payload)
      setUsers(oldUsers => oldUsers.filter(u => u.nameUser !== deletedUser.nameUser));

    })

    socket.on('admin-disconnect', (payload: string) => {
      // console.log("payload do admin-disconnect", payload)
      const newUsersSemOlderAdmin = JSON.parse(payload);
      setUsers(newUsersSemOlderAdmin);
      console.log("newUsersSemOlderAdmin", newUsersSemOlderAdmin)
      if (newUsersSemOlderAdmin.map(u => {
        if (u.nameUser === myUser.nameUser) {
          setMyUser(u);
          // console.log("u:",u)
          // console.log("myUser, agora virou admin: " + JSON.stringify(myUser));
        }
      }))
        console.log("Admin saiu, payload:" + payload)
    })

    socket.on('user-voted', payload => {
      // console.log("userVoted: " + payload)

      const userVoted = JSON.parse(payload)

      if (!userVoted) return;

      setUsers(oldUsers => oldUsers.map(u => {
        if (u.nameUser === userVoted.nameUser) {
          return { ...u, voteValue: userVoted.voteValue, isVoted: userVoted.voteValue !== '-' }
        }
        return u;
      }));
    });

    // socket.emit('admin-show-vote',JSON.stringify(users.filter((User) => User.isAdmin==true)))

    socket.on('admin-shows', () => {
      setShowVotes(true);
      setDisable(true);
      console.log("O admin mostrou os votos")
    })
    socket.on('admin-reseted', () => {
      setShowVotes(false);
      setDisable(false);
      setUsers(oldUsers => oldUsers.map(u => {
        return { ...u, voteValue: '-', isVoted: false }
      }));
      console.log("O admin resetou os votos");
    })

    // socket.emit('selected-card', users);
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
    //vai pegar o valor que clicou
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

  const emitAdminVote = (show: boolean) => {
    setShowVotes(show)
    setDisable(true);
    socket.emit(show ? 'admin-show-vote' : 'admin-reset-votes');
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
          {/* essa secao abaixo é pra apresentar as cartas de fibonacci */}
          <section className={styles.divCardsUser}>
            {fibonnaciNumbers.map(value => (
              <Card key={value} onClick={handleClick} voteValue={value} disable={disable} />
            ))}
          </section>
          {/* essa secao abaixo apresenta as cartas dos users */}
          <section className={styles.sectionUserCardsUser}>

            {/* imprime as cartas dos usuarios */}
            {users.map((user, i) => <UserCard key={i} showVotes={showVotes} userName={user.nameUser} voteValue={user.voteValue} isVoted={user.isVoted} />)}

          </section>

          {myUser?.isAdmin ? <AdmControls setShowVotes={emitAdminVote} setUsers={setUsers} setDisable={setDisable} /> : null}

        </div>
        {/* <footer className="rodapeRoomUser fixedUser"/> */}
        <footer className={styles.rodapeRoomUserfixedUser} />
      </div>

    </div>

  );

}


export default App;