import Status, { removeConditions } from './Status';

const attributes = [
    'positive',
    'attack::end',
    'roll::1d::1-3::damage+1',
    'roll::1d::4-5::damage+2',
    'roll::1d::6::damage+2',
    'roll::1d::6::inflict::DelayedPoison',
    'roll::1d::6::damage+undefendable'
];

export default class Ninjutsu extends Status {
    constructor() {
        super(attributes, 3, removeConditions.SPEND);
    }
}