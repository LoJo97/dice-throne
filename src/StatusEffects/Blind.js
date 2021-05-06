import Status, { removeConditions, statusActivation, statusTypes, phases } from './Status';
import Event from './../Event';

const attributes = [
    'negative',
    'attack::end',
    'roll::1d::1-2::fail'
];

export default class Blind extends Status {
    constructor() {
        super();

        this.type = statusTypes.NEGATIVE;
        this.removeCondition = removeConditions.ONCE;
        this.usagePhase = phases.OFFENSE;
        this.activation = statusActivation.AUTO;
        this.stackLimit = 3;
        this.roll = 1;
    }

    resolve = (event, player) => {
        let newEvent = new Event();
        let rollResult = player.rollDie(0);
        if(rollResult.value < 3){
            newEvent.damageType = 'failDamage';
            event.reconcile(newEvent);
            return event;
        }
        return event;
    }
}