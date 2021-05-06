import Event from './Event';

export const phases = {
    UPKEEP: 'upkeep',
    INCOME: 'income',
    MAIN_FIRST: 'main_first',
    OFFENSE: 'offense',
    TARGETING: 'targeting',
    DEFENSE: 'defense',
    MAIN_SECOND: 'main_second'
}

export default class Game {
    constructor(players) {
        this.players = players;
        this.activePlayer = 0;
        this.targetPlayer = 1;
        this.turn = 0;
        this.firstPlayer = 0;
        this.phase = phases.UPKEEP;
        this.currentEvent = new Event();

        for(let i = 0; i < this.players.length; i++) {
            this.players[i].shuffleDeck();
            for(let j = 0; j < 4; j++) {
                this.players[i].drawCard();
            }
        }
    }

    /**
     * 
     * @param {{number}} mainIndex 
     * @param {{number}} targetIndex 
     */
    resolveEvent = () => {
        let resolution = this.currentEvent.resolve();
        let player = this.players[this.activePlayer];
        player.hp -= resolution.playerDamage;
        player.cp += resolution.playerCP;
        resolution.gain.map((status) => {
            player.addStatus(status);
        });
        for(let i = 0; i < player.draw; i++) {
            player.draw();
        }

        //TODO: Handle remove status

        let target = this.players[this.targetPlayer];
        target.hp -= resolution.targetDamage;
        target.cp += resolution.targetCP;
        resolution.inflict.map((status) => {
            target.addStatus(status);
        });

        //TODO: Handle discard

        if(target.cp >= resolution.stealCP) {
            target.cp -= resolution.stealCP;
            player.cp += resolution.stealCP;
        }else{
            player.cp += target.cp;
            target.cp = 0;
        }

        this.currentEvent.reset();

        return;
    }

    resolveActiveStatus = () => {
        
    }
}