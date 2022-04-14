import React from 'react';
import letz from './public/letz.svg';
import './styles/App.css';
import NickInput from './components/NickInput'
import RoomInput from './components/RoomInput'
function App() {
  return (
    
    <div className="App">
      <footer class="rodape">
      </footer>
        <div className='container'>
          <div class="row">
            <div class="col-sm">
              <br></br>
              <img src={letz} className="App-logo" alt="logo" />
            </div>
            <div class="col-sm">
              <div className="header"> 
                <h1>Letz Poker Planning - Beta</h1>
              </div>
            </div>
          </div>
          <br></br>
          <form>
            <div class="box-shadow">
              <div class="left-margin">
                <NickInput/>
                <RoomInput/>
                <button type="submit" class="btn btn-primary">Confirmar</button>
              </div>
            </div>
          </form>
        </div>
      <div>
        <footer class="rodape fixed">
          
        </footer>
      </div>
    </div>
    
    
  );
  
}

export default App;
