import Status, { removeConditions } from './Status';

const attributes = [
    'negative',
    'defending',
    'incomingAttackDamage::+2'
];

export default class Targeted extends Status {
    constructor() {
        super(attributes, 1, removeConditions.PERSISTENT);
    }
}