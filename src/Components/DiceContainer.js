import { useContext } from 'react';
import _ from 'lodash';
import Die from './Die';
import { PlayersContext } from './../Contexts/PlayersContext';

const DiceContainer = (props) => {
    const {players} = useContext(PlayersContext);
    const player = players[props.playerIndex];

    return (
        <div style={{display: 'flex'}}>
            {player.dice.map((die, index) => {
                return (
                    <Die die={die} key={index} playerIndex={props.playerIndex}/>
                );
            })}
        </div>
    );
}

export default DiceContainer;