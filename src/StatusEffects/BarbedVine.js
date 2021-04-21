import Status, { removeConditions } from './Status';

const attributes = [
    'negative',
    'attack::end',
    'damage::perRoll::1',
    'max::2'
];

export default class BarbedVine extends Status {
    constructor() {
        super(attributes, 1, removeConditions.ONCE);
    }
}