import Status, { removeConditions, statusActivation, statusTypes, phases } from './Status';
import Event from './../Event';

export default class Bounty extends Status {
    constructor() {
        super();

        this.type = statusTypes.NEGATIVE;
        this.removeCondition = removeConditions.PERSISTENT;
        this.activation = statusActivation.AUTO;
        this.usagePhase = phases.OFFENSE;
    }

    resolve = (event, game) => {
        let newEvent = new Event();
        newEvent.getCP++;
        newEvent.damage++;
        event.reconcile(newEvent);

        return event;
    }
}