import Status, { removeConditions, statusActivation, statusTypes, phases } from './Status';

export default class Bounty extends Status {
    constructor() {
        super();

        this.type = statusTypes.NEGATIVE;
        this.removeCondition = removeConditions.PERSISTENT;
        this.activation = statusActivation.AUTO;
        this.usagePhase = phases.OFFENSE;
    }

    resolve = (event, player = null) => {
        event.getCP++;
        event.damage++;

        return event;
    }
}