import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';


// Components
import Input from './components/Input'
import ArticleLetz from './components/ArticleLetz';


export default function HomePage() {
  const [name, setName] = React.useState('');
  const [nameError, setNameError] = React.useState<string>();

  const[room, setRoom] = React.useState('');
  const[roomError, setRoomError] = React.useState<string>();

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
  
            const {data} = await axios.post('/api/entryRoomUser', payload);
  
            sessionStorage.setItem('users',JSON.stringify(data.users));
            sessionStorage.setItem('room',JSON.stringify(data.room));
            window.open(`/room?roomName=${room}&nickname=${name}`, "_self");
        } catch(err) {
            console.log('erro ao enviar os dados', err);
        }
  }
  if(!roomName){ 
    return (
      <>
        <header className="linear-gradient">        
        </header>
            <section className='content'>
              <ArticleLetz/>
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
            </section>
            <footer className="linear-gradient fot-fix">             
            </footer>
      </>
    );

  }else if (!nickname){
    return (
      <>
          <header className="linear-gradient">          
          </header>
            <section className='content'>
              <ArticleLetz/>
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
                    <button onClick={submit} className="btn btn-primary">Confirmar</button>
                  </div>
                </div>
              </form>
            </section>
            <footer className="linear-gradient fot-fix">             
            </footer>  
      </>
    );
  }
}
