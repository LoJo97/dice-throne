import Status, { removeConditions } from './Status';

const attributes = [
    'negative',
    'upkeep',
    'damage::2'
];

export default class Burn extends Status {
    constructor() {
        super(attributes, 1, removeConditions.PERSISTENT);
    }
}