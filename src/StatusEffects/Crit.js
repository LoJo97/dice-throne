import Status, { removeConditions } from './Status';

const attributes = [
    'positive',
    'attack::end',
    'damage+4::min_5'
];

export default class Crit extends Status {
    constructor() {
        super(attributes, 1, removeConditions.SPEND);
    }
}