import Status, { removeConditions, statusTypes, phases } from './Status';

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

    resolve = (event, player = null) => {
        event.damage += 2;
        event.damageType = 'normal';
    }
}