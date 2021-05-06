import './App.css';
import GameContainer from './Components/GameContainer';

function App() {
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
  return (
    <GameContainer/>
  );
}

export default App;
