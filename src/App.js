import React from 'react';
import Game from './birds/Game.jsx';
import BirdCategories from './birds/BirdCategories.jsx';
import SecretBird from './birds/SecretBird.jsx';
import GameOver from './birds/GameOver.jsx';


function App() {
  return (
    <React.Fragment>
      <BirdCategories />
      <SecretBird />
      <Game />
      <GameOver />
    </React.Fragment>
  );
}

export default App;
