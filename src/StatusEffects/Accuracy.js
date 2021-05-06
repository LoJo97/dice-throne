import Status, { removeConditions, statusActivation, statusTypes, phases } from './Status';

export default class Accuracy extends Status {
    constructor() {
        super();

        this.removeCondition = removeConditions.SPEND;
        this.usagePhase = phases.OFFENSE;
    }

    resolve = (event, game) => {
        event.damageType = 'undefendable';
        return event;
    }
}