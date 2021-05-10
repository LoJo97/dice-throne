import Status, { removeConditions } from './Status';

const attributes = [
    'positive',
    'spend',
    'attack::end',
    'defending',
    'prevent::1',
    'damage+1'
];

export default class Chi extends Status {
    constructor() {
        super(attributes, 5, removeConditions.SPEND);
    }

    resolve = (event, player = null) => {
        
    }
}