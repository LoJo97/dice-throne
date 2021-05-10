import Event from './Event';

import card01 from './Media/Cards/01.png';
import card02 from './Media/Cards/02.png';
import card03 from './Media/Cards/03.png';
import card04 from './Media/Cards/04.png';
import card05 from './Media/Cards/05.png';
import card06 from './Media/Cards/06.png';
import card07 from './Media/Cards/07.png';
import card08 from './Media/Cards/08.png';
import card09 from './Media/Cards/09.png';
import card10 from './Media/Cards/10.png';
import card11 from './Media/Cards/11.png';
import card12 from './Media/Cards/12.png';
import card13 from './Media/Cards/13.png';
import card14 from './Media/Cards/14.png';
import card15 from './Media/Cards/15.png';
import card16 from './Media/Cards/16.png';
import card17 from './Media/Cards/17.png';
import card18 from './Media/Cards/18.png';

export const target = {
    ANY: 'any',
    OPPONENT: 'opponent',
    TEAMMATE: 'teammate',
    SELF: 'self'
}

export const type = {
    INSTANT: 'instant',
    MAIN: 'main',
    ROLL: 'roll',
    UPGRADE: 'upgrade'
}

export const getCardParams = (paramTypes, params = [], index = 0) => {
    if(index !== paramTypes.length - 1){
        return (newParam) => {
            return this.getCardParams(paramTypes, params.push(newParam), index++);
        }
    }
    return (newParam) => {
        params.push(newParam);
        return params;
    };
}

