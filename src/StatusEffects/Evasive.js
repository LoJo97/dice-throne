import Status, { removeConditions } from './Status';

const attributes = [
    'positive',
    'takeDamage',
    'roll::1d::1-2',
    'evade::damage'
];

export default class Evasive extends Status {
    constructor() {
        super(attributes, 3, removeConditions.SPEND);
    }
}