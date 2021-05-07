import {createContext} from 'react';

export const phases = {
    UPKEEP: 'upkeep',
    INCOME: 'income',
    MAIN_FIRST: 'main_first',
    OFFENSE: 'offense',
    TARGETING: 'targeting',
    DEFENSE: 'defense',
    MAIN_SECOND: 'main_second'
}

const gameStart = {
    activePlayer: 0,
    turn: 0,
    phase: phases.UPKEEP,
    setActivePlayer: (newPlayer) => {},
    setPhase: (newPhase) => {},
    setTurn: (newTurn) => {}
}

export const GameContext = createContext(gameStart);