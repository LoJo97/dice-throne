import Status, { removeConditions } from './Status';

const attributes = [
    'positive',
    'attackMod',
    'roll::1d::1-2',
    'failRoll'
];

export default class Blind extends Status {
    constructor() {
        super(attributes, 5, removeConditions.COOLOFF);
    }
}