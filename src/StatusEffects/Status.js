export default class Status {
    constructor(attributes, stackLimit, removeCondition) {
        this.attributes = attributes;
        this.stackLimit = stackLimit;
        this.removeCondition = removeCondition;
    }
}

export const removeConditions = {
    ONCE: 'once',
    PERSISTENT: 'persistent',
    SPEND: 'spend',
    COOLOFF: 'cooloff',
    FULL_TURN: 'full_turn'
}