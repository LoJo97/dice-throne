import Status, { removeConditions } from './Status';

const attributes = [
    'negative',
    'income',
    'skip::income',
    'once'
];

export default class Concussion extends Status {
    constructor() {
        super(attributes, 1, removeConditions.ONCE);
    }
}