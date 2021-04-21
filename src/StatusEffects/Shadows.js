import Status, { removeConditions } from './Status';

const attributes = [
    'positive',
    'defending',
    'noDamage'
];

export default class Shadows extends Status {
    constructor() {
        super(attributes, 1, removeConditions.FULL_TURN);
    }
}