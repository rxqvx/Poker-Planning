// Library's
import React,{useState} from 'react';
import axios from 'axios';
import { NextRouter, useRouter } from 'next/router';

// Components
import Input from './components/inputHome/InputHome'
import ArticleLetz from './components/articleLetz/ArticleLetz';
import HeaderHome from './components/headerHome/HeaderHome'
import InputSection from './components/inputSection/InputSection'
import FooterHome from './components/footerHome/FooterHome'
import ContentHome from './components/contentHome/ContentHome'


const HomePage = () : JSX.Element =>  {
  const [name, setName] = useState<string>('');
  const [nameError, setNameError] = useState<string>('');

  const[room, setRoom] = useState<string>('');
  const[roomError, setRoomError] = useState<string>('');

  const router : NextRouter = useRouter();
  const { roomName } = router.query;

  const handleNameChange = (e : React.ChangeEvent<HTMLInputElement>) : void => {
      if(e.target.value) {
          setNameError(undefined);
      }
      setName(e.target.value);
  }
  const handleRoomChange = (e: React.ChangeEvent<HTMLInputElement>) : void => {
    if(e.target.value) {
        setRoomError(undefined);
    }
    setRoom(e.target.value);
  }

  const submitNickAndRoom = async () : Promise<any> => {
      if(!name || name.length < 2) {
        setNameError('*Obrigatório e no Mínimo de 2 caracteres');
        return;
      }
      if(!room || room.length < 2) {
        setRoomError('*Obrigatório e no Mínimo de 2 caracteres');
        return;
      }
      try {
          const payload = { userName: name,  roomName: room };
          const { data } = await axios.post('/api/entryRoomUser', payload);
          sessionStorage.setItem('users',JSON.stringify(data.users));
          sessionStorage.setItem('room',JSON.stringify(data.room));
          sessionStorage.setItem('myUser',JSON.stringify(data.myUser));

          window.open(`/UserRoom?roomName=${room}&nameUser=${name}`, "_self");
      } catch(err) {alert("Error in the request")}
  }
  const submitOnlyNick = async () : Promise<any> => {
    if(!name || name.length < 2) {
        setNameError('*Obrigatório e no Mínimo de 2 caracteres');
        return;
    }
    try {
        const payload = { userName: name,  roomName: roomName};
        const { data } = await axios.post('/api/entryRoomUser', payload);
        sessionStorage.setItem('users',JSON.stringify(data.users));
        sessionStorage.setItem('room',JSON.stringify(data.room));
        window.open(`/UserRoom?roomName=${roomName}&nameUser=${name}`, "_self");
    } catch(err) {alert("Error in the request")}
  }
  if(!roomName){
    return (
      <>
        <HeaderHome/>
        <ContentHome>
            <ArticleLetz/>
            <InputSection>
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
            <button onClick={submitNickAndRoom}className="btn btn-primary">Confirmar</button>
            </InputSection>
        </ContentHome>
        <FooterHome/>
      </>
    );
  }
  return (
    <>
    <HeaderHome/>
    <ContentHome>
        <ArticleLetz/>
        <InputSection>
            <Input
                label="Nickname"
                value={name}
                onChange={handleNameChange}
                error={nameError}
                tip="Insira o apelido que será representado na sala."
                placeholder="Ex.: klougod"
            />
            <button onClick={submitOnlyNick} className="btn btn-primary">Confirmar</button>
        </InputSection>
    </ContentHome>
    <FooterHome/>
    </>
  );
}

export default HomePage;