const cards = [
    {
        id: 1,
        name: 'Transference!',
        img: card01,
        cost: 2,
        description: 'Transfer 1 status effect token from a chosen player to another chosen player.',
        type: type.MAIN,
        target: target.ANY,
        paramTypes: ['giver', 'status', 'receiver'],
        resolve: (giver, status, receiver) => {
            let newEvent = new Event();
            newEvent.giver = giver;
            newEvent.inflict.push(status);
            newEvent.removeTarget = [status];
            newEvent.receiver = receiver;
            return newEvent;
        }
    },
    {
        id: 2,
        name: 'What Status Effects?',
        img: card02,
        cost: 2,
        description: 'Remove all status effect tokens from a chosen player.',
        type: type.MAIN,
        target: target.ANY,
        attributes: [
            'remove',
            'all',
            'status'
        ],
        paramTypes: ['target'],
        resolve: (target) => {
            let newEvent = new Event();
            newEvent.target = target;
            newEvent.removeTarget = target.statusEffects;
            return newEvent;
        }
    },
    {
        id: 3,
        name: 'Vegas Baby!',
        img: card03,
        cost: 0,
        description: 'Roll 1 die: Gain 1/2 the value as CP (rounded up).',
        type: type.MAIN,
        target: target.SELF,
        attributes: [
            'roll::1d',
            'gain::0.5::CP'
        ],
        paramTypes: ['self', 'die'],
        resolve: (self, die) => {
            let newEvent = new Event();
            newEvent.user = self;
            newEvent.getCP = Math.ceil(die.result.value / 2);
            return newEvent;
        }
    },
    {
        id: 4,
        name: 'Get That Outta Here!',
        img: card04,
        cost: 1,
        description: 'Remove a status effect token from a chosen player.',
        type: type.MAIN,
        target: target.ANY,
        attributes: [
            'remove',
            '1',
            'status'
        ],
        paramTypes: ['target', 'status'],
        resolve: (target, status) => {
            let newEvent = new Event();
            newEvent.target = target;
            newEvent.removeTarget = [status];
            return newEvent;
        }
    },
    {
        id: 5,
        name: 'Triple Up!',
        img: card05,
        cost: 2,
        description: 'Draw 3 cards.',
        type: type.INSTANT,
        target: target.SELF,
        attributes: [
            'draw',
            '3'
        ],
        paramTypes: ['self'],
        resolve: (self) => {
            let newEvent = new Event();
            newEvent.user = self;
            newEvent.draw = 3;
            return newEvent;
        }
    },
    {
        id: 6,
        name: 'Double Up!',
        img: card06,
        cost: 1,
        description: 'Draw 2 cards.',
        type: type.INSTANT,
        target: target.SELF,
        attributes: [
            'draw',
            '2'
        ],
        paramTypes: ['self'],
        resolve: (self) => {
            let newEvent = new Event();
            newEvent.user = self;
            newEvent.draw = 2;
            return newEvent;
        }
    },
    {
        id: 7,
        name: 'Bye, Bye!',
        img: card07,
        cost: 2,
        description: 'Remove a status effect token from a chosen player.',
        type: type.INSTANT,
        target: target.ANY,
        attributes: [
            'remove',
            '1',
            'status'
        ],
        paramTypes: ['target', 'status'],
        resolve: (target, status) => {
            let newEvent = new Event();
            newEvent.target = target;
            newEvent.removeTarget = [status];
            return newEvent;
        }
    },
    {
        id: 8,
        name: 'Tip It!',
        img: card08,
        cost: 1,
        description: 'Increase or decrease any die by the value of 1 (a value of 1 cannot be decreased and a value of 6 cannot be increased).',
        type: type.INSTANT,
        target: target.ANY,
        attributes: [
            'die',
            '+/-'
        ],
        paramTypes: ['target', 'die', 'tip'],
        resolve: (target, die, tip) => {
            let newEvent = new Event();
            newEvent.target = target;
            die.result.value = die.result.value + tip;
            return newEvent;
        }
    },
    {
        id: 9,
        name: 'Getting Paid!',
        img: card09,
        cost: 0,
        description: 'Gain 2CP.',
        type: type.INSTANT,
        target: target.SELF,
        attributes: [
            'gain::2::CP'
        ],
        paramTypes: ['self'],
        resolve: (self) => {
            let newEvent = new Event();
            newEvent.user = self;
            newEvent.getCP = 2;
        }
    },
    {
        id: 10,
        name: 'Not This Time!',
        img: card10,
        cost: 1,
        description: 'A chosen player prevents 6 incoming dmg.',
        type: type.ROLL,
        target: target.ANY,
        attributes: [
            'prevent',
            '6'
        ],
        paramTypes: ['target'],
        resolve: (target) => {
            let newEvent = new Event();
            newEvent.target = target;
            newEvent.preventTarget = 6;
        }
    },
    {
        id: 11,
        name: 'Twice as Wild!',
        img: card11,
        cost: 3,
        description: 'Change the values of any two dice.',
        type: type.ROLL,
        target: target.ANY,
        attributes: [
            'change',
            '2'
        ],
        paramTypes: ['target', 'die', 'die', 'value', 'value'],
        resolve: (target, die1, die2, value1, value2) => {
            let newEvent = new Event();
            newEvent.target = target;
            die1.result.value = value1;
            die1.result.type = target.diceTypes[value1 - 1];
            die2.result.value = value2;
            die2.result.type = target.diceTypes[value2 - 1];
            return newEvent;
        }
    },
    {
        id: 12,
        name: 'Try, Try Again!',
        img: card12,
        cost: 1,
        description: 'You or a chosen teammate may re-roll up to two dice (can be the same die twice in a row or two different dice).',
        type: type.ROLL,
        target: target.TEAMMATE,
        attributes: [
            'reroll',
            '2'
        ],
        /*
        paramTypes: ['target', 'dieIndex', 'dieIndex'],
        resolve: (target, die1, die2 = -1) => {
            
        }
        */
    },
    {
        id: 13,
        name: 'So Wild!',
        img: card13,
        cost: 2,
        description: 'Change the value of any one die.',
        type: type.ROLL,
        target: target.ANY,
        attributes: [
            'change',
            '1'
        ],
        paramTypes: ['target', 'die', 'value'],
        resolve: (target, die, value) => {
            let newEvent = new Event();
            newEvent.target = target;
            die.result.value = value;
            die.result.type = target.diceTypes[value - 1];
            return newEvent;
        }
    },
    {
        id: 14,
        name: 'Samesies!',
        img: card14,
        cost: 1,
        description: 'Change the value of one of your dice to be identical to the value of another one of your dice (that was rolled within the same phase and for the same purpose).',
        type: type.ROLL,
        target: target.SELF,
        attributes: [
            'change',
            '1',
            'same'
        ],
        paramTypes: ['target', 'die', 'valueSame'],
        resolve: (target, die, value) => {
            let newEvent = new Event();
            newEvent.target = target;
            die.result.value = value;
            die.result.type = target.diceTypes[value - 1];
            return newEvent;
        }
    },
    {
        id: 15,
        name: 'One More Time!',
        img: card15,
        cost: 1,
        description: 'A chosen player may perform an additional Roll Attempt of up to five dice during their Offensive Roll Phase.',
        type: type.ROLL,
        target: target.ANY,
        attributes: [
            'reroll',
            'phase',
            'offense'
        ],
        paramTypes: ['target'],
        resolve: (target) => {
            let newEvent = new Event();
            target.rolls--;
            return newEvent;
        }
    },
    {
        id: 16,
        name: 'Helping Hand!',
        img: card16,
        cost: 1,
        description: 'Select one of your opponent\'s dice and force them to re-roll it.',
        type: type.ROLL,
        target: target.OPPONENT,
        attributes: [
            'reroll',
            '1'
        ]
    },
    {
        id: 17,
        name: 'Better D!',
        img: card17,
        cost: 0,
        description: 'A chosen player may perform an additional Roll Attempt of up to five dice during their Defensive Roll Phase.',
        type: type.ROLL,
        target: target.ANY,
        attributes: [
            'reroll',
            'phase',
            'defense'
        ]
    },
    {
        id: 18,
        name: 'Six-It!',
        img: card18,
        cost: 1,
        description: 'Change the value of one of your dice to a 6.',
        type: type.ROLL,
        target: target.SELF,
        attributes: [
            'change',
            '1',
            'six'
        ]
    }
]

export default cards;