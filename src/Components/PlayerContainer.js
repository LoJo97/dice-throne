import _ from 'lodash';
import {useState} from 'react';
import Game, { phases } from './../Game';
import Event from '../Event';
import Status from './Status';
import { type } from '../cards';
import { GridList, GridListTile } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import styles from './../styles';

const useStyles = makeStyles(styles);

const PlayerContainer = (props) => {
    const classes = useStyles();

    const game = props.game;
    const event = game.currentEvent;
    const player = game.players[props.playerNum];
    const target = game.players[props.targetNum];

    const roll = () => {
        player.rollDice();
        props.updateGame(props.game);
    }

    const lockDie = (i) => {
        if(player.dice[i].locked) player.unlockDie(i);
        else player.lockDie(i);
        props.updateGame(props.game);
    }

    const performAttack = (attackIndex) => {
        let attacker = player;
        let attack = attacker.findValidAttacks()[attackIndex].resolve();
        event.reconcile(attack);
        props.updateGame(game);
    }

    const performDefense = (defenseIndex) => {
        let defender = player;
        let defense = defender.defense[defenseIndex].resolve();
        event.reconcile(defense);
        props.updateGame(game);
    }

    const playCard = (card) => {
        if(card.type === type.UPGRADE && (game.phase === phases.MAIN_FIRST || game.phase === phases.MAIN_SECOND)) {
            player.playCard(card);
            props.updateGame(game);
        }
    }

    return(
        <div>
            <h2 style={{color: game.activePlayer === props.playerNum ? 'green' : 'red'}}>{player.constructor.name} - HP: {player.hp} CP: {player.cp}</h2>
            {(game.phase === phases.OFFENSE || game.phase === phases.DEFENSE) && player.dice.map((d, index) => {
                return (
                    <div style={d.locked ? {color: 'red'} : {}} key={index}>
                    <b>{index + 1}</b>: {d.result.value}, {d.result.type} <button onClick={() => lockDie(index)}>{d.locked ? 'Unlock' : 'Lock' }</button>
                    </div>
                );
            })}
            {(game.phase === phases.OFFENSE || game.phase === phases.DEFENSE) && <button onClick={() => roll()}>Roll Dice</button>}
            {game.phase === phases.OFFENSE && <div>
                <br/>
                <b>ATTACKS:</b>
                {player.rolls > 0 && player.findValidAttacks().map((a, index) => {
                    return (
                        <div key={index} onClick={() => props.targetNum !== null ? performAttack(index) : null}>
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
            {props.playerNum === game.activePlayer ?
                <div>
                    <b>HAND:</b>
                    <div className={classes.root}>
                        <GridList cellHeight={570} className={classes.gridList} cols={3}>
                            {player.hand.map((card) => {
                                return (
                                    <GridListTile key={card.name} onClick={() => playCard(card)} cols={1}>
                                        <img src={card.img} alt={card.name} className={classes.card}/>
                                    </GridListTile>
                                );
                            })}
                        </GridList>
                    </div>
                </div>
                :
                null
            }
        </div>
    );
}

export default PlayerContainer;