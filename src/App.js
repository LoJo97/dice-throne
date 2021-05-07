import './App.css';
import { useState } from 'react';
import Barbarian from './Characters/Barbarian';
import MoonElf from './Characters/MoonElf';
import GameContainer from './Components/GameContainer';
import { GameContext, phases } from './Contexts/GameContext';
import { PlayersContext } from './Contexts/PlayersContext'

function App() {
  const [players, setPlayers] = useState([new Barbarian(50, 2), new MoonElf(50, 2)]);
  const [phase, setPhase] = useState(phases.UPKEEP);
  const [turn, setTurn] = useState(0);
  const [activePlayer, setActivePlayer] = useState(0);


  return (
    <PlayersContext.Provider value={{players, setPlayers}}>
      <GameContext.Provider value={{phase, setPhase, turn, setTurn, activePlayer, setActivePlayer}}>
        <GameContainer/>
      </GameContext.Provider>
    </PlayersContext.Provider>
  );
}

export default App;
