import Event from './Event';

let phases = {
    UPKEEP: 'upkeep',
    INCOME: 'income',
    MAIN_FIRST: 'main_first',
    OFFENSE: 'offense',
    TARGETING: 'targeting',
    DEFENSE: 'defense',
    MAIN_SECOND: 'main_second',
    SELL: 'sell'
}

export default class Game {
    constructor(players) {
        this.players = players;
        this.activePlayer = players[0];
        this.turn = 0;
        this.phase = 'UPKEEP';
    }

    advancePhase = () => {
        switch(this.phase) {
            case phases.UPKEEP:
                this.phase = phases.INCOME;
                return;
            case phases.INCOME:
                this.phase = phases.MAIN_FIRST;
                return;
            case phases.MAIN_FIRST:
                this.phase = phases.OFFENSE;
                return;
            case phases.OFFENSE:
                this.phase = phases.TARGETING;
                return;
            case phases.TARGETING:
                this.phase = phases.DEFENSE;
                return;
            case phases.DEFENSE:
                this.phase = phases.MAIN_SECOND;
                return;
            case phases.MAIN_SECOND:
                this.phase = phases.SELL;
                return;
            default:
                this.phase = phases.UPKEEP;
                return;
        }
    }
}