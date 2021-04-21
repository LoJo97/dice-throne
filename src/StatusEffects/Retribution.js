import Status, { removeConditions } from './Status';

const attributes = [
    'positive',
    'defending',
    'returnDamage::offense::0.5'
];

export default class Retribution extends Status {
    constructor() {
        super(attributes, 3, removeConditions.SPEND);
    }
}