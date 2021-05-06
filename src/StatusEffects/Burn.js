import Status, { removeConditions, statusTypes, phases } from './Status';
import Event from './../Event';

const attributes = [
    'negative',
    'upkeep',
    'damage::2'
];

export default class Burn extends Status {
    constructor() {
        super();

        this.removeCondition = removeConditions.PERSISTENT;
        this.type = statusTypes.NEGATIVE;
        this.usagePhase = phases.UPKEEP;
    }

    resolve = (event, game) => {
        let newEvent = new Event();
        newEvent.damage += 2;
        newEvent.damageType = 'normal';
        event.reconcile(newEvent);

        return event;
    }
}