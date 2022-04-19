import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

import letz from '../../public/letz.svg';
import Input from './components/Input'


export default function HomePage() {
  const [name, setName] = React.useState('');
  const [nameError, setNameError] = React.useState();

  const[room, setRoom] = React.useState('');
  const[roomError, setRoomError] = React.useState();

  const router = useRouter();
  const {nickname, roomName} = router.query;

  
  const handleNameChange = (e) => {
      if(e.target.value) {
          setNameError(undefined);
      }
      setName(e.target.value);
  }

  const handleRoomChange = (ev) => {
    if(ev.target.value) {
        setRoomError(undefined);
    }
    setRoom(ev.target.value);
  }
  const submit = async (e) => {//tratamento de dados/erros
      e.preventDefault();

      if(!name) {
          setNameError('*Obrigatório');
          return;
      }
      if(!room) {
        setRoomError('*Obrigatório');
        return;
      }
      if(name.length < 2) {
          setNameError('Mínimo de 2 caracteres');
          return;
      }
      if(room.length < 2) {
        setRoomError('Mínimo de 2 caracteres');
        return;
    }
      try {
          const payload = { userName: name,  roomName: room };

          await axios.post('/api/entryRoomUser', payload);

          window.open(`/room?roomName=${room}&nickname=${name}`, "_self");
      } catch(err) {
          console.log('erro ao enviar os dados', err);
      }
    }

  const submitNick = async (e) => {//tratamento de dados/erros
        e.preventDefault();
  
        if(!name) {
            setNameError('*Obrigatório');
            return;
        }
        if(name.length < 2) {
            setNameError('Mínimo de 2 caracteres');
            return;
        }
        try {
            const payload = { userName: name,  roomName: roomName};
  
            await axios.post('/api/entryRoomUser', payload);
  
            window.open(`/room?roomName=${room}&nickname=${name}`, "_self");
        } catch(err) {
            console.log('erro ao enviar os dados', err);
        }
  }
  if(!roomName){ 
    return (
      <div className="light">
        <div className="App">
          <header className="header">          
          </header>
            <div className='container'>
              <div className="row">
                <div className="col-sm">
                  <br></br>
                  <img src={letz.src} className="App-logo" alt="logo" />
                </div>
                <div className="col-sm">
                  <div className="balloon"> 
                    <h1>Letz Poker Planning - Beta</h1>
                  </div>
                </div>
              </div>
              <br></br>
              <form>
                <div className="box-shadow">
                  <div className="left-margin">
                    <Input 
                      label="Nickname"
                      value={name} 
                      onChange={handleNameChange} 
                      error={nameError} 
                      tip="Insira o apelido que será representado na sala." 
                      placeholder="Ex.: klougod" 
                    />
                    <Input 
                      label="Sala"
                      value={room} 
                      onChange={handleRoomChange} 
                      error={roomError} 
                      tip="Digite o nome da sala." 
                      placeholder="Ex.: Tech Review" 
                    />
                    <button onClick={submit} className="btn btn-primary">Confirmar</button>
                  </div>
                </div>
              </form>
            </div>
          <div>
            <footer className="rodape fixed">
              
            </footer>
          </div>
        </div>
      </div>
      
    );

  }else if (!nickname){
    return (
      <div className="light">
        <div className="App">
          <header className="header">          
          </header>
            <div className='container'>
              <div className="row">
                <div className="col-sm">
                  <br></br>
                  <img src={letz.src} className="App-logo" alt="logo" />
                </div>
                <div className="col-sm">
                  <div className="balloon"> 
                    <h1>Letz Poker Planning - Beta</h1>
                  </div>
                </div>
              </div>
              <br></br>
              <form>
                <div className="box-shadow">
                  <div className="left-margin">
                    <Input 
                      label="Nickname"
                      value={name} 
                      onChange={handleNameChange} 
                      error={nameError} 
                      tip="Insira o apelido que será representado na sala." 
                      placeholder="Ex.: klougod" 
                    />
                    <button onClick={submitNick} className="btn btn-primary">Confirmar</button>
                  </div>
                </div>
              </form>
            </div>
          <div>
            <footer className="rodape fixed">
              
            </footer>
          </div>
        </div>
      </div>
      
    );
  }
}
