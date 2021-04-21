import Status, { removeConditions } from './Status';

const attributes = [
    'negative',
    'attack::begin',
    'skip::offense',
    'pay::2'
];

export default class Evasive extends Status {
    constructor() {
        super(attributes, 1, removeConditions.ONCE);
    }
}