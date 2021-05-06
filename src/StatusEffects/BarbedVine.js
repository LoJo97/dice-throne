import Status, { removeConditions, statusActivation, statusTypes, phases } from './Status';
import Event from './../Event';

const attributes = [
    'negative',
    'attack::end',
    'damage::perRoll::1',
    'max::2'
];

export default class BarbedVine extends Status {
    constructor() {
        super();

        this.type = statusTypes.NEGATIVE;
        this.removeCondition = removeConditions.ONCE;
        this.usagePhase = phases.OFFENSE;
        this.activation = statusActivation.MANUAL;
    }

    resolve = (event, game) => {
        let newEvent = new Event();
        newEvent.returnDamage = 0;
        newEvent.returnDamageType = 'undefendable';
        if(game.players[game.activePlayer].rollCount > 1) 
            newEvent.returnDamage += game.players[game.activePlayer].rollCount > 3 ? 
                game.players[game.activePlayer].rollCount - 1 : 2;
        event.reconcile(newEvent);

        return event;
    }
}