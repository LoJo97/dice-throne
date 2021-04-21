import './App.css';
import Barbarian from './Characters/Barbarian';
import MoonElf from './Characters/MoonElf';
import { useState } from 'react';
import _ from 'lodash';

import Player from './Components/Player';

function App() {
  const [player1, setPlayer1] = useState(new Barbarian(50, 2));
  const [player2, setPlayer2] = useState(new MoonElf(50, 2));

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
    'RAGE': 0
  }

  let numTrials = 1000000.0;

  for(let i = 0; i < numTrials; i++) {
    player.rollDice();
    let att = player.findValidAttacks();
    att.map((a, index) => {
      attackRollMap[a.name]++;
    })
  }

  for(let val in attackRollMap) {
    attackRollMap[val] = (attackRollMap[val] / numTrials) * 100;
  }

  console.log(attackRollMap);
*/

  const updatePlayer1 = (newVal) => {
    let result = _.clone(newVal);
    setPlayer1(result);
  }

  const updatePlayer2 = (newVal) => {
    let result = _.clone(newVal);
    setPlayer2(result);
  }

  return (
    <div style={{display: 'flex'}}>
      <Player player={player1} target={player2} setPlayer={updatePlayer1} setTarget={updatePlayer2}/>
      <Player player={player2} target={player1} setPlayer={updatePlayer2} setTarget={updatePlayer1}/>
    </div>
  );
}

export default App;
