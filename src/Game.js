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
        this.activePlayer = 0;
        this.turn = 0;
        this.firstPlayer = 0;
        this.phase = 'UPKEEP';

        for(let i = 0; i < this.players.length; i++) {
            this.players[i].shuffleDeck();
            for(let j = 0; j < 4; j++) {
                this.players[i].drawCard();
            }
        }
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

    /**
     * 
     * @param {{Event}} event 
     * @param {{number}} mainIndex 
     * @param {{number}} targetIndex 
     */
    resolveEvent = (event, mainIndex, targetIndex = -1) => {
        let resolution = event.resolve();
        let player = this.players[mainIndex];
        player.hp -= resolution.playerDamage;
        player.cp += resolution.playerCP;
        player.statusEffects((status) => {
            player.addStatus(status);
        });
        for(let i = 0; i < player.draw; i++) {
            player.draw();
        }
        //Handle remove status

        if(targetIndex > -1) {
            let target = this.players[targetIndex];
            target.hp -= resolution.targetDamage;
            target.cp += resolution.targetCP;
            target.statusEffects((status) => {
                target.addStatus(status);
            });
            //Handle discard
            if(target.cp >= resolution.stealCP) {
                target.cp -= resolution.stealCP;
                player.cp += resolution.stealCP;
            }else{
                player.cp += target.cp;
                target.cp = 0;
            }
        }
        return;
    }
}