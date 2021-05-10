import './App.css';
import { useEffect, useState } from 'react';
import Barbarian from './Characters/Barbarian';
import MoonElf from './Characters/MoonElf';
import GameContainer from './Components/GameContainer';
import { GameContext, phases } from './Contexts/GameContext';
import { PlayersContext } from './Contexts/PlayersContext';
import { EventContext } from './Contexts/EventContext';

function App() {
  const [players, setPlayers] = useState([new Barbarian(50, 2), new MoonElf(50, 2)]);
  const [phase, setPhase] = useState(phases.UPKEEP);
  const [turn, setTurn] = useState(0);
  const [activePlayer, setActivePlayer] = useState(0);
  const [targetPlayer, setTargetPlayer] = useState(1);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    for(let i = 0; i < players.length; i++) {
      players[i].shuffleDeck();
      for(let j = 0; j < 4; j++) {
        players[i].drawCard();
      }
    }
    setPlayers([...players]);
  }, [])

  return (
    <PlayersContext.Provider value={{players, setPlayers}}>
      <GameContext.Provider value={{phase, setPhase, turn, setTurn, activePlayer, setActivePlayer, targetPlayer, setTargetPlayer}}>
        <EventContext.Provider value={{events, setEvents}}>
          <GameContainer/>
        </EventContext.Provider>
      </GameContext.Provider>
    </PlayersContext.Provider>
  );
}

export default App;
