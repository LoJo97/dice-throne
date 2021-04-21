import Status, { removeConditions } from './Status';

const attributes = [
    'positive',
    'attack::end',
    'damage+undefendable'
];

export default class Accuracy extends Status {
    constructor() {
        super(attributes, 1, removeConditions.SPEND);
    }
}