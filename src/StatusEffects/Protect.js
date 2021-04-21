import Status, { removeConditions } from './Status';

const attributes = [
    'positive',
    'defending',
    'prevent::0.5'
];

export default class Protect extends Status {
    constructor() {
        super(attributes, 3, removeConditions.SPEND);
    }
}