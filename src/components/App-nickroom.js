import React from 'react';
import letz from './letz.svg';
import './App.css';
import NickInput from './components/NickInput'
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
              <h1>Insira seu apelido</h1>
                {/* <h1>Insira seu apelido para entrar na sala: {sala}</h1> */}
              </div>
            </div>
          </div>
          <br></br>
          <form>
            <div class="box-shadow">
              <div class="left-margin">
                <NickInput/>
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
