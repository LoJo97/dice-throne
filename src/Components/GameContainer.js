import { useEffect, useState, useContext } from 'react';
import _ from 'lodash';
import Barbarian from '../Characters/Barbarian';
import MoonElf from '../Characters/MoonElf';
import { GameContext, phases } from './../Contexts/GameContext';
import { PlayersContext } from './../Contexts/PlayersContext';
import EventContainer from './EventContainer';
import PlayerContainer from './PlayerContainer';

const GameContainer = (props) => {
    const game = useContext(GameContext);
    const players = useContext(PlayersContext);

    const updateGame = (newVal) => {
        //setGame(_.clone(newVal));
    }

    const clickResolve = () => {
        game.resolveEvent();
        updateGame(game);
    }

    const swap = () => {
        if(game.activePlayer === 0) {
          game.activePlayer = 1;
          game.targetPlayer = 0;
        }
        else {
          game.activePlayer = 0;
          game.targetPlayer = 1;
        }
        updateGame(game);
    }

    const advancePhase = () => {
        let newPhase = '';
        let newTurn = game.turn;
        switch(game.phase) {
            case phases.UPKEEP:
                newPhase = phases.INCOME;
                break;
            case phases.INCOME:
                newPhase = phases.MAIN_FIRST;
                break;
            case phases.MAIN_FIRST:
                newPhase = phases.OFFENSE;
                break;
            case phases.OFFENSE:
                newPhase = phases.TARGETING;
                break;
            case phases.TARGETING:
                newPhase = phases.DEFENSE;
                break;
            case phases.DEFENSE:
                newPhase = phases.MAIN_SECOND;
                break;
            case phases.MAIN_SECOND:
                if(players[game.activePlayer].hand.length > 6) {
                    console.log('Discard or play cards before ending your turn');
                    return;
                }

                if(newTurn === players.length - 1) newTurn = 0;
                else newTurn++;
                
                newPhase = phases.UPKEEP;
                swap();
                break;                
            default:
                newPhase = phases.UPKEEP;
                break;
        }

        game.setPhase(newPhase);
        game.setTurn(newTurn);
    }

    useEffect(() => {
        if(game.phase === phases.INCOME) {
            console.log(game.phase);
            players.players[game.activePlayer].getIncome();
            updateGame(game);
            advancePhase();
        }
    }, [game]);

    return (
        <div>
            <h1>PHASE: {game.phase}</h1>
            <button onClick={advancePhase}>Advance Phase</button>
            <div style={{display: 'flex'}}>
                <PlayerContainer playerIndex={0}/>
                <PlayerContainer playerIndex={1}/>
            </div>
            <br/>
            <b>CURRENT EVENT:</b>
            {
                //<EventContainer game={game} updateGame={updateGame}/>
            }
            <button onClick={clickResolve}>Resolve Event</button>
        </div>
    );
}

export default GameContainer;