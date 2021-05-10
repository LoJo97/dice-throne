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

    resolve = (event, player) => {
        event.returnDamage = 0;
        event.returnDamageType = 'undefendable';
        if(player.rollCount > 1) 
            event.returnDamage += player.rollCount > 3 ? 
                player.rollCount - 1 : 2;
    }
}