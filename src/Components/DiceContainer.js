import { useContext } from 'react';
import Die from './Die';
import { PlayersContext } from './../Contexts/PlayersContext';
import { PlayerIndexContext } from './../Contexts/PlayerIndexContext';

const DiceContainer = (props) => {
    const {players} = useContext(PlayersContext);
    const playerIndex = useContext(PlayerIndexContext);
    const player = players[playerIndex];

    return (
        <div style={{display: 'flex'}}>
            {player.dice.map((die, index) => {
                return (
                    <Die die={die} key={index}/>
                );
            })}
        </div>
    );
}

export default DiceContainer;