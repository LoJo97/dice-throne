import { useEffect, useContext } from 'react';
import { GameContext, phases } from './../Contexts/GameContext';
import { PlayersContext } from './../Contexts/PlayersContext';
import { PlayerIndexContext } from './../Contexts/PlayerIndexContext';
import { EventContext } from './../Contexts/EventContext';
import Event from './../Event';
import PlayerContainer from './PlayerContainer';
import EventContainer from './EventContainer';

const GameContainer = () => {
    const game = useContext(GameContext);
    const {players} = useContext(PlayersContext);
    const {events, setEvents} = useContext(EventContext);

    const resolveEvents = () => {
        let base = new Event();
        for(let i = 0; i < events.length; i++) {
            base.reconcile(events[i]);
        }
        setEvents([base]);
    }

    const swap = () => {
        if(game.activePlayer === 0) {
          game.setActivePlayer(1);
          game.setTargetPlayer(0);
        }
        else {
          game.setActivePlayer(0);
          game.setTargetPlayer(1);
        }
    }

    const advancePhase = () => {
        let newPhase = game.phase;
        let newTurn = game.turn;
        let newActivePlayer = game.activePlayer;
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

                if(newActivePlayer === players.length - 1) newActivePlayer = 0;
                else newActivePlayer++;
                
                newTurn++;
                newPhase = phases.UPKEEP;
                swap();
                break;                
            default:
                newPhase = phases.UPKEEP;
                break;
        }

        game.setPhase(newPhase);
        game.setTurn(newTurn);
        game.setActivePlayer(newActivePlayer);
    }

    useEffect(() => {
        if(game.phase === phases.INCOME) {
            if(game.turn !== 0) players[game.activePlayer].getIncome();
            advancePhase();
        }
    }, [game.phase]);

    return (
        <div>
            <h1>PHASE: {game.phase}</h1>
            <button onClick={advancePhase}>Advance Phase</button>
            <div style={{display: 'flex'}}>
                {players.map((player, index) => {
                    return (
                        <PlayerIndexContext.Provider value={index} key={index}>
                            <PlayerContainer/>
                        </PlayerIndexContext.Provider>
                    );
                })}
            </div>
            <br/>
            <b>CURRENT EVENTS:</b>
            <div style={{display: 'flex'}}>
                {events.map((event, index) => {
                    return (
                        <EventContainer eventIndex={index}/>
                    );
                })}
            </div>
            <button onClick={resolveEvents}>Resolve Event</button>
        </div>
    );
}

export default GameContainer;