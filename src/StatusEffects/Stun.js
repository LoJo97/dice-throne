import Status, { removeConditions } from './Status';

const attributes = [
    'negative',
    'skip::turn',
];

export default class Stun extends Status {
    constructor() {
        super(attributes, 1, removeConditions.ONCE);
    }
}