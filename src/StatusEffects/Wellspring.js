import Status, { removeConditions } from './Status';

const attributes = [
    'positive',
    'main',
    'roll::1d::half::heal'
];

export default class Wellspring extends Status {
    constructor() {
        super(attributes, 1, removeConditions.SPEND);
    }
}