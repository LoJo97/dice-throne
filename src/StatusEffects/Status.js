import {phases} from './../Game';

export default class Status {
    constructor() {
        this.stackLimit = 1;
        this.removeCondition = removeConditions.ONCE;
        this.roll = 0;
        this.type = statusTypes.POSITIVE;
        this.activation = statusActivation.MANUAL;
        this.usagePhase = phases.UPKEEP;
    }
}

export const removeConditions = {
    ONCE: 'once',
    PERSISTENT: 'persistent',
    SPEND: 'spend',
    COOLOFF: 'cooloff',
    FULL_TURN: 'full_turn'
}

export const statusTypes = {
    POSITIVE: 'positive',
    NEGATIVE: 'negative',
    UNIQUE: 'unique'
}

export const statusActivation = {
    MANUAL: 'manual',
    AUTO: 'auto'
}

export {phases} from './../Game';