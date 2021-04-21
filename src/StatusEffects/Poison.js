import Status, { removeConditions } from './Status';

const attributes = [
    'negative',
    'upkeep',
    'damage::1'
];

export default class Poison extends Status {
    constructor() {
        super(attributes, 3, removeConditions.PERSISTENT);
    }
}