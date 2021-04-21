import Status, { removeConditions } from './Status';

const attributes = [
    'negative',
    'conclusion',
    'damage::3'
];

export default class DelayedPoison extends Status {
    constructor() {
        super(attributes, 2, removeConditions.ONCE);
    }
}