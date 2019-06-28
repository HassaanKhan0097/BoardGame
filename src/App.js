import React from 'react';
import logo from './logo.svg';
import './App.css';
import Chessboard from './components/Chessboard';
import GameOver from './components/GameOver';
import Routes from './Routes';


function App() {





  return (
    <div className="App">
      <div className="App-header">
        {/* <GameOver/> */}
        {/* <Chessboard/> */}
        <Routes/>
      </div>
    </div>
  );
}

export default App;
