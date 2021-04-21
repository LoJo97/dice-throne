import Status, { removeConditions } from './Status';

const attributes = [
    'negative',
    'persistent',
    'defending',
    'incomingDamage::+1',
    'attackerCP::+1'
];

export default class Bounty extends Status {
    constructor() {
        super(attributes, 1, removeConditions.PERSISTENT);
    }
}