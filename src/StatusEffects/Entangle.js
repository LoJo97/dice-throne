import Status, { removeConditions } from './Status';

const attributes = [
    'negative',
    'attack::begin',
    'offensiveRoll::-1'
];

export default class Entangle extends Status {
    constructor() {
        super(attributes, 1, removeConditions.ONCE);
    }
}