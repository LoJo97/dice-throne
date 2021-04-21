import Status, { removeConditions } from './Status';

const attributes = [
    'positive',
    'anytime',
    'removeStatus'
];

export default class Cleanse extends Status {
    constructor() {
        super(attributes, 3, removeConditions.SPEND);
    }
}