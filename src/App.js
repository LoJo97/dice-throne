import './App.css';
import Barbarian from './Characters/Barbarian';
import MoonElf from './Characters/MoonElf';
import { useState, useEffect } from 'react';
import _ from 'lodash';

import Player from './Components/Player';
import Game from './Game';

function App() {
  const player1 = new Barbarian(50, 2);
  const player2 = new MoonElf(50, 2);
  const [game, setGame] = useState(new Game([player1, player2]));

  //console.log({hp: player.hp, cp: player.cp, dice: player.dice, attacks: player.attacks});
/*
  let attackRollMap = {
    'SMACK': 0,
    'STURDY BLOW': 0,
    'MIGHTY BLOW': 0,
    'CRIT BASH': 0,
    'FORTITUDE': 0,
    'OVERPOWER': 0,
    'RECKLESS': 0,
    'RAGE': 0,
    'NONE': 0
  }

  let numTrials = 1000000.0;

  for(let i = 0; i < numTrials; i++) {
    player1.rollDice();
    let att = player1.findValidAttacks();
    if(!att.length) attackRollMap['NONE']++;
    att.map((a, index) => {
      attackRollMap[a.name]++;
    })
  }

  for(let val in attackRollMap) {
    attackRollMap[val] = (attackRollMap[val] / numTrials) * 100;
  }

  console.log(attackRollMap);
*/
  const updateGame = (newVal) => {
    let result = _.clone(newVal);
    setGame(result);
  }

  useEffect(() => {
    let g = _.clone(game);
    g.setup();
    if(!_.isEqual(g, game)) setGame(g);
  });

  return (
    <div style={{display: 'flex'}}>
      <Player game={game} playerNum={0} targetNum={1} setGame={updateGame}/>
      <Player game={game} playerNum={1} targetNum={0} setGame={updateGame}/>
    </div>
  );
}

export default App;
