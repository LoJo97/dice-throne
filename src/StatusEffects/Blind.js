import Status, { removeConditions } from './Status';

const attributes = [
    'negative',
    'attack::end',
    'roll::1d::1-2::fail'
];

export default class Blind extends Status {
    constructor() {
        super(attributes, 3, removeConditions.ONCE);
    }
}