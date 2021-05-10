import { GameContext, phases } from './../Contexts/GameContext';
import { PlayersContext } from './../Contexts/PlayersContext';
import { PlayerIndexContext } from './../Contexts/PlayerIndexContext';
import { EventContext } from './../Contexts/EventContext';
import { useContext } from 'react';
import Status from './Status';
import DiceContainer from './DiceContainer';
import { type } from '../cards';
import { GridList, GridListTile } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import styles from './../styles';

const useStyles = makeStyles(styles);

const PlayerContainer = (props) => {
    const classes = useStyles();

    const {players, setPlayers} = useContext(PlayersContext);
    const playerIndex = useContext(PlayerIndexContext);
    const game = useContext(GameContext);
    const {events, setEvents} = useContext(EventContext);

    const player = players[playerIndex];

    const roll = () => {
        player.rollDice();
        setPlayers([...players]);
    }

    const performAttack = (attackIndex) => {
        let attacker = player;
        let attack = attacker.findValidAttacks()[attackIndex].resolve();
        events.push(attack);
        setEvents([...events]);
    }

    const performDefense = (defenseIndex) => {
        let defender = player;
        let defense = defender.defense[defenseIndex].resolve();
        events.push(defense);
        setEvents([...events]);
    }

    const playCard = (card) => {
        if(card.type === type.UPGRADE && (game.phase === phases.MAIN_FIRST || game.phase === phases.MAIN_SECOND)){
            player.playCard(card);
            setPlayers([...players]);
        }else if(card.type === type.MAIN && (game.phase === phases.MAIN_FIRST || game.phase === phases.MAIN_SECOND)){
            player.playCard(card);
            setPlayers([...players]);
        }
    }

    return(
        <div>
            <h2 style={{color: game.activePlayer === playerIndex ? 'green' : 'red'}}>
                {player.constructor.name} - HP: {player.hp} CP: {player.cp}
            </h2>
            {player.rolls > 0 && <DiceContainer/>}
            {(game.phase === phases.OFFENSE || game.phase === phases.DEFENSE) && <button onClick={() => roll()}>Roll Dice</button>}
            {game.phase === phases.OFFENSE && <div>
                <br/>
                <b>ATTACKS:</b>
                {player.rolls > 0 && player.findValidAttacks().map((a, index) => {
                    return (
                        <div key={index} onClick={() => performAttack(index)}>
                            {a.name}
                        </div>
                    );
                })}
            </div>}
            {game.phase === phases.DEFENSE && <div>
                <br/>
                <b>DEFENSE:</b>
                {player.defense.map((d, index) => {
                    return (
                        <div key={index} onClick={() => performDefense(index)}>
                            {d.name}
                        </div>
                    );
                })}
            </div>}
            <br/>
            <b>STATUS EFFECTS:</b>
            {player.statusEffects.map((status, index) => {
                return (
                    <div key={index}>
                        <Status game={game} status={status} updateGame={props.updateGame}/>
                    </div>
                );
            })}
            <br/>
            {playerIndex === game.activePlayer ?
                <div>
                    <b>HAND:</b>
                    <GridList cellHeight={570} className={classes.gridList} cols={3}>
                        {player.hand.map((card) => {
                            return (
                                <GridListTile key={card.name} onClick={() => playCard(card)}>
                                    <img src={card.img} alt={card.name} className={classes.card}/>
                                </GridListTile>
                            );
                        })}
                    </GridList>
                </div>
                :
                null
            }
        </div>
    );
}

export default PlayerContainer;