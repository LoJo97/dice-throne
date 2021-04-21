import Status, { removeConditions } from './Status';

const attributes = [
    'positive',
    'attack::end',
    'roll::1d::val::damage',
];

export default class SneakAttack extends Status {
    constructor() {
        super(attributes, 1, removeConditions.SPEND);
    }
}