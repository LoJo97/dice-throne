import Status, { removeConditions } from './Status';

const attributes = [
    'positive',
    'takeDamage',
    'roll::1d::1-3',
    'evade::damage'
];

export default class SmokeBomb extends Status {
    constructor() {
        super(attributes, 1, removeConditions.SPEND);
    }
}